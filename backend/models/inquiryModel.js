

import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: { // This field remains consistent as 'phone'
      type: String,
      required: true,
      trim: true,
    },
    idea: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    selectedPackage: {
      name: String,
      price: Number,
      isCustom: Boolean,
      minAdvance: Number,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);
