// client/src/services/api.js
import axios from 'axios';

// Get API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add authorization token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken'); // Assuming token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle common errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Example: if 401 Unauthorized, redirect to login
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access. Redirecting to login...');
      // You might want to clear local storage and redirect to login page
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      window.location.href = '/login'; // Or use navigate if in a React component context
    }
    return Promise.reject(error);
  }
);

export default api;