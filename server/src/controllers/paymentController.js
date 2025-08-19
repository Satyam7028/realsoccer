// server/src/controllers/paymentController.js
const asyncHandler = require('express-async-handler');
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const logger = require('../config/logger');

// @desc    Process a payment for an order
// @route   POST /api/payments/process
// @access  Private
const processPayment = asyncHandler(async (req, res) => {
  const { orderId, paymentMethod, paymentResult } = req.body;

  const order = await Order.findById(orderId).populate('user', 'email username');
  
  if (order) {
    // Check if the order is already paid
    if (order.isPaid) {
      res.status(400);
      throw new Error('Order is already paid');
    }

    // Create a new payment record
    const payment = await Payment.create({
      user: order.user._id,
      order: order._id,
      paymentMethod,
      paymentResult, // This would typically come from the payment gateway (e.g., Stripe's response)
      amount: order.totalPrice,
    });

    // Update the order status
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = payment._id;

    const updatedOrder = await order.save();
    
    logger.info(`Payment processed for order: ${order._id}`);
    
    res.json({
      success: true,
      order: updatedOrder,
      payment,
    });

  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get payment details for a specific order
// @route   GET /api/payments/:orderId
// @access  Private
const getPaymentDetails = asyncHandler(async (req, res) => {
  const payment = await Payment.findOne({ order: req.params.orderId })
    .populate('user', 'username email')
    .populate('order');

  if (payment) {
    // Ensure the user is authorized to view this payment
    if (payment.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to view this payment');
    }

    res.json(payment);
  } else {
    res.status(404);
    throw new Error('Payment not found for this order');
  }
});

module.exports = {
  processPayment,
  getPaymentDetails,
};