// client/src/pages/Players/PlayersPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// The import path has been corrected to resolve the module not found error.
import { API_ENDPOINTS } from '../../shared/apiEndpoints';
import { IoFootballOutline } from 'react-icons/io5';

// Mock data for demonstration purposes
const mockPlayers = [
  {
    id: 1,
    name: 'Player One',
    position: 'Striker',
    team: 'RealSoccer United',
    imageUrl: 'https://placehold.co/400x500/0f172a/ffffff?text=Player+One',
  },
  {
    id: 2,
    name: 'Player Two',
    position: 'Midfielder',
    team: 'FC Dynamoes',
    imageUrl: 'https://placehold.co/400x500/1e293b/ffffff?text=Player+Two',
  },
  {
    id: 3,
    name: 'Player Three',
    position: 'Defender',
    team: 'The Challengers',
    imageUrl: 'https://placehold.co/400x500/3b82f6/ffffff?text=Player+Three',
  },
];

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // In a real application, you would use API_ENDPOINTS.PLAYERS here
    // to fetch data from the server.
    console.log('Fetching players from:', API_ENDPOINTS.PLAYERS);

    // Simulate fetching data from an API
    setTimeout(() => {
      setPlayers(mockPlayers);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading players...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
          <IoFootballOutline className="text-indigo-600" />
          <span>Players</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {players.length > 0 ? (
            players.map((player) => (
              <div key={player.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 text-center">
                <Link to={`/players/${player.id}`}>
                  <img
                    src={player.imageUrl}
                    alt={player.name}
                    className="w-full h-64 object-cover object-top"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    <Link to={`/players/${player.id}`} className="hover:text-indigo-600">
                      {player.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{player.position}</p>
                  <p className="text-gray-500 text-sm">{player.team}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-4">No players found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;
