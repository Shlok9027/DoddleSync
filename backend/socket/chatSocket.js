import { Server } from "socket.io";

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: [
        process.env.CLIENT_URL || "http://localhost:5173",
        process.env.ADMIN_URL || "http://localhost:5174",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);

    // ✅ Join a specific chat room
    socket.on("join_chat", (chatId) => {
      if (!chatId) return;
      socket.join(String(chatId));
      console.log(`✅ Socket ${socket.id} joined chat room: ${chatId}`);
    });

    // ✅ Handle sending message
    socket.on("send_message", (data) => {
      const { chatId, sender, content } = data;
      if (!chatId || !sender || !content) return;

      console.log("📨 Message Sent:", {
        chatId,
        sender,
        content,
      });

      // Emit to all users in the room
      io.to(String(chatId)).emit("receive_message", data);
    });

    // 🔌 Handle disconnection
    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });

  return io;
}
