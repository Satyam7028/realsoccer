// client/src/components/admin/AdminDashboard.js

import React from 'react';
import { Link } from 'react-router-dom';
// We are importing a selection of icons from react-icons to use in the
// dashboard summary cards. We'll use icons from Io5 for consistency and clarity.
import {
  IoPeopleOutline,
  IoNewspaperOutline,
  IoShirtOutline,
  IoCalendarOutline,
  IoAnalyticsOutline,
} from 'react-icons/io5';

const dashboardItems = [
  {
    title: 'User Management',
    description: 'Manage user accounts and permissions.',
    path: '/admin/users',
    icon: IoPeopleOutline,
    color: 'bg-blue-500',
  },
  {
    title: 'News Management',
    description: 'Create, edit, and publish news articles.',
    path: '/admin/news',
    icon: IoNewspaperOutline,
    color: 'bg-red-500',
  },
  {
    title: 'Shop Management',
    description: 'Add and update products in the store.',
    path: '/admin/shop',
    icon: IoShirtOutline,
    color: 'bg-green-500',
  },
  {
    title: 'Fixture Management',
    description: 'Schedule and manage league fixtures.',
    path: '/admin/fixtures',
    icon: IoCalendarOutline,
    color: 'bg-yellow-500',
  },
  {
    title: 'Reporting & Analytics',
    description: 'View sales, user, and traffic reports.',
    path: '/admin/reporting',
    icon: IoAnalyticsOutline,
    color: 'bg-purple-500',
  },
];

const AdminDashboard = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Welcome to the admin panel. Here you can manage all aspects of the site.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white ${item.color}`}
          >
            <item.icon className="h-12 w-12 mb-4" />
            <h2 className="text-xl font-semibold text-center mb-1">
              {item.title}
            </h2>
            <p className="text-sm text-center opacity-80">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
