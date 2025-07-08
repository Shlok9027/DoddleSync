import express from 'express';
import { createOrder, verifyPayment } from '../controllers/orderController.js';
import { auth } from '../middleware/auth.js';

const orderRouter = express.Router();

// 🛒 User creates and verifies order
orderRouter.post('/create', auth, createOrder);
orderRouter.post('/verify', auth, verifyPayment);

export default orderRouter;
