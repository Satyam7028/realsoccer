// client/src/shared/apiEndpoints.js
/**
 * Defines the API endpoints used across the application.
 * Centralizing these helps maintain consistency between frontend and backend.
 */
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    ME: '/api/auth/me',
  },
  USERS: {
    BASE: '/api/users',
    PROFILE: '/api/users/profile',
    BY_ID: (id) => `/api/users/${id}`,
  },
  PLAYERS: {
    BASE: '/api/players',
    BY_ID: (id) => `/api/players/${id}`,
  },
  LEAGUES: {
    BASE: '/api/leagues',
    BY_ID: (id) => `/api/leagues/${id}`,
  },
  FIXTURES: {
    BASE: '/api/fixtures',
    BY_ID: (id) => `/api/fixtures/${id}`,
    LIVE: '/api/fixtures/live',
  },
  NEWS: {
    BASE: '/api/news',
    BY_ID: (id) => `/api/news/${id}`,
  },
  SHOP: {
    PRODUCTS: '/api/shop/products',
    PRODUCT_BY_ID: (id) => `/api/shop/products/${id}`,
  },
  ORDERS: {
    BASE: '/api/orders',
    BY_ID: (id) => `/api/orders/${id}`,
    PAY: (id) => `/api/orders/${id}/pay`,
    DELIVER: (id) => `/api/orders/${id}/deliver`,
    MY_ORDERS: '/api/orders/myorders',
  },
  PAYMENTS: {
    BASE: '/api/payments',
    BY_ID: (id) => `/api/payments/${id}`,
    STATUS: (id) => `/api/payments/${id}/status`,
  },
  ADMIN: {
    DASHBOARD: '/api/admin/dashboard',
    USER_ROLE: (id) => `/api/admin/users/${id}/role`,
    ORDER_STATUS: (id) => `/api/admin/orders/${id}/status`,
    REPORTS: (type) => `/api/admin/reports/${type}`,
  },
};
