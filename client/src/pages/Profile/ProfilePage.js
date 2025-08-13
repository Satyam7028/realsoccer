// client/src/pages/Profile/ProfilePage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// We are importing a selection of icons from react-icons/io5 and react-icons/fa
// to provide clear visual cues for user profile sections.
import {
  IoPersonCircleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoPencilOutline,
  IoArrowForwardOutline,
  IoShirtOutline,
} from 'react-icons/io5';
import { FaLock } from 'react-icons/fa';

// Mock user data for demonstration purposes
const mockUser = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  memberSince: 'October 2023',
};

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would handle the logic to save the updated user data to an API.
    console.log('User data saved:', formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:justify-between mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <IoPersonCircleOutline className="h-16 w-16 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{mockUser.name}</h1>
                <p className="text-gray-600">Member since {mockUser.memberSince}</p>
              </div>
            </div>
            
            {/* Edit Profile button */}
            <button
              onClick={handleEditToggle}
              className="mt-4 md:mt-0 flex items-center space-x-2 bg-indigo-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-indigo-600 transition-colors duration-200"
            >
              <IoPencilOutline />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Profile Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <IoSettingsOutline className="text-indigo-600" />
              <span>Account Information</span>
            </h2>

            <form onSubmit={handleSave}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500'}`}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500'}`}
                  />
                </div>
              </div>
              
              {isEditing && (
                <button
                  type="submit"
                  className="mt-6 flex items-center space-x-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-200"
                >
                  <FaLock />
                  <span>Save Changes</span>
                </button>
              )}
            </form>
          </div>

          {/* Other Links */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <IoShirtOutline className="text-indigo-600" />
              <span>My Orders</span>
            </h2>
            <Link
              to="/order-history"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <IoShirtOutline className="h-6 w-6 text-gray-500" />
                <span>View My Order History</span>
              </div>
              <IoArrowForwardOutline className="h-5 w-5 text-gray-500" />
            </Link>
            
            {/* Logout Button */}
            <div className="mt-8">
              <button
                // onClick handler would be implemented here to handle user logout
                className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <IoLogOutOutline className="h-6 w-6" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
