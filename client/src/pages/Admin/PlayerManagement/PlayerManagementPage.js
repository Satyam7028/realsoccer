// client/src/pages/Admin/PlayerManagement/PlayerManagementPage.js

import React, { useState } from 'react';
// We are importing a selection of icons from react-icons/io5 and react-icons/fa
// to provide clear visual cues for the player management page.
import {
  IoPeopleOutline,
  IoAddCircleOutline,
  IoPencil,
  IoTrash,
  IoShirtOutline,
} from 'react-icons/io5';
import { FaSave } from 'react-icons/fa';

// Mock data for demonstration purposes
const mockPlayers = [
  { id: 1, name: 'Player One', team: 'RealSoccer United', position: 'Striker', number: 9 },
  { id: 2, name: 'Player Two', team: 'FC Dynamoes', position: 'Midfielder', number: 8 },
];

const PlayerManagementPage = () => {
  const [players, setPlayers] = useState(mockPlayers);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    team: '',
    position: '',
    number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPlayer = () => {
    // In a real app, you would generate a unique ID.
    const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
    const newPlayer = { ...formData, id: newId };
    setPlayers([...players, newPlayer]);
    setFormData({ name: '', team: '', position: '', number: '' });
    setIsEditing(false);
  };

  const handleUpdatePlayer = () => {
    setPlayers(players.map(p => (p.id === currentPlayer.id ? { ...p, ...formData } : p)));
    setFormData({ name: '', team: '', position: '', number: '' });
    setIsEditing(false);
    setCurrentPlayer(null);
  };

  const handleEdit = (player) => {
    setCurrentPlayer(player);
    setFormData({
      name: player.name,
      team: player.team,
      position: player.position,
      number: player.number,
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentPlayer(null);
    setFormData({ name: '', team: '', position: '', number: '' });
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
        <IoPeopleOutline className="text-indigo-600" />
        <span>Player Management</span>
      </h1>

      {/* Add/Edit Player Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          {isEditing ? <IoPencil /> : <IoAddCircleOutline />}
          <span>{isEditing ? 'Edit Player' : 'Add New Player'}</span>
        </h2>
        <form onSubmit={(e) => { e.preventDefault(); isEditing ? handleUpdatePlayer() : handleAddPlayer(); }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Player Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="team"
              placeholder="Team"
              value={formData.team}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="number"
              name="number"
              placeholder="Jersey Number"
              value={formData.number}
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
              <span>{isEditing ? 'Save Changes' : 'Add Player'}</span>
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

      {/* Player Table */}
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
                Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.length > 0 ? (
              players.map((player) => (
                <tr key={player.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {player.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.team}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <IoShirtOutline className="h-4 w-4" />
                        <span>{player.number}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(player)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <IoPencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(player.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <IoTrash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No players found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerManagementPage;
