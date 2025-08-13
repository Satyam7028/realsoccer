// server/src/pubsub/index.js
const EventEmitter = require('events');
const logger = require('../config/logger');

// Create a new EventEmitter instance
const pubsub = new EventEmitter();

// Optional: Add some basic logging for events
pubsub.on('new_fixture_event', (data) => {
  logger.info(`PubSub: New fixture event published: ${JSON.stringify(data)}`);
});

pubsub.on('score_update', (data) => {
  logger.info(`PubSub: Live score update published for fixture ${data.fixtureId}: ${data.score.home}-${data.score.away}`);
});

pubsub.on('order_status_change', (data) => {
  logger.info(`PubSub: Order ${data.orderId} status changed to ${data.newStatus}`);
});

// Define common event names (constants)
const EVENTS = {
  NEW_FIXTURE: 'new_fixture_event',
  SCORE_UPDATE: 'score_update',
  FIXTURE_FINISHED: 'fixture_finished',
  NEW_NEWS_ARTICLE: 'new_news_article',
  NEW_PRODUCT: 'new_product',
  ORDER_STATUS_CHANGE: 'order_status_change',
  PAYMENT_STATUS_CHANGE: 'payment_status_change',
  USER_REGISTERED: 'user_registered',
  USER_UPDATED: 'user_updated',
  USER_DELETED: 'user_deleted',
};

module.exports = {
  pubsub,
  EVENTS,
};