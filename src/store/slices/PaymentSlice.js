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
    setOrderData: (state, action)=> {
      state.OrderData = action.payload;
    },
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
  const orderUUID = state.passengerDrawer.OrderUuid; //geting order id from pasenger select

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
      console.log("session_response", response);
      const data = response.data;
      setClientSecret(data.clientSecret); // client secret
      dispatch(setPaymentSessionData(data)); ///payment session data dispatching
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
  const sessionId = state.payment.PaymentSessionData?.sessionId;
  // if session id there run below script
  if (!sessionId) {
    console.warn("PaymentForm: sessionId is missing");
    return;
  }

  dispatch(setPaymentFormSuccess(false));
  api
    .get(`/api/v1/stripe/session-status?session_id=${sessionId}`)
    .then((response) => {
      const data = response.data;
      console.log("payment_data111", data);

      console.log("payment_status", data.status);
      
      
      if (data.status === "complete") {
        console.log("✅ Order complete!");
        dispatch(setPaymentFormSuccess(true)); // payment status
        dispatch(setPaymentData(data)); // payment data dispating id secret
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
  dispatch(setPaymentStatus({ is_complete: "no" }));

  const pollingStartTime = Date.now();
  const POLLING_TIMEOUT = 30000; // ⏱️ Stop after 10 seconds

  const pollPaymentStatus = () => {
    const elapsed = Date.now() - pollingStartTime;

    // Stop polling after 10 seconds
    if (elapsed >= POLLING_TIMEOUT) {
      console.log("Stopped polling after 30 seconds");
      dispatch(
        setPaymentStatus({
          is_complete: "no",
          status: "payment_failed",
        })
      );
      dispatch(setIsloading(false)); // Optional: depends on your state
      return;
    }

    api.get(`/api/v1/order/${orderUUID}/details`)
      .then((response) => {
        const paymentStatus = response?.data?.duffel_order?.payment_status;

        dispatch(setOrderData(response.data));
        dispatch(setOrderConfirm(response.data));

        console.log("order_status_0", response?.data);

        if (paymentStatus) {
          dispatch(
            setPaymentStatus({
              is_complete: "yes",
              status: response?.data?.duffel_order?.payment_status,
            })
          );
          dispatch(setIsloading(false));
          console.log("payment_response", response.data);
          return; // Stop polling on success
        } else {
          console.log("order_status_failed", response?.data);
            dispatch(
              setPaymentStatus({
                is_complete: "yes",
                status: "payment_failed",
              })
            );

          setTimeout(pollPaymentStatus, 2000); // Retry after 1 second
        }
      })
      .catch((error) => {
        console.error("Failed to fetch order details:", error);

        if (Date.now() - pollingStartTime < POLLING_TIMEOUT) {
          setTimeout(pollPaymentStatus, 2000); // Retry on error
        } else {
          console.log("Stopped polling after 10 seconds (error case)");
          dispatch(
            setPaymentStatus({
              is_complete: "no",
              status: "timeout",
            })
          );
          dispatch(setIsloading(false));
        }
      });
  };

  // Start polling
  pollPaymentStatus();
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
  setOrderData,
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
