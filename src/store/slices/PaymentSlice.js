import { createSlice } from "@reduxjs/toolkit";

const PaymentSlice = createSlice({
  name: "payment",
  initialState: {
    isDrawer: false,
    AddCardDrawer: false,
    PaymentFormSuccess: false,
    priceSummary: false,
    clientSessionId: "",
    client: "",
    
  },
  reducers: {
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
    setIsDrawer: (state, action) => {
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
  setIsDrawer,
  closeDrawer,
  setClient,
  setClientSecret,
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
