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
  InviteSubmit,
  RatingSubmit,
  setInviteEmailDialog,
  setRatingSumbitRequest,
} from "@/src/store/slices/Base/baseSlice";
import InviteEmailForm from "../../layout/InviteEmailForm";
import LoadingArea from "../../LoadingArea";
import BookingExperienceRating from "./BookingExperienceRating";
import InviteEmailSearch from "./InviteEmailSearch";

const PaymentSuccess = () => {
  const [rating, setRating] = useState(false); // user-selected rating
  const [selectedReason, setSelectedReason] = useState(false); // user-selected reason
  const [successReview, setsuccessReview] = useState(true);
  const [email, setEmail] = useState(""); // from false to empty string
  const [emailError, setEmailError] = useState("");
  // stroll

  const priceSummaryRef = useRef(null); // Step 1: Create ref for scroll

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

  // rating [end]

  // for invite
  const handleInvite = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    } else {
      setEmailError("");
    }
    const payload = {
      emails: email,
      flight_order: orderData?.order?.uuid,
    };
    dispatch(InviteSubmit(payload));
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

              {/* for desktop */}
              <Box display={{ lg: "block", md: "block", xs: "none" }}>
                <Typography
                  component={"h2"}
                  lineHeight={2}
                  className=""
                  fontSize={24}
                >
                  Congratulations, you booked your flight!
                </Typography>
                <Typography>
                  You and the other passengers have received a booking
                  confirmation – your booking reference is{" "}
                  <Typography component={"span"} className="exbold">
                    {orderData?.duffel_order?.booking_reference}
                  </Typography>
                  . Use it to view and manage your booking directly on the
                  airline’s website or app, or to share with anyone who needs
                  it.
                </Typography>
              </Box>
              {/* for mobile */}
              <Box display={{ lg: "none", md: "none", xs: "block" }}>
                <Typography
                  component={"h2"}
                  lineHeight={1.5}
                  className=""
                  fontSize={24}
                >
                  Congratulations,
                  <br />
                  you booked your flight!
                </Typography>
                <Typography
                  component={"h2"}
                  lineHeight={1.5}
                  className=""
                  fontSize={24}
                ></Typography>
                <Typography>
                  You and the other passengers have received a booking
                  confirmation - your booking reference is{" "}
                  <Typography component={"span"} className="exbold">
                    {orderData?.duffel_order?.booking_reference}
                  </Typography>
                  . Use it to view and manage your booking directly on the
                  airline’s website or app.
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
              <InviteEmailSearch
              inviteSuccess={inviteSuccess}
              orderData={orderData}
               />

              
            </>
          ) : PaymentStatus?.is_complete_hotel === "yes" &&
            PaymentStatus?.status === "success" ? (
            <>
              <Box className=" imggroup" mb={2}>
                <img src="/images/success-check.svg" />
              </Box>

              {/* for desktop */}
              <Box display={{ lg: "block", md: "block", xs: "none" }}>
                <Typography component={"h2"} lineHeight={2} fontSize={24}>
                  Congratulations, your hotel is booked!
                </Typography>
                <Typography>
                  You and the other guests have received a booking confirmation
                  – your booking reference is{" "}
                  <Typography component={"span"} className="exbold">
                    {orderData?.hotel_order?.booking_reference}
                  </Typography>
                  . Use it to view and manage your reservation directly on the
                  hotel’s website or app, or to share with anyone who needs it.
                </Typography>
              </Box>

              {/* for mobile */}
              <Box display={{ lg: "none", md: "none", xs: "block" }}>
                <Typography component={"h2"} lineHeight={1.5} fontSize={24}>
                  Congratulations,
                  <br />
                  your hotel is booked!
                </Typography>
                <Typography>
                  You and the other guests have received a booking confirmation
                  – your booking reference is{" "}
                  <Typography component={"span"} className="exbold">
                    {orderData?.hotel_order?.booking_reference}
                  </Typography>
                  . Use it to view and manage your reservation directly on the
                  hotel’s website or app.
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
              <InviteEmailSearch
              inviteSuccess={inviteSuccess}
              orderData={orderData}
               />
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
