import React, { useState } from "react";
import { Box, Typography, Chip, Rating, Stack, Button } from "@mui/material";

const PaymentSuccess = () => {
  const [rating, setRating] = useState(null); // user-selected rating
  const [selectedReason, setSelectedReason] = useState(null); // user-selected reason

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
    console.log("Rating:", rating);
    console.log("Reason:", selectedReason);
    // Do something with rating + reason (like dispatch or API)
  };
  return (
    <Box py={3}>
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
      {rating && (
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
          <Box mt={4} display={"flex"} justifyContent={"flex-end"}>
            <Button
              variant="contained"
              disabled={!selectedReason}
              onClick={handleSubmit}
              className={`btn ${
                selectedReason ? " btn-primary " : " btn-disabled"
              }  btn-md btn-round`}
            >
              Send
            </Button>
          </Box>
        </>
      )}

      {/* Static Reason Selection */}

      {/* Static Input for "Others" */}
      <Box mt={2}>
        <Typography variant="body2">
          Could you please specify that reason?
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
