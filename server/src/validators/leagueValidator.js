// server/src/validators/leagueValidator.js
const { body } = require('express-validator');

const leagueValidator = [
  body('name').notEmpty().withMessage('League name is required').trim().escape(),
  body('country').notEmpty().withMessage('Country is required').trim().escape(),
  body('startDate').isISO8601().toDate().withMessage('Invalid start date format'),
  body('endDate').isISO8601().toDate().withMessage('Invalid end date format'),
  body('description').optional().trim().escape(),
];

module.exports = {
  leagueValidator,
};