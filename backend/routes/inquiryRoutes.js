

import express from "express";
import Inquiry from "../models/inquiryModel.js";
import Client from "../models/clientsModel.js";
import Project from "../models/projectModel.js";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js"; // Import the User model
import { adminAuth, auth } from "../middleware/auth.js";

const inquiryRouter = express.Router();

// 📩 Save Inquiry (authenticated users only)
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
    });

    res.json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 📋 Admin: List all inquiries
inquiryRouter.get("/list", adminAuth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({});
    res.json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Accept Inquiry (convert to client/project/chat if not already done)
inquiryRouter.post("/accept", adminAuth, async (req, res) => {
  try {
    const { inquiryId, clientName, projectDetails } = req.body;

    // Step 1: Check for existing client (for legacy or external client tracking)
    // Note: The primary link for Chat and Project will now be to the User model.
    let client = await Client.findOne({ email: projectDetails.contact.email });
    if (!client) {
      client = await Client.create({
        name: clientName,
        email: projectDetails.contact.email,
        phone: projectDetails.contact.phone,
      });
    }

    // Step 2: Find the actual User associated with the inquiry's email
    const user = await User.findOne({ email: projectDetails.contact.email });
    if (!user) {
        return res.status(404).json({ success: false, message: "Associated user not found. Ensure user exists before accepting inquiry." });
    }


    // Step 3: Check for existing project linked to the User
    let project = await Project.findOne({
      userId: user._id, // Link to User ID
      name: projectDetails.idea, // Assuming project name is unique enough for this user
    });

    if (!project) {
      project = await Project.create({
        userId: user._id, // Link to User ID
        name: projectDetails.idea,
        description: projectDetails.description,
        features: [], // Populate features as needed, or from inquiry
      });
    }

    // Step 4: Check for existing chat linked to the User and Project
    let chat = await Chat.findOne({
      userId: user._id, // Link to User ID
      projectId: project._id,
    });

    if (!chat) {
      chat = await Chat.create({
        userId: user._id, // Link to User ID
        projectId: project._id,
        status: "active", // Default status, can be adjusted
      });
    }

    // Step 5: Mark inquiry as accepted
    await Inquiry.findByIdAndUpdate(inquiryId, { status: "accepted" });

    res.json({
      success: true,
      message: "Inquiry accepted and project/chat initiated.",
      clientId: client._id, // Keep for backward compatibility if needed elsewhere
      projectId: project._id,
      chatId: chat._id,
    });
  } catch (error) {
    console.error("Accept inquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to accept inquiry: " + error.message,
    });
  }
});

export default inquiryRouter;
