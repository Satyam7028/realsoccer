// server/src/config/jwt.js

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h'; // Default to 1 hour if not specified

if (!jwtSecret) {
    throw new Error('JWT_SECRET not defined. Please set it in your .env file.');
}

module.exports = {
  jwtSecret,
  jwtExpiresIn,
};