// client/src/pages/Admin/UserManagement/UserManagementPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from '../../../components/admin/UserTable';
import useAuth from '../../../hooks/useAuth';
import Modal from '../../../components/common/Modal'; // Assuming you have a Modal component
import UserForm from '../../../components/admin/UserForm'; // You'll need to create this for editing

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useAuth(); // Assuming useAuth provides user and token
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      // Check for user and token before making the request
      if (user && user.role === 'admin' && token) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const { data } = await axios.get('/api/users', config);
          setUsers(data);
        } catch (err) {
          setError('Failed to fetch users. Please check your network or permissions.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setError('You are not authorized to view this page.');
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [user, token]);

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
    setIsModalOpen(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`/api/users/${updatedUser._id}`, updatedUser, config); // Backend API call
      setIsModalOpen(false);
      // Update the user list locally or refetch
      setUsers(
        users.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );
    } catch (err) {
      console.error('Failed to update user', err);
      // Handle error, e.g., show a toast message
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        await axios.delete(`/api/users/${userId}`, config); // Backend API call
        // Remove the user from the state
        setUsers(users.filter((u) => u._id !== userId));
      } catch (err) {
        console.error('Failed to delete user', err);
        // Handle error
      }
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <UserTable
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserForm
          user={editingUser}
          onSubmit={handleUpdateUser}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default UserManagementPage;