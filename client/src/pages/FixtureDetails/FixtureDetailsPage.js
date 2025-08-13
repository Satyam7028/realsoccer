// client/src/pages/FixtureDetails/FixtureDetailsPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// We are importing a selection of icons from react-icons/io5 and react-icons/fa
// to provide clear visual cues for fixture details and events.
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoFootballOutline,
  IoShirtOutline,
  IoPerson,
  IoArrowUp,
  IoArrowDown,
  IoCard,
  IoWarning,
} from 'react-icons/io5';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

// Mock data for demonstration purposes
const mockFixtures = {
  '1': {
    id: 1,
    homeTeam: 'RealSoccer United',
    awayTeam: 'FC Dynamoes',
    date: '2024-10-27',
    time: '15:00',
    venue: 'United Stadium',
    status: 'Upcoming',
    score: 'vs',
    events: [],
  },
  '2': {
    id: 2,
    homeTeam: 'FC Atlas',
    awayTeam: 'RealSoccer United',
    date: '2024-10-20',
    time: '19:30',
    venue: 'Atlas Arena',
    status: 'Full Time',
    score: '1 - 2',
    events: [
      { minute: 15, type: 'goal', team: 'FC Atlas', player: 'Player A' },
      { minute: 45, type: 'goal', team: 'RealSoccer United', player: 'Player B' },
      { minute: 60, type: 'yellow_card', team: 'FC Atlas', player: 'Player C' },
      { minute: 75, type: 'goal', team: 'RealSoccer United', player: 'Player D' },
      { minute: 88, type: 'substitution', team: 'FC Atlas', player_out: 'Player E', player_in: 'Player F' },
    ],
  },
};

// Helper function to get the correct icon for a match event
const getEventIcon = (type) => {
  switch (type) {
    case 'goal':
      return <IoFootballOutline className="text-green-500" />;
    case 'yellow_card':
      return <IoCard className="text-yellow-500" />;
    case 'red_card':
      return <IoWarning className="text-red-500" />;
    case 'substitution':
      return <IoArrowUp className="text-blue-500" />;
    default:
      return <IoPerson className="text-gray-500" />;
  }
};

const FixtureDetailsPage = () => {
  const { id } = useParams();
  const [fixture, setFixture] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching fixture data from an API
  useEffect(() => {
    setLoading(true);
    const fetchFixtureData = () => {
      // In a real application, you would make an API call here.
      setTimeout(() => {
        setFixture(mockFixtures[id]);
        setLoading(false);
      }, 500);
    };
    fetchFixtureData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading fixture details...
      </div>
    );
  }

  if (!fixture) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600">
        Fixture not found!
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Match Header */}
        <div className="bg-white rounded-lg shadow-xl p-8 text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Match Details</h1>
          
          <div className="flex items-center justify-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <IoCalendarOutline />
              <span>{fixture.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <IoTimeOutline />
              <span>{fixture.time}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-800">{fixture.homeTeam}</span>
            <span className="mx-8 text-indigo-600">{fixture.score}</span>
            <span className="text-gray-800">{fixture.awayTeam}</span>
          </div>

          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {fixture.status}
          </span>
        </div>

        {/* Match Events Timeline */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <IoFootballOutline className="text-indigo-600" />
            <span>Match Events</span>
          </h2>
          
          {fixture.events.length > 0 ? (
            <div className="relative border-l border-gray-200 ml-4">
              {fixture.events.map((event, index) => (
                <div key={index} className="mb-8 flex items-start">
                  <div className="absolute w-3 h-3 bg-indigo-500 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                  <div className="ml-8">
                    <p className="text-sm text-gray-500">
                      <span className="font-bold text-gray-800">{event.minute}'</span>
                    </p>
                    <div className="flex items-center mt-1">
                      {getEventIcon(event.type)}
                      <p className="ml-2 text-gray-700">
                        {event.type === 'goal' && `Goal for ${event.team} by ${event.player}`}
                        {event.type === 'yellow_card' && `Yellow Card for ${event.team}: ${event.player}`}
                        {event.type === 'red_card' && `Red Card for ${event.team}: ${event.player}`}
                        {event.type === 'substitution' && `Substitution for ${event.team}: ${event.player_out} off, ${event.player_in} on`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              No match events recorded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FixtureDetailsPage;
