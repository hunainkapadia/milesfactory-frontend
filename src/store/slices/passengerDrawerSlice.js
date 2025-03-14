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

export const PassengerForm = (params) => (dispatch, getState) => {
  const state = getState(); // Get the Redux state
  const OrderUUID = state?.booking?.OrderUuid; // Get OrderUuid from bookingflightsSlice
  console.log("OrderUUID111", OrderUUID);
  

  // dispatch(seIstLoading(true));
  console.log("idds");

  api.post(API_ENDPOINTS.BOOKING.PASSENGERFORM, params).then((res) => {
    console.log("res", res);
  });
};

// Store user info in cookies

// Export actions
export const {
  openPassengerDrawer,
  closePassengerDrawer,
  bookFlight,
  setCountries,
} = passengerDrawerSlice.actions;

export default passengerDrawerSlice.reducer;
