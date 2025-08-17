// server/tests/integration/playerRoutes.test.js

const request = require('supertest');
const app = require('../../src/index');
const mongoose = require('mongoose');
const Player = require('../../src/models/Player');

describe('Player API', () => {
  // A test user and a test player to be created and used in tests
  let testPlayer;

  beforeAll(async () => {
    // Clear the players collection and create a test player before all tests
    await Player.deleteMany({});
    testPlayer = await Player.create({
      name: 'Lionel Messi',
      team: 'Inter Miami',
      position: 'Forward',
      nationality: 'Argentine',
      jerseyNumber: 10,
    });
  });

  afterAll(async () => {
    // Clean up the test database after all tests
    await Player.deleteMany({});
    await mongoose.connection.close();
  });

  it('should get all players', async () => {
    const res = await request(app).get('/api/players');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    // You can add more specific assertions here, like checking for the created player
    expect(res.body.some(player => player.name === 'Lionel Messi')).toBe(true);
  });

  it('should get a specific player by ID', async () => {
    const res = await request(app).get(`/api/players/${testPlayer._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Lionel Messi');
  });
});