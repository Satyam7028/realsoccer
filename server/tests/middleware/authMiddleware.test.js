// server/tests/middleware/authMiddleware.test.js
const { protect } = require('../../src/middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/User');
const mongoose = require('mongoose');

describe('Auth Middleware', () => {
  let req, res, next;
  const SECRET_KEY = process.env.JWT_SECRET;
  const mockUser = { _id: '60c72b2f9b1d8c1e8c8b4567', role: 'user' }; // Mongoose object requires _id
  const mockToken = jwt.sign(mockUser, SECRET_KEY, { expiresIn: '1h' });

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });
  
  it('should call next() if a valid token is provided', async () => {
    req.headers.authorization = `Bearer ${mockToken}`;
    
    // Mock the User.findById to return a mock user object
    jest.spyOn(User, 'findById').mockResolvedValue({
      id: mockUser._id,
      select: () => ({
        exec: () => mockUser
      })
    });
    
    await protect(req, res, next);
    
    expect(req.user).toBeDefined();
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return 401 if no token is provided', async () => {
    await protect(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if an invalid token is provided', async () => {
    req.headers.authorization = 'Bearer invalidtoken';
    
    await protect(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, token failed' });
    expect(next).not.toHaveBeenCalled();
  });
});