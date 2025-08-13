// client/src/pages/Admin/Reporting/ReportingPage.js

import React, { useState } from 'react';
// We are importing a selection of icons from react-icons/io5 to
// provide clear visual cues for the reporting page.
import {
  IoAnalyticsOutline,
  IoStatsChart,
  IoPeopleOutline,
  IoShirtOutline,
} from 'react-icons/io5';

// Mock data for demonstration purposes
const salesData = [
  { month: 'Jan', sales: 15000 },
  { month: 'Feb', sales: 20000 },
  { month: 'Mar', sales: 18000 },
  { month: 'Apr', sales: 25000 },
];

const userData = {
  totalUsers: 1250,
  newUsersLastMonth: 85,
  activeUsers: 980,
};

const trafficData = {
  totalVisits: '150,000',
  source: 'Search Engine',
};

const ReportingPage = () => {
  const [selectedReport, setSelectedReport] = useState('sales');

  const renderReport = () => {
    switch (selectedReport) {
      case 'sales':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <IoStatsChart className="text-indigo-600" />
              <span>Sales Report</span>
            </h3>
            {/* A simple mock table for sales data */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.sales.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <IoPeopleOutline className="text-indigo-600" />
              <span>User Report</span>
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-gray-700">
                <span>Total Users:</span>
                <span className="font-semibold text-lg">{userData.totalUsers}</span>
              </li>
              <li className="flex justify-between items-center text-gray-700">
                <span>New Users (last 30 days):</span>
                <span className="font-semibold text-lg">{userData.newUsersLastMonth}</span>
              </li>
              <li className="flex justify-between items-center text-gray-700">
                <span>Active Users:</span>
                <span className="font-semibold text-lg">{userData.activeUsers}</span>
              </li>
            </ul>
          </div>
        );
      case 'traffic':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <IoAnalyticsOutline className="text-indigo-600" />
              <span>Traffic Report</span>
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-gray-700">
                <span>Total Website Visits:</span>
                <span className="font-semibold text-lg">{trafficData.totalVisits}</span>
              </li>
              <li className="flex justify-between items-center text-gray-700">
                <span>Primary Traffic Source:</span>
                <span className="font-semibold text-lg">{trafficData.source}</span>
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
        <IoAnalyticsOutline className="text-indigo-600" />
        <span>Reporting & Analytics</span>
      </h1>

      {/* Report Selection Tabs */}
      <div className="flex space-x-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setSelectedReport('sales')}
          className={`pb-2 text-lg font-semibold ${selectedReport === 'sales' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Sales
        </button>
        <button
          onClick={() => setSelectedReport('users')}
          className={`pb-2 text-lg font-semibold ${selectedReport === 'users' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Users
        </button>
        <button
          onClick={() => setSelectedReport('traffic')}
          className={`pb-2 text-lg font-semibold ${selectedReport === 'traffic' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Traffic
        </button>
      </div>

      {/* Render the selected report content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderReport()}
      </div>
    </div>
  );
};

export default ReportingPage;
