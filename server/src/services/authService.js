// server/src/services/authService.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret, jwtExpiresIn } = require('../config/jwt');
const logger = require('../config/logger');

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
};

/**
 * Registers a new user.
 * @param {string} username - The user's chosen username.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password (will be hashed).
 * @param {string} [role='user'] - The user's role (e.g., 'user', 'admin').
 * @returns {object} - User data and JWT token.
 * @throws {Error} If user already exists or invalid data.
 */
const register = async (username, email, password, role = 'user') => {
  const userExists = await User.findOne({ $or: [{ email }, { username }] });

  if (userExists) {
    throw new Error('User with that email or username already exists');
  }

  const user = await User.create({
    username,
    email,
    password, // Password hashing handled by pre-save hook in User model
    role,
  });

  if (user) {
    logger.info(`AuthService: User registered - ${user.email}`);
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid user data provided for registration');
  }
};

/**
 * Authenticates a user and generates a JWT token.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's plain text password.
 * @returns {object} - User data and JWT token.
 * @throws {Error} If invalid credentials.
 */
const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    logger.info(`AuthService: User logged in - ${user.email}`);
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

/**
 * Retrieves user details by ID.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {object} - User data.
 * @throws {Error} If user not found.
 */
const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password'); // Exclude password

  if (user) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    };
  } else {
    throw new Error('User not found');
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
};