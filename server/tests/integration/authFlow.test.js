// server/tests/integration/authFlow.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/index'); // Your Express app
const User = require('../../src/models/User');
const { jwtSecret } = require('../../src/config/jwt');
const jwt = require('jsonwebtoken');

// Connect to a test database before all tests
beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/realsoccer_test';
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear the User collection before each test
beforeEach(async () => {
  await User.deleteMany({});
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Authentication Flow Integration Tests', () => {
  const testUser = {
    username: 'authflowuser',
    email: 'authflow@example.com',
    password: 'authpassword123',
  };

  it('should allow a user to register, login, and access their profile', async () => {
    // 1. Register
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(registerRes.statusCode).toEqual(201);
    expect(registerRes.body).toHaveProperty('token');
    expect(registerRes.body.email).toBe(testUser.email);
    const registeredToken = registerRes.body.token;

    // 2. Login with the registered user's credentials
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(loginRes.statusCode).toEqual(200);
    expect(loginRes.body).toHaveProperty('token');
    const loggedInToken = loginRes.body.token;
    expect(loggedInToken).toBe(registeredToken); // Should be the same token if no expiration happened

    // 3. Access profile with the obtained token
    const profileRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${loggedInToken}`);

    expect(profileRes.statusCode).toEqual(200);
    expect(profileRes.body.email).toBe(testUser.email);
    expect(profileRes.body.username).toBe(testUser.username);
    expect(profileRes.body).not.toHaveProperty('password');
  });

  it('should prevent access to protected routes without a token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Not authorized, no token');
  });

  it('should prevent access to protected routes with an invalid token', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer invalidtoken123');
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Not authorized, token failed');
  });

  it('should prevent access to admin routes for regular users', async () => {
    // Register a regular user
    const regularUser = await User.create({
      username: 'regularuser_auth',
      email: 'regular_auth@example.com',
      password: 'password123',
      role: 'user',
    });
    const regularUserToken = jwt.sign({ id: regularUser._id }, jwtSecret, { expiresIn: '1h' });

    // Attempt to access an admin-only route (e.g., get all users)
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${regularUserToken}`);
    expect(res.statusCode).toEqual(403); // Forbidden
    expect(res.body.message).toContain('Access denied');
  });

  it('should allow admin users to access admin routes', async () => {
    // Register an admin user
    const adminUser = await User.create({
      username: 'adminuser_auth',
      email: 'admin_auth@example.com',
      password: 'adminpassword123',
      role: 'admin',
    });
    const adminUserToken = jwt.sign({ id: adminUser._id }, jwtSecret, { expiresIn: '1h' });

    // Attempt to access an admin-only route (e.g., get all users)
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminUserToken}`);
    expect(res.statusCode).toEqual(200); // OK
    expect(Array.isArray(res.body)).toBe(true);
  });
});