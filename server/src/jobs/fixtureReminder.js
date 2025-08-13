// server/src/jobs/fixtureReminder.js
const Fixture = require('../models/Fixture');
const User = require('../models/User'); // Assuming users might subscribe to reminders
const { sendEmail, sendOrderConfirmationEmail } = require('../services/emailService'); // Reusing email service
const logger = require('../config/logger');

// This function would send reminders for upcoming fixtures
const sendFixtureReminders = async () => {
  try {
    const now = new Date();
    // Find fixtures scheduled for, for example, the next 24 hours that are still 'scheduled'
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const upcomingFixtures = await Fixture.find({
      status: 'scheduled',
      date: { $gte: now, $lte: twentyFourHoursFromNow },
    }).populate('league', 'name'); // Populate league name for better reminder message

    if (upcomingFixtures.length === 0) {
      logger.info('FixtureReminder: No upcoming fixtures for reminders.');
      return;
    }

    logger.info(`FixtureReminder: Sending reminders for ${upcomingFixtures.length} upcoming fixtures.`);

    // In a real application, you'd have a mechanism for users to subscribe
    // For demonstration, we'll just log and assume a generic user or fetch all users
    const allUsers = await User.find({}).select('email username'); // Get all users to send reminders to

    for (const fixture of upcomingFixtures) {
      const fixtureTime = fixture.date.toLocaleString();
      const subject = `Upcoming Fixture Reminder: ${fixture.homeTeam} vs ${fixture.awayTeam}`;
      const text = `Don't miss the match! ${fixture.homeTeam} will play against ${fixture.awayTeam} on ${fixtureTime} at ${fixture.location}. League: ${fixture.league.name}.`;
      const html = `
        <p>Don't miss the match!</p>
        <p><strong>${fixture.homeTeam}</strong> will play against <strong>${fixture.awayTeam}</strong> on <strong>${fixtureTime}</strong> at <strong>${fixture.location}</strong>.</p>
        <p>League: ${fixture.league.name}.</p>
        <p>Tune in!</p>
      `;

      for (const user of allUsers) {
        try {
          await sendEmail({
            to: user.email,
            subject,
            text,
            html,
          });
          logger.debug(`FixtureReminder: Sent reminder to ${user.email} for fixture ${fixture._id}`);
        } catch (emailError) {
          logger.error(`FixtureReminder: Failed to send email to ${user.email} for fixture ${fixture._id}: ${emailError.message}`);
        }
      }
      // Optional: Mark fixture as 'reminder_sent' to avoid sending multiple times
      // fixture.reminderSent = true;
      // await fixture.save();
    }
    logger.info('FixtureReminder: Fixture reminder cycle completed.');
  } catch (error) {
    logger.error(`FixtureReminder: Error sending fixture reminders: ${error.message}`);
  }
};

// This function would be called periodically, e.g., using a cron job library like 'node-cron'
// Example: to run once a day at a specific time (e.g., 9 AM)
// const cron = require('node-cron');
// cron.schedule('0 9 * * *', () => {
//   sendFixtureReminders();
// });

module.exports = {
  sendFixtureReminders,
};