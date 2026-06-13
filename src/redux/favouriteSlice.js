import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [], // ✅ MUST NOT be undefined
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const event = action.payload;

      const exists = state.favorites.find(
        item => item.event_date_id === event.event_date_id,
      );

      if (exists) {
        state.favorites = state.favorites.filter(
          item => item.event_date_id !== event.event_date_id,
        );
      } else {
        state.favorites.push(event);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;