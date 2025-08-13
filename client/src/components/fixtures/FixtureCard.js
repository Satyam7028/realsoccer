// client/src/components/fixtures/FixtureCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { Calendar, MapPin, Clock } from 'lucide-react'; // Icons
import { twMerge } from 'tailwind-merge';

/**
 * Displays a card summarizing a single football fixture.
 *
 * @param {object} props - Component props.
 * @param {object} props.fixture - The fixture object to display.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes for the card.
 */
const FixtureCard = ({ fixture, className = '' }) => {
  if (!fixture) {
    return (
      <Card className={twMerge("flex flex-col items-center justify-center text-center p-4", className)}>
        <p className="text-gray-500">Fixture data not available.</p>
      </Card>
    );
  }

  const fixtureDate = new Date(fixture.date);
  const formattedDate = fixtureDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = fixtureDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const mergedClasses = twMerge(
    "flex flex-col p-4",
    "transform transition-transform duration-200 hover:scale-105 cursor-pointer",
    className
  );

  return (
    <Link to={`/fixtures/${fixture._id}`} className="block">
      <Card className={mergedClasses}>
        {fixture.league && (
          <p className="text-sm text-gray-500 mb-2 text-center">
            {typeof fixture.league === 'object' ? fixture.league.name : fixture.league}
          </p>
        )}
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-center w-1/2">
            <img
              src={`https://placehold.co/80x80/cccccc/333333?text=${fixture.homeTeam.split(' ')[0]}`}
              alt={fixture.homeTeam}
              className="w-16 h-16 object-contain mb-2"
            />
            <span className="text-lg font-bold text-gray-800 text-center">{fixture.homeTeam}</span>
          </div>
          <div className="flex flex-col items-center mx-2">
            {fixture.status === 'finished' || fixture.status === 'live' ? (
              <span className="text-2xl font-extrabold text-blue-600">
                {fixture.score?.home || 0} - {fixture.score?.away || 0}
              </span>
            ) : (
              <span className="text-xl font-bold text-gray-500">VS</span>
            )}
            <span className={`text-xs font-semibold mt-1 ${
              fixture.status === 'live' ? 'text-red-500 animate-pulse' : 'text-gray-500'
            }`}>
              {fixture.status.toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col items-center w-1/2">
            <img
              src={`https://placehold.co/80x80/cccccc/333333?text=${fixture.awayTeam.split(' ')[0]}`}
              alt={fixture.awayTeam}
              className="w-16 h-16 object-contain mb-2"
            />
            <span className="text-lg font-bold text-gray-800 text-center">{fixture.awayTeam}</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p className="flex items-center justify-center">
            <Calendar size={16} className="mr-2 text-gray-500" />
            <span>{formattedDate}</span>
          </p>
          <p className="flex items-center justify-center">
            <Clock size={16} className="mr-2 text-gray-500" />
            <span>{formattedTime}</span>
          </p>
          <p className="flex items-center justify-center">
            <MapPin size={16} className="mr-2 text-gray-500" />
            <span>{fixture.location}</span>
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default FixtureCard;