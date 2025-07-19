import Stripe from "stripe";
import Order from "../models/orderModel.js";
import Chat from "../models/chatModel.js";
import Client from "../models/clientsModel.js";
import Project from "../models/projectModel.js";
import Inquiry from "../models/inquiryModel.js"; // Keep import
import Package from "../models/packageModel.js";
import User from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🛒 Create Stripe order
export const createOrder = async (req, res) => {
  console.log("-----------------------------------------");
  console.log("createOrder endpoint hit!");
  console.log("Request Body:", req.body);
  console.log("User ID from middleware (req.userId):", req.userId);
  console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY ? "Loaded" : "NOT LOADED");

  try {
    const { amount, packageDetails, userDetails } = req.body;
    const userId = req.userId;

    if (!userId) {
      console.error("Error: userId is missing from req. This indicates a problem with authentication middleware.");
      return res.status(401).json({ success: false, message: "User not authenticated. Please log in again." });
    }
    if (!amount || !packageDetails || !userDetails) {
      console.error("Error: Missing required fields in request body.");
      return res.status(400).json({ success: false, message: "Missing required payment details." });
    }

    // 1. Create or find client
    let client = await Client.findOne({ email: userDetails.email });
    if (!client) {
      client = await Client.create({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
      });
      console.log("New client created:", client._id);
    } else {
      console.log("Existing client found:", client._id);
    }

    // 2. Create or assign package
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
      console.log("Custom package created:", packageId);
    } else if (packageDetails._id) {
      packageId = packageDetails._id;
      console.log("Existing package ID:", packageId);
    } else {
      console.error("Error: packageDetails._id is missing for non-custom package.");
      return res.status(400).json({ success: false, message: "Invalid package details." });
    }

    // 3. Create project
    const project = await Project.create({
      userId,
      name: userDetails.idea,
      package: packageId,
      description: userDetails.description,
      features: packageDetails.features,
    });
    console.log("Project created:", project._id);


    const inquiry = await Inquiry.create({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        idea: userDetails.idea,
        description: userDetails.description,
        selectedPackage: packageDetails,
        status: 'pending-payment', // A new status to indicate it's awaiting payment
        projectId: project._id, // Link to the project created
    });
    console.log("Inquiry created with status 'pending-payment':", inquiry._id);


    // 5. Save order initially (paymentId is optional at this stage)
    const order = new Order({
      clientId: client._id,
      projectId: project._id,
      packageDetails,
      amount,
      status: "pending",
      inquiryId: inquiry._id, // Link order to inquiry
    });
    await order.save();
    console.log("Order saved (initial, pending paymentId):", order._id);

    // 6. Create Stripe session
    const successUrl = `${"https://doddlesync.onrender.com"}/verify?success=true&session_id={CHECKOUT_SESSION_ID}&orderId=${order._id}`;
    const cancelUrl = `${"https://doddlesync.onrender.com"}/verify?success=false&session_id={CHECKOUT_SESSION_ID}&orderId=${order._id}`;

    console.log("Stripe success_url:", successUrl);
    console.log("Stripe cancel_url:", cancelUrl);
    console.log("Stripe line_items unit_amount (cents):", Math.round(amount * 100));

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
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    console.log("Stripe Session created:", session.id);

    // 7. Update the order with the Stripe session ID AFTER it's created
    order.paymentId = session.id;
    await order.save();
    console.log("Order updated with Stripe Session ID:", order.paymentId);

    // 8. Update user profile (ensure user exists and userId is valid)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: userDetails.name,
          email: userDetails.email,
          phone: userDetails.phone,
        },
      },
      { new: true, upsert: true }
    );
    if (!updatedUser) {
      console.warn("User not found for update:", userId);
    } else {
      console.log("User profile updated:", updatedUser._id);
    }

    // 9. Return session URL and orderId to frontend
    res.json({
      success: true,
      url: session.url,
      orderId: order._id,
    });
    console.log("Response sent to frontend with Stripe URL and orderId.");

  } catch (error) {
    console.error("Critical Backend Error in createOrder:", error);
    res.status(500).json({ success: false, message: error.message || "An internal server error occurred during order creation." });
  }
  console.log("-----------------------------------------");
};

// ✅ Verify Stripe payment and activate chat
export const verifyPayment = async (req, res) => {
  console.log("-----------------------------------------");
  console.log("verifyPayment endpoint hit!");
  console.log("Request Body:", req.body);

  try {
    const { success, orderId, stripeSessionId } = req.body;

    if (!orderId) {
      console.error("Error: orderId is missing from request body.");
      return res.status(400).json({ success: false, message: "Your custom Order ID is missing." });
    }
    if (!stripeSessionId) {
      console.error("Error: stripeSessionId is missing from request body.");
      return res.status(400).json({ success: false, message: "Stripe session ID is missing." });
    }

    if (!success) {
      console.log("Payment indicated as failed by success=false. Order ID:", orderId);
      const order = await Order.findById(orderId);
      if (order) {
          order.status = "failed";
          // If payment failed, update inquiry status as well
          if (order.inquiryId) {
              await Inquiry.findByIdAndUpdate(order.inquiryId, { status: "payment-failed" });
              console.log(`Inquiry ${order.inquiryId} marked as payment-failed.`);
          }
          await order.save();
          console.log(`Order ${orderId} marked as failed.`);
      }
      return res.json({ success: false, message: "Payment was not successful (cancelled or failed). If you believe this is an error, please contact support." });
    }

    const order = await Order.findById(orderId).populate("projectId");
    if (!order) {
      console.error("Error: Order not found for custom orderId:", orderId);
      return res.status(404).json({ success: false, message: "Order not found for verification. It might have been deleted or never created." });
    }
    if (order.paymentId !== stripeSessionId) {
      console.error(`Mismatched Stripe Session ID. Expected: ${order.paymentId}, Received: ${stripeSessionId}`);
      return res.status(400).json({ success: false, message: "Mismatched Stripe session ID. Possible tampering or incorrect redirect." });
    }

    console.log("Order found for verification:", order._id);

    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
    console.log("Stripe Session retrieved. Payment Status:", session.payment_status);

    if (session.payment_status === "paid") {
      // 1. Mark order paid
      order.status = "paid";
      order.paymentDetails = {
        paymentId: session.payment_intent,
        paymentMethod: "stripe",
        paymentStatus: session.payment_status,
        paidAt: new Date(),
      };
      await order.save();
      console.log("Order marked as paid.");

      // 2. Update project status
      await Project.findByIdAndUpdate(order.projectId._id, {
        paymentStatus: "paid",
        status: "in-progress",
      });
      console.log("Project status updated to 'in-progress'.");

      // 3. Update related Inquiry status to 'accepted' or 'paid'
      if (order.inquiryId) {
          await Inquiry.findByIdAndUpdate(order.inquiryId, { status: "accepted" }); // Or 'paid' if you prefer
          console.log(`Inquiry ${order.inquiryId} marked as accepted.`);
      }


      // 4. Create or fetch chat
      let chat = await Chat.findOne({
        userId: order.projectId.userId,
        projectId: order.projectId._id,
      });

      if (!chat) {
        chat = await Chat.create({
          projectId: order.projectId._id,
          userId: order.projectId.userId,
          status: "active",
        });
        console.log("New chat created:", chat._id);
      } else {
        console.log("Existing chat found:", chat._id);
      }

      return res.json({
        success: true,
        message: "Payment verified successfully! Redirecting to your chat.",
        chatId: chat._id,
      });
      console.log("Payment verification successful response sent.");
    } else {
      console.log("Stripe payment status is not 'paid'. Current status:", session.payment_status);
      order.status = "failed";
      if (order.inquiryId) {
          await Inquiry.findByIdAndUpdate(order.inquiryId, { status: "payment-failed" }); // Keep same status
          console.log(`Inquiry ${order.inquiryId} marked as payment-failed.`);
      }
      await order.save();
      res.json({ success: false, message: `Payment is not yet paid. Current status: ${session.payment_status}. Please contact support if you believe this is an error.` });
    }
  } catch (error) {
    console.error("Critical Backend Error in verifyPayment:", error);
    res.status(500).json({ success: false, message: error.message || "An internal server error occurred during payment verification." });
  }
  console.log("-----------------------------------------");
};