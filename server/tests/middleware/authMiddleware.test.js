// server/tests/middleware/authMiddleware.test.js

const jwt = require('jsonwebtoken');
const authMiddleware = require('../../src/middleware/authMiddleware');
const User = require('../../src/models/User');

// Mock a valid user for testing
const mockUser = {
  _id: '60c72b2f9b1d8e001c8a4d4a',
  role: 'user',
};

// Mock a JWT secret
const mockSecret = 'test_secret';
process.env.JWT_SECRET = mockSecret;

describe('authMiddleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next() if a valid token is provided', () => {
    // Create a valid token
    const token = jwt.sign(mockUser, mockSecret, { expiresIn: '1h' });
    req.headers.authorization = `Bearer ${token}`;

    authMiddleware(req, res, next);
    // The middleware should successfully decode the token and call next
    expect(req.user).toBeDefined();
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if no token is provided', () => {
    authMiddleware(req, res, next);
    // The middleware should not call next and should return a 401 error
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if an invalid token is provided', () => {
    req.headers.authorization = 'Bearer invalidtoken';

    authMiddleware(req, res, next);
    // The middleware should not call next and should return a 401 error
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, token failed' });
    expect(next).not.toHaveBeenCalled();
  });
});