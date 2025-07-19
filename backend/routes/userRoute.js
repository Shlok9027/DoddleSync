import express from "express";
import {
  loginUser,
  registerUser,
  adminUser,
  updateProfile,
  getCurrentUser, 
  verifyOtp,
  resendOtp, // Import the new function
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import { forgotPassword, resetpassword } from "../controllers/passwordController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin-login", adminUser);

userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/resend-otp", resendOtp); // New route for resending OTP

userRouter.get("/me", auth, getCurrentUser);
userRouter.put("/profile", auth, updateProfile);

userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetpassword);

export default userRouter;
