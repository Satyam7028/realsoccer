// server/src/validators/playerValidator.js
const { body } = require('express-validator');

// Validation schema for creating and updating a player
const playerValidation = [
  // Required fields with custom error messages
  body('name').notEmpty().withMessage('Player name is required').trim().escape(),
  body('team').notEmpty().withMessage('Team name is required').trim().escape(),
  body('position').notEmpty().withMessage('Position is required').trim().escape(),
  body('nationality').notEmpty().withMessage('Nationality is required').trim().escape(),
  body('dateOfBirth').notEmpty().withMessage('Date of birth is required').isDate().withMessage('Invalid date format for date of birth'),

  // Optional fields with validation
  body('height').optional().isFloat().withMessage('Height must be a number'),
  body('weight').optional().isFloat().withMessage('Weight must be a number'),
  body('jerseyNumber').optional().isInt({ min: 1, max: 99 }).withMessage('Jersey number must be an integer between 1 and 99'),
  body('profileImage').optional().isURL().withMessage('Profile image must be a valid URL'),
  body('statistics').optional().isObject().withMessage('Statistics must be an object'),
  body('biography').optional().trim().escape(),
];

module.exports = {
  playerValidation,
};