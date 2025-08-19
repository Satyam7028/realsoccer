// client/src/services/shopservice.js
import api from './api';

const getProducts = async (page = 1, limit = 10, filters = {}) => {
  try {
    const response = await api.get(`/shop/products?page=${page}&limit=${limit}`, { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const response = await api.get(`/shop/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createProduct = async (productData) => {
  try {
    const response = await api.post('/shop/products', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/shop/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    await api.delete(`/shop/products/${id}`);
  } catch (error) {
    throw error;
  }
};

const shopService = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default shopService;