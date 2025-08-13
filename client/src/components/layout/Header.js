// client/src/components/layout/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
// The following icons are imported from react-icons/fa, which uses Font Awesome.
// This replaces the previous imports from 'lucide-react'.
// You can find a wide variety of icon libraries in react-icons,
// such as 'md' for Material Design, 'ai' for Ant Design Icons, etc.
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo and home link */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {/* You could add a logo image here */}
            <span className="text-indigo-600">⚽️</span> RealSoccer
          </Link>
        </div>

        {/* Search Bar (Placeholder) */}
        <div className="hidden md:block w-full max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {/* The FaSearch icon from react-icons is used here */}
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Utility Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
            {/* The FaUser icon from react-icons is used here */}
            <FaUser className="h-6 w-6" />
          </Link>
          <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors duration-200">
            {/* The FaShoppingCart icon from react-icons is used here */}
            <FaShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              3 {/* Placeholder for cart item count */}
            </span>
          </Link>
          {/* Mobile search icon */}
          <button className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors duration-200">
            <FaSearch className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
