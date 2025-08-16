// server/tests/unit/playerService.test.js
const mongoose = require('mongoose');
const Player = require('../../src/models/Player');
const {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} = require('../../src/services/playerService');

// Mock mongoose connect and disconnect
jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  connect: jest.fn(),
  disconnect: jest.fn(),
  model: jest.fn((name, schema) => ({
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  })),
  Schema: jest.fn(),
}));

describe('Player Service Unit Tests', () => {
  let mockPlayer;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    mockPlayer = {
      _id: '60c72b2f9b1d8c001c8e4d8c',
      name: 'Test Player',
      team: 'Test Team',
      position: 'Forward',
      // Corrected to use 'jerseyNumber' to match the Player model
      jerseyNumber: 10,
    };

    // Default mock implementations for Mongoose methods
    Player.find.mockResolvedValue([mockPlayer]);
    Player.findById.mockResolvedValue(mockPlayer);
    Player.create.mockResolvedValue(mockPlayer);
    // Updated to use findByIdAndUpdate, which is the correct method
    Player.findByIdAndUpdate.mockResolvedValue(mockPlayer);
    // Updated to use findByIdAndDelete, which is the correct method
    Player.findByIdAndDelete.mockResolvedValue({ message: 'Player removed successfully' });
  });

  describe('createPlayer', () => {
    it('should create a new player successfully', async () => {
      const playerData = {
        name: 'New Player',
        team: 'New Team',
        position: 'Defender',
        // Corrected to use 'jerseyNumber' to match the Player model
        jerseyNumber: 5,
      };
      await createPlayer(playerData);
      expect(Player.create).toHaveBeenCalledWith(playerData);
    });
  });

  describe('getPlayers', () => {
    it('should retrieve a list of all players', async () => {
      const players = await getPlayers();
      expect(Player.find).toHaveBeenCalledTimes(1);
      expect(players).toEqual([mockPlayer]);
    });
  });

  describe('getPlayerById', () => {
    it('should retrieve a player by their ID', async () => {
      const player = await getPlayerById(mockPlayer._id);
      expect(Player.findById).toHaveBeenCalledWith(mockPlayer._id);
      expect(player).toEqual(mockPlayer);
    });

    it('should throw an error if player is not found', async () => {
      Player.findById.mockResolvedValue(null);
      await expect(getPlayerById('nonexistent-id')).rejects.toThrow('Player not found');
    });
  });

  describe('updatePlayer', () => {
    it('should update a player successfully', async () => {
      const updatedData = { name: 'Updated Player' };
      const updatedPlayer = await updatePlayer(mockPlayer._id, updatedData);
      expect(Player.findByIdAndUpdate).toHaveBeenCalledWith(
        mockPlayer._id,
        updatedData, { new: true, runValidators: true }
      );
      expect(updatedPlayer).toEqual(mockPlayer);
    });

    it('should throw an error if player to update is not found', async () => {
      Player.findByIdAndUpdate.mockResolvedValue(null);
      await expect(updatePlayer('nonexistent-id', {})).rejects.toThrow('Player not found');
    });
  });

  describe('deletePlayer', () => {
    it('should delete a player successfully', async () => {
      // Test now expects the corrected findByIdAndDelete method to be called
      const result = await deletePlayer(mockPlayer._id);
      expect(Player.findByIdAndDelete).toHaveBeenCalledWith(mockPlayer._id);
      expect(result).toEqual({ message: 'Player removed successfully' });
    });

    it('should throw an error if player to delete is not found', async () => {
      Player.findByIdAndDelete.mockResolvedValue(null);
      await expect(deletePlayer('nonexistent-id')).rejects.toThrow('Player not found');
    });
  });
});
