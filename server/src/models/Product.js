// server/src/models/Product.js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a product description'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a product price'],
      min: 0,
    },
    category: {
      type: String,
      enum: ['jersey', 'ball', 'boots', 'accessories', 'fan gear', 'training'],
      required: [true, 'Please specify a product category'],
    },
    brand: {
      type: String,
      required: false,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: 'https://placehold.co/400x400/cccccc/333333?text=Product', // Placeholder image
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock quantity'],
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    // You could add an array of reviews if needed, or link to a separate Review model
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;