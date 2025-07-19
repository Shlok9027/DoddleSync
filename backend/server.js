import express from "express";
import cors from "cors";
import "dotenv/config";
import { createServer } from "http";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import errorHandler from "./middleware/errorHandler.js";
import initSocket from "./socket/chatSocket.js";

// Routers
import userRouter from "./routes/userRoute.js";
import packageRouter from "./routes/packageRouter.js";
import chatRouter from "./routes/chatsRoutes.js";
import inquiryRouter from "./routes/inquiryRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import projectRouter from "./routes/projectRoutes.js";


// App and HTTP server
const app = express();
const httpServer = createServer(app);
  
// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(
  cors({
    origin: [
      // process.env.CLIENT_URL, 
      "https://doddlesync.onrender.com",
      // process.env.ADMIN_URL,
      "https://doddlesyncatadmin.onrender.com"
    ],
    credentials: true,
  })
);

app.use(express.json());

// Initialize Socket.io
const io = initSocket(httpServer);

// Routes
app.use("/api/user", userRouter);
app.use("/api/package", packageRouter);
app.use("/api/chat", chatRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/api/order", orderRouter);
app.use("/api/project", projectRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("✅ API is working");
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4000; 
httpServer.listen(PORT,  () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
