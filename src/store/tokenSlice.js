import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "",
    registered: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRegistered: (state, action) => {
      state.registered = action.payload;
    }
  },
});

export const { setToken, setRegistered } = tokenSlice.actions;

export default tokenSlice.reducer;
