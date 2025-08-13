// server/src/middleware/roleGuard.js
const logger = require('../config/logger');

// Middleware to restrict access based on user roles
const roleGuard = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      logger.warn(`Access denied: User not authenticated or role not found for user ID: ${req.user ? req.user._id : 'N/A'}`);
      return res.status(403).json({ message: 'Access denied. No role found.' });
    }

    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      logger.warn(`Access denied: User ${req.user._id} with role "${req.user.role}" attempted to access restricted resource.`);
      return res.status(403).json({ message: `Access denied. Requires one of: ${roles.join(', ')} roles.` });
    }
    next();
  };
};

module.exports = roleGuard;