// client/src/pages/Profile/ProfilePage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import {
  IoPersonCircleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoPencilOutline,
  IoArrowForwardOutline,
  IoShirtOutline,
} from 'react-icons/io5';
import { FaLock } from 'react-icons/fa';

// Assuming you have a reusable component for form inputs
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

// Define a validation schema for the profile form
const profileValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ProfilePage = () => {
  const { user, logout, loading, error, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Use Formik for form state and validation
  const formik = useFormik({
    initialValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
    validationSchema: profileValidationSchema,
    enableReinitialize: true, // This is key to re-populate the form when the user object loads
    onSubmit: async (values) => {
      // Logic to save updated user data via an API call
      // The updateUserProfile function should be provided by your AuthContext
      const success = await updateUserProfile(values);
      if (success) {
        setIsEditing(false); // Disable editing on successful save
      }
    },
  });

  // Handle a direct click on the logout button
  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  // If there's no user, redirect to login (or handle as a protected route)
  if (!user) {
    return <p className="text-center">Please log in to view this page.</p>;
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:justify-between mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <img
                src={user.profileImage || "https://placehold.co/150x150/cccccc/333333?text=User"}
                alt="Profile"
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
                <p className="text-gray-600">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            
            {/* Edit Profile button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
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

            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-4">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  label="Username"
                  placeholder="Enter your username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && formik.errors.username}
                  disabled={!isEditing}
                  fullWidth
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email}
                  disabled={!isEditing}
                  fullWidth
                />
              </div>
              
              {isEditing && (
                <Button
                  type="submit"
                  fullWidth={false}
                  disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                  className="mt-6"
                >
                  <FaLock />
                  <span>Save Changes</span>
                </Button>
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
                onClick={handleLogout}
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