// server/tests/unit/auth.test.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/User');
const { register, login, getUserProfile } = require('../../src/services/authService');
const { jwtSecret } = require('../../src/config/jwt');

// Mock mongoose connect and disconnect
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
  Schema: jest.fn((schema) => ({
    pre: jest.fn(),
    methods: {
      matchPassword: jest.fn(),
    },
  })),
  model: jest.fn((name, schema) => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    select: jest.fn().mockReturnThis(), // Allow chaining .select()
  })),
  Types: {
    ObjectId: {
      isValid: jest.fn().mockReturnValue(true), // Mock for mongoose.Types.ObjectId.isValid
    },
  },
}));

// Mock bcrypt and jsonwebtoken
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Service Unit Tests', () => {
  let mockUser;

  beforeEach(() => {
    // Reset mocks before each test
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
      toObject: jest.fn().mockReturnThis(), // Mock toObject for .select() and other operations
    };

    // Default mock implementations
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(mockUser);
    User.findById.mockResolvedValue(mockUser);
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
      User.findOne.mockResolvedValue(mockUser); // Simulate user existing

      await expect(register('testuser', 'test@example.com', 'password123')).rejects.toThrow('User with that email or username already exists');
      expect(User.create).not.toHaveBeenCalled();
    });

    it('should throw an error if user creation fails', async () => {
      User.create.mockResolvedValue(null); // Simulate creation failure

      await expect(register('newuser', 'new@example.com', 'password123')).rejects.toThrow('Invalid user data provided for registration');
    });
  });

  describe('login', () => {
    it('should log in a user successfully', async () => {
      User.findOne.mockResolvedValue(mockUser);
      mockUser.matchPassword.mockResolvedValue(true); // Ensure matchPassword returns true

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
      User.findOne.mockResolvedValue(null); // No user found

      await expect(login('nonexistent@example.com', 'password123')).rejects.toThrow('Invalid email or password');
    });

    it('should throw an error for invalid password', async () => {
      User.findOne.mockResolvedValue(mockUser);
      mockUser.matchPassword.mockResolvedValue(false); // Incorrect password

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
      User.findById.mockResolvedValue(null); // User not found

      await expect(getUserProfile('nonexistentid')).rejects.toThrow('User not found');
    });
  });
});