// server/src/controllers/leagueController.js
const asyncHandler = require('express-async-handler');
const League = require('../models/League');
const logger = require('../config/logger');

// @desc    Create a new league
// @route   POST /api/leagues
// @access  Private/Admin
const createLeague = asyncHandler(async (req, res) => {
  const { name, country, logo, description, season } = req.body;

  // Basic validation (more detailed validation is in leagueValidator)
  if (!name || !country) {
    res.status(400);
    throw new Error('Please fill in all required league fields: name, country');
  }

  // Check if league with this name already exists
  const leagueExists = await League.findOne({ name });
  if (leagueExists) {
    res.status(400);
    throw new Error('League with this name already exists');
  }

  const league = await League.create({
    name,
    country,
    logo,
    description,
    season,
  });

  if (league) {
    logger.info(`League created: ${league.name}`);
    res.status(201).json(league);
  } else {
    res.status(400);
    throw new Error('Invalid league data');
  }
});

// @desc    Get all leagues
// @route   GET /api/leagues
// @access  Public
const getLeagues = asyncHandler(async (req, res) => {
  const leagues = await League.find({});
  res.json(leagues);
});

// @desc    Get league by ID
// @route   GET /api/leagues/:id
// @access  Public
const getLeagueById = asyncHandler(async (req, res) => {
  const league = await League.findById(req.params.id);

  if (league) {
    res.json(league);
  } else {
    res.status(404);
    throw new Error('League not found');
  }
});

// @desc    Update league by ID
// @route   PUT /api/leagues/:id
// @access  Private/Admin
const updateLeague = asyncHandler(async (req, res) => {
  const league = await League.findById(req.params.id);

  if (league) {
    league.name = req.body.name || league.name;
    league.country = req.body.country || league.country;
    league.logo = req.body.logo || league.logo;
    league.description = req.body.description || league.description;
    league.season = req.body.season || league.season;

    const updatedLeague = await league.save();

    logger.info(`League updated: ${updatedLeague.name}`);
    res.json(updatedLeague);
  } else {
    res.status(404);
    throw new Error('League not found');
  }
});

// @desc    Delete league by ID
// @route   DELETE /api/leagues/:id
// @access  Private/Admin
const deleteLeague = asyncHandler(async (req, res) => {
  const league = await League.findById(req.params.id);

  if (league) {
    await league.remove(); // Mongoose v5: league.remove(), Mongoose v6+: league.deleteOne()
    logger.info(`League deleted: ${league.name}`);
    res.json({ message: 'League removed' });
  } else {
    res.status(404);
    throw new Error('League not found');
  }
});

module.exports = {
  createLeague,
  getLeagues,
  getLeagueById,
  updateLeague,
  deleteLeague,
};