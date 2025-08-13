// server/src/controllers/newsController.js
const asyncHandler = require('express-async-handler');
const NewsArticle = require('../models/NewsArticle');
const logger = require('../config/logger');

// @desc    Create a new news article
// @route   POST /api/news
// @access  Private/Admin
const createNewsArticle = asyncHandler(async (req, res) => {
  const { title, content, author, category, imageUrl, tags } = req.body;

  // Basic validation (more detailed validation is in newsArticleValidator)
  if (!title || !content || !author) {
    res.status(400);
    throw new Error('Please fill in all required news article fields: title, content, author');
  }

  const newsArticle = await NewsArticle.create({
    title,
    content,
    author,
    category,
    imageUrl,
    tags,
  });

  if (newsArticle) {
    logger.info(`News article created: "${newsArticle.title}" by ${newsArticle.author}`);
    res.status(201).json(newsArticle);
  } else {
    res.status(400);
    throw new Error('Invalid news article data');
  }
});

// @desc    Get all news articles
// @route   GET /api/news
// @access  Public
const getNewsArticles = asyncHandler(async (req, res) => {
  // You can add query parameters for filtering (e.g., by category, author, tags)
  const query = {};
  if (req.query.category) {
    query.category = req.query.category;
  }
  if (req.query.author) {
    query.author = req.query.author;
  }
  if (req.query.tag) {
    query.tags = { $in: [req.query.tag] };
  }

  const newsArticles = await NewsArticle.find(query);
  res.json(newsArticles);
});

// @desc    Get news article by ID
// @route   GET /api/news/:id
// @access  Public
const getNewsArticleById = asyncHandler(async (req, res) => {
  const newsArticle = await NewsArticle.findById(req.params.id);

  if (newsArticle) {
    res.json(newsArticle);
  } else {
    res.status(404);
    throw new Error('News article not found');
  }
});

// @desc    Update news article by ID
// @route   PUT /api/news/:id
// @access  Private/Admin
const updateNewsArticle = asyncHandler(async (req, res) => {
  const newsArticle = await NewsArticle.findById(req.params.id);

  if (newsArticle) {
    newsArticle.title = req.body.title || newsArticle.title;
    newsArticle.content = req.body.content || newsArticle.content;
    newsArticle.author = req.body.author || newsArticle.author;
    newsArticle.category = req.body.category || newsArticle.category;
    newsArticle.imageUrl = req.body.imageUrl || newsArticle.imageUrl;
    newsArticle.tags = req.body.tags || newsArticle.tags;

    const updatedNewsArticle = await newsArticle.save();

    logger.info(`News article updated: "${updatedNewsArticle.title}"`);
    res.json(updatedNewsArticle);
  } else {
    res.status(404);
    throw new Error('News article not found');
  }
});

// @desc    Delete news article by ID
// @route   DELETE /api/news/:id
// @access  Private/Admin
const deleteNewsArticle = asyncHandler(async (req, res) => {
  const newsArticle = await NewsArticle.findById(req.params.id);

  if (newsArticle) {
    await newsArticle.remove(); // Mongoose v5: newsArticle.remove(), Mongoose v6+: newsArticle.deleteOne()
    logger.info(`News article deleted: "${newsArticle.title}"`);
    res.json({ message: 'News article removed' });
  } else {
    res.status(404);
    throw new Error('News article not found');
  }
});

module.exports = {
  createNewsArticle,
  getNewsArticles,
  getNewsArticleById,
  updateNewsArticle,
  deleteNewsArticle,
};