// server/src/validators/leagueValidator.js
const { body } = require('express-validator');

const leagueValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('League name is required')
    .isLength({ min: 2 })
    .withMessage('League name must be at least 2 characters long'),
  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  body('logo')
    .optional()
    .isURL()
    .withMessage('Logo must be a valid URL'),
  body('description')
    .optional()
    .trim(),
  body('season')
    .optional()
    .trim()
    .isLength({ min: 4, max: 9 }) // e.g., "2023", "2023/2024"
    .withMessage('Season format is invalid'),
];

module.exports = {
  leagueValidation,
};