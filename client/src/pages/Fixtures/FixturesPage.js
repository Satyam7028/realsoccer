// client/src/pages/Fixtures/FixturesPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// We're using a few icons from react-icons/io5 to represent fixtures
// and their status.
import {
  IoCalendarOutline,
  IoFootballOutline,
  IoTimeOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';

// Mock data for demonstration purposes
const mockFixtures = [
  {
    id: 1,
    homeTeam: 'RealSoccer United',
    awayTeam: 'FC Dynamoes',
    date: '2024-10-27',
    time: '15:00',
    status: 'Upcoming',
    score: 'vs',
  },
  {
    id: 2,
    homeTeam: 'FC Atlas',
    awayTeam: 'RealSoccer United',
    date: '2024-10-20',
    time: '19:30',
    status: 'Full Time',
    score: '1 - 2',
  },
  {
    id: 3,
    homeTeam: 'The Challengers',
    awayTeam: 'FC Atlas',
    date: '2024-10-13',
    time: '17:00',
    status: 'Full Time',
    score: '3 - 0',
  },
];

const FixturesPage = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // In a real application, you'd fetch data here from an API.
    setTimeout(() => {
      setFixtures(mockFixtures);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading fixtures...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
          <IoCalendarOutline className="text-indigo-600" />
          <span>Fixtures</span>
        </h1>

        <div className="space-y-6">
          {fixtures.map((fixture) => (
            <Link key={fixture.id} to={`/fixtures/${fixture.id}`} className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500 font-semibold">
                    {fixture.date} at {fixture.time}
                  </span>
                  <div className="flex items-center text-sm text-gray-600">
                    {fixture.status === 'Full Time' ? (
                      <IoCheckmarkCircleOutline className="text-green-500 mr-1" />
                    ) : (
                      <IoTimeOutline className="text-yellow-500 mr-1" />
                    )}
                    {fixture.status}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xl font-bold">
                  <div className="flex-1 text-center">
                    <span className="text-gray-800">{fixture.homeTeam}</span>
                  </div>
                  <div className="mx-4 text-2xl font-bold text-indigo-600">
                    {fixture.score}
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-gray-800">{fixture.awayTeam}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FixturesPage;
