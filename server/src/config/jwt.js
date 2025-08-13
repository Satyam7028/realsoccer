// server/src/config/jwt.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h'; // Default to 1 hour if not specified

if (!jwtSecret) {
  console.error('FATAL ERROR: JWT_SECRET is not defined. Please set it in your .env file.');
  process.exit(1);
}

module.exports = {
  jwtSecret,
  jwtExpiresIn,
  // You can add functions here to generate or verify tokens if preferred,
  // but typically this logic resides in an auth service or controller.
};