// client/src/services/playerService.js
import api from './api'; // Our configured Axios instance
import { API_ENDPOINTS } from '../../shared/constants/apiEndpoints';

/**
 * Fetches all players from the API.
 * @param {object} [filters={}] - Optional filters for players (e.g., { team: 'FC Barcelona' }).
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of player objects.
 */
const getAllPlayers = async (filters = {}) => {
  const response = await api.get(API_ENDPOINTS.PLAYERS.BASE, { params: filters });
  return response.data;
};

/**
 * Fetches a single player by their ID from the API.
 * @param {string} id - The ID of the player to fetch.
 * @returns {Promise<object>} - A promise that resolves to a player object.
 */
const getPlayerById = async (id) => {
  const response = await api.get(API_ENDPOINTS.PLAYERS.BY_ID(id));
  return response.data;
};

// Admin-specific player services (e.g., create, update, delete) would go here
// These would typically require an authenticated admin user.

/**
 * Creates a new player. (Admin only)
 * @param {object} playerDetails - The details of the new player.
 * @returns {Promise<object>} - The created player object.
 */
const createPlayer = async (playerDetails) => {
  const response = await api.post(API_ENDPOINTS.PLAYERS.BASE, playerDetails);
  return response.data;
};

/**
 * Updates an existing player. (Admin only)
 * @param {string} id - The ID of the player to update.
 * @param {object} updateData - The data to update the player with.
 * @returns {Promise<object>} - The updated player object.
 */
const updatePlayer = async (id, updateData) => {
  const response = await api.put(API_ENDPOINTS.PLAYERS.BY_ID(id), updateData);
  return response.data;
};

/**
 * Deletes a player. (Admin only)
 * @param {string} id - The ID of the player to delete.
 * @returns {Promise<object>} - A success message.
 */
const deletePlayer = async (id) => {
  const response = await api.delete(API_ENDPOINTS.PLAYERS.BY_ID(id));
  return response.data;
};


const playerService = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};

export default playerService;