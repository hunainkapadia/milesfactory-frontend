import React from "react";
import { Box, Card, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

const UserMessage = (props) => {
  {
    console.log("props_userMessage", props);
  }
  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Box
          className={searchResultStyles.UserMessage}
          sx={{ maxWidth: "75%" }}
        >
          <Typography
            sx={{
              whiteSpace: "pre-line",
            }}
          >
            {props.userMessage
              ?.replaceAll("Segment", "\n\nSegment")
              .replace("SYSTEM MESSAGE:", "System Message:\n")
              .replace("Airline:", "\nAirline:")
              .replace("Baggage", "\nBaggage")
              .replace("Cabin Class:", "\nCabin Class:")
              .replace("Passengers:", "\nPassengers:")
              .replace("Total Price:", "\nTotal Price:")
              .replace("Final with markup:", "\nFinal with markup:")
              .replace("Additional Notes:", "\nAdditional Notes:")
              .replace("Offer expires:", "\nOffer expires:")
              .replace("Payment required by:", "\nPayment required by:")}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default UserMessage;
