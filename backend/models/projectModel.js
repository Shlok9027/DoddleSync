

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This refers to the User model
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
    description: {
      type: String,
      trim: true,
    },
    features: [String],
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentScreenshot: String,
    status: {
      type: String,
      enum: ["new", "in-progress", "completed"],
      default: "new",
    },
  },
  { timestamps: true }
);

const projectModel = mongoose.models.Project || mongoose.model("Project", projectSchema);
export default projectModel;
