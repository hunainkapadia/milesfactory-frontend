import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api";

const initialState = {
  selectedFlight: null,
  flightDetails: null,
  loading: false,
  error: null,
  isDrawerOpen: false,
};

const bookingFlightSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    selectFlight: (state, action) => {
      state.selectedFlight = action.payload;
      state.loading = true;
      state.error = null;
      state.isDrawerOpen = true; 
    },
    setFlightDetails: (state, action) => {
      state.flightDetails = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetSelectedFlight: (state) => {
      state.selectedFlight = null;
      state.flightDetails = null;
      state.loading = false;
      state.error = null;
      state.isDrawerOpen = false; // Close drawer when resetting
    },
    toggleDrawer: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const { selectFlight, setFlightDetails, setError, resetSelectedFlight, toggleDrawer} =
  bookingFlightSlice.actions;

export default bookingFlightSlice.reducer;

// API Call Function
export const fetchFlightDetails = (flightId) => (dispatch) => {
   dispatch(selectFlight(flightId));
 
   const bookingapiUrl = `https://demo.milesfactory.com/api/v1/search/single/result/${flightId}`;
 
   console.log("Fetching flight details for:", flightId); // Debugging
   console.log("API URL:", bookingapiUrl); // Debugging
 
   api.get(bookingapiUrl)
     .then((response) => {
       dispatch(setFlightDetails(response.data));
     })
     .catch((error) => {
       console.error("API Error:", error); // Debugging
       dispatch(setError(error.response?.data || "Something went wrong"));
     });
 };
 