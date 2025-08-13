// client/src/pages/Admin/Dashboard/DashboardPage.js
import React from 'react';
import AdminDashboard from '../../../components/admin/AdminDashboard'; // Reusing the AdminDashboard component

const DashboardPage = () => {
  return (
    <div className="space-y-8 py-8">
      {/* The AdminDashboard component already handles fetching and displaying stats */}
      <AdminDashboard />
    </div>
  );
};

export default DashboardPage;