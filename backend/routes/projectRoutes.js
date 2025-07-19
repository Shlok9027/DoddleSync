import express from "express";
import { auth } from "../middleware/auth.js";
import Project from "../models/projectModel.js";
import Chat from "../models/chatModel.js";

const projectRouter = express.Router();

// ✅ Get current user project & chat info (only after payment success)
projectRouter.get("/status", auth, async (req, res) => {
  try {
    const project = await Project.findOne({ userId: req.userId })
      .populate({
        path: "userId",
        select: "name email phone profileImage"
      })
      .sort({ createdAt: -1 });

    if (!project) {
      return res.status(200).json({
        isAccepted: false,
        projectDetails: null,
        message: "No project found for this user."
      });
    }

    const isAccepted = ["in-progress", "completed"].includes(project.status);

    let chatId = null;
    if (isAccepted) {
      const chat = await Chat.findOne({ userId: req.userId, projectId: project._id });
      chatId = chat?._id || null;
    }

    return res.json({
      isAccepted,
      projectDetails: {
        id: project._id,
        name: project.name,
        description: project.description,
        status: project.status,
        chatId,
        user: {
          name: project.userId.name,
          email: project.userId.email,
          phone: project.userId.phone,
          profileImage: project.userId.profileImage,
        }
      },
      message: "Project status retrieved successfully."
    });
  } catch (error) {
    console.error("Error fetching project status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default projectRouter;
