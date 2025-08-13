// server/src/models/League.js
const mongoose = require('mongoose');

const leagueSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a league name'],
      unique: true,
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Please add the league\'s country'],
      trim: true,
    },
    logo: {
      type: String,
      default: 'https://placehold.co/150x150/cccccc/333333?text=League', // Placeholder image
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    season: {
      type: String,
      required: false,
      trim: true,
      default: new Date().getFullYear().toString(), // Default to current year
    },
    // You might want to add fields for current standings, top scorers, etc.
    // These could also be dynamically generated or stored in separate collections
    // to avoid large document sizes if they update frequently.
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const League = mongoose.model('League', leagueSchema);

module.exports = League;