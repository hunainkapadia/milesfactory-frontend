"use client";

import React, { useCallback, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  PaymentForm,
  setPaymentData,
  setPaymentDrawer,
  
} from "@/src/store/slices/PaymentSlice";
import api from "@/src/store/api";
import LoadingArea from "@/src/component/LoadingArea";
import ButtonLoading from "@/src/component/LoadingArea/ButtonLoading";
import { Box, CircularProgress } from "@mui/material";

const STRIPE_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ||
  "pk_test_51RAUC9PaaBt1oHi12mCzrlKhgWZdiGomdFxffVrhwjmdzjZGa5lriNO1V0snWqbZnH6jgFOGEYC5rwF4Dhzm3Ttc00kkLGG7QA";

// const stripePromise = loadStripe("pk_live_51RAUC2BDuRwOLvB4Jo4ZPfyvAzkY8TlRWkMmRne2mBD5angd26kG7A3KfpnZS5Ac0s0RfJMGANwUbINKIntXvEK000pY2vHGV0");
// // live

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
// local stripe
// API Base URL

const StripePayment = () => {
  
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  const orderUUID = useSelector((state) => state.passengerDrawer.OrderUuid);
  const dispatch = useDispatch();
  
  console.log("orderUUID_payment", orderUUID);
  const loading = useSelector((state) => state.payment.isloading);
  
  const PaymentsessionData = useSelector((state) => state?.payment?.PaymentSessionData);
  const sessionId = PaymentsessionData?.sessionId;
  const clientSecret = PaymentsessionData?.clientSecret;
  
  console.log("PaymentsessionData", PaymentsessionData);
  
  console.log("sessionIdData", sessionId, "clientSecret:", clientSecret);

useEffect(() => {
  if (!sessionId) return;
  const interval = setInterval(() => {
    dispatch(PaymentForm()); // payment form interval dispatching widget 1 sectond
  }, 1000); // poll every 1 second

  return () => clearInterval(interval); // clean up on unmount
}, [sessionId, dispatch]);

  

  const options = {
    fetchClientSecret: () => Promise.resolve(clientSecret),
  };

  if (loading)
    return (
      <>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          py={10}
          height={"80%"}
        >
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
