// client/src/hooks/useAuth.js
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, register } from '../state/authSlice'; // Corrected import names
import authService from '../services/authService';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const handleLogin = async (userData) => {
    try {
      const response = await authService.login(userData);
      dispatch(login(response));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
  };

  const handleRegister = async (userData) => {
    try {
      const response = await authService.register(userData);
      dispatch(register(response));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    isLoading,
    isError,
    message,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };
};

export default useAuth;