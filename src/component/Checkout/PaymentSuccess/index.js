import React from "react";
import { Box, Typography, Chip, Rating, Stack } from "@mui/material";

const PaymentSuccess = () => {
  return (
    <Box
      py={3}
    >
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


      {/* ⭐ Static Rating */}
      <Box mb={3}>
         <Typography variant="body1">
         How was your booking experience?
         </Typography>
         <Typography variant="body1">
            Your answer is anonymous. We use it to improve our product.
         </Typography>
         <Rating
         name="static-rating"
         value={4}
         readOnly
         sx={{ mt: 2, color: "#00C4CC", fontSize:"30px" }}
         />
      </Box>

      {/* Static Reason Selection */}
      <Typography variant="body1" sx={{ mb: 3 }}>
        What was the main reason?
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
        <Chip className="primary-font"  sx={{ bgcolor: "#fff", color: "#69707B" }}  bgcolor="#fff" label="Pricing"  />
        <Chip className="primary-font"  sx={{ bgcolor: "#fff", color: "#69707B" }}  label="Clarity on final price"  />
        <Chip className="primary-font"  sx={{ bgcolor: "#fff", color: "#69707B" }}  label="Ability to understand my requests"  />
        <Chip className="primary-font"  sx={{ bgcolor: "#fff", color: "#69707B" }}  label="Relevance of proposed offers"  />
        <Chip className="primary-font"  sx={{ bgcolor: "#fff", color: "#69707B" }}  label="Speed and convenience of booking"  />
        <Chip className="primary-font"  sx={{ bgcolor: "#fff", color: "#69707B" }}  label="Ability to customise offers"  />
        <Chip className="primary-font"  sx={{ bgcolor: "#fff", color: "#69707B" }}  label="Available payment methods"  />
        <Chip className="primary-font"  sx={{ bgcolor: "#fff", color: "#69707B" }}  label="Others"  />
        
      </Stack>

      {/* 📝 Static Input for "Others" */}
      <Box mt={2}>
        <Typography variant="body2">
          Could you please specify that reason?
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
