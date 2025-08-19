// server/src/controllers/productController.js
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const logger = require('../config/logger');

// @desc    Create a new product
// @route   POST /api/shop/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, stock, imageUrl } = req.body;

  if (!name || !description || !category || !price || !stock || !imageUrl) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }

  const product = await Product.create({
    name,
    description,
    category,
    price,
    stock,
    imageUrl,
  });

  if (product) {
    logger.info(`Product created: ${product.name}`);
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error('Invalid product data');
  }
});

// @desc    Get all products with pagination
// @route   GET /api/shop/products?page=<number>&limit=<number>
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const totalProducts = await Product.countDocuments({});

  const products = await Product.find({})
    .skip(skip)
    .limit(limit)
    .populate('category'); // Ensure the category is populated

  res.json({
    products,
    page,
    pages: Math.ceil(totalProducts / limit),
    totalProducts,
  });
});

// @desc    Get product by ID
// @route   GET /api/shop/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');

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
  const { name, description, category, price, stock, imageUrl } = req.body;

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.imageUrl = imageUrl || product.imageUrl;

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
    await product.deleteOne();
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