// server/src/validators/playerValidator.js
const { body } = require('express-validator');

const playerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Player name is required')
    .isLength({ min: 2 })
    .withMessage('Player name must be at least 2 characters long'),
  body('team')
    .trim()
    .notEmpty()
    .withMessage('Team name is required'),
  body('position')
    .trim()
    .notEmpty()
    .withMessage('Player position is required')
    .isIn(['Goalkeeper', 'Defender', 'Midfielder', 'Forward'])
    .withMessage('Invalid player position. Must be Goalkeeper, Defender, Midfielder, or Forward.'),
  body('nationality')
    .trim()
    .notEmpty()
    .withMessage('Nationality is required'),
  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of Birth is required')
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format for Date of Birth. Use YYYY-MM-DD.'),
  body('height')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Height must be a positive number'),
  body('weight')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Weight must be a positive number'),
  body('jerseyNumber')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Jersey number must be a non-negative integer'),
  body('profileImage')
    .optional()
    .isURL()
    .withMessage('Profile image must be a valid URL'),
  body('statistics.matchesPlayed')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Matches played must be a non-negative integer'),
  body('statistics.goals')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Goals must be a non-negative integer'),
  body('statistics.assists')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Assists must be a non-negative integer'),
  body('statistics.cleanSheets')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Clean sheets must be a non-negative integer'),
  body('statistics.redCards')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Red cards must be a non-negative integer'),
  body('statistics.yellowCards')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Yellow cards must be a non-negative integer'),
  body('biography')
    .optional()
    .trim(),
];

module.exports = {
  playerValidation,
};