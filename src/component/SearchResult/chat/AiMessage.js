import React, { useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchCard";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import CollectPassengerInfo from "../../Checkout/CollectPassengerInfo";
import { setAllFlightResults } from "@/src/store/slices/sendMessageSlice";

const AiMessage = ({ aiMessage }) => {
  //  State to toggle flight search results
  
  const [showAllResults, setShowAllResults] = useState(false);
  
  const getAllFlightPostApi = useSelector((state)=> state.sendMessage.setAllFlightPostApi)  
  //  Toggle function
  const getselectedFlight = useSelector((state) => state.booking.setselectedFlighDetail);
  
  const allFlightSearchResults = useSelector(
    (state) => state.sendMessage.allFlightSearchResults
  );
  
  const seeAllResultHandle = () => {
    setShowAllResults(true)
  };

  // for get api 
  const getAllFlightGetApi = useSelector((state)=> state?.getMessages?.allFlightSearchResults);
  console.log("getAllFlightGetApi", getAllFlightGetApi?.count);
  

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
              <Box mt={2} mb={2} gap={2} alignItems={"center"} display={"flex"}>
                <i className="fa-caret-down fa fas"></i>{" "}
                <span>
                  See all flight options {`(${getAllFlightGetApi?.count})`}
                </span>
              </Box>
            </Link>
          </Box>

          {/* Show All Flight Search Results */}
          {showAllResults && (
            <Box mt={2}>
              {/* Render flights from POST API */}
              {getAllFlightPostApi?.offers?.map((flight, index) => (
                <SearchCard key={`post-${index}`} offerData={flight} />
              ))}

              {/* Render flights from GET API */}
              {console.log("getAllFlightGetApi", getAllFlightGetApi)}
              {getAllFlightGetApi?.offers?.map((flight, index) => (
                <SearchCard key={`get-${index}`} offerData={flight} />
              ))}
            </Box>
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
          <Box mt={2}>
            <SearchCard offerData={getselectedFlight} />
          </Box>
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
