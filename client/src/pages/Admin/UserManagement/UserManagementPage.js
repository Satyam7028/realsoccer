// client/src/pages/Admin/UserManagement/UserManagementPage.js
import React from 'react';
import UserTable from '../../../components/admin/UserTable'; // Reusing the UserTable component

const UserManagementPage = () => {
  return (
    <div className="space-y-8 py-8">
      {/* The UserTable component already handles fetching and displaying users */}
      <UserTable />
    </div>
  );
};

export default UserManagementPage;