// server/src/models/Fixture.js
const mongoose = require('mongoose');

const fixtureSchema = mongoose.Schema(
  {
    homeTeam: {
      type: String, // Could be a reference to a Team model
      required: [true, 'Please add the home team name'],
      trim: true,
    },
    awayTeam: {
      type: String, // Could be a reference to a Team model
      required: [true, 'Please add the away team name'],
      trim: true,
    },
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'League',
      required: [true, 'Please specify the league for this fixture'],
    },
    date: {
      type: Date,
      required: [true, 'Please add the fixture date and time'],
    },
    location: {
      type: String,
      required: [true, 'Please add the fixture location (stadium)'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'live', 'finished', 'postponed', 'cancelled'],
      default: 'scheduled',
    },
    score: {
      home: {
        type: Number,
        default: 0,
      },
      away: {
        type: Number,
        default: 0,
      },
    },
    events: [ // Array to store match events like goals, cards, substitutions
      {
        type: {
          type: String,
          enum: ['goal', 'yellow card', 'red card', 'substitution'],
          required: true,
        },
        minute: {
          type: Number,
          required: true,
        },
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Player',
          required: false, // Player might not be relevant for all event types
        },
        description: {
          type: String,
          required: false,
        },
      },
    ],
    // Add other fixture-specific fields as needed (e.g., referee, attendance)
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Fixture = mongoose.model('Fixture', fixtureSchema);

module.exports = Fixture;