// server/src/validators/paymentValidator.js
const { body } = require('express-validator');
const mongoose = require('mongoose');

const paymentValidation = [
  body('order')
    .notEmpty()
    .withMessage('Order ID is required')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid Order ID format'),
  body('paymentGateway')
    .trim()
    .notEmpty()
    .withMessage('Payment gateway is required'),
  body('transactionId')
    .trim()
    .notEmpty()
    .withMessage('Transaction ID is required'),
  body('amount')
    .notEmpty()
    .withMessage('Payment amount is required')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a non-negative number'),
  body('currency')
    .trim()
    .notEmpty()
    .withMessage('Currency is required')
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-letter ISO code (e.g., USD, EUR)'),
  body('status')
    .optional()
    .isIn(['pending', 'completed', 'failed', 'refunded'])
    .withMessage('Invalid payment status.'),
  body('paidAt')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format for paidAt. Use ISO 8601.'),
];

module.exports = {
  paymentValidation,
};