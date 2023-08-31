import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  toPrice: " ",
  fromPrice: " ",
  setDiscountedOnly: false,
  sortingValue: "asc",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    selectToPrice: (state, action) => {
      state.toPrice = action.payload;
    },
    selectFromPrice: (state, action) => {
      state.fromPrice = action.payload;
    },
    selectSorting: (state, action) => {
      state.sortingValue = action.payload;
    },
    selectDiscountedOnly: (state, action) => {
      state.setDiscountedOnly = action.payload;
    },
  },
});

export const {
  selectToPrice,
  selectFromPrice,
  selectSorting,
  selectDiscountedOnly,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
