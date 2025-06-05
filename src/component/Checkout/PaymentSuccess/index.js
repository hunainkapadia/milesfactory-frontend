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
import { useSelector } from "react-redux";

const PaymentSuccess = () => {
  const [rating, setRating] = useState(null); // user-selected rating
  const [selectedReason, setSelectedReason] = useState(false); // user-selected reason
  const [successReview, setsuccessReview] = useState(false);
  // stroll
  const PaymentData = useSelector((state) => state?.payment?.PaymentData);
  console.log("order detail", PaymentData?.duffel_order?.payment_status);

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
  const handleSubmit = () => {
    if (rating !== null && !successReview) {
      setsuccessReview(true);
    } else {
    }

    // Do something with rating + reason (like dispatch or API)
  };
  const PaymentStatus = useSelector((state)=> state?.payment?.paymentStatus);
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
              <h4 className="regular">
                Congratulations, you booked your flight!
              </h4>
              {/* for desktop */}
              <Box display={{ lg: "block", md: "block", xs: "none" }}>
                <Typography>
                  Your Mylz order ID is {PaymentData?.order?.id} with booking
                  reference number{" "}
                  {PaymentData?.duffel_order?.booking_reference}
                </Typography>
                <Typography>
                  <Typography>
                    You and the other passengers have received a booking
                    confirmation. Install the Mylz app to monitor your flight
                    and any potential disruption.
                  </Typography>
                </Typography>
                <Typography variant="body1">
                  How was your booking experience?
                </Typography>
                <Typography variant="body1">
                  Your answer is anonymous. We use it to improve our product.
                </Typography>
              </Box>
              {/* for mobile */}
              <Box display={{ lg: "none", md: "none", xs: "block" }}>
                <Typography>
                  You aa and the other passengers have received a booking
                  confirmation - your booking reference is{" "}
                  {PaymentData?.duffel_order?.booking_reference}. Use it to view
                  and manage your booking directly on the airline's website or
                </Typography>
                <Typography variant="body1">
                  How was your booking experience?
                </Typography>
                <Typography variant="body1">
                  Your answer is anonymous. We use it to improve our product.
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
        </Box>
      </Box>

      {/*  Static Rating */}
      {console.log("successReview22", rating)}

      {rating !== null && rating <= 4 && !successReview ? (
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

          {/* Submit Button */}
        </>
      ) : (
        ""
      )}
      {successReview ? (
        <>
          <Box mt={4}>
            <h3 className="regular f25">
              <span>Please us help spread </span>{" "}
              <img src="/images/heart-emoji.svg" /> !
            </h3>
            <Typography>Invite friends around to travel with Mylz.</Typography>
          </Box>
          <Box mt={2}>
            <Typography>
              <img src="/images/hand-emoji.svg" />{" "}
              <img src="/images/hand-emoji.svg" /> We’ve sent the emails.{" "}
              <Link href={"#"} className="text-decuration-none">
                {" "}
                Invite more friends
              </Link>
            </Typography>
          </Box>
          <Box className={styles.InviteBox} display={"flex"} gap={1} pt={2}>
            <Box className=" formGroup">
              <TextField
                className={styles.formControl + " formControl"}
                fullWidth
                placeholder="Emails, comma separated"
                // value={"email"}
                // onChange={(e) => setFirstName(e.target.value)}
                margin="normal"
              />
            </Box>
            <Button
              className="btn btn-primary btn-sm btn-round"
              // onClick={"handleInvite"}
              variant="contained"
              color="success"
              type="submit" // Important!
            >
              Invite
            </Button>
          </Box>
        </>
      ) : (
        ""
      )}

      {rating !== null && !successReview ? (
        <Box mt={4} display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            className={`btn ${
              selectedReason || rating ? " btn-primary " : " btn-disabled"
            }  btn-md btn-round`}
          >
            Send
          </Button>
        </Box>
      ) : (
        ""
      )}
      {/* Static Reason Selection */}

      {/* Static Input for "Others" */}
    </Box>
  );
};

export default PaymentSuccess;
