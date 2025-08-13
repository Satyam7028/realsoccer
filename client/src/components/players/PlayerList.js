// client/src/components/players/PlayerList.js
import React from 'react';
import PlayerCard from './PlayerCard';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Displays a list of PlayerCard components.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.players - An array of player objects to display.
 * @param {boolean} [props.loading=false] - Indicates if the player data is currently loading.
 * @param {string} [props.error=null] - An error message to display if data fetching fails.
 * @param {string} [props.emptyMessage='No players found.'] - Message to display when the players array is empty.
 */
const PlayerList = ({ players, loading = false, error = null, emptyMessage = 'No players found.' }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
        <p className="ml-3 text-lg text-gray-700">Loading players...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p className="text-xl font-semibold">Error loading players:</p>
        <p className="text-md">{error}</p>
      </div>
    );
  }

  if (!players || players.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {players.map((player) => (
        <PlayerCard key={player._id} player={player} />
      ))}
    </div>
  );
};

export default PlayerList;