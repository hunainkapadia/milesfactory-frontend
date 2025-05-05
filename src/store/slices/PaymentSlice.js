import { createSlice } from "@reduxjs/toolkit";

const PaymentSlice = createSlice({
  name: "payment",
  initialState: {
    PaymentDrawer: false,
    AddCardDrawer: false,
    PaymentFormSuccess: false,
    priceSummary: false,
    clientSessionId: "",
    client: "",
    PaymentData: null,
    
  },
  reducers: {
    setPaymentData: (state, action)=> {
      state.PaymentData = action.payload;
    },
    setClient: (state, action)=> {
      state.client = action.payload
    },
    setClientSecret: (state, action)=> {
      state.clientSecret = action.payload
    },
    setpriceSummary: (state, action) => {
      state.priceSummary = true
    },
    setAddCardDrawer: (state) => {
      state.AddCardDrawer = true;
    },
    setCloseCardDrawer: (state) => {
      state.AddCardDrawer = false;
    },
    setPaymentDrawer: (state, action) => {
      state.isDrawer = action.payload;
    },
    closeDrawer: (state) => {
      state.isDrawer = false; // Close drawer
    },
    setPaymentFormSuccess: (state, action) => {
      console.log("PaymentFormSuccess", action.payload);
      
      state.PaymentFormSuccess = action.payload;
    },
  },
});

// 
export const PaymentForm = (params) => (dispatch) => {
  const state = getState();
  console.log("payment_state", state);
  
  // Just simulate success after 1 second
  
  
};

// Export actions
export const {
  setAddCardDrawer,
  setCloseCardDrawer,
  setPaymentFormSuccess,
  setpriceSummary,
  setPaymentDrawer,
  closeDrawer,
  setClient,
  setClientSecret,
  setPaymentData
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
