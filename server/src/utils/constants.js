// server/src/utils/constants.js

// Define user roles
const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Define fixture statuses
const FIXTURE_STATUSES = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  FINISHED: 'finished',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled',
};

// Define payment statuses
const PAYMENT_STATUSES = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// Define order statuses
const ORDER_STATUSES = {
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
};

// Define news article categories
const NEWS_CATEGORIES = {
  MATCH_REPORT: 'match report',
  TRANSFER_NEWS: 'transfer news',
  INJURY_UPDATE: 'injury update',
  INTERVIEW: 'interview',
  GENERAL: 'general',
};

// Define product categories
const PRODUCT_CATEGORIES = {
  JERSEY: 'jersey',
  BALL: 'ball',
  BOOTS: 'boots',
  ACCESSORIES: 'accessories',
  FAN_GEAR: 'fan gear',
  TRAINING: 'training',
};

module.exports = {
  USER_ROLES,
  FIXTURE_STATUSES,
  PAYMENT_STATUSES,
  ORDER_STATUSES,
  NEWS_CATEGORIES,
  PRODUCT_CATEGORIES,
};