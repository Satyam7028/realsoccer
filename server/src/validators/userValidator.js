// server/src/validators/userValidator.js
const { body } = require('express-validator');

const registerValidation = [
  body('username').notEmpty().withMessage('Username is required').trim().escape(),
  body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

const profileUpdateValidation = [
  body('username').optional().notEmpty().withMessage('Username cannot be empty').trim().escape(),
  body('email').optional().isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = {
  registerValidation,
  loginValidation,
  profileUpdateValidation,
};