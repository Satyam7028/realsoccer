// server/src/index.js

// This must be the very first line to ensure environment variables are loaded.
require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const logger = require('./config/logger');
const connectDB = require('./config/db');

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
// (Add your API routes here)
app.get('/', (req, res) => {
  res.send('RealSoccer API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Use the PORT from the .env file, or a default value
const PORT = process.env.PORT || 5001; // Updated to 5001 to avoid EADDRINUSE error

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
