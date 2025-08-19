// server/src/routes/newsRoutes.js
const express = require('express');
const {
  createNewsArticle,
  getNewsArticles,
  getNewsArticleById,
  updateNewsArticle,
  deleteNewsArticle,
} = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const { newsArticleValidator } = require('../validators/newsArticleValidator');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @desc    Create a new news article
// @route   POST /api/news
// @access  Private/Admin
router.post('/', protect, roleGuard('admin'), newsArticleValidator, validateRequest, createNewsArticle);

// @desc    Get all news articles
// @route   GET /api/news
// @access  Public
router.get('/', getNewsArticles);

// @desc    Get a single news article by ID
// @route   GET /api/news/:id
// @access  Public
router.get('/:id', getNewsArticleById);

// @desc    Update a news article by ID
// @route   PUT /api/news/:id
// @access  Private/Admin
router.put('/:id', protect, roleGuard('admin'), newsArticleValidator, validateRequest, updateNewsArticle);

// @desc    Delete a news article by ID
// @route   DELETE /api/news/:id
// @access  Private/Admin
router.delete('/:id', protect, roleGuard('admin'), deleteNewsArticle);

module.exports = router;