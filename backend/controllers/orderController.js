import Stripe from "stripe";
import Order from "../models/orderModel.js";
import Chat from "../models/chatModel.js";
import Client from "../models/clientsModel.js";
import Project from "../models/projectModel.js";
import Inquiry from "../models/inquiryModel.js";
import Package from "../models/packageModel.js";
import User from "../models/userModel.js"; // Import User model

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrder = async (req, res) => {
  try {
    const { amount, packageDetails, userDetails } = req.body;
    const userId = req.userId; // User ID from authenticated token

    // 1. Find or create Client
    let client = await Client.findOne({ email: userDetails.email });
    if (!client) {
      client = await Client.create({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone, // Ensure userDetails.phone is used
      });
    }

    // 2. Handle package creation/selection
    let packageId = null;
    if (packageDetails.isCustom) {
      const customPackage = await Package.create({
        name: `Custom Package for ${userDetails.name}`,
        price: null,
        originalPrice: amount,
        isCustom: true,
        minAdvance: amount,
        features: packageDetails.features || [],
        status: "active",
        isUserCustom: true,
      });
      packageId = customPackage._id;
    } else if (packageDetails._id) {
      packageId = packageDetails._id;
    }

    // 3. Create Project
    const project = await Project.create({
      userId, // Link project to the authenticated user ID
      name: userDetails.idea,
      package: packageId,
      description: userDetails.description,
      features: packageDetails.features,
    });

    // 4. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: packageDetails.name,
              description: `Project: ${userDetails.idea}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/verify?success=true&orderId={CHECKOUT_SESSION_ID}`, // <-- Corrected
      cancel_url: `${process.env.CLIENT_URL}/verify?success=false&orderId={CHECKOUT_SESSION_ID}`,   // <-- Corrected
    });

    // 5. Create Order record
    const order = new Order({
      clientId: client._id,
      projectId: project._id,
      packageDetails,
      amount,
      paymentId: session.id,
      status: "pending",
    });
    await order.save();

    // 6. Update Inquiry status to 'accepted' if found
    const inquiry = await Inquiry.findOne({
      email: userDetails.email,
      status: "pending",
    });
    if (inquiry) {
      inquiry.status = "accepted";
      await inquiry.save();
    }


    await User.findByIdAndUpdate(userId, {
      $set: {
        name: userDetails.name, // Ensure user's name is also updated/set
        email: userDetails.email, 
        phone: userDetails.phone,
      }
    }, { new: true, upsert: true }); // upsert: true means create if not found (though user should exist)


    res.json({
      success: true,
      url: session.url,
      orderId: order._id,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { success, stripeSessionId } = req.body;

    if (!success) {
      return res.json({ success: false, message: "Payment failed" });
    }

    const order = await Order.findOne({ paymentId: stripeSessionId }).populate("projectId");
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
    if (session.payment_status === "paid") {
      order.status = "paid";
      order.paymentDetails = {
        paymentId: session.payment_intent,
        paymentMethod: "stripe",
        paymentStatus: session.payment_status,
        paidAt: new Date(),
      };
      await order.save();

      // Update project status
      await Project.findByIdAndUpdate(order.projectId, {
        paymentStatus: "paid",
        status: "in-progress",
      });

      // Find or create chat for this user and project
      const existingChat = await Chat.findOne({
        userId: order.projectId.userId,
        projectId: order.projectId._id,
      });

      let chat;
      if (!existingChat) {
        chat = await Chat.create({
          projectId: order.projectId._id,
          userId: order.projectId.userId,
          status: "active", // Or "pending" if you want admin to activate it
        });
      } else {
        chat = existingChat;
      }

      res.json({
        success: true,
        message: "Payment verified successfully",
        chatId: chat._id, // Return chatId for frontend redirection
      });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.json({ success: false, message: error.message });
  }
};