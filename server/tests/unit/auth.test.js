// server/tests/unit/auth.test.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/User');
const { register, login, getUserProfile } = require('../../src/services/authService');
const { jwtSecret } = require('../../src/config/jwt');

// Mock mongoose connect and disconnect
jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  connect: jest.fn(),
  disconnect: jest.fn(),
  Schema: jest.fn((schema) => ({
    pre: jest.fn(),
    methods: {
      matchPassword: jest.fn(),
    },
  })),
  model: jest.fn((name, schema) => {
    const model = {
      findOne: jest.fn(),
      create: jest.fn(),
      findById: jest.fn().mockImplementation(() => {
        const chainable = {
          select: jest.fn().mockReturnThis(),
        };
        return chainable;
      }),
    };
    return model;
  }),
  Types: {
    ObjectId: {
      isValid: jest.fn().mockReturnValue(true),
    },
  },
}));

// Mock bcrypt and jsonwebtoken
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Service Unit Tests', () => {
  let mockUser;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUser = {
      _id: '60c72b2f9b1d8c001c8e4d8c',
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword',
      role: 'user',
      profileImage: 'http://example.com/profile.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      matchPassword: jest.fn(),
      toObject: jest.fn().mockReturnThis(),
    };

    // Correctly mock the chained behavior for findById().select()
    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser),
    });

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(mockUser);
    bcrypt.hash.mockResolvedValue('newhashedpassword');
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mocked_jwt_token');
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const newUser = await register('newuser', 'new@example.com', 'password123');

      expect(User.findOne).toHaveBeenCalledWith({ $or: [{ email: 'new@example.com' }, { username: 'newuser' }] });
      expect(User.create).toHaveBeenCalledWith({
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
        role: 'user',
      });
      expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser._id }, jwtSecret, { expiresIn: expect.any(String) });
      expect(newUser).toEqual({
        _id: mockUser._id,
        username: mockUser.username,
        email: mockUser.email,
        role: mockUser.role,
        token: 'mocked_jwt_token',
      });
    });

    it('should throw an error if user already exists', async () => {
      User.findOne.mockResolvedValue(mockUser);

      await expect(register('testuser', 'test@example.com', 'password123')).rejects.toThrow('User with that email or username already exists');
      expect(User.create).not.toHaveBeenCalled();
    });

    it('should throw an error if user creation fails', async () => {
      User.create.mockResolvedValue(null);

      await expect(register('newuser', 'new@example.com', 'password123')).rejects.toThrow('Invalid user data provided for registration');
    });
  });

  describe('login', () => {
    it('should log in a user successfully', async () => {
      User.findOne.mockResolvedValue(mockUser);
      mockUser.matchPassword.mockResolvedValue(true);

      const loggedInUser = await login('test@example.com', 'password123');

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockUser.matchPassword).toHaveBeenCalledWith('password123');
      expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser._id }, jwtSecret, { expiresIn: expect.any(String) });
      expect(loggedInUser).toEqual({
        _id: mockUser._id,
        username: mockUser.username,
        email: mockUser.email,
        role: mockUser.role,
        token: 'mocked_jwt_token',
      });
    });

    it('should throw an error for invalid email', async () => {
      User.findOne.mockResolvedValue(null);

      await expect(login('nonexistent@example.com', 'password123')).rejects.toThrow('Invalid email or password');
    });

    it('should throw an error for invalid password', async () => {
      User.findOne.mockResolvedValue(mockUser);
      mockUser.matchPassword.mockResolvedValue(false);

      await expect(login('test@example.com', 'wrongpassword')).rejects.toThrow('Invalid email or password');
    });
  });

  describe('getUserProfile', () => {
    it('should retrieve user profile successfully', async () => {
      const profile = await getUserProfile(mockUser._id);
      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
      expect(User.findById().select).toHaveBeenCalledWith('-password');
      expect(profile).toEqual({
        _id: mockUser._id,
        username: mockUser.username,
        email: mockUser.email,
        role: mockUser.role,
        profileImage: mockUser.profileImage,
      });
    });

    it('should throw an error if user profile not found', async () => {
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await expect(getUserProfile('nonexistentid')).rejects.toThrow('User not found');
    });
  });
});
