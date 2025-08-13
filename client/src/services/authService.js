// client/src/services/authService.js
import api from './api'; // Our configured Axios instance
import { API_ENDPOINTS } from '../../shared/constants/apiEndpoints';

/**
 * Handles user login.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<object>} - Response data containing user info and token.
 */
const login = async (email, password) => {
  const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  return response.data;
};

/**
 * Handles user registration.
 * @param {string} username - User's username.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<object>} - Response data containing new user info and token.
 */
const register = async (username, email, password) => {
  const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, { username, email, password });
  return response.data;
};

/**
 * Fetches the authenticated user's profile.
 * @returns {Promise<object>} - Response data containing user profile.
 */
const getMe = async () => {
  const response = await api.get(API_ENDPOINTS.AUTH.ME);
  return response.data;
};

// You can add other auth-related functions here, like password reset, etc.

const authService = {
  login,
  register,
  getMe,
};

export default authService;