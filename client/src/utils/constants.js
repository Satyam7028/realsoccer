// client/src/utils/constants.js

/**
 * Defines various constant values used across the client-side application.
 * These should ideally mirror or complement constants defined on the server.
 */

// User Roles (should match server/shared/constants/userRoles.js)
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Product Categories (should match server/src/utils/constants.js or be fetched from API)
export const PRODUCT_CATEGORIES = [
  'jersey',
  'ball',
  'boots',
  'accessories',
  'fan gear',
  'training',
];

// Fixture Statuses (should match server/src/utils/constants.js)
export const FIXTURE_STATUSES = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  FINISHED: 'finished',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled',
};

// News Categories (should match server/src/utils/constants.js)
export const NEWS_CATEGORIES = [
  'match report',
  'transfer news',
  'injury update',
  'interview',
  'general',
];

// Order Statuses (should match server/src/utils/constants.js)
export const ORDER_STATUSES = {
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
};

// Payment Methods (should match what your backend supports)
export const PAYMENT_METHODS = {
  PAYPAL: 'PayPal',
  STRIPE: 'Stripe',
};

// Pagination defaults (if not handled by API directly)
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_CURRENT_PAGE = 1;

// Other general constants
export const APP_NAME = 'Real Soccer';
export const CONTACT_EMAIL = 'info@realsoccer.com';
export const CONTACT_PHONE = '+1 234 567 8900';