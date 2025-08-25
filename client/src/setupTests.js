// src/setupTests.js
import '@testing-library/jest-dom';

// Mock the fetch function globally
global.fetch = jest.fn((url) => {
  if (url === '/api/shop/products') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, name: 'Test Product 1', price: 29.99, imageUrl: '/product1.jpg' },
        { id: 2, name: 'Test Product 2', price: 49.99, imageUrl: '/product2.jpg' },
        { id: 3, name: 'Test Product 3', price: 19.99, imageUrl: '/product3.jpg' },
      ]),
    });
  }
  return Promise.reject(new Error('Unknown endpoint'));
});

// Simple axios mock that just provides the create method
jest.mock('axios', () => {
  const mockAxiosInstance = {
    get: jest.fn((url) => {
      if (url === '/api/news') {
        return Promise.resolve({
          data: [
            { id: 1, title: 'Test News 1', summary: 'Test summary 1', imageUrl: '/test1.jpg' },
            { id: 2, title: 'Test News 2', summary: 'Test summary 2', imageUrl: '/test2.jpg' },
            { id: 3, title: 'Test News 3', summary: 'Test summary 3', imageUrl: '/test3.jpg' },
          ]
        });
      }
      if (url === '/api/shop/products') {
        return Promise.resolve({
          data: [
            { id: 1, name: 'Test Product 1', price: 29.99, imageUrl: '/product1.jpg' },
            { id: 2, name: 'Test Product 2', price: 49.99, imageUrl: '/product2.jpg' },
            { id: 3, name: 'Test Product 3', price: 19.99, imageUrl: '/product3.jpg' },
          ]
        });
      }
      return Promise.resolve({ data: [] });
    }),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: {
        use: jest.fn(),
      },
      response: {
        use: jest.fn(),
      },
    },
  };
  
  return {
    create: jest.fn(() => mockAxiosInstance),
    ...mockAxiosInstance,
  };
});

// This is your existing code to suppress a React Router console warning.
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args[0].includes('React Router Future Flag Warning')) {
    return;
  }
  originalConsoleWarn(...args);
};
