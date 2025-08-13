// server/src/services/productService.js
const Product = require('../models/Product');
const logger = require('../config/logger');

/**
 * Creates a new product.
 * @param {object} productDetails - Object containing product data.
 * @returns {object} - The created product object.
 * @throws {Error} If invalid product data.
 */
const createProduct = async (productDetails) => {
  const { name, description, price, category, brand, imageUrl, stock } = productDetails;

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
    logger.info(`ProductService: Product created - ${product.name}`);
    return product;
  } else {
    throw new Error('Invalid product data provided');
  }
};

/**
 * Retrieves all products from the database.
 * @param {object} [filters={}] - Optional filters (e.g., { category: 'jersey' }).
 * @returns {Array<object>} - An array of product objects.
 */
const getAllProducts = async (filters = {}) => {
  const products = await Product.find(filters);
  logger.info('ProductService: Fetched all products.');
  return products;
};

/**
 * Retrieves a single product by its ID.
 * @param {string} productId - The ID of the product to retrieve.
 * @returns {object} - The product object.
 * @throws {Error} If product not found.
 */
const getProductById = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  logger.info(`ProductService: Fetched product by ID: ${productId}`);
  return product;
};

/**
 * Updates a product's information.
 * @param {string} productId - The ID of the product to update.
 * @param {object} updateData - An object containing fields to update.
 * @returns {object} - The updated product object.
 * @throws {Error} If product not found or invalid update data.
 */
const updateProduct = async (productId, updateData) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  // Update fields if provided
  product.name = updateData.name || product.name;
  product.description = updateData.description || product.description;
  product.price = updateData.price || product.price;
  product.category = updateData.category || product.category;
  product.brand = updateData.brand || product.brand;
  product.imageUrl = updateData.imageUrl || product.imageUrl;
  product.stock = updateData.stock || product.stock;
  product.rating = updateData.rating || product.rating;
  product.numReviews = updateData.numReviews || product.numReviews;

  const updatedProduct = await product.save();
  logger.info(`ProductService: Product updated - ${updatedProduct.name}`);
  return updatedProduct;
};

/**
 * Deletes a product from the database.
 * @param {string} productId - The ID of the product to delete.
 * @returns {object} - A success message.
 * @throws {Error} If product not found.
 */
const deleteProduct = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  await product.remove(); // Mongoose v5: product.remove(), Mongoose v6+: product.deleteOne()
  logger.info(`ProductService: Product deleted - ${product.name}`);
  return { message: 'Product removed successfully' };
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};