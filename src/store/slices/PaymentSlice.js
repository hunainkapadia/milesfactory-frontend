import { createSlice } from "@reduxjs/toolkit";

const PaymentSlice = createSlice({
  name: "payment",
  initialState: {
    isDrawer: false,
    AddCardDrawer: false,
  },
  reducers: {
   setAddCardDrawer: (state)=> {
      state.AddCardDrawer = true
   },
   setCloseCardDrawer: (state)=> {
      state.AddCardDrawer = false
   },
   openDrawer: (state) => {
      console.log("state111", state);
      state.isDrawer = true; // Open drawer
   },
   closeDrawer: (state) => {
      state.isDrawer = false; // Close drawer
    },
  },
});

// Export actions
export const { openDrawer, closeDrawer, setAddCardDrawer, setCloseCardDrawer } =
  PaymentSlice.actions;
export default PaymentSlice.reducer;
