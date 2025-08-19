// server/src/validators/fixtureValidator.js
const { body, param } = require('express-validator');

const fixtureValidator = [
  body('league').isMongoId().withMessage('Invalid league ID').optional(),
  body('homeTeam').isMongoId().withMessage('Invalid home team ID'),
  body('awayTeam').isMongoId().withMessage('Invalid away team ID'),
  body('date').isISO8601().toDate().withMessage('Invalid date format'),
  body('time').isTime({ hourFormat: 'hour24' }).withMessage('Invalid time format'),
  body('location').notEmpty().withMessage('Location is required').trim().escape(),
  body('score').optional().isString().withMessage('Score must be a string'),
  body('status').isIn(['scheduled', 'in-progress', 'completed', 'cancelled', 'postponed']).withMessage('Invalid status'),
];

module.exports = {
  fixtureValidator,
};