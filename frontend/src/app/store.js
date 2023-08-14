import { configureStore } from '@reduxjs/toolkit';
// import  from '../features/auth/authSlice';
import authSlice from '../features/auth/authSlice';
import goalSlice from '../features/goals/goalSlice';

export const store = configureStore({
  reducer: {
    auth:authSlice,
    goals:goalSlice
  },
});
