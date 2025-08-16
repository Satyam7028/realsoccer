// client/src/components/layout/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const commonIconClass = "h-5 w-5 fill-current";

  // SVG for Football icon
  const footballIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className={commonIconClass} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 7l4.76 3.45l-1.76 5.55l-6 -3.5z"></path>
      <path d="M12 7v8"></path>
      <path d="M16.76 10.45l-4.76 3.55"></path>
      <path d="M15 16.27l-3.5 -6"></path>
      <path d="M8.24 10.45l-1.76 5.55l6 -3.55"></path>
    </svg>
  );

  // SVG for Store icon
  const storeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className={commonIconClass} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 21l18 0"></path>
      <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1"></path>
      <path d="M9 21v-10a3 3 0 0 0 -6 0v10"></path>
      <path d="M15 21v-10a3 3 0 0 0 -6 0v10"></path>
      <path d="M21 21v-10a3 3 0 0 0 -6 0v10"></path>
    </svg>
  );

  // SVG for News icon
  const newsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className={commonIconClass} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M16 16c0 1.25 -.9 2 -2 2c-1.11 0 -2 -.89 -2 -2c0 -1.1 .9 -2 2 -2c1.1 0 2 .9 2 2"></path>
      <path d="M18 10h-2c-.56 0 -.89 .25 -1.21 .58"></path>
      <path d="M13 14c-.32 .33 -.59 .67 -1.21 1.07"></path>
      <path d="M3 21h18"></path>
      <path d="M3 7v1h8"></path>
      <path d="M3 13v1h8"></path>
      <path d="M3 19v1h8"></path>
    </svg>
  );

  // SVG for Shirt icon
  const shirtIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className={commonIconClass} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M21 21v-18l-5 5l-4 -4l-4 4l-5 -5v18z"></path>
    </svg>
  );

  // SVG for Hamburger menu icon
  const barsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-white" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <line x1="4" y1="6" x2="20" y2="6"></line>
      <line x1="4" y1="12" x2="20" y2="12"></line>
      <line x1="4" y1="18" x2="20" y2="18"></line>
    </svg>
  );

  // SVG for Close icon
  const timesIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-white" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

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
            {footballIcon}
            <span>Players</span>
          </Link>
          <Link
            to="/leagues"
            className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200"
          >
            {storeIcon}
            <span>Leagues</span>
          </Link>
          <Link
            to="/fixtures"
            className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200"
          >
            {newsIcon}
            <span>Fixtures</span>
          </Link>
          <Link
            to="/shop"
            className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200"
          >
            {shirtIcon}
            <span>Shop</span>
          </Link>
          {/* New Auth Links */}
          <Link
            to="/login"
            className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200"
          >
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200"
          >
            <span>Register</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? timesIcon : barsIcon}
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
            {footballIcon}
            <span>Players</span>
          </Link>
          <Link to="/leagues" className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200" onClick={toggleMenu}>
            {storeIcon}
            <span>Leagues</span>
          </Link>
          <Link to="/fixtures" className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200" onClick={toggleMenu}>
            {newsIcon}
            <span>Fixtures</span>
          </Link>
          <Link to="/shop" className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200" onClick={toggleMenu}>
            {shirtIcon}
            <span>Shop</span>
          </Link>
          {/* New Auth Links for Mobile */}
          <Link to="/login" className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200" onClick={toggleMenu}>
            <span>Login</span>
          </Link>
          <Link to="/register" className="flex items-center space-x-2 hover:text-indigo-400 transition-colors duration-200" onClick={toggleMenu}>
            <span>Register</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
