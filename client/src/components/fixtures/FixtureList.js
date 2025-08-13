// client/src/components/fixtures/FixtureList.js
import React from 'react';
import FixtureCard from './FixtureCard';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Displays a list of FixtureCard components.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.fixtures - An array of fixture objects to display.
 * @param {boolean} [props.loading=false] - Indicates if the fixture data is currently loading.
 * @param {string} [props.error=null] - An error message to display if data fetching fails.
 * @param {string} [props.emptyMessage='No fixtures found.'] - Message to display when the fixtures array is empty.
 */
const FixtureList = ({ fixtures, loading = false, error = null, emptyMessage = 'No fixtures found.' }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
        <p className="ml-3 text-lg text-gray-700">Loading fixtures...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p className="text-xl font-semibold">Error loading fixtures:</p>
        <p className="text-md">{error}</p>
      </div>
    );
  }

  if (!fixtures || fixtures.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {fixtures.map((fixture) => (
        <FixtureCard key={fixture._id} fixture={fixture} />
      ))}
    </div>
  );
};

export default FixtureList;