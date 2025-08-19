// setupTests.js
import '@testing-library/jest-dom';

// Mock axios for tests
jest.mock('axios', () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }
}));
