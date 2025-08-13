// server/src/controllers/productController.js
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const logger = require('../config/logger');

// @desc    Create a new product
// @route   POST /api/shop/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, brand, imageUrl, stock } = req.body;

  // Basic validation (more detailed validation is in productValidator)
  if (!name || !description || !price || !category || !stock) {
    res.status(400);
    throw new Error('Please fill in all required product fields: name, description, price, category, stock');
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    brand,
    imageUrl,
    stock,
  });

  if (product) {
    logger.info(`Product created: ${product.name}`);
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error('Invalid product data');
  }
});

// @desc    Get all products
// @route   GET /api/shop/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Get product by ID
// @route   GET /api/shop/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update product by ID
// @route   PUT /api/shop/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.imageUrl = req.body.imageUrl || product.imageUrl;
    product.stock = req.body.stock || product.stock;
    product.rating = req.body.rating || product.rating;
    product.numReviews = req.body.numReviews || product.numReviews;

    const updatedProduct = await product.save();

    logger.info(`Product updated: ${updatedProduct.name}`);
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete product by ID
// @route   DELETE /api/shop/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove(); // Mongoose v5: product.remove(), Mongoose v6+: product.deleteOne()
    logger.info(`Product deleted: ${product.name}`);
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};