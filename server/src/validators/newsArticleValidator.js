// server/src/validators/newsArticleValidator.js
const { body } = require('express-validator');

const newsArticleValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5 })
    .withMessage('Title must be at least 5 characters long'),
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters long'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required'),
  body('category')
    .optional()
    .isIn(['match report', 'transfer news', 'injury update', 'interview', 'general'])
    .withMessage('Invalid news category.'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings'),
  body('tags.*') // Validate each item in the tags array
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each tag must be a non-empty string'),
];

module.exports = {
  newsArticleValidation,
};