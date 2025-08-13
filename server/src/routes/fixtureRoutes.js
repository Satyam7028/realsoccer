// server/src/routes/fixtureRoutes.js
const express = require('express');
const {
  createFixture,
  getFixtures,
  getFixtureById,
  updateFixture,
  deleteFixture,
  getLiveFixtures, // Assuming a separate endpoint for live scores
} = require('../controllers/fixtureController'); // We will create this controller
const { protect } = require('../middleware/authMiddleware');
const roleGuard = require('../middleware/roleGuard');
const { fixtureValidation } = require('../validators/fixtureValidator'); // We will create this validator
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @desc    Create a new fixture
// @route   POST /api/fixtures
// @access  Private/Admin
router.post('/', protect, roleGuard('admin'), fixtureValidation, validateRequest, createFixture);

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
router.put('/:id', protect, roleGuard('admin'), fixtureValidation, validateRequest, updateFixture);

// @desc    Delete fixture by ID
// @route   DELETE /api/fixtures/:id
// @access  Private/Admin
router.delete('/:id', protect, roleGuard('admin'), deleteFixture);

// @desc    Get live fixtures (optional, can be integrated into getFixtures with query params)
// @route   GET /api/fixtures/live
// @access  Public
router.get('/live', getLiveFixtures);

module.exports = router;