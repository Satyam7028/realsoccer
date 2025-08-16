// client/src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { API_ENDPOINTS } from '../shared/apiEndpoints';
import { USER_ROLES } from '../shared/userRoles';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to set the user state and authentication status
  const setAuthData = (userData, token) => {
    // In a real app, you would also save the token to local storage
    // or a secure cookie.
    setUser(userData);
    setIsAuthenticated(true);
    // You might also save the token here for later API calls
    localStorage.setItem('token', token);
  };

  // Function to clear user state and authentication status
  const clearAuthData = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      setError(null);
      // Here, you would check for an existing token in storage
      // and validate it with a backend API call to retrieve user data.
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // You would have a protected endpoint like '/api/auth/me'
          const response = await fetch(API_ENDPOINTS.AUTH.ME, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setAuthData(userData, token);
          } else {
            clearAuthData();
          }
        } catch (err) {
          console.error("Failed to authenticate with token:", err);
          clearAuthData();
        }
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const { user: userData, token } = await response.json();
      setAuthData(userData, token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const { user: userData, token } = await response.json();
      setAuthData(userData, token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    clearAuthData();
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
