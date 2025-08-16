// server/tests/globalTeardown.js
const mongoose = require('mongoose');

module.exports = async () => {
  // Only close the connection if it's open
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  }
  global.__SERVER__.close();

  console.log('Test teardown complete: Database disconnected and server closed.');
};