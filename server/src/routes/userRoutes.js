// server/src/routes/userRoutes.js
const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { profileUpdateValidation } = require('../validators/userValidator');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, profileUpdateValidation, validateRequest, updateUserProfile);

module.exports = router;