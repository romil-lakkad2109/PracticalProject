import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favouriteSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});