// For React + components + UI tests
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
  testEnvironment: 'jsdom',                   // ✅ needed for DOM testing
  transformIgnorePatterns: ['/node_modules/(?!axios)/'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
