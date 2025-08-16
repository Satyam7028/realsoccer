// server/src/routes/adminRoutes.js
const express = require('express');
const {
  getAdminDashboardStats,
  manageUsers,
  manageOrders,
  generateReports,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware'); 
const roleGuard = require('../middleware/roleGuard');

const router = express.Router();

// All routes here are for admin only
router.use(protect, roleGuard('admin'));

// Dashboard routes
router.route('/dashboard').get(getAdminDashboardStats);
router.route('/users/:id/role').put(manageUsers.updateUserRole);
router.route('/orders/:id/status').put(manageOrders.updateOrderStatus);

// Reporting routes
router.route('/reports/sales').get((req, res, next) => {
  req.params.type = 'sales';
  generateReports(req, res, next);
});
router.route('/reports/users').get((req, res, next) => {
  req.params.type = 'users';
  generateReports(req, res, next);
});
router.route('/reports/products-stock').get((req, res, next) => {
  req.params.type = 'products-stock';
  generateReports(req, res, next);
});

module.exports = router;