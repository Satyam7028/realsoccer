// client/src/components/leagues/LeagueCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { twMerge } from 'tailwind-merge';

/**
 * Displays a card summarizing a single league's information.
 *
 * @param {object} props - Component props.
 * @param {object} props.league - The league object to display.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes for the card.
 */
const LeagueCard = ({ league, className = '' }) => {
  if (!league) {
    return (
      <Card className={twMerge("flex flex-col items-center justify-center text-center p-4", className)}>
        <p className="text-gray-500">League data not available.</p>
      </Card>
    );
  }

  const mergedClasses = twMerge(
    "flex flex-col items-center text-center p-4",
    "transform transition-transform duration-200 hover:scale-105 cursor-pointer",
    className
  );

  return (
    <Link to={`/leagues/${league._id}`} className="block">
      <Card className={mergedClasses}>
        <img
          src={league.logo || 'https://placehold.co/150x150/cccccc/333333?text=League'}
          alt={league.name}
          className="w-32 h-32 object-contain rounded-full mb-4 border-4 border-gray-300 shadow-md"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/cccccc/333333?text=League'; }}
        />
        <h3 className="text-xl font-bold text-gray-800 mb-1">{league.name}</h3>
        <p className="text-md text-gray-600 mb-1">{league.country}</p>
        {league.season && (
          <p className="text-sm text-gray-500">Season: {league.season}</p>
        )}
      </Card>
    </Link>
  );
};

export default LeagueCard;