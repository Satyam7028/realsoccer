// server/src/services/playerService.js
const Player = require('../models/Player');
const League = require('../models/League'); // Potentially needed for validation or population
const logger = require('../config/logger');

/**
 * Creates a new player.
 * @param {object} playerDetails - Object containing player data.
 * @returns {object} - The created player object.
 * @throws {Error} If invalid player data.
 */
const createPlayer = async (playerDetails) => {
  const { name, team, position, nationality, dateOfBirth, height, weight, jerseyNumber, profileImage, statistics, biography } = playerDetails;

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
    logger.info(`PlayerService: Player created - ${player.name}`);
    return player;
  } else {
    throw new Error('Invalid player data provided');
  }
};

/**
 * Retrieves all players from the database.
 * @param {object} [filters={}] - Optional filters (e.g., { team: 'FC Barcelona' }).
 * @returns {Array<object>} - An array of player objects.
 */
const getAllPlayers = async (filters = {}) => {
  const players = await Player.find(filters);
  logger.info('PlayerService: Fetched all players.');
  return players;
};

/**
 * Retrieves a single player by their ID.
 * @param {string} playerId - The ID of the player to retrieve.
 * @returns {object} - The player object.
 * @throws {Error} If player not found.
 */
const getPlayerById = async (playerId) => {
  const player = await Player.findById(playerId);
  if (!player) {
    throw new Error('Player not found');
  }
  logger.info(`PlayerService: Fetched player by ID: ${playerId}`);
  return player;
};

/**
 * Updates a player's information.
 * @param {string} playerId - The ID of the player to update.
 * @param {object} updateData - An object containing fields to update.
 * @returns {object} - The updated player object.
 * @throws {Error} If player not found or invalid update data.
 */
const updatePlayer = async (playerId, updateData) => {
  const player = await Player.findById(playerId);

  if (!player) {
    throw new Error('Player not found');
  }

  // Update fields if provided
  player.name = updateData.name || player.name;
  player.team = updateData.team || player.team;
  player.position = updateData.position || player.position;
  player.nationality = updateData.nationality || player.nationality;
  player.dateOfBirth = updateData.dateOfBirth || player.dateOfBirth;
  player.height = updateData.height || player.height;
  player.weight = updateData.weight || player.weight;
  player.jerseyNumber = updateData.jerseyNumber || player.jerseyNumber;
  player.profileImage = updateData.profileImage || player.profileImage;
  player.statistics = updateData.statistics || player.statistics; // This might need deeper merging
  player.biography = updateData.biography || player.biography;

  const updatedPlayer = await player.save();
  logger.info(`PlayerService: Player updated - ${updatedPlayer.name}`);
  return updatedPlayer;
};

/**
 * Deletes a player from the database.
 * @param {string} playerId - The ID of the player to delete.
 * @returns {object} - A success message.
 * @throws {Error} If player not found.
 */
const deletePlayer = async (playerId) => {
  const player = await Player.findById(playerId);

  if (!player) {
    throw new Error('Player not found');
  }

  await player.remove(); // Mongoose v5: player.remove(), Mongoose v6+: player.deleteOne()
  logger.info(`PlayerService: Player deleted - ${player.name}`);
  return { message: 'Player removed successfully' };
};

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
};