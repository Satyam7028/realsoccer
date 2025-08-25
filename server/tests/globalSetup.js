// server/tests/globalSetup.js
require('dotenv').config({ path: './.env.test' }); // Add this line to explicitly load the test env file
const mongoose = require('mongoose');
const app = require('../src/index');

module.exports = async () => {
  // Only connect if there is no active connection
  if (mongoose.connection.readyState === 0) {
    const mongoUri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/realsoccer_test';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  const serverInstance = app.listen(0);
  global.__SERVER__ = serverInstance;
  global.__MONGO_URI_TEST__ = mongoose.connection.client.s.url;

  console.log('Test setup complete: Database connected and server started.');
};