// client/src/components/fixtures/LiveScore.js
import React from 'react';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { RefreshCw } from 'lucide-react'; // Icon for refresh/live indicator

/**
 * Displays live score updates for a single fixture.
 * This component is designed to show the current score and status,
 * and could be enhanced with real-time updates (e.g., WebSockets).
 *
 * @param {object} props - Component props.
 * @param {object} props.fixture - The fixture object to display.
 * @param {boolean} [props.loading=false] - Indicates if the fixture data is currently loading.
 * @param {string} [props.error=null] - An error message to display if data fetching fails.
 */
const LiveScore = ({ fixture, loading = false, error = null }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
        <p className="ml-3 text-lg text-gray-700">Loading live score...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p className="text-xl font-semibold">Error loading live score:</p>
        <p className="text-md">{error}</p>
      </div>
    );
  }

  if (!fixture) {
    return (
      <Card className="p-6 text-center text-gray-500">
        <p className="text-lg">No live fixture data available.</p>
      </Card>
    );
  }

  const isLive = fixture.status === 'live';
  const scoreHome = fixture.score?.home !== undefined ? fixture.score.home : '-';
  const scoreAway = fixture.score?.away !== undefined ? fixture.score.away : '-';

  return (
    <Card className="p-6 text-center">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
        {isLive && <RefreshCw size={24} className="mr-2 text-red-500 animate-spin-slow" />}
        Live Score
        {isLive && <RefreshCw size={24} className="ml-2 text-red-500 animate-spin-slow" />}
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        {typeof fixture.league === 'object' ? fixture.league.name : `League ID: ${fixture.league}`}
      </p>
      <div className="flex justify-center items-center space-x-6 my-4">
        <div className="flex flex-col items-center">
          <img
            src={`https://placehold.co/100x100/cccccc/333333?text=${fixture.homeTeam.split(' ')[0]}`}
            alt={fixture.homeTeam}
            className="w-20 h-20 object-contain mb-2"
          />
          <span className="text-xl font-semibold text-gray-800">{fixture.homeTeam}</span>
        </div>
        <div className="text-5xl font-extrabold text-blue-700">
          {scoreHome} - {scoreAway}
        </div>
        <div className="flex flex-col items-center">
          <img
            src={`https://placehold.co/100x100/cccccc/333333?text=${fixture.awayTeam.split(' ')[0]}`}
            alt={fixture.awayTeam}
            className="w-20 h-20 object-contain mb-2"
          />
          <span className="text-xl font-semibold text-gray-800">{fixture.awayTeam}</span>
        </div>
      </div>
      <p className={`text-lg font-bold ${isLive ? 'text-red-600 animate-pulse' : 'text-gray-500'}`}>
        Status: {fixture.status.toUpperCase()}
      </p>
      {fixture.location && (
        <p className="text-sm text-gray-500 mt-2">Location: {fixture.location}</p>
      )}
      {/* You could add a list of events here if available in the fixture object */}
      {fixture.events && fixture.events.length > 0 && (
        <div className="mt-4 text-left">
          <h4 className="font-semibold text-gray-700 mb-2">Match Events:</h4>
          <ul className="text-sm text-gray-600 max-h-40 overflow-y-auto custom-scrollbar">
            {fixture.events.map((event, index) => (
              <li key={index} className="mb-1">
                <span className="font-medium text-gray-800">{event.minute}'</span> - {event.description || `${event.type} by ${event.player?.name || 'Unknown'}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default LiveScore;