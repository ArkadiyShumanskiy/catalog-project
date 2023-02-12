import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((item) => item !== action.payload)
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
