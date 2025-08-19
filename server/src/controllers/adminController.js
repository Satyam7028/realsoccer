// server/src/controllers/adminController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Fixture = require('../models/Fixture');
const NewsArticle = require('../models/NewsArticle');
const League = require('../models/League');
const logger = require('../config/logger');

// @desc    Get Admin Dashboard Statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getAdminDashboardStats = asyncHandler(async (req, res) => {
  const usersCount = await User.countDocuments({});
  const ordersCount = await Order.countDocuments({});
  const productsCount = await Product.countDocuments({});
  const fixturesCount = await Fixture.countDocuments({});
  const newsArticlesCount = await NewsArticle.countDocuments({});
  const leaguesCount = await League.countDocuments({});

  const recentOrders = await Order.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'username email')
    .populate('orderItems.product', 'name');

  res.json({
    usersCount,
    ordersCount,
    productsCount,
    fixturesCount,
    newsArticlesCount,
    leaguesCount,
    recentOrders,
  });
});

// @desc    Admin: Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { role } = req.body;

  if (user) {
    if (role && ['user', 'admin'].includes(role)) {
      user.role = role;
      const updatedUser = await user.save();
      logger.info(`Admin updated user ${updatedUser.email} role to ${updatedUser.role}`);
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(400);
      throw new Error('Invalid role specified. Must be "user" or "admin".');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Admin: Update order status (e.g., delivered)
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { status } = req.body;

  if (order) {
    if (!['processing', 'shipped', 'delivered', 'cancelled', 'refunded'].includes(status)) {
      res.status(400);
      throw new Error('Invalid order status provided.');
    }

    order.status = status;
    if (status === 'delivered' && !order.deliveredAt) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    logger.info(`Admin updated order ${updatedOrder._id} status to ${updatedOrder.status}`);
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Generate various reports
// @route   GET /api/admin/reports/:type
// @access  Private/Admin
const generateReports = asyncHandler(async (req, res) => {
  const { type } = req.params;

  let reportData;
  switch (type) {
    case 'sales':
      reportData = await Order.aggregate([
        { $match: { isPaid: true } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$paidAt' } },
            totalSales: { $sum: '$totalPrice' },
            totalOrders: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      break;
    case 'users':
      reportData = await User.aggregate([
        {
          $group: {
            _id: '$role',
            count: { $sum: 1 },
          },
        },
      ]);
      break;
    case 'products-stock':
      reportData = await Product.find({ stock: { $lte: 10 } }).select('name stock');
      break;
    default:
      res.status(400);
      throw new Error('Invalid report type specified');
  }

  logger.info(`Admin generated report: ${type}`);
  res.json({ reportType: type, data: reportData });
});

module.exports = {
  getAdminDashboardStats,
  updateUserRole,
  updateOrderStatus,
  generateReports,
};