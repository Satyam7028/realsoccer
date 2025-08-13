// client/src/pages/Admin/LeagueManagement/LeagueManagementPage.js

import React, { useState } from 'react';
// We are importing a selection of icons from react-icons/io5 and react-icons/fa
// to provide clear visual cues for the league management page.
import {
  IoShieldOutline,
  IoAddCircleOutline,
  IoPencil,
  IoTrash,
  IoGlobeOutline,
} from 'react-icons/io5';
import { FaSave } from 'react-icons/fa';

// Mock data for demonstration purposes
const mockLeagues = [
  { id: 1, name: 'Premier League', country: 'England', teams: 20 },
  { id: 2, name: 'La Liga', country: 'Spain', teams: 20 },
];

const LeagueManagementPage = () => {
  const [leagues, setLeagues] = useState(mockLeagues);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLeague, setCurrentLeague] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    teams: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddLeague = () => {
    // In a real app, you would generate a unique ID.
    const newId = leagues.length > 0 ? Math.max(...leagues.map(l => l.id)) + 1 : 1;
    const newLeague = { ...formData, id: newId };
    setLeagues([...leagues, newLeague]);
    setFormData({ name: '', country: '', teams: '' });
    setIsEditing(false);
  };

  const handleUpdateLeague = () => {
    setLeagues(leagues.map(l => (l.id === currentLeague.id ? { ...l, ...formData } : l)));
    setFormData({ name: '', country: '', teams: '' });
    setIsEditing(false);
    setCurrentLeague(null);
  };

  const handleEdit = (league) => {
    setCurrentLeague(league);
    setFormData({
      name: league.name,
      country: league.country,
      teams: league.teams,
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this league?')) {
      setLeagues(leagues.filter(l => l.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentLeague(null);
    setFormData({ name: '', country: '', teams: '' });
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
        <IoShieldOutline className="text-indigo-600" />
        <span>League Management</span>
      </h1>

      {/* Add/Edit League Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          {isEditing ? <IoPencil /> : <IoAddCircleOutline />}
          <span>{isEditing ? 'Edit League' : 'Add New League'}</span>
        </h2>
        <form onSubmit={(e) => { e.preventDefault(); isEditing ? handleUpdateLeague() : handleAddLeague(); }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="League Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="number"
              name="teams"
              placeholder="Number of Teams"
              value={formData.teams}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              <FaSave />
              <span>{isEditing ? 'Save Changes' : 'Add League'}</span>
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                <span>Cancel</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* League Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teams
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leagues.length > 0 ? (
              leagues.map((league) => (
                <tr key={league.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {league.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {league.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <IoGlobeOutline className="h-4 w-4" />
                        <span>{league.country}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {league.teams}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(league)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <IoPencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(league.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <IoTrash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No leagues found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeagueManagementPage;
