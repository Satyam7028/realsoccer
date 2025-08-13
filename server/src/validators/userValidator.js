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
  // Optional: Add password confirmation check if needed
  // body('passwordConfirm').custom((value, { req }) => {
  //   if (value !== req.body.password) {
  //     throw new Error('Password confirmation does not match password');
  //   }
  //   return true;
  // }),
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

module.exports = {
  registerValidation,
  loginValidation,
};
