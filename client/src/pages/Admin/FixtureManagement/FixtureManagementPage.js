// client/src/pages/Admin/FixtureManagement/FixtureManagementPage.js

import React, { useState } from 'react';
// We are importing a selection of icons from react-icons/io5 and react-icons/fa
// to provide clear visual cues for the fixture management page.
import {
  IoCalendarOutline,
  IoAddCircleOutline,
  IoPencil,
  IoTrash,
  IoTimeOutline,
} from 'react-icons/io5';
import { FaSave } from 'react-icons/fa';

// Mock data for demonstration purposes
const mockFixtures = [
  { id: 1, homeTeam: 'RealSoccer United', awayTeam: 'FC Dynamoes', date: '2024-10-27', time: '15:00' },
  { id: 2, homeTeam: 'FC Atlas', awayTeam: 'RealSoccer United', date: '2024-10-20', time: '19:30' },
];

const FixtureManagementPage = () => {
  const [fixtures, setFixtures] = useState(mockFixtures);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFixture, setCurrentFixture] = useState(null);
  const [formData, setFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFixture = () => {
    // In a real app, you would generate a unique ID.
    const newId = fixtures.length > 0 ? Math.max(...fixtures.map(f => f.id)) + 1 : 1;
    const newFixture = { ...formData, id: newId };
    setFixtures([...fixtures, newFixture]);
    setFormData({ homeTeam: '', awayTeam: '', date: '', time: '' });
    setIsEditing(false);
  };

  const handleUpdateFixture = () => {
    setFixtures(fixtures.map(f => (f.id === currentFixture.id ? { ...f, ...formData } : f)));
    setFormData({ homeTeam: '', awayTeam: '', date: '', time: '' });
    setIsEditing(false);
    setCurrentFixture(null);
  };

  const handleEdit = (fixture) => {
    setCurrentFixture(fixture);
    setFormData({
      homeTeam: fixture.homeTeam,
      awayTeam: fixture.awayTeam,
      date: fixture.date,
      time: fixture.time,
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this fixture?')) {
      setFixtures(fixtures.filter(f => f.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentFixture(null);
    setFormData({ homeTeam: '', awayTeam: '', date: '', time: '' });
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
        <IoCalendarOutline className="text-indigo-600" />
        <span>Fixture Management</span>
      </h1>

      {/* Add/Edit Fixture Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          {isEditing ? <IoPencil /> : <IoAddCircleOutline />}
          <span>{isEditing ? 'Edit Fixture' : 'Add New Fixture'}</span>
        </h2>
        <form onSubmit={(e) => { e.preventDefault(); isEditing ? handleUpdateFixture() : handleAddFixture(); }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="homeTeam"
              placeholder="Home Team"
              value={formData.homeTeam}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="awayTeam"
              placeholder="Away Team"
              value={formData.awayTeam}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
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
              <span>{isEditing ? 'Save Changes' : 'Add Fixture'}</span>
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

      {/* Fixture Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Home Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Away Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fixtures.length > 0 ? (
              fixtures.map((fixture) => (
                <tr key={fixture.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {fixture.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {fixture.homeTeam}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {fixture.awayTeam}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {fixture.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <IoTimeOutline className="h-4 w-4" />
                        <span>{fixture.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(fixture)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <IoPencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(fixture.id)}
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
                  No fixtures found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FixtureManagementPage;
