import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Rating,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import useScrollToRef from "@/src/hooks/useScrollToRef";

import { registerScrollFunction } from "@/src/utils/scrollManager";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  RatingSubmit,
} from "@/src/store/slices/Base/baseSlice";
import LoadingArea from "../../LoadingArea";
import BookingExperienceRating from "./BookingExperienceRating";
import InviteEmailSearch from "./InviteEmailSearch";

const PaymentSuccess = () => {
  const [rating, setRating] = useState(false); // user-selected rating
  const [selectedReason, setSelectedReason] = useState(false); // user-selected reason
  // stroll
  const [scrollRef, scrollToRef] = useScrollToRef();
  // getting order data refrens and other
  const orderData = useSelector((state) => state?.payment?.OrderData);
  console.log("orderData_test", orderData?.hotel_order?.uuid);

  // getting payment status
  const PaymentStatus = useSelector((state) => state?.payment?.paymentStatus);
  console.log("PaymentStatus", PaymentStatus);

  useEffect(() => {
    registerScrollFunction(scrollToRef);
  }, []);

  const reasons = [
    "Pricing",
    "Clarity on final price",
    "Ability to understand my requests",
    "Relevance of proposed offers",
    "Speed and convenience of booking",
    "Ability to customise offers",
    "Available payment methods",
    "Others",
  ];

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);

    if (rating && rating <= 4) {
      const payload = {
        rating: rating,
        flight_order:
          orderData?.flight_order?.uuid || orderData?.hotel_order?.uuid,
        review: reason,
      };

      dispatch(RatingSubmit(payload));
    }
  };

  const dispatch = useDispatch();

  const ratingSuccess = useSelector(
    (state) => state?.base?.RatingSumbitRequest
  );
  const inviteSuccess = useSelector((state) => state?.base?.InviteSuccess);

  const handleSubmit = () => {
    if (rating !== null) {
      const payload = {
        rating: rating,
        flight_order: orderData.order.uuid,
      };

      if (selectedReason) {
        payload.review = selectedReason; // add review only if reason is selected
      }

      dispatch(RatingSubmit(payload));
    }
  };
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);

    if (newValue === 5) {
      const payload = {
        rating: 5,
        flight_order:
          orderData.flight_order?.uuid || orderData.hotel_order.uuid,
      };
      dispatch(RatingSubmit(payload));
    }
    // Reset selectedReason when changing rating
    if (newValue < 5) {
      setSelectedReason(null);
    }
  };
  return (
    <Box ref={scrollRef} py={4}>
      {/* Success Message */}
      <Box mb={3}>
        <Box>
          {/* {isloading ? (
            <>
              <Typography>Loading your order details...</Typography>
            </>
          ) : !orderData?.duffel_order?.payment_status ? ( */}

          {orderData?.order?.payment_status === "pending" && // when pending run
          PaymentStatus?.is_complete === "yes" && // when payment compllente pending run
          PaymentStatus?.status === "payment_failed" ? (
            <>
              <Typography>Please wait, confirming your order</Typography>
            </>
          ) : orderData?.order?.payment_status === "success" && // when payment success and status from api
            PaymentStatus?.is_complete === "yes" &&
            PaymentStatus?.status === "payment_failed" ? ( // when payment faild if not duffel order
            <>
              <Typography>
                We have received your payment but there is a problem with the
                order. We will check and get back to you
              </Typography>
            </>
          ) : PaymentStatus?.is_complete === "yes" && // when payment success if duffel order found
            PaymentStatus?.status === "success" ? ( // when payment status success
            <>
              <Box className=" imggroup" mb={2}>
                <img src="/images/success-check.svg" />
              </Box>

              <Box>
                <Typography component={"h2"} lineHeight={2} fontSize={24}>
                  You’re booked!
                </Typography>
                <Typography mb={3}>
                  Your booking confirmation has been sent to your email. You can view and manage it anytime in Mylz, and reach your airline, train, hotel, or activity provider directly if needed.
                </Typography>
                <Typography>
                  Want to keep planning? Add more products to your Builder - everything stays in sync 💫.
                </Typography>
              </Box>

              <BookingExperienceRating
                rating={rating}
                ratingSuccess={ratingSuccess}
                reasons={reasons}
                selectedReason={selectedReason}
                handleRatingChange={handleRatingChange}
                handleReasonSelect={handleReasonSelect}
              />
              {/* <InviteEmailSearch
              inviteSuccess={inviteSuccess}
              orderData={orderData}
               /> */}

              
            </>
          ) : PaymentStatus?.is_complete_hotel === "yes" &&
            PaymentStatus?.status === "success" ? (
            <>
              <Box className=" imggroup" mb={2}>
                <img src="/images/success-check.svg" />
              </Box>

              {/* for desktop */}
              <Box>
                <Typography component={"h2"} lineHeight={2} fontSize={24}>
                  You’re booked!
                </Typography>
                <Typography mb={3}>
                  Your booking confirmation has been sent to your email. You can view and manage it anytime in Mylz, and reach your airline, train, hotel, or activity provider directly if needed.
                </Typography>
                <Typography>
                  Want to keep planning? Add more products to your Builder - everything stays in sync 💫.
                </Typography>
              </Box>

              <BookingExperienceRating
                rating={rating}
                ratingSuccess={ratingSuccess}
                reasons={reasons}
                selectedReason={selectedReason}
                handleRatingChange={handleRatingChange}
                handleReasonSelect={handleReasonSelect}
              />
              {/* <InviteEmailSearch
              inviteSuccess={inviteSuccess}
              orderData={orderData}
               /> */}
            </>
          ) : (
            <Box my={2} px={{ md: 3, lg: 3, xs: "18px" }}>
              <LoadingArea />
            </Box>
          )}
        </Box>
      </Box>

      {/*  Static Rating */}

      {/* Static Reason Selection */}

      {/* Static Input for "Others" */}
    </Box>
  );
};

export default PaymentSuccess;
