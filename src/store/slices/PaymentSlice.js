import { createSlice } from "@reduxjs/toolkit";

const PaymentSlice = createSlice({
  name: "payment",
  initialState: {
    isDrawer: false,
    AddCardDrawer: false,
    PaymentFormSuccess: false,
    priceSummary: false,
  },
  reducers: {
    setpriceSummary: (state, action) => {
      state.priceSummary = true
    },
    setAddCardDrawer: (state) => {
      state.AddCardDrawer = true;
    },
    setCloseCardDrawer: (state) => {
      state.AddCardDrawer = false;
    },
    setIsDrawer: (state, action) => {
      state.isDrawer = action.payload;
    },
    // closeDrawer: (state) => {
    //   state.isDrawer = false; // Close drawer
    // },
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
    dispatch(setIsDrawer(false));
  }, 1000);
};

// Export actions
export const {
  setAddCardDrawer,
  setCloseCardDrawer,
  setPaymentFormSuccess,
  setpriceSummary,
  setIsDrawer,
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
