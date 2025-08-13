// server/src/validators/productValidator.js
const { body } = require('express-validator');

const productValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 3 })
    .withMessage('Product name must be at least 3 characters long'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 10 })
    .withMessage('Product description must be at least 10 characters long'),
  body('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Product category is required')
    .isIn(['jersey', 'ball', 'boots', 'accessories', 'fan gear', 'training'])
    .withMessage('Invalid product category.'),
  body('brand')
    .optional()
    .trim(),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  body('stock')
    .notEmpty()
    .withMessage('Stock quantity is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  body('numReviews')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Number of reviews must be a non-negative integer'),
];

module.exports = {
  productValidation,
};