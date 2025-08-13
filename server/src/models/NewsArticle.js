// server/src/models/NewsArticle.js
const mongoose = require('mongoose');

const newsArticleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a news article title'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please add content for the news article'],
    },
    author: {
      type: String, // Could be a reference to a User model if authors are users
      required: [true, 'Please add the author of the article'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['match report', 'transfer news', 'injury update', 'interview', 'general'],
      default: 'general',
    },
    imageUrl: {
      type: String,
      default: 'https://placehold.co/600x400/cccccc/333333?text=News+Article', // Placeholder image
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    // You could add a 'publishedAt' field if different from 'createdAt'
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);

module.exports = NewsArticle;