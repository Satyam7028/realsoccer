// server/src/routes/playerRoutes.js
const express = require('express');
const {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} = require('../controllers/playerController');
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const { playerValidation } = require('../validators/playerValidator'); // Import the new validator
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @desc    Create a new player
// @route   POST /api/players
// @access  Private/Admin
router.post('/', protect, roleGuard('admin'), playerValidation, validateRequest, createPlayer);

// @desc    Get all players
// @route   GET /api/players
// @access  Public
router.get('/', getPlayers);

// @desc    Get player by ID
// @route   GET /api/players/:id
// @access  Public
router.get('/:id', getPlayerById);

// @desc    Update player by ID
// @route   PUT /api/players/:id
// @access  Private/Admin
router.put('/:id', protect, roleGuard('admin'), playerValidation, validateRequest, updatePlayer);

// @desc    Delete player by ID
// @route   DELETE /api/players/:id
// @access  Private/Admin
router.delete('/:id', protect, roleGuard('admin'), deletePlayer);

module.exports = router;