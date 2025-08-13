// server/src/routes/paymentRoutes.js
const express = require('express');
const {
  createPayment,
  getPayments,
  getPaymentById,
  updatePaymentStatus, // For updating payment status (e.g., from pending to completed)
} = require('../controllers/paymentController'); // We will create this controller
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const { paymentValidation } = require('../validators/paymentValidator'); // We will create this validator
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @desc    Create a new payment (typically called by order completion or webhook)
// @route   POST /api/payments
// @access  Private (usually internal or from payment gateway)
router.post('/', protect, paymentValidation, validateRequest, createPayment);

// @desc    Get all payments (Admin only)
// @route   GET /api/payments
// @access  Private/Admin
router.get('/', protect, roleGuard('admin'), getPayments);

// @desc    Get payment by ID (Admin only, or user if it's their payment)
// @route   GET /api/payments/:id
// @access  Private
router.get('/:id', protect, getPaymentById);

// @desc    Update payment status (Admin or webhook)
// @route   PUT /api/payments/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, roleGuard('admin'), updatePaymentStatus);

module.exports = router;