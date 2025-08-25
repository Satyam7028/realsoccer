// For Node.js + Express + Mongoose tests
module.exports = {
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules/(?!axios)/'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  // Add these two lines to correctly configure global setup and teardown
  globalSetup: '<rootDir>/tests/globalSetup.js',
  globalTeardown: '<rootDir>/tests/globalTeardown.js',
};