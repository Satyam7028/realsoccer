// server/src/validators/userValidator.js
const { body } = require('express-validator');

// Validation rules for user registration
const registerValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('confirmPassword') // Changed from 'passwordConfirm' to 'confirmPassword'
    .notEmpty()
    .withMessage('Password confirmation is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Invalid role specified. Must be "user" or "admin".'),
];

// Validation rules for user login
const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Validation rules for user updates (admin and profile updates)
const userUpdateValidation = [
  body('username')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Username cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Invalid role specified. Must be "user" or "admin".'),
  body('profileImage')
    .optional()
    .isURL()
    .withMessage('Profile image must be a valid URL'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

module.exports = {
  registerValidation,
  loginValidation,
  userUpdateValidation,
};
