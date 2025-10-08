import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  PaymentDrawer: false,
  AddCardDrawer: false,
  PaymentFormSuccess: false,
  priceSummary: false,
  clientSessionId: "",
  client: "",
  clientSecret: "",
  isloading: false,
  PaymentSessionId: null,
  PaymentSessionData: null,
  PaymentData: null,
  OrderConfirm: null,
  OrderData: null,
  error: null,
  isDrawer: false,
  paymentStatus: null,
};
const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setError:(state, action)=> {
      state.error = action.payload;
    },
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
      state.PaymentFormSuccess = action.payload;
    },
    setPaymentSessionId: (state, action)=> {
      state.PaymentSessionId = action.payload;
    },
    setPaymentSessionData: (state, action)=> {
      state.PaymentSessionData = action.payload;
    },
    resetOrderState: () => ({ ...initialState }),

  },
});


// ////////// payment start
export const PaymentSessionStart = () => (dispatch, getState) => {
  const state = getState();
  const orderUUID = state.passengerDrawer.OrderUuid; //geting order id from pasenger select
  const genericUUID = state.passengerDrawer.genericOrderUuid;

  api
    .post(
      `/api/v1/stripe/create-checkout-session?order_uuid=${genericUUID}`,
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
      
      
      
      if (data.status === "complete") {
        dispatch(setPaymentFormSuccess(true)); // payment status
        dispatch(setPaymentData(data)); // payment data dispating id secret
        dispatch(setPaymentDrawer(false));
        dispatch(OrderSuccessPayment(orderUUID));
      }
    })
    .catch((error) => {
      console.error("Session status check failed:", error);
    });
};



export const fetchOrderDetail = (orderId) => (dispatch, getState) => {
  const state = getState();
  const orderUUID = state.passengerDrawer.OrderUuid;
  const genericUUID = state.passengerDrawer.genericOrderUuid;
  
  


  api
    .get(`/api/v1/order/${genericUUID}/details`)
    .then((response) => {
      const paymentStatus = response?.data?.duffel_order?.payment_status; /// checking duffel order status

      dispatch(setOrderData(response.data));
      dispatch(setOrderConfirm(response.data));

      // consition for checking if duffelr order found show congratz msg if not found error show
      if (paymentStatus) {
        dispatch(
          setPaymentStatus({
            is_complete: "yes",
            status: "success",
          })
        );
        dispatch(setIsloading(false));
      } else {
        dispatch(
          setPaymentStatus({
            is_complete: "yes",
            status: "payment_failed",
          })
        );
      }
    })
    .catch((error) => {
      console.error("Failed to fetch order details:", error?.message);
      dispatch(
        setPaymentStatus({
          is_complete: "no",
          status: "payment_failed",
        })
      );
      dispatch(setIsloading(false));
      dispatch(setError(error?.message));
    });
};

export const OrderSuccessPayment = (orderId) => (dispatch, getState) => {
const state = getState();
  const orderUUID = state.passengerDrawer.OrderUuid;
  const genericUUID = state.passengerDrawer.genericOrderUuid;

  const pollingStartTime = Date.now();
  const POLLING_TIMEOUT = 30000; // ⏱️ Stop after 10 seconds

  const pollPaymentStatus = () => {
    const elapsed = Date.now() - pollingStartTime;

    // Stop polling after 10 seconds
    if (elapsed >= POLLING_TIMEOUT) {
      // dispatch(
      //   setPaymentStatus({
      //     is_complete: "no",
      //     status: "payment_failed",
      //   })
      // );
      dispatch(setIsloading(false)); // Optional: depends on your state
      return;
    }
    setPaymentStatus({
      is_complete: "no",
      status: "pending",
    })

    
    
    api.get(`/api/v1/order/${genericUUID}/details`)
      .then((response) => {
        const paymentStatus = response?.data?.duffel_order?.payment_status; /// checking duffel order status
        const hotelPaymentSuccess = response.data.hotel_order;
        
        
        

        dispatch(setOrderData(response.data));
        dispatch(setOrderConfirm(response.data));

        // consition for checking if duffelr order found show congratz msg if not found error show
        if (paymentStatus) {
          dispatch(
            setPaymentStatus({
              is_complete: "yes",
              status: "success",
            })
          );
          dispatch(setIsloading(false));
          
          return; // Stop polling on success
        } else if (hotelPaymentSuccess) {
          dispatch(
            setPaymentStatus({
              is_complete_hotel: "yes",
              status: "success",
            })
          );
        } else {
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
          dispatch(
            setPaymentStatus({
              is_complete: "no",
              status: "payment_failed",
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
  setError,
  resetOrderState
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
