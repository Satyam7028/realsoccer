// server/tests/integration/authFlow.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../../src/index');
const User = require('../../src/models/User');
const { jwtSecret } = require('../../src/config/jwt');

let adminUser, adminToken;
let regularUser, regularToken;
let testServer;

beforeAll(async () => {
    // We assume the globalSetup has connected to the database and started the server.
    // We now just create the users needed for the tests.
    adminUser = await User.create({
      username: 'adminuser',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });
    adminToken = jwt.sign({ id: adminUser._id }, jwtSecret, { expiresIn: '1h' });

    regularUser = await User.create({
      username: 'regularuser',
      email: 'user@example.com',
      password: 'password123',
      role: 'user',
    });
    regularToken = jwt.sign({ id: regularUser._id }, jwtSecret, { expiresIn: '1h' });
    
    // The server instance is set up by the global hook, so we get it from there.
    testServer = global.__SERVER__;
});

// A hook to clean up between individual tests within the same file
beforeEach(async () => {
  // Clear any data created by a previous test to ensure a clean state
  await User.deleteMany({ email: { $nin: [adminUser.email, regularUser.email] } });
});

afterAll(async () => {
  // Nothing to do here, globalTeardown handles the cleanup
});


describe('Authentication Flow Integration Tests', () => {
  it('should allow a user to register, login, and access their profile', async () => {
    const registerRes = await request(testServer)
      .post('/api/auth/register')
      .send({
        username: 'newuser_flow',
        email: 'newuser_flow@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
    expect(registerRes.statusCode).toEqual(201);
    expect(registerRes.body).toHaveProperty('token');
    const newUserToken = registerRes.body.token;

    const loginRes = await request(testServer)
      .post('/api/auth/login')
      .send({
        email: 'newuser_flow@example.com',
        password: 'password123',
      });
    expect(loginRes.statusCode).toEqual(200);
    expect(loginRes.body).toHaveProperty('token');

    const profileRes = await request(testServer)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${newUserToken}`);
    expect(profileRes.statusCode).toEqual(200);
    expect(profileRes.body.email).toBe('newuser_flow@example.com');
  });

  it('should prevent access to protected routes without a token', async () => {
    const res = await request(testServer).get('/api/auth/me');
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Not authorized, no token');
  });

  it('should prevent access to protected routes with an invalid token', async () => {
    const res = await request(testServer)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer invalid-token');
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Not authorized, token failed');
  });

  it('should prevent access to admin routes for regular users', async () => {
    const res = await request(testServer)
      .get('/api/admin/dashboard')
      .set('Authorization', `Bearer ${regularToken}`);
    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toBe('Forbidden');
  });

  it('should allow admin users to access admin routes', async () => {
    const res = await request(testServer)
      .get('/api/admin/dashboard')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('usersCount');
  });
});
