const { body, validationResult } = require('express-validator');
const { validateUserRegistration, validateUserLogin } = require('../../src/validators/userValidator');
const { mockRequest, mockResponse } = require('../mocks');

jest.mock('express-validator', () => ({
  body: jest.fn(() => ({
    notEmpty: jest.fn(() => ({
      withMessage: jest.fn(() => ({
        trim: jest.fn(() => ({
          escape: jest.fn(() => ({
            run: jest.fn(() => true),
          })),
        })),
        isEmail: jest.fn(() => ({
          withMessage: jest.fn(() => ({
            normalizeEmail: jest.fn(() => ({
              run: jest.fn(() => true),
            })),
          })),
        })),
        isLength: jest.fn(() => ({
          withMessage: jest.fn(() => ({
            run: jest.fn(() => true),
          })),
        })),
      })),
    })),
    isEmail: jest.fn(() => ({
      withMessage: jest.fn(() => ({
        normalizeEmail: jest.fn(() => ({
          run: jest.fn(() => true),
        })),
      })),
    })),
    isLength: jest.fn(() => ({
      withMessage: jest.fn(() => ({
        run: jest.fn(() => true),
      })),
    })),
    custom: jest.fn(() => ({
      withMessage: jest.fn(() => ({
        run: jest.fn(() => true),
      })),
    })),
  })),
  validationResult: jest.fn(() => ({
    isEmpty: () => true,
    array: () => [],
  })),
}));

describe('User Validator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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