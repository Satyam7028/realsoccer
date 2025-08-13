// server/src/controllers/paymentController.js
const asyncHandler = require('express-async-handler');
const Payment = require('../models/Payment');
const Order = require('../models/Order'); // To link payment to an order
const logger = require('../config/logger');

// @desc    Create a new payment
// @route   POST /api/payments
// @access  Private (usually internal or from payment gateway)
const createPayment = asyncHandler(async (req, res) => {
  const { order, paymentGateway, transactionId, amount, currency, status, paidAt } = req.body;

  // Basic validation (more detailed validation is in paymentValidator)
  if (!order || !paymentGateway || !transactionId || !amount || !currency) {
    res.status(400);
    throw new Error('Please fill in all required payment fields: order, paymentGateway, transactionId, amount, currency');
  }

  // Check if the order exists and is associated with the current user (if user-initiated)
  const existingOrder = await Order.findById(order);
  if (!existingOrder) {
    res.status(404);
    throw new Error('Order not found for this payment');
  }
  // Optional: Add logic to ensure the order belongs to req.user if this is a user-initiated payment creation

  const payment = await Payment.create({
    user: req.user._id, // User ID from protect middleware
    order,
    paymentGateway,
    transactionId,
    amount,
    currency,
    status: status || 'pending',
    paidAt: paidAt || Date.now(),
  });

  if (payment) {
    logger.info(`Payment created for order ${payment.order}: ${payment.transactionId}`);
    res.status(201).json(payment);
  } else {
    res.status(400);
    throw new Error('Invalid payment data');
  }
});

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private/Admin
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({}).populate('user', 'id username email').populate('order');
  res.json(payments);
});

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private (Admin only, or user if it's their payment)
const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id)
    .populate('user', 'username email')
    .populate('order');

  if (payment) {
    // Allow user to view their own payment, or admin to view any
    if (payment.user._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
      res.json(payment);
    } else {
      res.status(403);
      throw new Error('Not authorized to view this payment');
    }
  } else {
    res.status(404);
    throw new Error('Payment not found');
  }
});

// @desc    Update payment status
// @route   PUT /api/payments/:id/status
// @access  Private/Admin
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  const { status } = req.body;

  if (payment) {
    payment.status = status || payment.status;
    // You might want to add logic here to update order status based on payment status
    // For example, if status is 'completed', set order.isPaid = true

    const updatedPayment = await payment.save();
    logger.info(`Payment ${updatedPayment._id} status updated to: ${updatedPayment.status}`);
    res.json(updatedPayment);
  } else {
    res.status(404);
    throw new Error('Payment not found');
  }
});

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  updatePaymentStatus,
};