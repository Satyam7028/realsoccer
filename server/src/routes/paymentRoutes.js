// server/src/routes/paymentRoutes.js
const express = require('express');
const {
  processPayment, // Corrected from createPayment
  getPayments,
  getPaymentById,
  updatePaymentStatus,
} = require('../controllers/paymentController'); // Updated this import statement
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const { paymentValidation } = require('../validators/paymentValidator');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @desc    Process a payment for an order
// @route   POST /api/payments
// @access  Private (usually internal or from payment gateway)
router.post('/', protect, paymentValidation, validateRequest, processPayment); // Corrected function call

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