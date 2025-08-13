// client/src/services/shopService.js
import api from './api'; // Our configured Axios instance
import { API_ENDpoints } from '../../shared/constants/apiEndpoints';

/**
 * Fetches all products from the API.
 * @param {object} [filters={}] - Optional filters for products (e.g., { category: 'jersey', searchTerm: 'ball' }).
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of product objects.
 */
const getAllProducts = async (filters = {}) => {
  const response = await api.get(API_ENDPOINTS.SHOP.PRODUCTS, { params: filters });
  return response.data;
};

/**
 * Fetches a single product by its ID from the API.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<object>} - A promise that resolves to a product object.
 */
const getProductById = async (id) => {
  const response = await api.get(API_ENDPOINTS.SHOP.PRODUCT_BY_ID(id));
  return response.data;
};

// Admin-specific product services (e.g., create, update, delete) would go here
// These would typically require an authenticated admin user.

/**
 * Creates a new product. (Admin only)
 * @param {object} productDetails - The details of the new product.
 * @returns {Promise<object>} - The created product object.
 */
const createProduct = async (productDetails) => {
  const response = await api.post(API_ENDPOINTS.SHOP.PRODUCTS, productDetails);
  return response.data;
};

/**
 * Updates an existing product. (Admin only)
 * @param {string} id - The ID of the product to update.
 * @param {object} updateData - The data to update the product with.
 * @returns {Promise<object>} - The updated product object.
 */
const updateProduct = async (id, updateData) => {
  const response = await api.put(API_ENDPOINTS.SHOP.PRODUCT_BY_ID(id), updateData);
  return response.data;
};

/**
 * Deletes a product. (Admin only)
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<object>} - A success message.
 */
const deleteProduct = async (id) => {
  const response = await api.delete(API_ENDPOINTS.SHOP.PRODUCT_BY_ID(id));
  return response.data;
};


const shopService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default shopService;