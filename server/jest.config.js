// server/jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: [
    "**/tests/**/*.test.js"
  ],
  setupFiles: ['<rootDir>/tests/setup.js'],
  globalSetup: '<rootDir>/tests/globalSetup.js',
  globalTeardown: '<rootDir>/tests/globalTeardown.js',
};
