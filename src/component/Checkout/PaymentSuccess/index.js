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
import styles from "@/src/styles/sass/components/checkout/Payment.module.scss";
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

  // getting payment status
  const PaymentStatus = useSelector((state) => state?.payment?.paymentStatus);

  console.log("orderStatus_00", orderData?.order?.payment_status);
  console.log("PaymentStatus_00", PaymentStatus?.is_complete, PaymentStatus?.status);
  
  
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
      flight_order: orderData.order.uuid,
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
      flight_order: orderData.order.uuid,
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


  
const inviteMoreEmailHandle=()=> {
    dispatch(setInviteEmailDialog(true))
  }
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

          {PaymentStatus?.is_complete === "no" &&
            PaymentStatus?.status === "pending" ? (
            <>
              <Typography>Please wait, confirming your order</Typography>
            </>
          ) : PaymentStatus?.is_complete === "yes" &&
            PaymentStatus?.status === "payment_failed" ? (
            <>
              <Typography>
                We have received your payment but there is a problem with the
                order. We will check and get back to you
              </Typography>
            </>
          ) : PaymentStatus?.is_complete === "yes" &&
            PaymentStatus?.status === "success" ? (
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

              {!ratingSuccess ? (
                <>
                  <Box mt={"40px"}>
                    <Typography variant="body1" className="bold">
                      How was your booking experience?
                    </Typography>
                    <Typography variant="body1">
                      Your answer is anonymous. We use it to improve our
                      product.
                    </Typography>
                  </Box>
                  <Box mb={3}>
                    {/* Interactive Rating */}
                    <Rating
                      name="feedback-rating"
                      value={rating}
                      onChange={handleRatingChange}
                      sx={{
                        mt: 2,
                        fontSize: "30px",
                        "& .MuiRating-iconFilled": {
                          color: "#00C4CC",
                        },
                        "& .MuiRating-iconHover": {
                          color: "#00C4CC",
                        },
                      }}
                    />
                    {/* Show this only after a star is clicked */}
                  </Box>
                  {rating && rating <= 4 ? (
                    <>
                      {/* Static Reason Selection */}
                      <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
                        What was the main reason?
                      </Typography>
                      <Stack
                        direction="row"
                        flexWrap="wrap"
                        gap={1}
                        sx={{ mb: 2 }}
                      >
                        {reasons.map((reason, index) => (
                          <Chip
                            key={index}
                            label={reason}
                            onClick={() => handleReasonSelect(reason)}
                            sx={{
                              bgcolor:
                                selectedReason === reason ? "#00C4CC" : "#fff",
                              color:
                                selectedReason === reason ? "#fff" : "#69707B",
                              cursor: "pointer",
                            }}
                          />
                        ))}
                      </Stack>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <Box pt={3}>
                    <h3 className="regular f25 mb-0">
                      Thank you for your feedback!
                    </h3>
                    <Typography variant="body1">
                      We really appreciate you taking the time to rate your
                      experience.
                    </Typography>
                  </Box>
                </>
              )}

              {!inviteSuccess ? (
                <>
                  <Box>
                    <Box mt={4}>
                      <h3 className="regular f25">
                        <span>Please help us spread </span>{" "}
                        <img src="/images/heart-emoji.svg" alt="heart" />
                      </h3>
                      <Typography>
                        Invite friends around to travel with Mylz.
                      </Typography>
                    </Box>
                    <Box mt={2}>
                      <Typography>
                        <img src="/images/hand-emoji.svg" alt="hand" />{" "}
                        <img src="/images/hand-emoji.svg" alt="hand" /> We've
                        sent the emails.
                        <Box
                          component={"span"}
                          onClick={() => inviteMoreEmailHandle()}
                          className="text-decuration-none cursor-pointer basecolor1"
                        >
                          {" "}
                          Invite more friends
                        </Box>
                      </Typography>
                    </Box>
                    <Box
                      className={styles.InviteBox + " paymentInviteBox"}
                      display="flex"
                      gap={1}
                      pt={2}
                    >
                      <InviteEmailForm flight_order={orderData.order.uuid} />
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Box mt={4}>
                    <h3 className="regular f25">
                      <span>Thank you for inviting your friends! </span>
                      <img src="/images/heart-emoji.svg" alt="heart" />
                    </h3>
                    <Typography>
                      We've successfully sent your invitation — you're helping
                      others discover great travel experiences!
                    </Typography>
                    <Typography>
                      Before you go, leave a quick review. Your feedback helps
                      us improve and makes travel better for everyone. 💙
                    </Typography>
                  </Box>
                </>
              )}
            </>
          ) : (
            ""
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
