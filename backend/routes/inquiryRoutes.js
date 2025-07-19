
import express from "express";
import Inquiry from "../models/inquiryModel.js";
import Client from "../models/clientsModel.js";
import Project from "../models/projectModel.js";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";
import { adminAuth, auth } from "../middleware/auth.js";

const inquiryRouter = express.Router();


inquiryRouter.post("/new", auth, async (req, res) => {
  try {
    const { name, email, phone, idea, description, selectedPackage } = req.body;

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      idea,
      description,
      selectedPackage,
      status: 'pending', // Default status for manual inquiries
    });

    res.json({ success: true, message: "Inquiry submitted successfully", inquiry });
  } catch (error) {
    console.error("Error saving inquiry:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 📋 Admin: List all inquiries
inquiryRouter.get("/list", adminAuth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}); // Fetch all inquiries regardless of status
    res.json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Accept Inquiry (Admin)
inquiryRouter.post("/accept", adminAuth, async (req, res) => {
  try {
    const { inquiryId, clientName, projectDetails } = req.body;

    // Retrieve the inquiry to get linked projectId if it exists
    const inquiry = await Inquiry.findById(inquiryId);
    if (!inquiry) {
        return res.status(404).json({ success: false, message: "Inquiry not found." });
    }

    let client = await Client.findOne({ email: projectDetails.contact.email });
    if (!client) {
      client = await Client.create({
        name: clientName,
        email: projectDetails.contact.email,
        phone: projectDetails.contact.phone,
      });
    }

    const user = await User.findOne({ email: projectDetails.contact.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Associated user not found." });
    }

    // Use existing project if linked from inquiry, otherwise create
    let project;
    if (inquiry.projectId) {
        project = await Project.findById(inquiry.projectId);
        if (!project) { // Fallback if linked project doesn't exist for some reason
            project = await Project.create({
                userId: user._id,
                name: projectDetails.idea,
                description: projectDetails.description,
                features: projectDetails.selectedPackage?.features || [], // Use features from inquiry's package
                package: inquiry.selectedPackage?._id, // Link to the package if available
            });
            inquiry.projectId = project._id; // Update inquiry with new project ID
            await inquiry.save();
        }
    } else {
        project = await Project.create({
            userId: user._id,
            name: projectDetails.idea,
            description: projectDetails.description,
            features: projectDetails.selectedPackage?.features || [],
            package: projectDetails.selectedPackage?._id,
        });
        inquiry.projectId = project._id; // Link inquiry to the newly created project
        await inquiry.save();
    }


    let chat = await Chat.findOne({ userId: user._id, projectId: project._id });
    if (!chat) {
      chat = await Chat.create({
        userId: user._id,
        projectId: project._id,
        status: "active",
      });
    }

    // Update the inquiry status to 'accepted'
    await Inquiry.findByIdAndUpdate(inquiryId, { status: "accepted" });

    res.json({
      success: true,
      message: "Inquiry accepted and project/chat initiated.",
      clientId: client._id,
      projectId: project._id,
      chatId: chat._id,
    });
  } catch (error) {
    console.error("Accept inquiry error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default inquiryRouter;