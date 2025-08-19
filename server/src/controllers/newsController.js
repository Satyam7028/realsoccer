// server/src/controllers/newsController.js
const asyncHandler = require('express-async-handler');
const NewsArticle = require('../models/NewsArticle');
const logger = require('../config/logger');

// @desc    Create a new news article
// @route   POST /api/news
// @access  Private/Admin
const createNewsArticle = asyncHandler(async (req, res) => {
  const { title, content, author, category, imageUrl, sourceUrl } = req.body;

  if (!title || !content || !author || !category) {
    res.status(400);
    throw new Error('Please enter all required fields for a new news article');
  }

  const newsArticle = await NewsArticle.create({
    title,
    content,
    author,
    category,
    imageUrl,
    sourceUrl,
  });

  res.status(201).json(newsArticle);
});

// @desc    Get all news articles with pagination
// @route   GET /api/news?page=<number>&limit=<number>
// @access  Public
const getNewsArticles = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const totalNewsArticles = await NewsArticle.countDocuments({});

  const newsArticles = await NewsArticle.find({})
    .skip(skip)
    .limit(limit);

  res.json({
    newsArticles,
    page,
    pages: Math.ceil(totalNewsArticles / limit),
    totalNewsArticles,
  });
});

// @desc    Get a single news article by ID
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

// @desc    Update a news article by ID
// @route   PUT /api/news/:id
// @access  Private/Admin
const updateNewsArticle = asyncHandler(async (req, res) => {
  const newsArticle = await NewsArticle.findById(req.params.id);
  const { title, content, author, category, imageUrl, sourceUrl } = req.body;

  if (newsArticle) {
    newsArticle.title = title || newsArticle.title;
    newsArticle.content = content || newsArticle.content;
    newsArticle.author = author || newsArticle.author;
    newsArticle.category = category || newsArticle.category;
    newsArticle.imageUrl = imageUrl || newsArticle.imageUrl;
    newsArticle.sourceUrl = sourceUrl || newsArticle.sourceUrl;

    const updatedNewsArticle = await newsArticle.save();
    res.json(updatedNewsArticle);
  } else {
    res.status(404);
    throw new Error('News article not found');
  }
});

// @desc    Delete a news article by ID
// @route   DELETE /api/news/:id
// @access  Private/Admin
const deleteNewsArticle = asyncHandler(async (req, res) => {
  const newsArticle = await NewsArticle.findById(req.params.id);

  if (newsArticle) {
    await newsArticle.deleteOne();
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