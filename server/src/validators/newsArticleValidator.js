// server/src/validators/newsArticleValidator.js
const { body } = require('express-validator');

const newsArticleValidator = [
  body('title').notEmpty().withMessage('Title is required').trim().escape(),
  body('content').notEmpty().withMessage('Content is required').trim().escape(),
  body('author').notEmpty().withMessage('Author is required').trim().escape(),
  body('category').notEmpty().withMessage('Category is required').trim().escape(),
  body('imageUrl').optional().isURL().withMessage('Invalid image URL'),
  body('sourceUrl').optional().isURL().withMessage('Invalid source URL'),
];

module.exports = {
  newsArticleValidator,
};