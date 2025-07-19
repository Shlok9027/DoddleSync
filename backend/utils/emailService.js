import nodemailer from "nodemailer";

export const sendOTPEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"DoddleSync" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify Your Email - DoddleSync",
    html: `<p>Your OTP is: <b>${otp}</b></p>`,
  };

  await transporter.sendMail(mailOptions);
};
