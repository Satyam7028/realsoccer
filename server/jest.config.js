// For Node.js + Express + Mongoose tests
module.exports = {
  setupFiles: ['dotenv/config'],              // loads .env.test automatically
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
  testEnvironment: 'node',                    // ✅ fix Mongoose warning
  transformIgnorePatterns: ['/node_modules/(?!axios)/'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
