// server/src/controllers/leagueController.js
const asyncHandler = require('express-async-handler');
const League = require('../models/League');
const logger = require('../config/logger');

// @desc    Create a new league
// @route   POST /api/leagues
// @access  Private/Admin
const createLeague = asyncHandler(async (req, res) => {
  const { name, country, startDate, endDate, description } = req.body;

  if (!name || !country || !startDate || !endDate) {
    res.status(400);
    throw new Error('Please enter all required fields for a new league');
  }

  const league = await League.create({
    name,
    country,
    startDate,
    endDate,
    description,
  });

  res.status(201).json(league);
});

// @desc    Get all leagues with pagination
// @route   GET /api/leagues?page=<number>&limit=<number>
// @access  Public
const getLeagues = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const totalLeagues = await League.countDocuments({});

  const leagues = await League.find({})
    .skip(skip)
    .limit(limit);

  res.json({
    leagues,
    page,
    pages: Math.ceil(totalLeagues / limit),
    totalLeagues,
  });
});

// @desc    Get league by ID
// @route   GET /api/leagues/:id
// @access  Public
const getLeagueById = asyncHandler(async (req, res) => {
  const league = await League.findById(req.params.id)
    .populate('teams') // Populate the teams
    .populate('topScorers'); // Populate top scorers

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
  const { name, country, startDate, endDate, description } = req.body;

  if (league) {
    league.name = name || league.name;
    league.country = country || league.country;
    league.startDate = startDate || league.startDate;
    league.endDate = endDate || league.endDate;
    league.description = description || league.description;

    const updatedLeague = await league.save();
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
    await league.deleteOne();
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