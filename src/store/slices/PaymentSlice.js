import { createSlice } from "@reduxjs/toolkit";

const PaymentSlice = createSlice({
  name: "payment",
  initialState: {
    isDrawer: false,
    AddCardDrawer: false,
    PaymentFormSuccess: false,

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
    setPaymentFormSuccess: (state, action) => {
      state.PaymentFormSuccess = action.payload;
    },
  },
});

// 
export const PaymentForm = (params) => (dispatch) => {
  console.log("Simulating form submit", params);

  // Just simulate success after 1 second
  setTimeout(() => {
    dispatch(setPaymentFormSuccess(true));
    dispatch(setCloseCardDrawer()); // close the drawer
  }, 1000);
};

// Export actions
export const {
  openDrawer,
  closeDrawer,
  setAddCardDrawer,
  setCloseCardDrawer,
  setPaymentFormSuccess,
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
