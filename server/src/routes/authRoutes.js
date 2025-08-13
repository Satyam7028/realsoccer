// server/src/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { registerValidation, loginValidation } = require('../validators/userValidator'); // We will create this validator
const validateRequest = require('../middleware/validateRequest'); // Our custom validation middleware

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerValidation, validateRequest, registerUser);

// @desc    Authenticate a user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginValidation, validateRequest, loginUser);

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, getMe);

module.exports = router;