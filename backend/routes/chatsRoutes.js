
import express from "express";
import Chat from "../models/chatModel.js";
import { adminAuth, auth } from "../middleware/auth.js";
import { sendMessage, getMessages } from "../controllers/chatController.js";

const chatRouter = express.Router();

// 📨 Send Messages
chatRouter.post("/send", auth, sendMessage);         // User → Admin
chatRouter.post("/send/admin", adminAuth, sendMessage); // Admin → User

// 📥 Get Messages
chatRouter.get("/message/:chatId", auth, getMessages);        // User View
chatRouter.get("/message/:chatId/admin", adminAuth, getMessages); // Admin View

// 📋 Admin: List valid chats (only with registered users)
chatRouter.get("/list", adminAuth, async (req, res) => {
  try {
    const chats = await Chat.find({})
      .populate({
        path: "userId",
        select: "name email phone profileImage" // Ensure 'phone' is selected
      })
      .populate({
        path: "projectId",
        populate: {
          path: "package",
          select: "name price minAdvance"
        }
      });

    const clients = chats
      .filter(chat => chat.userId && chat.userId.email && chat.userId.name)
      .map(chat => {
        const user = chat.userId;
        const project = chat.projectId;

        return {
          chatId: chat._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage || "",

          project: project?.name || "Unknown Project",
          package: project?.package?.name || "Custom Package",

          lastMessage: chat.lastMessage || "",
          timestamp: chat.updatedAt,

          unread: 0, // Placeholder for future unread message tracking

          projectDetails: {
            paymentStatus: project?.paymentStatus || "pending",
            submittedAt: chat.createdAt,
            contact: {
              email: user.email,
              phone: user.phone || "Not Provided" // Ensure user.phone is used here
            },
            price:
              project?.package?.price ||
              project?.package?.minAdvance ||
              0
          }
        };
      });

    res.json({ success: true, clients });
  } catch (error) {
    console.error("Chat list error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default chatRouter;