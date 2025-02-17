import React from "react";
import { Box, Card, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchCard";
import Link from "next/link";

const AiMessage = ({ isnormalChat, OfferMessage, aiMessage }) => {
  console.log("AiMessage Props:", { isnormalChat, OfferMessage, aiMessage });
  const seeAllResultHandle = ()=> {
    
  }

  return (
    <Box className="aibox" display="flex" justifyContent="flex-start" mb={2}>
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
        {(OfferMessage?.ai?.cheapest_offer ||
          OfferMessage?.ai?.fastest_offer ||
          OfferMessage?.ai?.ecological_offer) && (
          <Box mt={2}>
            <Link className="text-decuration-none" href={""} variant="contained" color="primary" onClick={seeAllResultHandle}>
              <Box mt={4} mb={4} gap={2} alignItems={"center"} display={"flex"}><i className="fa-caret-down  fa fas"></i> See all flight options</Box>
            </Link>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default AiMessage;
