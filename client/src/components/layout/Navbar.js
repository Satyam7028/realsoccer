// client/src/components/layout/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Icons are now imported from react-icons. We use Fa for Font Awesome icons
// and Io5 for Ionicons, as they offer a good selection for a navbar.
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoFootballOutline, IoNewspaperOutline, IoShirtOutline, IoStorefrontOutline } from 'react-icons/io5';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo - visible on all screen sizes */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            RealSoccer
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/players"
            className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200"
          >
            {/* Io5 icons are used here for a clean look */}
            <IoFootballOutline className="h-5 w-5" />
            <span>Players</span>
          </Link>
          <Link
            to="/leagues"
            className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200"
          >
            <IoStorefrontOutline className="h-5 w-5" />
            <span>Leagues</span>
          </Link>
          <Link
            to="/fixtures"
            className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200"
          >
            <IoNewspaperOutline className="h-5 w-5" />
            <span>Fixtures</span>
          </Link>
          <Link
            to="/shop"
            className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200"
          >
            <IoShirtOutline className="h-5 w-5" />
            <span>Shop</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              // FaTimes (X icon) is used when the menu is open
              <FaTimes className="h-6 w-6 text-white" />
            ) : (
              // FaBars (hamburger icon) is used when the menu is closed
              <FaBars className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - shown when isOpen is true */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden bg-gray-800 p-4 transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col space-y-4">
          <Link to="/players" className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200" onClick={toggleMenu}>
            <IoFootballOutline className="h-5 w-5" />
            <span>Players</span>
          </Link>
          <Link to="/leagues" className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200" onClick={toggleMenu}>
            <IoStorefrontOutline className="h-5 w-5" />
            <span>Leagues</span>
          </Link>
          <Link to="/fixtures" className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200" onClick={toggleMenu}>
            <IoNewspaperOutline className="h-5 w-5" />
            <span>Fixtures</span>
          </Link>
          <Link to="/shop" className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200" onClick={toggleMenu}>
            <IoShirtOutline className="h-5 w-5" />
            <span>Shop</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
