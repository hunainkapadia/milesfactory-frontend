import React from "react";
import { Box, Card, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchCard";
import Link from "next/link";

const AiMessage = ({ OfferMessage, aiMessage }) => {
  console.log("AiMessage Props:", { OfferMessage, aiMessage });

  const seeAllResultHandle = () => {
    // Implement logic for full search results if needed
    console.log('All results:', OfferMessage?.ai?.all_search_results);
  };

  return (
    <Box className="aibox" display="flex" justifyContent="flex-start" mb={2}>
      <Card className={`${searchResultStyles.AiMessage} white-bg`} variant="outlined">
         
        {/* Show Top Offers if available */}
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

        {/* Render All Search Results */}
        {OfferMessage?.ai?.all_search_results && OfferMessage.ai.all_search_results.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">More tickets:</Typography>
            {OfferMessage.ai.all_search_results.map((offer, index) => (
              <SearchCard key={index} offerData={offer} />
            ))}
            <Box mt={2}>
              <Link
                className="text-decuration-none"
                href="#"
                variant="contained"
                color="primary"
                onClick={seeAllResultHandle}
              >
                <Box mt={4} mb={4} gap={2} alignItems={"center"} display={"flex"}>
                  <i className="fa-caret-down fa fas"></i> See all flight options
                </Box>
              </Link>
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default AiMessage;
