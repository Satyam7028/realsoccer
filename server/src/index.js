// server/src/index.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const logger = require('./config/logger');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const fixtureRoutes = require('./routes/fixtureRoutes');
const leagueRoutes = require('./routes/leagueRoutes');
const newsRoutes = require('./routes/newsRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const playerRoutes = require('./routes/playerRoutes');
const shopRoutes = require('./routes/shopRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

// Connect to the database
connectDB();

// Load Swagger document
const swaggerPath = path.join(__dirname, '../swagger/swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(helmet()); // Add Helmet for security headers

// Rate limiting for login and registration to prevent brute-force attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', apiLimiter);

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

if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
}