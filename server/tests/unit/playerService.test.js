// server/tests/unit/playerService.test.js
const mongoose = require('mongoose');
const Player = require('../../src/models/Player');
const {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} = require('../../src/services/playerService');

// Mock Player model
jest.mock('../../src/models/Player', () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  remove: jest.fn(), // For Mongoose v5 .remove()
  deleteOne: jest.fn(), // For Mongoose v6+ .deleteOne()
}));

describe('Player Service Unit Tests', () => {
  let mockPlayer;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test

    mockPlayer = {
      _id: '60c72b2f9b1d8c001c8e4d8d',
      name: 'Lionel Messi',
      team: 'Paris Saint-Germain',
      position: 'Forward',
      nationality: 'Argentinian',
      dateOfBirth: new Date('1987-06-24'),
      height: 170,
      weight: 72,
      jerseyNumber: 30,
      profileImage: 'http://example.com/messi.jpg',
      statistics: {
        matchesPlayed: 800,
        goals: 700,
        assists: 300,
      },
      biography: 'One of the greatest footballers of all time.',
      createdAt: new Date(),
      updatedAt: new Date(),
      save: jest.fn().mockResolvedValue(this), // Mock save method
      remove: jest.fn().mockResolvedValue({ message: 'Player removed successfully' }), // Mock remove for Mongoose v5
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }), // Mock deleteOne for Mongoose v6+
    };

    // Default mock implementations for Player model methods
    Player.create.mockResolvedValue(mockPlayer);
    Player.find.mockResolvedValue([mockPlayer]);
    Player.findById.mockResolvedValue(mockPlayer);
  });

  describe('createPlayer', () => {
    it('should create a new player successfully', async () => {
      const playerDetails = {
        name: 'Cristiano Ronaldo',
        team: 'Al Nassr',
        position: 'Forward',
        nationality: 'Portuguese',
        dateOfBirth: new Date('1985-02-05'),
      };
      Player.create.mockResolvedValue({ ...mockPlayer, name: 'Cristiano Ronaldo' });

      const newPlayer = await createPlayer(playerDetails);

      expect(Player.create).toHaveBeenCalledWith(expect.objectContaining(playerDetails));
      expect(newPlayer.name).toBe('Cristiano Ronaldo');
    });

    it('should throw an error if player creation fails', async () => {
      Player.create.mockResolvedValue(null); // Simulate creation failure

      await expect(createPlayer({})).rejects.toThrow('Invalid player data provided');
    });
  });

  describe('getAllPlayers', () => {
    it('should retrieve all players', async () => {
      const players = await getAllPlayers();

      expect(Player.find).toHaveBeenCalledWith({});
      expect(players).toEqual([mockPlayer]);
    });

    it('should retrieve players with filters', async () => {
      const filteredPlayers = [{ ...mockPlayer, team: 'FC Barcelona' }];
      Player.find.mockResolvedValue(filteredPlayers);

      const players = await getAllPlayers({ team: 'FC Barcelona' });

      expect(Player.find).toHaveBeenCalledWith({ team: 'FC Barcelona' });
      expect(players).toEqual(filteredPlayers);
    });
  });

  describe('getPlayerById', () => {
    it('should retrieve a player by ID', async () => {
      const player = await getPlayerById(mockPlayer._id);

      expect(Player.findById).toHaveBeenCalledWith(mockPlayer._id);
      expect(player).toEqual(mockPlayer);
    });

    it('should throw an error if player not found by ID', async () => {
      Player.findById.mockResolvedValue(null);

      await expect(getPlayerById('nonexistentid')).rejects.toThrow('Player not found');
    });
  });

  describe('updatePlayer', () => {
    it('should update a player successfully', async () => {
      const updateData = {
        team: 'Inter Miami CF',
        jerseyNumber: 10,
      };
      // Mock the save method to return the updated player
      mockPlayer.save.mockResolvedValue({ ...mockPlayer, ...updateData });

      const updatedPlayer = await updatePlayer(mockPlayer._id, updateData);

      expect(Player.findById).toHaveBeenCalledWith(mockPlayer._id);
      expect(mockPlayer.save).toHaveBeenCalled();
      expect(updatedPlayer.team).toBe('Inter Miami CF');
      expect(updatedPlayer.jerseyNumber).toBe(10);
    });

    it('should throw an error if player not found for update', async () => {
      Player.findById.mockResolvedValue(null);

      await expect(updatePlayer('nonexistentid', { name: 'New Name' })).rejects.toThrow('Player not found');
    });
  });

  describe('deletePlayer', () => {
    it('should delete a player successfully', async () => {
      const result = await deletePlayer(mockPlayer._id);

      expect(Player.findById).toHaveBeenCalledWith(mockPlayer._id);
      // Check for either remove (Mongoose 5) or deleteOne (Mongoose 6+)
      expect(Player.remove).toHaveBeenCalledTimes(1) || expect(Player.deleteOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ message: 'Player removed successfully' });
    });

    it('should throw an error if player not found for deletion', async () => {
      Player.findById.mockResolvedValue(null);

      await expect(deletePlayer('nonexistentid')).rejects.toThrow('Player not found');
    });
  });
});