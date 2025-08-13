// server/src/middleware/validateRequest.js
const { validationResult } = require('express-validator');
const logger = require('../config/logger');

// Middleware to validate request body/params/query using express-validator chains
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation errors for request to ${req.originalUrl}: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validateRequest;