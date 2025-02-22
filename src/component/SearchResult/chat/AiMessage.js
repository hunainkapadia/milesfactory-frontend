import React from "react";
import { Box, Card, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchCard";
import Link from "next/link";

const AiMessage = ({ OfferMessage, aiMessage }) => {
  console.log("AiMessage Props:", { OfferMessage, aiMessage });

  const seeAllResultHandle = () => {
    console.log("All results:", OfferMessage?.ai?.all_search_results);
  };

  return (
    <Box
      className={searchResultStyles.Aibox}
      flexDirection={"column"}
      display="flex"
      justifyContent="flex-start"
      mb={2}
    >
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
        <Card
          className={`${searchResultStyles.AiMessage} white-bg`}
          variant="outlined"
        >
          <Typography
            dangerouslySetInnerHTML={{
              __html:
                aiMessage && typeof aiMessage === "string"
                  ? aiMessage.replace(/\n/g, "<br>")
                  : aiMessage
                  ? `<pre>${JSON.stringify(aiMessage, null, 2)}</pre>` // Ensuring proper JSON formatting
                  : "No response available",
            }}
          />
        </Card>
      )}

      {/* Render All Search Results */}
      {OfferMessage?.ai?.all_search_results &&
        OfferMessage.ai.all_search_results.length > 0 && (
          <Box mt={2}>
            <Box my={3}>
              <Typography variant="h6">More tickets:</Typography>
            </Box>
            {OfferMessage.ai.all_search_results.map((offer, index) => (
              <SearchCard key={index} offerData={offer} />
            ))}
          </Box>
        )}
    </Box>
  );
};

export default AiMessage;
