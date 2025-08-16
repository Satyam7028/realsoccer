// server/src/services/playerService.js
const Player = require('../models/Player');
const logger = require('../config/logger');

// @desc    Create a new player
const createPlayer = async (playerData) => {
  const player = await Player.create(playerData);
  logger.info(`PlayerService: Player created - ${player.name}`);
  return player;
};

// @desc    Get all players
const getPlayers = async () => {
  const players = await Player.find({});
  logger.info('PlayerService: Fetched all players');
  return players;
};

// @desc    Get a single player by ID
const getPlayerById = async (playerId) => {
  const player = await Player.findById(playerId);
  if (!player) {
    // This is the error-handling path, which is good.
    // The test is designed to catch this specific error.
    throw new Error('Player not found');
  }
  logger.info(`PlayerService: Fetched player by ID: ${playerId}`);
  return player;
};

// @desc    Update a player by ID
const updatePlayer = async (playerId, updateData) => {
  // Use findByIdAndUpdate for an atomic update
  const updatedPlayer = await Player.findByIdAndUpdate(playerId, updateData, { new: true, runValidators: true });
  if (!updatedPlayer) {
    throw new Error('Player not found');
  }
  logger.info(`PlayerService: Player updated - ${updatedPlayer.name}`);
  return updatedPlayer;
};

// @desc    Delete a player by ID
const deletePlayer = async (playerId) => {
  // Use findByIdAndDelete for an atomic deletion.
  // This is the method that should be called in your test.
  const player = await Player.findByIdAndDelete(playerId);
  if (!player) {
    throw new Error('Player not found');
  }
  logger.info(`PlayerService: Player deleted - ${player.name}`);
  return { message: 'Player removed successfully' };
};

module.exports = {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
};
