// server/src/services/newsPublisher.js
const NewsArticle = require('../models/NewsArticle');
const logger = require('../config/logger');

/**
 * Publishes a new news article.
 * @param {object} articleDetails - Object containing news article data.
 * @returns {object} - The created news article object.
 * @throws {Error} If invalid article data.
 */
const publishNewsArticle = async (articleDetails) => {
  const { title, content, author, category, imageUrl, tags } = articleDetails;

  const newsArticle = await NewsArticle.create({
    title,
    content,
    author,
    category,
    imageUrl,
    tags,
  });

  if (newsArticle) {
    logger.info(`NewsPublisher: Published new article - "${newsArticle.title}" by ${newsArticle.author}`);
    return newsArticle;
  } else {
    throw new Error('Invalid news article data provided');
  }
};

/**
 * Retrieves all news articles from the database.
 * @param {object} [filters={}] - Optional filters (e.g., { category: 'transfer news' }).
 * @returns {Array<object>} - An array of news article objects.
 */
const getAllNewsArticles = async (filters = {}) => {
  const newsArticles = await NewsArticle.find(filters);
  logger.info('NewsPublisher: Fetched all news articles.');
  return newsArticles;
};

/**
 * Retrieves a single news article by its ID.
 * @param {string} articleId - The ID of the news article to retrieve.
 * @returns {object} - The news article object.
 * @throws {Error} If news article not found.
 */
const getNewsArticleById = async (articleId) => {
  const newsArticle = await NewsArticle.findById(articleId);
  if (!newsArticle) {
    throw new Error('News article not found');
  }
  logger.info(`NewsPublisher: Fetched article by ID: ${articleId}`);
  return newsArticle;
};

/**
 * Updates a news article's information.
 * @param {string} articleId - The ID of the news article to update.
 * @param {object} updateData - An object containing fields to update.
 * @returns {object} - The updated news article object.
 * @throws {Error} If news article not found or invalid update data.
 */
const updateNewsArticle = async (articleId, updateData) => {
  const newsArticle = await NewsArticle.findById(articleId);

  if (!newsArticle) {
    throw new Error('News article not found');
  }

  // Update fields if provided
  newsArticle.title = updateData.title || newsArticle.title;
  newsArticle.content = updateData.content || newsArticle.content;
  newsArticle.author = updateData.author || newsArticle.author;
  newsArticle.category = updateData.category || newsArticle.category;
  newsArticle.imageUrl = updateData.imageUrl || newsArticle.imageUrl;
  newsArticle.tags = updateData.tags || newsArticle.tags;

  const updatedNewsArticle = await newsArticle.save();
  logger.info(`NewsPublisher: News article updated - "${updatedNewsArticle.title}"`);
  return updatedNewsArticle;
};

/**
 * Deletes a news article from the database.
 * @param {string} articleId - The ID of the news article to delete.
 * @returns {object} - A success message.
 * @throws {Error} If news article not found.
 */
const deleteNewsArticle = async (articleId) => {
  const newsArticle = await NewsArticle.findById(articleId);

  if (!newsArticle) {
    throw new Error('News article not found');
  }

  await newsArticle.remove(); // Mongoose v5: newsArticle.remove(), Mongoose v6+: newsArticle.deleteOne()
  logger.info(`NewsPublisher: News article deleted - "${newsArticle.title}"`);
  return { message: 'News article removed successfully' };
};

module.exports = {
  publishNewsArticle,
  getAllNewsArticles,
  getNewsArticleById,
  updateNewsArticle,
  deleteNewsArticle,
};