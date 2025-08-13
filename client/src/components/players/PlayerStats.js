// client/src/components/players/PlayerStats.js
import React from 'react';
import Card from '../common/Card';

/**
 * Displays detailed statistics for a single player.
 *
 * @param {object} props - Component props.
 * @param {object} props.player - The player object containing statistics.
 */
const PlayerStats = ({ player }) => {
  if (!player || !player.statistics) {
    return (
      <Card className="p-6 text-center text-gray-500">
        <h3 className="text-xl font-semibold mb-3">Player Statistics</h3>
        <p>No statistics available for this player.</p>
      </Card>
    );
  }

  const { statistics } = player;

  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Player Statistics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Matches Played:</span>
          <span>{statistics.matchesPlayed || 0}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Goals:</span>
          <span>{statistics.goals || 0}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Assists:</span>
          <span>{statistics.assists || 0}</span>
        </div>
        {statistics.cleanSheets !== undefined && (
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Clean Sheets:</span>
            <span>{statistics.cleanSheets || 0}</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Yellow Cards:</span>
          <span>{statistics.yellowCards || 0}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Red Cards:</span>
          <span>{statistics.redCards || 0}</span>
        </div>
        {/* Add more statistics fields as they become available in the player model */}
      </div>
    </Card>
  );
};

export default PlayerStats;