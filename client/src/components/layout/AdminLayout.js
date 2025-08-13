// client/src/components/layout/AdminLayout.js

import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
// We are importing a variety of Ionicons for the admin dashboard.
// These icons are a suitable replacement for lucide-react and provide
// a cohesive style for the admin panel's navigation.
import {
  IoSpeedometerOutline,
  IoPeopleOutline,
  IoShieldOutline,
  IoNewspaperOutline,
  IoShirtOutline,
  IoCalendarOutline,
  IoAnalyticsOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoMenu, // Used for the mobile menu toggle
  IoClose, // Used for closing the mobile menu
} from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa'; // Using Font Awesome for the user circle

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // A function to toggle the sidebar's open/closed state on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin', icon: IoSpeedometerOutline },
    { name: 'Player Management', path: '/admin/players', icon: IoPeopleOutline },
    { name: 'League Management', path: '/admin/leagues', icon: IoShieldOutline },
    { name: 'News Management', path: '/admin/news', icon: IoNewspaperOutline },
    { name: 'Shop Management', path: '/admin/shop', icon: IoShirtOutline },
    { name: 'Fixture Management', path: '/admin/fixtures', icon: IoCalendarOutline },
    { name: 'Reporting', path: '/admin/reporting', icon: IoAnalyticsOutline },
    { name: 'User Management', path: '/admin/users', icon: IoPeopleOutline }, // Reusing the people icon
    { name: 'Order Management', path: '/admin/orders', icon: IoShirtOutline }, // Reusing the shirt icon
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 text-gray-800 focus:outline-none md:hidden p-2 bg-white rounded-lg shadow-md"
      >
        {isSidebarOpen ? <IoClose className="h-6 w-6" /> : <IoMenu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-gray-100 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header/Logo */}
          <div className="flex items-center justify-center p-6 bg-gray-900">
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          </div>
          
          {/* User Profile Info (Static example) */}
          <div className="flex items-center p-4 border-b border-gray-700">
              <FaUserCircle className="w-10 h-10 text-white rounded-full mr-3" />
              <div>
                  <h4 className="font-semibold text-white">Admin User</h4>
                  <span className="text-xs text-gray-400">Administrator</span>
              </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {adminNavItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile after clicking
                    className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Bottom links */}
          <div className="p-4 border-t border-gray-700">
              <ul className="space-y-2">
                  <li>
                      <Link to="/settings" className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                          <IoSettingsOutline className="w-5 h-5 mr-3" />
                          <span>Settings</span>
                      </Link>
                  </li>
                  <li>
                      <button className="flex items-center w-full p-2 rounded-lg text-left hover:bg-gray-700 transition-colors duration-200">
                          <IoLogOutOutline className="w-5 h-5 mr-3" />
                          <span>Logout</span>
                      </button>
                  </li>
              </ul>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="container mx-auto">
          <Outlet /> {/* Renders the child route component */}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
