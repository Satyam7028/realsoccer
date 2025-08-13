// server/src/routes/newsRoutes.js
const express = require('express');
const {
  createNewsArticle,
  getNewsArticles,
  getNewsArticleById,
  updateNewsArticle,
  deleteNewsArticle,
} = require('../controllers/newsController'); // We will create this controller
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const { newsArticleValidation } = require('../validators/newsArticleValidator'); // We will create this validator
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @desc    Create a new news article
// @route   POST /api/news
// @access  Private/Admin
router.post('/', protect, roleGuard('admin'), newsArticleValidation, validateRequest, createNewsArticle);

// @desc    Get all news articles
// @route   GET /api/news
// @access  Public
router.get('/', getNewsArticles);

// @desc    Get news article by ID
// @route   GET /api/news/:id
// @access  Public
router.get('/:id', getNewsArticleById);

// @desc    Update news article by ID
// @route   PUT /api/news/:id
// @access  Private/Admin
router.put('/:id', protect, roleGuard('admin'), newsArticleValidation, validateRequest, updateNewsArticle);

// @desc    Delete news article by ID
// @route   DELETE /api/news/:id
// @access  Private/Admin
router.delete('/:id', protect, roleGuard('admin'), deleteNewsArticle);

module.exports = router;