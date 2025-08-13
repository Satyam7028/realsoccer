// client/src/config/index.js

/**
 * Client-side configuration settings for the Real Soccer application.
 * These settings are typically loaded from environment variables.
 */

const config = {
  // Base URL for the backend API
  // This is set via REACT_APP_API_URL environment variable (e.g., in .env.development, .env.production)
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',

  // Application environment (development, production, test)
  nodeEnv: process.env.NODE_ENV || 'development',

  // Other client-specific configurations can be added here
  // For example:
  // defaultPageSize: 10,
  // currencySymbol: '$',
  // appVersion: '1.0.0',
};

export default config;