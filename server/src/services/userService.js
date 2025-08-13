// server/src/services/userService.js
const User = require('../models/User');
const logger = require('../config/logger');

/**
 * Retrieves all users from the database.
 * @returns {Array<object>} - An array of user objects, excluding passwords.
 */
const getAllUsers = async () => {
  const users = await User.find({}).select('-password');
  logger.info('UserService: Fetched all users.');
  return users;
};

/**
 * Retrieves a single user by their ID.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {object} - The user object, excluding password.
 * @throws {Error} If user not found.
 */
const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  logger.info(`UserService: Fetched user by ID: ${userId}`);
  return user;
};

/**
 * Updates a user's information.
 * @param {string} userId - The ID of the user to update.
 * @param {object} updateData - An object containing fields to update (e.g., username, email, role, profileImage, password).
 * @returns {object} - The updated user object, excluding password.
 * @throws {Error} If user not found or invalid update data.
 */
const updateUser = async (userId, updateData) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Update fields if provided
  user.username = updateData.username || user.username;
  user.email = updateData.email || user.email;
  user.role = updateData.role || user.role;
  user.profileImage = updateData.profileImage || user.profileImage;

  // Handle password update separately as it needs hashing
  if (updateData.password) {
    user.password = updateData.password; // Pre-save hook will hash this
  }

  const updatedUser = await user.save();
  logger.info(`UserService: User updated - ${updatedUser.email}`);
  return updatedUser.toObject({ getters: true, virtuals: false }); // Convert to plain object, exclude password
};

/**
 * Deletes a user from the database.
 * @param {string} userId - The ID of the user to delete.
 * @returns {object} - A success message.
 * @throws {Error} If user not found.
 */
const deleteUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  await user.remove(); // Mongoose v5: user.remove(), Mongoose v6+: user.deleteOne()
  logger.info(`UserService: User deleted - ${user.email}`);
  return { message: 'User removed successfully' };
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};