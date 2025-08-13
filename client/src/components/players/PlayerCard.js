// client/src/components/players/PlayerCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { twMerge } from 'tailwind-merge';

/**
 * Displays a card summarizing a single player's information.
 *
 * @param {object} props - Component props.
 * @param {object} props.player - The player object to display.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes for the card.
 */
const PlayerCard = ({ player, className = '' }) => {
  if (!player) {
    return (
      <Card className={twMerge("flex flex-col items-center justify-center text-center p-4", className)}>
        <p className="text-gray-500">Player data not available.</p>
      </Card>
    );
  }

  const mergedClasses = twMerge(
    "flex flex-col items-center text-center p-4",
    "transform transition-transform duration-200 hover:scale-105 cursor-pointer",
    className
  );

  return (
    <Link to={`/players/${player._id}`} className="block">
      <Card className={mergedClasses}>
        <img
          src={player.profileImage || 'https://placehold.co/150x150/cccccc/333333?text=Player'}
          alt={player.name}
          className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-500 shadow-md"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/cccccc/333333?text=Player'; }}
        />
        <h3 className="text-xl font-bold text-gray-800 mb-1">{player.name}</h3>
        <p className="text-md text-gray-600 mb-1">{player.team}</p>
        <p className="text-sm text-gray-500">{player.position} | {player.nationality}</p>
        {player.statistics && (
          <div className="mt-3 text-sm text-gray-700">
            <p>Goals: <span className="font-semibold">{player.statistics.goals || 0}</span></p>
            <p>Assists: <span className="font-semibold">{player.statistics.assists || 0}</span></p>
          </div>
        )}
      </Card>
    </Link>
  );
};

export default PlayerCard;