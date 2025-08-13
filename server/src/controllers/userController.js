// server/src/controllers/userController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const logger = require('../config/logger');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password'); // Exclude passwords
  res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user by ID (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.profileImage = req.body.profileImage || user.profileImage;

    // If password is provided, hash it
    if (req.body.password) {
      user.password = req.body.password; // Pre-save hook in User model will hash it
    }

    const updatedUser = await user.save();

    logger.info(`User updated by admin: ${updatedUser.email}`);
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user by ID (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove(); // Mongoose v5: user.remove(), Mongoose v6+: user.deleteOne()
    logger.info(`User deleted: ${user.email}`);
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update authenticated user's profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // req.user is set by protect middleware

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.profileImage = req.body.profileImage || user.profileImage;

    // If password is provided, hash it
    if (req.body.password) {
      user.password = req.body.password; // Pre-save hook in User model will hash it
    }

    const updatedUser = await user.save();

    logger.info(`User profile updated: ${updatedUser.email}`);
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role, // Role should not be changeable by user via this route
      profileImage: updatedUser.profileImage,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserProfile,
};