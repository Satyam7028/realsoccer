// server/src/controllers/playerController.js
const asyncHandler = require('express-async-handler');
const Player = require('../models/Player');
const logger = require('../config/logger');

// @desc    Create a new player
// @route   POST /api/players
// @access  Private/Admin
const createPlayer = asyncHandler(async (req, res) => {
  const { name, team, position, nationality, dateOfBirth, height, weight, jerseyNumber, profileImage, statistics, biography } = req.body;

  const player = await Player.create({
    name,
    team,
    position,
    nationality,
    dateOfBirth,
    height,
    weight,
    jerseyNumber,
    profileImage,
    statistics,
    biography,
  });

  if (player) {
    logger.info(`Player created: ${player.name}`);
    res.status(201).json(player);
  } else {
    res.status(400);
    throw new Error('Invalid player data');
  }
});

// @desc    Get all players with pagination
// @route   GET /api/players?page=<number>&limit=<number>
// @access  Public
const getPlayers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const totalPlayers = await Player.countDocuments({});

  const players = await Player.find({})
    .skip(skip)
    .limit(limit);

  res.json({
    players,
    page,
    pages: Math.ceil(totalPlayers / limit),
    totalPlayers,
  });
});

// @desc    Get player by ID
// @route   GET /api/players/:id
// @access  Public
const getPlayerById = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);

  if (player) {
    res.json(player);
  } else {
    res.status(404);
    throw new Error('Player not found');
  }
});

// @desc    Update player by ID
// @route   PUT /api/players/:id
// @access  Private/Admin
const updatePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);

  if (player) {
    player.name = req.body.name || player.name;
    player.team = req.body.team || player.team;
    player.position = req.body.position || player.position;
    player.nationality = req.body.nationality || player.nationality;
    player.dateOfBirth = req.body.dateOfBirth || player.dateOfBirth;
    player.height = req.body.height || player.height;
    player.weight = req.body.weight || player.weight;
    player.jerseyNumber = req.body.jerseyNumber || player.jerseyNumber;
    player.profileImage = req.body.profileImage || player.profileImage;
    player.statistics = req.body.statistics || player.statistics;
    player.biography = req.body.biography || player.biography;

    const updatedPlayer = await player.save();

    logger.info(`Player updated: ${updatedPlayer.name}`);
    res.json(updatedPlayer);
  } else {
    res.status(404);
    throw new Error('Player not found');
  }
});

// @desc    Delete player by ID
// @route   DELETE /api/players/:id
// @access  Private/Admin
const deletePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);

  if (player) {
    await player.deleteOne(); // Corrected: Using .deleteOne() for Mongoose v6+
    logger.info(`Player deleted: ${player.name}`);
    res.json({ message: 'Player removed' });
  } else {
    res.status(404);
    throw new Error('Player not found');
  }
});

module.exports = {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
};