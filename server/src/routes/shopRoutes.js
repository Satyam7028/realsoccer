// server/src/routes/shopRoutes.js
const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController'); // We will create this controller
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const { productValidation } = require('../validators/productValidator'); // We will create this validator
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @desc    Create a new product
// @route   POST /api/shop/products
// @access  Private/Admin
router.post('/products', protect, roleGuard('admin'), productValidation, validateRequest, createProduct);

// @desc    Get all products
// @route   GET /api/shop/products
// @access  Public
router.get('/products', getProducts);

// @desc    Get product by ID
// @route   GET /api/shop/products/:id
// @access  Public
router.get('/products/:id', getProductById);

// @desc    Update product by ID
// @route   PUT /api/shop/products/:id
// @access  Private/Admin
router.put('/products/:id', protect, roleGuard('admin'), productValidation, validateRequest, updateProduct);

// @desc    Delete product by ID
// @route   DELETE /api/shop/products/:id
// @access  Private/Admin
router.delete('/products/:id', protect, roleGuard('admin'), deleteProduct);

module.exports = router;