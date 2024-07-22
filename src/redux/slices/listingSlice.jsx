// src/redux/slices/listingSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    createListingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createListingSuccess: (state, action) => {
      state.loading = false;
      state.listings.push(action.payload);
    },
    createListingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createListingStart,
  createListingSuccess,
  createListingFailure,
} = listingSlice.actions;

export default listingSlice.reducer;
