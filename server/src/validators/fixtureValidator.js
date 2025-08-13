// server/src/validators/fixtureValidator.js
const { body, param } = require('express-validator');
const mongoose = require('mongoose');

const fixtureValidation = [
  body('homeTeam')
    .trim()
    .notEmpty()
    .withMessage('Home team name is required'),
  body('awayTeam')
    .trim()
    .notEmpty()
    .withMessage('Away team name is required'),
  body('league')
    .notEmpty()
    .withMessage('League ID is required')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid League ID format'),
  body('date')
    .notEmpty()
    .withMessage('Fixture date and time is required')
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format for fixture date. Use ISO 8601.'),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Fixture location is required'),
  body('status')
    .optional()
    .isIn(['scheduled', 'live', 'finished', 'postponed', 'cancelled'])
    .withMessage('Invalid fixture status.'),
  body('score.home')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Home team score must be a non-negative integer'),
  body('score.away')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Away team score must be a non-negative integer'),
  body('events')
    .optional()
    .isArray()
    .withMessage('Events must be an array'),
  body('events.*.type') // Validate each item in the events array
    .optional()
    .isIn(['goal', 'yellow card', 'red card', 'substitution'])
    .withMessage('Invalid event type'),
  body('events.*.minute')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Event minute must be a non-negative integer'),
  body('events.*.player')
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid Player ID format in event'),
  body('events.*.description')
    .optional()
    .trim(),
];

module.exports = {
  fixtureValidation,
};