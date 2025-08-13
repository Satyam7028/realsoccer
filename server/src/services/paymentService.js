// server/src/services/paymentService.js
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const logger = require('../config/logger');

/**
 * Creates a new payment record.
 * @param {string} userId - The ID of the user associated with the payment.
 * @param {string} orderId - The ID of the order associated with the payment.
 * @param {string} paymentGateway - The payment gateway used (e.g., 'PayPal', 'Stripe').
 * @param {string} transactionId - The unique transaction ID from the payment gateway.
 * @param {number} amount - The amount of the payment.
 * @param {string} currency - The currency of the payment (e.g., 'USD').
 * @param {string} [status='pending'] - The status of the payment.
 * @param {Date} [paidAt=Date.now()] - The timestamp when the payment was made.
 * @returns {object} - The created payment object.
 * @throws {Error} If order not found or invalid payment data.
 */
const createPayment = async (userId, orderId, paymentGateway, transactionId, amount, currency, status = 'pending', paidAt = Date.now()) => {
  // Ensure the order exists
  const existingOrder = await Order.findById(orderId);
  if (!existingOrder) {
    throw new Error('Order not found for this payment.');
  }

  const payment = await Payment.create({
    user: userId,
    order: orderId,
    paymentGateway,
    transactionId,
    amount,
    currency,
    status,
    paidAt,
  });

  if (payment) {
    logger.info(`PaymentService: Payment created for order ${payment.order}: ${payment.transactionId}`);
    return payment;
  } else {
    throw new Error('Invalid payment data provided.');
  }
};

/**
 * Retrieves all payments from the database. (Admin access)
 * @returns {Array<object>} - An array of payment objects, populated with user and order details.
 */
const getAllPayments = async () => {
  const payments = await Payment.find({})
    .populate('user', 'id username email')
    .populate('order', 'totalPrice isPaid'); // Populate relevant order details
  logger.info('PaymentService: Fetched all payments.');
  return payments;
};

/**
 * Retrieves a single payment by its ID.
 * @param {string} paymentId - The ID of the payment to retrieve.
 * @returns {object} - The payment object, populated with user and order details.
 * @throws {Error} If payment not found.
 */
const getPaymentById = async (paymentId) => {
  const payment = await Payment.findById(paymentId)
    .populate('user', 'username email')
    .populate('order', 'totalPrice isPaid');
  if (!payment) {
    throw new Error('Payment not found');
  }
  logger.info(`PaymentService: Fetched payment by ID: ${paymentId}`);
  return payment;
};

/**
 * Updates a payment's status.
 * @param {string} paymentId - The ID of the payment to update.
 * @param {string} newStatus - The new status for the payment.
 * @returns {object} - The updated payment object.
 * @throws {Error} If payment not found or invalid status.
 */
const updatePaymentStatus = async (paymentId, newStatus) => {
  const payment = await Payment.findById(paymentId);

  if (!payment) {
    throw new Error('Payment not found');
  }

  if (!['pending', 'completed', 'failed', 'refunded'].includes(newStatus)) {
    throw new Error('Invalid new payment status.');
  }

  payment.status = newStatus;
  const updatedPayment = await payment.save();
  logger.info(`PaymentService: Payment ${updatedPayment._id} status updated to: ${updatedPayment.status}`);
  return updatedPayment;
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
};