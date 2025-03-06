import { createSlice } from "@reduxjs/toolkit";

const passengerDrawerSlice = createSlice({
  name: "passengerDrawer",
  initialState: {
    isOpen: false, //  Controls whether the drawer is open
  },
  reducers: {
    openPassengerDrawer: (state) => {
      state.isOpen = true; //
    },
    closePassengerDrawer: (state) => {
      console.log("state", state);
      state.isOpen = false; // 
    },
    bookFlight: (state, action) => {
      state.passengerDetails = action.payload; //  Store passenger details
    },
  },
});

// Export actions so we can use them in components
export const { openPassengerDrawer, closePassengerDrawer, bookFlight } = passengerDrawerSlice.actions;

export default passengerDrawerSlice.reducer;
