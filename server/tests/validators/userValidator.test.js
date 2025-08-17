// server/tests/validators/userValidator.test.js

const {
  validateUserRegistration,
  validateUserLogin
} = require('../../src/validators/userValidator');
const { validationResult } = require('express-validator');

// Mock Express request and response objects for testing
const mockRequest = (body) => ({
  body
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

// Mock next middleware function
const mockNext = jest.fn();

describe('User Validator', () => {
  describe('validateUserRegistration', () => {
    it('should pass validation for a valid user registration request', async () => {
      const req = mockRequest({
        username: 'validuser',
        email: 'test@example.com',
        password: 'password123',
      });
      const res = mockResponse();

      await Promise.all(validateUserRegistration.map(validation => validation.run(req)));
      const errors = validationResult(req);

      expect(errors.isEmpty()).toBe(true);
    });

    it('should fail validation for an invalid email format', async () => {
      const req = mockRequest({
        username: 'invaliduser',
        email: 'invalid-email',
        password: 'password123',
      });
      const res = mockResponse();

      await Promise.all(validateUserRegistration.map(validation => validation.run(req)));
      const errors = validationResult(req);

      expect(errors.isEmpty()).toBe(false);
      expect(errors.array()).toHaveLength(1);
      expect(errors.array()[0].msg).toBe('Please enter a valid email address');
    });
  });

  describe('validateUserLogin', () => {
    it('should pass validation for a valid user login request', async () => {
      const req = mockRequest({
        email: 'test@example.com',
        password: 'password123',
      });
      const res = mockResponse();

      await Promise.all(validateUserLogin.map(validation => validation.run(req)));
      const errors = validationResult(req);

      expect(errors.isEmpty()).toBe(true);
    });

    it('should fail validation for an invalid password length', async () => {
      const req = mockRequest({
        email: 'test@example.com',
        password: '123',
      });
      const res = mockResponse();

      await Promise.all(validateUserLogin.map(validation => validation.run(req)));
      const errors = validationResult(req);

      expect(errors.isEmpty()).toBe(false);
      expect(errors.array()).toHaveLength(1);
      expect(errors.array()[0].msg).toBe('Please add a password');
    });
  });
});