// server/src/validators/productValidator.js
const { body } = require('express-validator');

const productValidator = [
  body('name').notEmpty().withMessage('Product name is required').trim().escape(),
  body('description').notEmpty().withMessage('Description is required').trim().escape(),
  body('category').isMongoId().withMessage('Invalid category ID'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('stock').isInt({ gt: 0 }).withMessage('Stock must be a positive integer'),
  body('imageUrl').optional().isURL().withMessage('Invalid image URL'),
];

module.exports = {
  productValidator,
};