import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import api from "../api";

const passengerDrawerSlice = createSlice({
  name: "passengerDrawer",
  initialState: {
    isOpen: false,
    countries: [],
  },
  reducers: {
    openPassengerDrawer: (state) => {
      state.isOpen = true;
    },
    closePassengerDrawer: (state) => {
      state.isOpen = false;
    },
    bookFlight: (state, action) => {
      state.passengerDetails = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
  },
});

// **Fetch nationality data using Axios without async/await**
export const NationalitData = () => (dispatch) => {
  api
    .get(API_ENDPOINTS.BOOKING.COUNTRIES)
    .then((response) => {
      dispatch(setCountries(response.data));
    })
    .catch((error) => {
      console.error("Error fetching nationalities:", error);
    });
};

// Export actions
export const {
  openPassengerDrawer,
  closePassengerDrawer,
  bookFlight,
  setCountries,
} = passengerDrawerSlice.actions;

export default passengerDrawerSlice.reducer;
