// server/src/routes/userRoutes.js
const express = require('express');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserProfile, // For users to update their own profile
} = require('../controllers/userController'); // We will create this controller
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const { userUpdateValidation } = require('../validators/userValidator'); // Add validation for user updates
const validateRequest = require('../middleware/validateRequest'); // Our custom validation middleware

const router = express.Router();

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, roleGuard('admin'), getUsers);

// @desc    Get user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
router.get('/:id', protect, roleGuard('admin'), getUserById);

// @desc    Update user by ID (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
router.put('/:id', protect, roleGuard('admin'), userUpdateValidation, validateRequest, updateUser);

// @desc    Delete user by ID (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', protect, roleGuard('admin'), deleteUser);

// @desc    Update authenticated user's profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, userUpdateValidation, validateRequest, updateUserProfile);


module.exports = router;