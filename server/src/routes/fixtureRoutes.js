// server/src/routes/fixtureRoutes.js
const express = require('express');
const {
  createFixture,
  getFixtures,
  getFixtureById,
  updateFixture,
  deleteFixture,
} = require('../controllers/fixtureController');
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const { fixtureValidator } = require('../validators/fixtureValidator');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @desc    Create a new fixture
// @route   POST /api/fixtures
// @access  Private/Admin
router.post('/', protect, roleGuard('admin'), fixtureValidator, validateRequest, createFixture);

// @desc    Get all fixtures
// @route   GET /api/fixtures
// @access  Public
router.get('/', getFixtures);

// @desc    Get fixture by ID
// @route   GET /api/fixtures/:id
// @access  Public
router.get('/:id', getFixtureById);

// @desc    Update fixture by ID
// @route   PUT /api/fixtures/:id
// @access  Private/Admin
router.put('/:id', protect, roleGuard('admin'), fixtureValidator, validateRequest, updateFixture);

// @desc    Delete fixture by ID
// @route   DELETE /api/fixtures/:id
// @access  Private/Admin
router.delete('/:id', protect, roleGuard('admin'), deleteFixture);

module.exports = router;