import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTPEmail } from "../utils/emailService.js";

// 🔐 Generate JWT Token
const createToken = (id, role = "user") => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// ✅ User Registration with Email OTP
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      if (!exists.isVerified) {
        return res.status(400).json({
          success: false,
          message: "User already exists but not verified. Proceed to OTP verification.",
          userId: exists._id, // Send userId for direct OTP verification
        });
      }
      return res.status(400).json({ success: false, message: "User already exists and is verified." });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Create user with OTP (unverified)
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone: "", // default empty phone
      verificationOTP: otp,
      verificationOTPExpires: otpExpires, // Store expiration time
      isVerified: false,
    });

    // Send OTP to user's email
    await sendOTPEmail(email, otp);

    // Return success with userId for client-side OTP verification
    res.json({
      success: true,
      userId: user._id,
      message: "OTP sent to your email",
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Verify Email OTP
export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Email already verified" });
    }

    // Check if OTP has expired
    if (!user.verificationOTPExpires || user.verificationOTPExpires < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one." });
    }

    if (user.verificationOTP !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.verificationOTP = undefined; // Clear OTP
    user.verificationOTPExpires = undefined; // Clear OTP expiration
    await user.save();

    // Generate token for the newly verified user
    const token = createToken(user._id, user.role); // Assuming user.role is 'user' by default
    res.json({ success: true, message: "Email verified successfully. You are now logged in.", token }); // Send token

  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Resend Email OTP
export const resendOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Email already verified. No need to resend OTP." });
    }

    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const newOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // New OTP valid for 10 minutes

    user.verificationOTP = newOtp;
    user.verificationOTPExpires = newOtpExpires;
    await user.save();

    await sendOTPEmail(user.email, newOtp);

    res.json({ success: true, message: "New OTP sent to your email" });
  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ Login User (only if email is verified)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ success: false, message: "Email not verified. Please verify your email to log in.", userId: user._id });
    }

    const token = createToken(user._id);
    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Admin Login
const adminUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ success: true, message: "Admin login successful", token });
    } else {
      res.status(401).json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Profile
const updateProfile = async (req, res) => {
  try {
    const { name, profileImage, phone } = req.body;

    const updateData = {
      ...(name !== undefined && { name }),
      ...(profileImage !== undefined && { profileImage }),
      ...(phone !== undefined && { phone }),
    };

    const user = await userModel.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get Current Logged-In User
const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password -__v");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Get current user error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export {
  loginUser,
  registerUser,
  // verifyOtp,
  // resendOtp,
  adminUser,
  updateProfile,
  getCurrentUser,
};