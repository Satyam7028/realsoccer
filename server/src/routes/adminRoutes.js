// server/src/routes/adminRoutes.js
const express = require('express');
const {
  getAdminDashboardStats,
  manageUsers, // Example: admin-specific user actions not covered by userRoutes
  // We will reuse controllers for player, league, fixture, news, product, order management
  // The routes below are examples of how admin-specific actions might be defined
  // or how existing controller functions are exposed under an admin prefix.
  manageOrders,
  generateReports,
} = require('../controllers/adminController'); // We will create this controller
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const validateRequest = require('../middleware/validateRequest'); // Our custom validation middleware
const { userUpdateValidation } = require('../validators/userValidator'); // For user role updates
const { orderStatusValidation } = require('../validators/orderValidator'); // For order status updates

const router = express.Router();

// All admin routes should be protected and only accessible by 'admin' role
router.use(protect, roleGuard('admin'));

// @desc    Get Admin Dashboard Statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
router.get('/dashboard', getAdminDashboardStats);

// --- User Management (Admin-specific actions) ---
// @desc    Admin: Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
router.put('/users/:id/role', userUpdateValidation, validateRequest, manageUsers.updateUserRole);

// --- Order Management ---
// @desc    Admin: Update order status (e.g., delivered)
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
router.put('/orders/:id/status', orderStatusValidation, validateRequest, manageOrders.updateOrderStatus);


// @desc    Generate Reports
// @route   GET /api/admin/reports/:type
// @access  Private/Admin
router.get('/reports/:type', generateReports);


module.exports = router;