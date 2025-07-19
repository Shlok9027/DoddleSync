

import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  idea: { type: String, required: true },
  description: { type: String },
  selectedPackage: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number },
    originalPrice: { type: Number }, // For custom packages
    isCustom: { type: Boolean, default: false },
    minAdvance: { type: Number }, // For custom advance payments
    features: [{ type: String }],
  },
  // Updated status field with new enums
  status: {
    type: String,
    enum: ['pending', 'pending-payment', 'accepted', 'rejected', 'payment-failed'],
    default: 'pending',
  },
  // NEW FIELD: Link to the associated Project
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    // This could be optional if an inquiry doesn't immediately lead to a project
    // but in your payment flow, it will always be created together.
  },
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
