// server/tests/unit/user.test.js

const mongoose = require('mongoose');
const User = require('../../src/models/User');

describe('User Model', () => {
  beforeAll(async () => {
    // Connect to a test database before all tests
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect after all tests
    await mongoose.connection.close();
  });

  it('should hash the password before saving a new user', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    await user.save();

    // Verify that the password is not the same as the plain text password
    expect(user.password).not.toBe('password123');
  });

  it('should correctly match the entered password with the hashed password', async () => {
    const user = new User({
      username: 'testuser2',
      email: 'test2@example.com',
      password: 'password123',
    });

    await user.save();

    const isMatch = await user.matchPassword('password123');
    expect(isMatch).toBe(true);

    const isNotMatch = await user.matchPassword('wrongpassword');
    expect(isNotMatch).toBe(false);
  });
});