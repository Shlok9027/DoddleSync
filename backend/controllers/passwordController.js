import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("📨 Forgot password request for:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Use process.env.CLIENT_URL to construct the reset link
    const resetLink = `${"https://doddlesync.onrender.com"}/reset-password/${token}`; // <-- Corrected
    console.log("🔗 Reset link:", resetLink);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Reset your password",
      html: `
        <h2>Hello ${user.name || "user"},</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    console.log("✅ Email sent to:", user.email);
    return res.json({ success: true, message: "Reset link sent" });
  } catch (err) {
    console.error("❌ Forgot Password Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const resetpassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password; // Hashing handled by pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Reset failed",
      error: error.message,
    });
  }
};
