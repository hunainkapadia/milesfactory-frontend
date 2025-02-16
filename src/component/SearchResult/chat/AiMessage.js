import React from "react";
import { Box, Card, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchCard";

const AiMessage = ({ isnormalChat, OfferMessage, aiMessage }) => {
  console.log("AiMessage Props:", { isnormalChat, OfferMessage, aiMessage });

  return (
    <Box display="flex" justifyContent="flex-start" mb={2}>
      <Card className={`${searchResultStyles.AiMessage} white-bg`} variant="outlined">
         
        {/* Show Offer Message if available */}
        {OfferMessage?.ai?.cheapest_offer && (
          <SearchCard offerData={OfferMessage.ai.cheapest_offer} />
        )}
        {OfferMessage?.ai?.fastest_offer && (
          <SearchCard offerData={OfferMessage.ai.fastest_offer} />
        )}
        {OfferMessage?.ai?.ecological_offer && (
          <SearchCard offerData={OfferMessage.ai.ecological_offer} />
        )}

        {/* Show AI Response if available */}
        {aiMessage && (
          <Typography
            dangerouslySetInnerHTML={{
              __html:
                typeof aiMessage === "string"
                  ? aiMessage.replace(/\n/g, "<br>")
                  : JSON.stringify(aiMessage, null, 2),
            }}
          />
        )}
      </Card>
    </Box>
  );
};

export default AiMessage;
