// client/src/state/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // We will create this
import cartReducer from './cartSlice'; // We will create this

/**
 * Configures the Redux store for the Real Soccer application.
 * Integrates various slices for different parts of the application state.
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    // Add other reducers here as you create more slices
  },
  // Middleware can be customized here, default middleware includes Redux Thunk
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // Enable Redux DevTools extension in development
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;