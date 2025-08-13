// server/src/models/Player.js
const mongoose = require('mongoose');

const playerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a player name'],
      trim: true,
    },
    team: {
      type: String, // Could be a reference to a Team model if we had one
      required: [true, 'Please add the player\'s team'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Please add the player\'s position'],
      enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'], // Common football positions
    },
    nationality: {
      type: String,
      required: [true, 'Please add the player\'s nationality'],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please add the player\'s date of birth'],
    },
    height: {
      type: Number, // in cm
      required: false,
    },
    weight: {
      type: Number, // in kg
      required: false,
    },
    jerseyNumber: {
      type: Number,
      required: false,
    },
    profileImage: {
      type: String,
      default: 'https://placehold.co/150x150/cccccc/333333?text=Player', // Placeholder image
    },
    statistics: {
      matchesPlayed: { type: Number, default: 0 },
      goals: { type: Number, default: 0 },
      assists: { type: Number, default: 0 },
      cleanSheets: { type: Number, default: 0 }, // Primarily for goalkeepers/defenders
      redCards: { type: Number, default: 0 },
      yellowCards: { type: Number, default: 0 },
      // Add more specific statistics as needed
    },
    biography: {
      type: String,
      required: false,
      trim: true,
    },
    // Reference to the league(s) the player plays in (optional, can be inferred from fixtures)
    // leagues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'League' }],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;