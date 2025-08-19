// server/src/controllers/fixtureController.js
const asyncHandler = require('express-async-handler');
const Fixture = require('../models/Fixture');
const logger = require('../config/logger');

// @desc    Create a new fixture
// @route   POST /api/fixtures
// @access  Private/Admin
const createFixture = asyncHandler(async (req, res) => {
  const {
    league,
    homeTeam,
    awayTeam,
    date,
    time,
    location,
    score,
    status,
    details,
  } = req.body;

  if (!league || !homeTeam || !awayTeam || !date || !time) {
    res.status(400);
    throw new Error('Please enter all required fields for a new fixture');
  }

  const fixture = await Fixture.create({
    league,
    homeTeam,
    awayTeam,
    date,
    time,
    location,
    score,
    status,
    details,
  });

  res.status(201).json(fixture);
});

// @desc    Get all fixtures with pagination
// @route   GET /api/fixtures?page=<number>&limit=<number>
// @access  Public
const getFixtures = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const totalFixtures = await Fixture.countDocuments({});

  const fixtures = await Fixture.find({})
    .skip(skip)
    .limit(limit)
    .populate('league') // Populate the league reference
    .populate('homeTeam') // Populate home team
    .populate('awayTeam'); // Populate away team

  res.json({
    fixtures,
    page,
    pages: Math.ceil(totalFixtures / limit),
    totalFixtures,
  });
});

// @desc    Get fixture by ID
// @route   GET /api/fixtures/:id
// @access  Public
const getFixtureById = asyncHandler(async (req, res) => {
  const fixture = await Fixture.findById(req.params.id)
    .populate('league')
    .populate('homeTeam')
    .populate('awayTeam');

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
    fixture.league = req.body.league || fixture.league;
    fixture.homeTeam = req.body.homeTeam || fixture.homeTeam;
    fixture.awayTeam = req.body.awayTeam || fixture.awayTeam;
    fixture.date = req.body.date || fixture.date;
    fixture.time = req.body.time || fixture.time;
    fixture.location = req.body.location || fixture.location;
    fixture.score = req.body.score || fixture.score;
    fixture.status = req.body.status || fixture.status;
    fixture.details = req.body.details || fixture.details;

    const updatedFixture = await fixture.save();
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
    await fixture.deleteOne();
    res.json({ message: 'Fixture removed' });
  } else {
    res.status(404);
    throw new Error('Fixture not found');
  }
});

module.exports = {
  createFixture,
  getFixtures,
  getFixtureById,
  updateFixture,
  deleteFixture,
};