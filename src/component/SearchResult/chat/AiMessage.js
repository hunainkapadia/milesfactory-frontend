import React, { useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchCard";
import Link from "next/link";
import { useSelector } from "react-redux";
import CollectPassengerInfo from "../../Checkout/CollectPassengerInfo";

const AiMessage = ({ aiMessage }) => {
  const allFlightSearchResults = useSelector(
    (state) => state.sendMessage.allFlightSearchResults
  );

  // 🔹 State to toggle flight search results
  const [showAllResults, setShowAllResults] = useState(false);

  // 🔹 Toggle function
  console.log("showAllResults", allFlightSearchResults.offers);
  
  const seeAllResultHandle = () => {
    setShowAllResults(true); // ✅ Toggles between true and false
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
      {aiMessage?.ai?.offers ? (
        <>
          {aiMessage.ai.offers.map((getoffers, offerindex) => (
            <SearchCard
              key={`${offerindex}-${getoffers.id}`}
              offerData={getoffers}
            />
          ))}

          {/* Button to Show All Flight Results */}
          <Box
            onClick={seeAllResultHandle}
            mt={2}
            style={{ cursor: "pointer" }}
          >
            <Link href={"#"} className="text-decoration-none">
              <Box mt={4} mb={4} gap={2} alignItems={"center"} display={"flex"}>
                <i className="fa-caret-down fa fas"></i>{" "}
                <span>
                    See all flight options
                </span>
              </Box>
            </Link>
          </Box>

          {/* Show All Flight Search Results */}

          {showAllResults && allFlightSearchResults?.offers?.length > 0 ? (
            <Box mt={2}>
              {allFlightSearchResults.offers.map((flight, index) => (
                <SearchCard key={index} offerData={flight} />
              ))}
            </Box>
          ) : (
            ""
          )}
        </>
      ) : aiMessage?.ai?.response === "passengerFlowActive" ? (
        //  Separate UI for BookFlight
        <>
          <Card
            className={`${searchResultStyles.AiMessage} white-bg`}
            variant="outlined"
          >
            <Typography>You have selected the flight option below.</Typography>
          </Card>
          <CollectPassengerInfo aiResponse={aiMessage?.ai?.response} />
        </>
      ) : (
        //  Default AI Response (Text)
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
    </Box>
  );
};

export default AiMessage;
