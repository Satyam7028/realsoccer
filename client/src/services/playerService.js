// client/src/services/playerService.js
import api from './api';

const getPlayers = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/players?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPlayerById = async (id) => {
  try {
    const response = await api.get(`/players/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createPlayer = async (playerData) => {
  try {
    const response = await api.post('/players', playerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updatePlayer = async (id, playerData) => {
  try {
    const response = await api.put(`/players/${id}`, playerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deletePlayer = async (id) => {
  try {
    await api.delete(`/players/${id}`);
  } catch (error) {
    throw error;
  }
};

const playerService = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};

export default playerService;