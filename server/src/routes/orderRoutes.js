// server/src/routes/orderRoutes.js
const express = require('express');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderToPaid, // For payment gateway callbacks
  updateOrderToDelivered, // For admin to mark as delivered
  getUserOrders, // For a user to view their own orders
} = require('../controllers/orderController'); // We will create this controller
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const { orderValidation } = require('../validators/orderValidator'); // We will create this validator
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, orderValidation, validateRequest, createOrder);

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', protect, roleGuard('admin'), getOrders);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (User can get their own, Admin can get any)
router.get('/:id', protect, getOrderById);

// @desc    Update order to paid (payment gateway callback)
// @route   PUT /api/orders/:id/pay
// @access  Private
router.put('/:id/pay', protect, updateOrderToPaid);

// @desc    Update order to delivered (Admin only)
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
router.put('/:id/deliver', protect, roleGuard('admin'), updateOrderToDelivered);

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protect, getUserOrders);

module.exports = router;