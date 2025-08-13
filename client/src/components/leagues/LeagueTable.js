// client/src/components/leagues/LeagueTable.js
import React from 'react';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Displays a league standings table.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.standings - An array of team standing objects.
 * Each object should ideally contain: teamName, played, wins, draws, losses, goalsFor, goalsAgainst, goalDifference, points.
 * @param {boolean} [props.loading=false] - Indicates if the standings data is currently loading.
 * @param {string} [props.error=null] - An error message to display if data fetching fails.
 * @param {string} [props.emptyMessage='No standings available.'] - Message to display when the standings array is empty.
 */
const LeagueTable = ({ standings, loading = false, error = null, emptyMessage = 'No standings available.' }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
        <p className="ml-3 text-lg text-gray-700">Loading standings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p className="text-xl font-semibold">Error loading standings:</p>
        <p className="text-md">{error}</p>
      </div>
    );
  }

  if (!standings || standings.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <Card className="p-0 overflow-x-auto"> {/* p-0 to allow table to fill card, overflow-x-auto for responsiveness */}
      <h3 className="text-2xl font-bold text-gray-800 p-6 pb-4">League Standings</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              #
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Team
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              P
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              W
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              D
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              L
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              GF
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              GA
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              GD
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pts
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {standings.map((team, index) => (
            <tr key={team.teamName} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {team.teamName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {team.played || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {team.wins || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {team.draws || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {team.losses || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {team.goalsFor || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {team.goalsAgainst || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {team.goalDifference || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                {team.points || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default LeagueTable;