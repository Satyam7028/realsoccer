// server/src/index.js

// Conditionally load environment variables unless in a test environment
if (process.env.NODE_ENV !== 'test') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const logger = require('./config/logger');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const fixtureRoutes = require('./routes/fixtureRoutes');
const leagueRoutes = require('./routes/leagueRoutes');
const newsRoutes = require('./routes/newsRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const playerRoutes = require('./routes/playerRotues');
const shopRoutes = require('./routes/shopRoutes');
const userRoutes = require('./routes/userRotues');
const errorHandler = require('./middleware/errorHandler');

// Connect to the database
connectDB();

// Load Swagger document
const swaggerPath = path.join(__dirname, '../swagger/swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/leagues', leagueRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('RealSoccer API is running...');
});

// Error handling middleware
app.use(errorHandler);

// Always export the app for testing purposes
module.exports = app;

// Only listen for connections if not in a test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
}
