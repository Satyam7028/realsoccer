// client/src/components/leagues/TopScorers.js
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Displays a list of top-scoring players.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.topScorers - An array of player objects (or simplified objects)
 * Each object should ideally contain: _id, name, team, goals (from statistics).
 * @param {boolean} [props.loading=false] - Indicates if the data is currently loading.
 * @param {string} [props.error=null] - An error message to display if data fetching fails.
 * @param {string} [props.emptyMessage='No top scorers available.'] - Message to display when the array is empty.
 */
const TopScorers = ({ topScorers, loading = false, error = null, emptyMessage = 'No top scorers available.' }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
        <p className="ml-3 text-lg text-gray-700">Loading top scorers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p className="text-xl font-semibold">Error loading top scorers:</p>
        <p className="text-md">{error}</p>
      </div>
    );
  }

  if (!topScorers || topScorers.length === 0) {
    return (
      <Card className="p-6 text-center text-gray-500">
        <p className="text-lg">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Top Scorers</h3>
      <ul className="divide-y divide-gray-200">
        {topScorers.map((player, index) => (
          <li key={player._id} className="py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold text-gray-700">{index + 1}.</span>
              <img
                src={player.profileImage || 'https://placehold.co/50x50/cccccc/333333?text=P'}
                alt={player.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/50x50/cccccc/333333?text=P'; }}
              />
              <Link to={`/players/${player._id}`} className="text-lg font-medium text-blue-600 hover:underline">
                {player.name}
              </Link>
              <span className="text-sm text-gray-500 hidden sm:inline">({player.team})</span>
            </div>
            <span className="text-xl font-bold text-green-600">{player.statistics?.goals || 0}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TopScorers;