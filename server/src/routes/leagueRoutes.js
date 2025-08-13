// server/src/routes/leagueRoutes.js
const express = require('express');
const {
  createLeague,
  getLeagues,
  getLeagueById,
  updateLeague,
  deleteLeague,
} = require('../controllers/leagueController'); // We will create this controller
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const { leagueValidation } = require('../validators/leagueValidator'); // We will create this validator
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @desc    Create a new league
// @route   POST /api/leagues
// @access  Private/Admin
router.post('/', protect, roleGuard('admin'), leagueValidation, validateRequest, createLeague);

// @desc    Get all leagues
// @route   GET /api/leagues
// @access  Public
router.get('/', getLeagues);

// @desc    Get league by ID
// @route   GET /api/leagues/:id
// @access  Public
router.get('/:id', getLeagueById);

// @desc    Update league by ID
// @route   PUT /api/leagues/:id
// @access  Private/Admin
router.put('/:id', protect, roleGuard('admin'), leagueValidation, validateRequest, updateLeague);

// @desc    Delete league by ID
// @route   DELETE /api/leagues/:id
// @access  Private/Admin
router.delete('/:id', protect, roleGuard('admin'), deleteLeague);

module.exports = router;