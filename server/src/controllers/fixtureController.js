// server/src/controllers/fixtureController.js
const asyncHandler = require('express-async-handler');
const Fixture = require('../models/Fixture');
const League = require('../models/League'); // To populate league details
const Player = require('../models/Player'); // To populate player details in events
const logger = require('../config/logger');

// @desc    Create a new fixture
// @route   POST /api/fixtures
// @access  Private/Admin
const createFixture = asyncHandler(async (req, res) => {
  const { homeTeam, awayTeam, league, date, location, status, score, events } = req.body;

  // Basic validation
  if (!homeTeam || !awayTeam || !league || !date || !location) {
    res.status(400);
    throw new Error('Please fill in all required fixture fields: homeTeam, awayTeam, league, date, location');
  }

  // Check if the league exists
  const existingLeague = await League.findById(league);
  if (!existingLeague) {
    res.status(404);
    throw new Error('League not found');
  }

  const fixture = await Fixture.create({
    homeTeam,
    awayTeam,
    league,
    date,
    location,
    status,
    score,
    events,
  });

  if (fixture) {
    logger.info(`Fixture created: ${fixture.homeTeam} vs ${fixture.awayTeam}`);
    res.status(201).json(fixture);
  } else {
    res.status(400);
    throw new Error('Invalid fixture data');
  }
});

// @desc    Get all fixtures
// @route   GET /api/fixtures
// @access  Public
const getFixtures = asyncHandler(async (req, res) => {
  // You can add query parameters for filtering (e.g., by league, date, status)
  const query = {};
  if (req.query.league) {
    query.league = req.query.league;
  }
  if (req.query.status) {
    query.status = req.query.status;
  }
  if (req.query.date) {
    // Example: filter by date (e.g., fixtures on a specific day)
    const startOfDay = new Date(req.query.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(req.query.date);
    endOfDay.setHours(23, 59, 59, 999);
    query.date = { $gte: startOfDay, $lte: endOfDay };
  }

  const fixtures = await Fixture.find(query)
    .populate('league', 'name country') // Populate league name and country
    .populate('events.player', 'name team position'); // Populate player name, team, position in events

  res.json(fixtures);
});

// @desc    Get fixture by ID
// @route   GET /api/fixtures/:id
// @access  Public
const getFixtureById = asyncHandler(async (req, res) => {
  const fixture = await Fixture.findById(req.params.id)
    .populate('league', 'name country')
    .populate('events.player', 'name team position');

  if (fixture) {
    res.json(fixture);
  } else {
    res.status(404);
    throw new Error('Fixture not found');
  }
});

// @desc    Update fixture by ID
// @route   PUT /api/fixtures/:id
// @access  Private/Admin
const updateFixture = asyncHandler(async (req, res) => {
  const fixture = await Fixture.findById(req.params.id);

  if (fixture) {
    fixture.homeTeam = req.body.homeTeam || fixture.homeTeam;
    fixture.awayTeam = req.body.awayTeam || fixture.awayTeam;
    fixture.league = req.body.league || fixture.league;
    fixture.date = req.body.date || fixture.date;
    fixture.location = req.body.location || fixture.location;
    fixture.status = req.body.status || fixture.status;
    fixture.score = req.body.score || fixture.score;
    fixture.events = req.body.events || fixture.events;

    const updatedFixture = await fixture.save();

    logger.info(`Fixture updated: ${updatedFixture.homeTeam} vs ${updatedFixture.awayTeam}`);
    res.json(updatedFixture);
  } else {
    res.status(404);
    throw new Error('Fixture not found');
  }
});

// @desc    Delete fixture by ID
// @route   DELETE /api/fixtures/:id
// @access  Private/Admin
const deleteFixture = asyncHandler(async (req, res) => {
  const fixture = await Fixture.findById(req.params.id);

  if (fixture) {
    await fixture.remove(); // Mongoose v5: fixture.remove(), Mongoose v6+: fixture.deleteOne()
    logger.info(`Fixture deleted: ${fixture.homeTeam} vs ${fixture.awayTeam}`);
    res.json({ message: 'Fixture removed' });
  } else {
    res.status(404);
    throw new Error('Fixture not found');
  }
});

// @desc    Get live fixtures
// @route   GET /api/fixtures/live
// @access  Public
const getLiveFixtures = asyncHandler(async (req, res) => {
  // Live fixtures are those with status 'live'
  const liveFixtures = await Fixture.find({ status: 'live' })
    .populate('league', 'name country')
    .populate('events.player', 'name team position');
  res.json(liveFixtures);
});


module.exports = {
  createFixture,
  getFixtures,
  getFixtureById,
  updateFixture,
  deleteFixture,
  getLiveFixtures,
};