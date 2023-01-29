import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // structure [{ id: {id}, count: {count} }, ...]
    items: [],
    chosenItemsIds: [],
  },
  reducers: {
    addItem: (state, action) => {
      const targetItem = state.items.find((item) => item.id === action.payload);

      state.items = targetItem
        ? [...state.items.filter((item) => item.id !== action.payload), { ...targetItem, count: Number(targetItem.count) + 1 }]
        : [...state.items, { id: action.payload, count: 1 }];
    },
    removeItem: (state, action) => {
      state.chosenItemsIds = state.chosenItemsIds.filter((item) => item !== action.payload)
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setItemCount: (state, action) => {
      const targetItem = state.items.find((item) => item.id === action.payload.id);

      state.items = [...state.items.filter((item) => item.id !== action.payload.id), { ...targetItem, count: action.payload.count }];
    },
    checkItem: (state, action) => {
      state.chosenItemsIds = [...state.chosenItemsIds, action.payload]
    },
    uncheckItem: (state, action) => {
      state.chosenItemsIds = state.chosenItemsIds.filter((item) => item !== action.payload)
    },
  },
});

export const { addItem, removeItem, setItemCount, checkItem, uncheckItem } = cartSlice.actions;

export default cartSlice.reducer;
