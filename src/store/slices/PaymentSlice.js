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
    
    isloading: false,
  },
  reducers: {
    setPaymentStatus:(state, action)=> {
      state.paymentStatus = action.payload
    },
    setIsloading: (state, action)=> {
      state.isloading = action.payload
    },
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
  
  dispatch(setPaymentStatus({is_complete: "no",}))
  setTimeout(() => {
    api
      .get(`/api/v1/order/${orderId}/details`)
      .then((response) => {
        console.log("payment_response", response.data);
        dispatch(setPaymentData(response.data));
        if (response?.data?.duffel_order?.payment_status) {
          dispatch(
            setPaymentStatus({
              is_complete: "yes",
              status: response?.data?.duffel_order?.payment_status,
            })
          );
          setIsloading(false)
        } 
      })
      .catch((error) => {
        console.error("Failed to fetch order details:", error);
      });
  }, 5000);
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
  setPaymentData,
  setIsloading,
  setPaymentStatus
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
