// client/src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext

/**
 * Custom hook to access the authentication context.
 * Provides user, token, loading, error, and auth functions (login, register, logout).
 *
 * @returns {object} - The authentication context value.
 * @throws {Error} If used outside of an AuthProvider.
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;