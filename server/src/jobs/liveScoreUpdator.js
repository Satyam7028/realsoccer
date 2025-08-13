// server/src/jobs/liveScoreUpdater.js
const Fixture = require('../models/Fixture');
const logger = require('../config/logger');

// This function would typically fetch real-time data from a sports API
// For demonstration, we'll simulate score updates for 'live' fixtures
const updateLiveScores = async () => {
  try {
    // Find all fixtures that are currently 'live'
    const liveFixtures = await Fixture.find({ status: 'live' });

    if (liveFixtures.length === 0) {
      logger.info('LiveScoreUpdater: No live fixtures to update.');
      return;
    }

    logger.info(`LiveScoreUpdater: Updating scores for ${liveFixtures.length} live fixtures.`);

    for (const fixture of liveFixtures) {
      // Simulate a score change or event
      // In a real application, this would be replaced by API calls
      const randomScoreChangeHome = Math.random() > 0.9 ? 1 : 0; // 10% chance to score
      const randomScoreChangeAway = Math.random() > 0.9 ? 1 : 0;

      let updated = false;

      if (randomScoreChangeHome > 0) {
        fixture.score.home += randomScoreChangeHome;
        // Simulate a goal event
        fixture.events.push({
          type: 'goal',
          minute: Math.floor(Math.random() * 90) + 1, // Random minute
          description: `${fixture.homeTeam} scores!`,
        });
        updated = true;
      }
      if (randomScoreChangeAway > 0) {
        fixture.score.away += randomScoreChangeAway;
        // Simulate a goal event
        fixture.events.push({
          type: 'goal',
          minute: Math.floor(Math.random() * 90) + 1, // Random minute
          description: `${fixture.awayTeam} scores!`,
        });
        updated = true;
      }

      // Simulate a fixture ending randomly
      if (Math.random() > 0.95 && fixture.date < new Date(Date.now() - 90 * 60 * 1000)) { // If fixture started more than 90 mins ago
        fixture.status = 'finished';
        logger.info(`LiveScoreUpdater: Fixture ${fixture.homeTeam} vs ${fixture.awayTeam} has finished.`);
        updated = true;
      }

      if (updated) {
        await fixture.save();
        logger.debug(`LiveScoreUpdater: Updated fixture ${fixture._id} to ${fixture.score.home}-${fixture.score.away}.`);
      }
    }
    logger.info('LiveScoreUpdater: Live score update cycle completed.');
  } catch (error) {
    logger.error(`LiveScoreUpdater: Error updating live scores: ${error.message}`);
  }
};

// This function would be called periodically, e.g., using a cron job library like 'node-cron'
// For example, to run every minute:
// const cron = require('node-cron');
// cron.schedule('* * * * *', () => {
//   updateLiveScores();
// });

module.exports = {
  updateLiveScores,
};