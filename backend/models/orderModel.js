
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  packageDetails: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number },
    originalPrice: { type: Number },
    isCustom: { type: Boolean, default: false },
    minAdvance: { type: Number },
    features: [{ type: String }],
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
  },
  paymentDetails: {
    paymentId: { type: String },
    paymentMethod: { type: String },
    paymentStatus: { type: String },
    paidAt: { type: Date },
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
  // NEW FIELD: Reference to the Inquiry document
  inquiryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inquiry',
    // It's good to keep this optional in case an order is created without an initial inquiry
    // though in your current flow, it will always be present for payment-initiated orders.
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;