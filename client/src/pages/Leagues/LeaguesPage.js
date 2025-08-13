// client/src/pages/Leagues/LeaguesPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Corrected import path
import { API_ENDPOINTS } from '../../shared/apiEndpoints';
import { IoTrophyOutline } from 'react-icons/io5';

// Mock data for demonstration purposes
const mockLeagues = [
  {
    id: 1,
    name: 'Premier League',
    country: 'England',
    imageUrl: 'https://placehold.co/400x250/3b82f6/ffffff?text=Premier+League+Logo',
    description: 'The top level of the English football league system.',
  },
  {
    id: 2,
    name: 'La Liga',
    country: 'Spain',
    imageUrl: 'https://placehold.co/400x250/ef4444/ffffff?text=La+Liga+Logo',
    description: 'The premier professional football division of the Spanish system.',
  },
  {
    id: 3,
    name: 'Bundesliga',
    country: 'Germany',
    imageUrl: 'https://placehold.co/400x250/1e293b/ffffff?text=Bundesliga+Logo',
    description: 'Germany\'s primary football competition.',
  },
];

const LeaguesPage = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log('Fetching leagues from:', API_ENDPOINTS.LEAGUES);

    setTimeout(() => {
      setLeagues(mockLeagues);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading leagues...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
          <IoTrophyOutline className="text-indigo-600" />
          <span>Leagues</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leagues.map((league) => (
            <div key={league.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Link to={`/leagues/${league.id}`}>
                <img
                  src={league.imageUrl}
                  alt={`${league.name} Logo`}
                  className="w-full h-48 object-cover object-center"
                />
              </Link>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  <Link to={`/leagues/${league.id}`} className="hover:text-indigo-600">
                    {league.name}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mt-1">{league.country}</p>
                <p className="text-gray-700 text-sm mt-2">{league.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaguesPage;
