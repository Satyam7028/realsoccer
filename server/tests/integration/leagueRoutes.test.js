// server/tests/integration/leagueRoutes.test.js

const request = require('supertest');
const app = require('../../src/index');
const mongoose = require('mongoose');
const League = require('../../src/models/League');
const jwt = require('jsonwebtoken');

// Create a test user with an 'admin' role
const mockAdmin = { _id: new mongoose.Types.ObjectId(), role: 'admin' };
const adminToken = jwt.sign(mockAdmin, process.env.JWT_SECRET, { expiresIn: '1h' });

describe('League API', () => {
  beforeEach(async () => {
    // Clean up the leagues collection before each test
    await League.deleteMany({});
  });

  afterAll(async () => {
    // Close the database connection after all tests are done
    await mongoose.connection.close();
  });

  it('should create a new league (Admin only)', async () => {
    const newLeague = {
      name: 'Premier League',
      country: 'England',
    };
    const res = await request(app)
      .post('/api/leagues')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newLeague);

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('Premier League');
  });

  it('should get all leagues', async () => {
    await League.create({ name: 'La Liga', country: 'Spain' });
    const res = await request(app).get('/api/leagues');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toEqual('La Liga');
  });

  it('should update a league by ID (Admin only)', async () => {
    const league = await League.create({ name: 'Serie A', country: 'Italy' });
    const updatedName = 'Italian Serie A';

    const res = await request(app)
      .put(`/api/leagues/${league._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: updatedName });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(updatedName);
  });
});