
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentData, setPaymentDrawer, setPaymentFormSuccess } from '@/src/store/slices/PaymentSlice';

const stripePromise = loadStripe("pk_test_51KOpGgEpUId2bVouR53qbdD9ID74eEKrnJQXRa23eyNYABjw1NCV8UNBvVNpvIspr70eZQBJMJvLjRgTX6nBYttT00KM8QM4AS");

const StripePayment = () => {
  
  const [clientSecret, setClientSecret] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(true);
  
  const orderUUID = useSelector((state)=> state.passengerDrawer.OrderUuid);
  const dispatch = useDispatch();
  console.log("paymentComplete", paymentComplete);
  

  useEffect(() => {
    if (!orderUUID) return;

    fetch(`https://demo.milesfactory.com/api/v1/stripe/create-checkout-session?order_uuid=${orderUUID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ frontend_url: window.location.origin }),
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret);
        setSessionId(data.sessionId);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderUUID]);

  useEffect(() => {
    if (!sessionId) return;

    const interval = setInterval(() => {
      fetch(`https://demo.milesfactory.com/api/v1/stripe/session-status?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'complete') {
            setCustomerEmail(data.customer_email);
            setPaymentComplete(true);
            dispatch(setPaymentFormSuccess(true));
            dispatch(setPaymentData(data));
            dispatch(setPaymentDrawer(false))
            
            clearInterval(interval);
          }
        });
    }, 3000);

    return () => clearInterval(interval);
  }, [sessionId]);

  const options = {
    fetchClientSecret: () => Promise.resolve(clientSecret),
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      {!paymentComplete && clientSecret && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}

      {paymentComplete && (
        <div>
          <h2>✅ Payment Successful!</h2>
          <p>
            A confirmation email has been sent to <strong>{customerEmail}</strong>.<br />
            If you have any questions, contact us at <a href="mailto:support@example.com">support@example.com</a>.
          </p>
        </div>
      )}
    </div>
  );
};

export default StripePayment;
