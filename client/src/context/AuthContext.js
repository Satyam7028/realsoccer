// client/src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
// Corrected import paths to navigate from the 'context' directory to the 'shared' directory.
import { API_ENDPOINTS } from '../shared/apiEndpoints';
import { USER_ROLES } from '../shared/userRoles';

// Export the context itself for use in other providers
export const AuthContext = createContext();

// Create and export a custom hook to easily access the auth context.
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate user authentication on component mount.
    const checkUser = () => {
      // Ensure USER_ROLES is defined before accessing its properties.
      // This fix addresses the "undefined is not an object" error.
      if (USER_ROLES && USER_ROLES.ADMIN) {
        const mockUser = {
          id: '123',
          name: 'Admin User',
          email: 'admin@example.com',
          role: USER_ROLES.ADMIN,
        };
  
        setUser(mockUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    console.log('Logging in with:', email, password);
    console.log('Login endpoint:', API_ENDPOINTS.AUTH.LOGIN);

    const mockUser = {
      id: '124',
      name: 'Logged-in User',
      email: email,
      role: USER_ROLES.USER,
    };
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
      user,
      isAuthenticated,
      loading,
      login,
      logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// This is the default export, which means other files should use
// `import AuthProvider from './context/AuthContext';`
export default AuthProvider;
