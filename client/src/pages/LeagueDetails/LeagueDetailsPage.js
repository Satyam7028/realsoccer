// client/src/pages/LeagueDetails/LeagueDetailsPage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// We are importing a selection of icons from react-icons/io5
// to provide clear visual cues for league details and standings.
import {
  IoTrophyOutline,
  IoCalendarOutline,
  IoPeopleOutline,
  IoStatsChart,
} from 'react-icons/io5';

// Mock data for demonstration purposes
const mockLeagues = {
  '1': {
    id: 1,
    name: 'Premier League',
    country: 'England',
    imageUrl: 'https://placehold.co/400x250/3b82f6/ffffff?text=Premier+League+Logo',
    description: 'The top level of the English football league system, contested by 20 clubs.',
    standings: [
      { team: 'Team A', played: 38, won: 25, drawn: 10, lost: 3, points: 85 },
      { team: 'Team B', played: 38, won: 24, drawn: 8, lost: 6, points: 80 },
      { team: 'Team C', played: 38, won: 22, drawn: 12, lost: 4, points: 78 },
    ],
  },
  '2': {
    id: 2,
    name: 'La Liga',
    country: 'Spain',
    imageUrl: 'https://placehold.co/400x250/ef4444/ffffff?text=La+Liga+Logo',
    description: 'The premier professional football division of the Spanish football league system.',
    standings: [
      { team: 'Team X', played: 38, won: 28, drawn: 5, lost: 5, points: 89 },
      { team: 'Team Y', played: 38, won: 26, drawn: 7, lost: 5, points: 85 },
    ],
  },
};

const LeagueDetailsPage = () => {
  const { id } = useParams();
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching league data from an API
  useEffect(() => {
    setLoading(true);
    const fetchLeagueData = () => {
      // In a real application, you would make an API call here.
      setTimeout(() => {
        setLeague(mockLeagues[id]);
        setLoading(false);
      }, 500); // Simulate network delay
    };
    fetchLeagueData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading league details...
      </div>
    );
  }

  if (!league) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600">
        League not found!
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* League Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
            <img
              src={league.imageUrl}
              alt={`${league.name} Logo`}
              className="w-32 h-32 md:w-48 md:h-48 object-contain mb-4 md:mb-0 md:mr-8"
            />
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {league.name}
              </h1>
              <p className="text-xl text-gray-600">{league.country}</p>
              <p className="mt-4 text-gray-700">{league.description}</p>
            </div>
          </div>

          <hr className="my-8" />

          {/* Standings Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <IoStatsChart className="text-indigo-600" />
              <span>Standings</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Played
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Won
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Drawn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {league.standings.map((team, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {team.team}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {team.played}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {team.won}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {team.drawn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {team.lost}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">
                        {team.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LeagueDetailsPage;
