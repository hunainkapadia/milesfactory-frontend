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
    PaymentSessionId: null,
    PaymentSessionData: null,
  },
  reducers: {
    setPaymentStatus:(state, action)=> {
      state.paymentStatus = action.payload
    },
    setIsloading: (state, action)=> {
      state.isloading = action.payload
    },
    setOrderConfirm: (state, action)=> {
      state.OrderConfirm = action.payload;
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
    setPaymentSessionId: (state, action)=> {
      console.log("sessionid_action", action);
      state.PaymentSessionId = action.payload;
    },
    setPaymentSessionData: (state, action)=> {
      console.log("session_data_action", action);
      state.PaymentSessionData = action.payload;
    }
  },
});


// ////////// payment start
export const PaymentSessionStart = () => (dispatch, getState) => {
  const state = getState();
  const orderUUID = state.passengerDrawer.OrderUuid;

  console.log("session_orderUUID", orderUUID);
  

  api
    .post(
      `/api/v1/stripe/create-checkout-session?order_uuid=${orderUUID}`,
      {
        frontend_url: window.location.origin,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      alert("create-checkout-session with orderuuid")

      console.log("session_response", response);

      const data = response.data;
      setClientSecret(data.clientSecret);
      dispatch(setPaymentSessionData(data));
    })
    .catch((error) => {
      console.error("Checkout session error:", error);
    })
    .finally(() => {
      setIsloading(false);
    });
};


// payment foropen form 
export const PaymentForm = () => (dispatch, getState) => {
  const state = getState();
  const orderUUID = state.passengerDrawer.OrderUuid;

  // Correct sessionId access
  const sessionId = state.payment.PaymentSessionData?.sessionId;

  console.log("PaymentForm_sessionId", state);

  if (!sessionId) {
    console.warn("PaymentForm: sessionId is missing");
    return;
  }

  api
    .get(`/api/v1/stripe/session-status?session_id=${sessionId}`)
    .then((response) => {
      alert("session status with session id")
      const data = response.data;
      console.log("payment_res", data);
      console.log("payment_data_status", data.status);

      if (data.status === "complete") {
        alert("order complete", OrderConfirm)
        dispatch(setPaymentFormSuccess(true));
        dispatch(setPaymentData(data));
        dispatch(setPaymentDrawer(false));
        dispatch(OrderConfirm(orderUUID));
      }
    })
    .catch((error) => {
      console.error("Session status check failed:", error);
    });
};


export const OrderConfirm = (orderId) => (dispatch, getState) => {

  const state = getState();
  const orderUUID = state.passengerDrawer.OrderUuid;
  console.log("payment_response_0", orderId);
  
  dispatch(setPaymentStatus({is_complete: "no",}))
  setTimeout(() => {
    api
      .get(`/api/v1/order/${orderUUID}/details`)
      .then((response) => {
        console.log("payment_response", response.data);
        dispatch(setOrderConfirm(response.data));
      })
      .catch((error) => {
        console.error("Failed to fetch order details:", error);
      });
  }, 10000);
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
  setPaymentStatus,
  setOrderConfirm,
  setPaymentSessionId,
  setPaymentSessionData,
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
