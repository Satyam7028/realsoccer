// server/src/services/leagueService.js
const League = require('../models/League');
const logger = require('../config/logger');

/**
 * Creates a new league.
 * @param {object} leagueDetails - Object containing league data.
 * @returns {object} - The created league object.
 * @throws {Error} If league with the same name already exists or invalid data.
 */
const createLeague = async (leagueDetails) => {
  const { name, country, logo, description, season } = leagueDetails;

  const leagueExists = await League.findOne({ name });
  if (leagueExists) {
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
    logger.info(`LeagueService: League created - ${league.name}`);
    return league;
  } else {
    throw new Error('Invalid league data provided');
  }
};

/**
 * Retrieves all leagues from the database.
 * @param {object} [filters={}] - Optional filters (e.g., { country: 'England' }).
 * @returns {Array<object>} - An array of league objects.
 */
const getAllLeagues = async (filters = {}) => {
  const leagues = await League.find(filters);
  logger.info('LeagueService: Fetched all leagues.');
  return leagues;
};

/**
 * Retrieves a single league by its ID.
 * @param {string} leagueId - The ID of the league to retrieve.
 * @returns {object} - The league object.
 * @throws {Error} If league not found.
 */
const getLeagueById = async (leagueId) => {
  const league = await League.findById(leagueId);
  if (!league) {
    throw new Error('League not found');
  }
  logger.info(`LeagueService: Fetched league by ID: ${leagueId}`);
  return league;
};

/**
 * Updates a league's information.
 * @param {string} leagueId - The ID of the league to update.
 * @param {object} updateData - An object containing fields to update.
 * @returns {object} - The updated league object.
 * @throws {Error} If league not found or invalid update data.
 */
const updateLeague = async (leagueId, updateData) => {
  const league = await League.findById(leagueId);

  if (!league) {
    throw new Error('League not found');
  }

  // Update fields if provided
  league.name = updateData.name || league.name;
  league.country = updateData.country || league.country;
  league.logo = updateData.logo || league.logo;
  league.description = updateData.description || league.description;
  league.season = updateData.season || league.season;

  const updatedLeague = await league.save();
  logger.info(`LeagueService: League updated - ${updatedLeague.name}`);
  return updatedLeague;
};

/**
 * Deletes a league from the database.
 * @param {string} leagueId - The ID of the league to delete.
 * @returns {object} - A success message.
 * @throws {Error} If league not found.
 */
const deleteLeague = async (leagueId) => {
  const league = await League.findById(leagueId);

  if (!league) {
    throw new Error('League not found');
  }

  await league.remove(); // Mongoose v5: league.remove(), Mongoose v6+: league.deleteOne()
  logger.info(`LeagueService: League deleted - ${league.name}`);
  return { message: 'League removed successfully' };
};

module.exports = {
  createLeague,
  getAllLeagues,
  getLeagueById,
  updateLeague,
  deleteLeague,
};