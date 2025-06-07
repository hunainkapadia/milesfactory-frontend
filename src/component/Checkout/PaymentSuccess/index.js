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
  RatingSubmit,
  setRatingSumbitRequest,
} from "@/src/store/slices/Base/baseSlice";

const PaymentSuccess = () => {
  const [rating, setRating] = useState(false); // user-selected rating
  const [selectedReason, setSelectedReason] = useState(false); // user-selected reason
  const [successReview, setsuccessReview] = useState(true);
  // stroll
  const PaymentData = useSelector((state) => state?.payment?.PaymentData);
  console.log("order detail", PaymentData?.order?.uuid);
  {console.log("successReview3", rating)}

  const priceSummaryRef = useRef(null); // Step 1: Create ref for scroll

  const [scrollRef, scrollToRef] = useScrollToRef();

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
  };
  const dispatch = useDispatch();

  const ratingSuccess = useSelector(
    (state) => state?.base?.RatingSumbitRequest
  );
  console.log("selectedReason", selectedReason);

  const handleSubmit = () => {
    if (rating !== null) {
      const payload = {
        rating: rating,
        flight_order: PaymentData.order.uuid,
      };

      if (selectedReason) {
        payload.review = selectedReason; // add review only if reason is selected
      }

      dispatch(RatingSubmit(payload));
    }
  };

  const PaymentStatus = useSelector((state) => state?.payment?.paymentStatus);
  console.log("PaymentStatus_0", PaymentStatus);

  return (
    <Box ref={scrollRef} py={4}>
      {/* Success Message */}
      <Box mb={3}>
        {/* {console.log(
          "PaymentStatus",
          PaymentData?.duffel_order?.payment_status
        )} */}

        <Box>
          {/* {isloading ? (
            <>
              <Typography>Loading your order details...</Typography>
            </>
          ) : !PaymentData?.duffel_order?.payment_status ? ( */}

          {PaymentStatus?.is_complete === "no" ? (
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
            PaymentData?.duffel_order?.payment_status ? (
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
                  {PaymentData?.duffel_order?.booking_reference}. Use it to view
                  and manage your booking directly on the airline’s website or
                  app, or to share with anyone who needs it.
                </Typography>
              </Box>
              {/* for mobile */}
              <Box display={{ lg: "none", md: "none", xs: "block" }}>
                <Typography
                  component={"h2"}
                  lineHeight={2}
                  className=""
                  fontSize={24}
                >
                  Congratulations,
                </Typography>
                <Typography
                  component={"h2"}
                  lineHeight={2}
                  className=""
                  fontSize={24}
                >
                  you booked your flight!
                </Typography>
                <Typography>
                  You and the other passengers have received a booking
                  confirmation - your booking reference is{" "}
                  {PaymentData?.duffel_order?.booking_reference}. Use it to view
                  and manage your booking directly on the airline’s website or
                  app.
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
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                      sx={{
                        mt: 2,
                        fontSize: "30px",
                        "& .MuiRating-iconFilled": {
                          color: "#00C4CC", // selected star color
                        },
                        "& .MuiRating-iconHover": {
                          color: "#00C4CC", // hover color
                        },
                      }}
                    />

                    {/* Show this only after a star is clicked */}
                  </Box>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </Box>
      </Box>

      {/*  Static Rating */}
      

      {!ratingSuccess ? (
        <>
          {rating && rating <= 4 ? (
            <>
              {/* Static Reason Selection */}
              <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
                What was the main reason?
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
                {reasons.map((reason, index) => (
                  <Chip
                    key={index}
                    label={reason}
                    onClick={() => handleReasonSelect(reason)}
                    sx={{
                      bgcolor: selectedReason === reason ? "#00C4CC" : "#fff",
                      color: selectedReason === reason ? "#fff" : "#69707B",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </Stack>
            </>
          ) : rating && rating > 4 ? (
            <>
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
                  <img src="/images/hand-emoji.svg" alt="hand" /> We’ve sent the
                  emails.
                  <Link href="#" className="text-decuration-none">
                    {" "}
                    Invite more friends
                  </Link>
                </Typography>
              </Box>
              <Box className={styles.InviteBox} display="flex" gap={1} pt={2}>
                <Box className="formGroup">
                  <TextField
                    className={`${styles.formControl} formControl`}
                    fullWidth
                    placeholder="Emails, comma separated"
                    margin="normal"
                  />
                </Box>
                <Button
                  className="btn btn-primary btn-sm btn-round"
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Invite
                </Button>
              </Box>
            </>
          ): ""}

          {/* Submit Button */}
          {rating ? (
            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={rating <= 4 && !selectedReason} // Disable only if low rating and no reason
                className={`btn btn-sm btn-round btn-primary ${
                  rating <= 4 && !selectedReason
                    ? "btn-disabled"
                    : "btn-primary"
                }`}
              >
                Send
              </Button>
            </Box>
          ) : null}
        </>
      ) : (
        <>
          <Box>
            <Typography variant="h6">Thank you for your feedback!</Typography>
            <Typography variant="body1">
              We really appreciate you taking the time to rate your experience.
            </Typography>
          </Box>
        </>
      )}

      {/* Static Reason Selection */}

      {/* Static Input for "Others" */}
    </Box>
  );
};

export default PaymentSuccess;
