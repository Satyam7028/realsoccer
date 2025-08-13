// client/src/state/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService'; // Our client-side auth service
import { USER_ROLES } from '../../shared/constants/userRoles'; // Shared user roles

// Helper to get user from localStorage
const user = JSON.parse(localStorage.getItem('userData'));
const token = localStorage.getItem('userToken');

const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  isAuthenticated: user && token ? true : false,
  isAdmin: user && user.role === USER_ROLES.ADMIN ? true : false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Async Thunks for API calls
// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const data = await authService.register(userData.username, userData.email, userData.password);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const data = await authService.login(userData.email, userData.password);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  // Clear local storage manually as authService doesn't handle it
  localStorage.removeItem('userToken');
  localStorage.removeItem('userData');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    // This reducer is for when AuthContext handles login/logout and needs to update Redux
    // This might be redundant if AuthContext uses Redux actions directly
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.user;
      state.isAdmin = action.payload.user?.role === USER_ROLES.ADMIN;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.role === USER_ROLES.ADMIN;
        state.message = 'Registration successful!';
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.role === USER_ROLES.ADMIN;
        state.message = 'Login successful!';
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.message = 'Logged out successfully.';
      });
  },
});

export const { reset, setAuth } = authSlice.actions;
export default authSlice.reducer;