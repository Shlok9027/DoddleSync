import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      default: null,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    isUserCustom: {
      type: Boolean,
      default: false,
    },
    minAdvance: {
      type: Number,
      default: null,
    },
    features: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },
  },
  { timestamps: true }
);

const packageModel = mongoose.models.Package || mongoose.model("Package", packageSchema);
export default packageModel;
