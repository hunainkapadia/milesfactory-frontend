import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Chip, Rating, Stack, Button } from "@mui/material";
import useScrollToRef from "@/src/hooks/useScrollToRef";
import { registerScrollFunction } from "@/src/utils/scrollManager";
import Link from "next/link";

const PaymentSuccess = () => {
  const [rating, setRating] = useState(null); // user-selected rating
  const [selectedReason, setSelectedReason] = useState(false); // user-selected reason
  const [successReview, setsuccessReview] = useState(false);
  // stroll
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
  return (
    <Box ref={scrollRef} py={4}>
      {/* Success Message */}
      <Box mb={3}>
        <Box className=" imggroup" mb={2}>
          <img src="/images/success-check.svg" />
        </Box>
        <Box>
          <h4 className="regular">Congratulations, you booked your flight!</h4>
          <Typography>
            You and the other passengers have received a booking confirmation.
            Install the Mylz app to monitor your flight and any potential
            disruption.
          </Typography>
        </Box>
      </Box>

      {/*  Static Rating */}
      <Box mb={3}>
        <Typography variant="body1">
          How was your booking experience?
        </Typography>
        <Typography variant="body1">
          Your answer is anonymous. We use it to improve our product.
        </Typography>
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
                  border: "1px solid #ccc",
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
