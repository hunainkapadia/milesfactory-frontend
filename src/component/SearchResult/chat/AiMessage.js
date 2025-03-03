import React from "react";
import { Box, Card, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchCard";
import Link from "next/link";

const AiMessage = ({ OfferMessage, aiMessage }) => {
  // const seeAllResultHandle = () => {
  //   console.log("All results:", OfferMessage?.ai?.all_search_results);
  // };
  console.log("test222", aiMessage?.ai?.response);

  return (
    <Box
      className={searchResultStyles.Aibox}
      flexDirection={"column"}
      display="flex"
      justifyContent="flex-start"
      mb={2}
    >
      {/* Show Top Offers if available */}

      {aiMessage?.ai?.offers ? (
        <>
          {aiMessage?.ai?.offers.map((getoffers) => (
            <React.Fragment key={getoffers.id}>
              <SearchCard offerData={getoffers} />
            </React.Fragment>
          ))}
        </>
      ) : (
        <Card
          className={`${searchResultStyles.AiMessage} white-bg`}
          variant="outlined"
        >
          <Typography
            dangerouslySetInnerHTML={{
              __html:
                typeof aiMessage?.ai?.response === "string"
                  ? aiMessage.ai.response.replace(/\n/g, "<br>")
                  : aiMessage?.ai?.response
                  ? `<pre>${JSON.stringify(
                      aiMessage.ai.response,
                      null,
                      2
                    )}</pre>`
                  : "No response available",
            }}
          />
        </Card>
      )}

      {/* Show AI Response if available */}

      {/* Render All Search Results */}
      {/* {OfferMessage?.ai?.all_search_results &&
        OfferMessage.ai.all_search_results.length > 0 && (
          <Box mt={2}>
            <Box my={3}>
              <Typography variant="h6">More tickets:</Typography>
            </Box>
            {OfferMessage.ai.all_search_results.map((offer, index) => (
              <SearchCard key={index} offerData={offer} />
            ))}
          </Box>
        )} */}
    </Box>
  );
};

export default AiMessage;
