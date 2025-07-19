import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { chatId, sender, content } = req.body;

    if (!chatId || !sender || !content) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    const message = await Message.create({
      chatId,
      sender,
      content,
    });

    chat.lastMessage = content;
    await chat.save();

    res.json({ success: true, message });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📬 Get all messages for a chat
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
