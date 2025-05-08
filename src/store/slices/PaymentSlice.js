import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

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
export const PaymentForm = () => (dispatch, getState) => {
  const state = getState();
  const payment = state.payment;
  console.log("payment_state", payment);
  
  // Just simulate success after 1 second
  
  
};
export const fetchOrderDetails = (orderId) => (dispatch) => {
  console.log("payment_response_0", orderId);
  return api
    .get(`/api/v1/order/${orderId}/details`)
    .then((response) => {
      console.log("payment_response", response);
      
      dispatch(setPaymentData(response.data));
    })
    .catch((error) => {
      console.error("Failed to fetch order details:", error);
    });
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
