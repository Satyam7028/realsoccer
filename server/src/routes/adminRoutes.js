// server/src/routes/adminRoutes.js
const express = require('express');
const {
  getAdminDashboardStats,
  updateUserRole,
  updateOrderStatus,
  generateReports,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware'); 
const roleGuard = require('../middleware/roleGuard');

const router = express.Router();

// All routes here are for admin only
router.use(protect, roleGuard('admin'));

// Dashboard routes
router.route('/dashboard').get(getAdminDashboardStats);

// User and Order management routes
router.route('/users/:id/role').put(updateUserRole);
router.route('/orders/:id/status').put(updateOrderStatus);

// Reporting routes: one clean route with a type parameter
router.route('/reports/:type').get(generateReports);

module.exports = router;