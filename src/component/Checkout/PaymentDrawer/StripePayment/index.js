
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails, PaymentForm, setPaymentData, setPaymentDrawer, setPaymentFormSuccess } from '@/src/store/slices/PaymentSlice';
import api from '@/src/store/api';
import LoadingArea from '@/src/component/LoadingArea';
import ButtonLoading from '@/src/component/LoadingArea/ButtonLoading';
import { Box, CircularProgress } from '@mui/material';


const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "pk_test_51RAUC9PaaBt1oHi12mCzrlKhgWZdiGomdFxffVrhwjmdzjZGa5lriNO1V0snWqbZnH6jgFOGEYC5rwF4Dhzm3Ttc00kkLGG7QA";

// const stripePromise = loadStripe("pk_live_51RAUC2BDuRwOLvB4Jo4ZPfyvAzkY8TlRWkMmRne2mBD5angd26kG7A3KfpnZS5Ac0s0RfJMGANwUbINKIntXvEK000pY2vHGV0");
// // live

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
// local stripe
// API Base URL



const StripePayment = () => {
  
  const [clientSecret, setClientSecret] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(true);
  
  const orderUUID = useSelector((state)=> state.passengerDrawer.OrderUuid);
  const dispatch = useDispatch();
  
  

  useEffect(() => {
    
    if (!orderUUID) return;

    api.post(`/api/v1/stripe/create-checkout-session?order_uuid=${orderUUID}`,
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
        alert("session id")
        const data = response.data;
        setClientSecret(data.clientSecret);
        setSessionId(data.sessionId);
      })
      .catch((error) => {
        console.error("Checkout session error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orderUUID]);


useEffect(() => {
  if (!sessionId) return;

  const interval = setInterval(() => {
    console.log("Polling session status...");

    api
      .get(`/api/v1/stripe/session-status?session_id=${sessionId}`)
      .then((response) => {
        const data = response.data;
        console.log("payment_res_data", data);

        if (data.status === "complete") {
          alert("✅ Payment complete!");

          setCustomerEmail(data.customer_email);
          dispatch(setPaymentFormSuccess(true));
          dispatch(setPaymentData(data));
          dispatch(setPaymentDrawer(false));
          dispatch(fetchOrderDetails(orderUUID));

          clearInterval(interval); // ✅ Stop polling
        }
      })
      .catch((error) => {
        console.error("Session status check failed:", error);
      });
  }, 1000); // 🔁 1-second interval

  // Cleanup on unmount
  return () => clearInterval(interval);
}, [sessionId]);



  const options = {
    fetchClientSecret: () => Promise.resolve(clientSecret),
  };

  if (loading) return (
    <>
    <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} py={10} height={"80%"}>
      <CircularProgress />
    </Box>

    </>
  );

  return (
    <div>
      {!paymentComplete && clientSecret && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}

      {/* {paymentComplete && (
        <div>
          <h2>✅ Payment Successful!</h2>
          <p>
            A confirmation email has been sent to <strong>{customerEmail}</strong>.<br />
            If you have any questions, contact us at <a href="mailto:support@example.com">support@example.com</a>.
          </p>
        </div>
      )} */}
    </div>
  );
};

export default StripePayment;
