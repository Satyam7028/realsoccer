// server/src/routes/leagueRoutes.js
const express = require('express');
const {
  createLeague,
  getLeagues,
  getLeagueById,
  updateLeague,
  deleteLeague,
} = require('../controllers/leagueController');
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const { leagueValidator } = require('../validators/leagueValidator');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @desc    Create a new league
// @route   POST /api/leagues
// @access  Private/Admin
router.post('/', protect, roleGuard('admin'), leagueValidator, validateRequest, createLeague);

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
router.put('/:id', protect, roleGuard('admin'), leagueValidator, validateRequest, updateLeague);

// @desc    Delete league by ID
// @route   DELETE /api/leagues/:id
// @access  Private/Admin
router.delete('/:id', protect, roleGuard('admin'), deleteLeague);

module.exports = router;