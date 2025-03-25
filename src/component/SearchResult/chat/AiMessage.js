import React, { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchCard";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import PassengerInfo from "../../Checkout/PassengerInfo";
import { setAllFlightResults } from "@/src/store/slices/sendMessageSlice";
import { setisLoading, setOfferId } from "@/src/store/slices/passengerDrawerSlice";
import LoadingArea from "../../LoadingArea";


const AiMessage = ({ aiMessage }) => {
  //  State to toggle flight search results
  
  
  
  const [showAllResults, setShowAllResults] = useState(false);
  
  const getAllFlightPostApi = useSelector((state)=> state.sendMessage.setAllFlightPostApi)  
  //  Toggle function

  
  const allFlightSearcCount = useSelector(
    (state) => state.sendMessage.allFlightSearchResults
  );
  
  const seeAllResultHandle = () => {
    setShowAllResults(true)
  };
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (aiMessage?.OfferId) {
      dispatch(setOfferId(aiMessage?.OfferId)); // Save the offer ID in Redux
    } {
      ""
    }
  }, [aiMessage?.OfferId, dispatch]);
  
  // for get api 
  const getAllFlightGetApi = useSelector((state)=> state?.getMessages?.allFlightSearchResults);
  
  // booking flow start
  const getselectedFlight = useSelector((state) => state?.booking?.flightDetail);  
  // get user book selecteet flight detail for show in ai message 
  // collect passenger data from redux
  
  const GetViewPassengers = useSelector((state)=> state?.passengerDrawer?.ViewPassengers)

  // flight expire
  const FlightExpire = useSelector((state)=> state.getMessages.flightExpire);
  


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
              offerkey={`${offerindex}-${getoffers.id}`} // Corrected key prop
              offerData={getoffers}
              FlightExpire={FlightExpire}
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
                  See all flight options{" "}
                  {getAllFlightGetApi?.count ? getAllFlightGetApi?.count : ""}
                  {allFlightSearcCount?.count ? allFlightSearcCount?.count : ""}
                </span>
              </Box>
            </Link>
          </Box>

          {/* Show All Flight Search Results */}
          {showAllResults && (
            <Box mt={2}>
              {/* Render flights from POST API */}
              {getAllFlightPostApi?.offers?.map((getoffers, offerindex) => (
                <SearchCard
                  offerData={getoffers}
                  offerkey={`${offerindex}-${getoffers.id}`} // key prop
                  FlightExpire={FlightExpire}
                />
              ))}

              {/* Render flights from GET API */}
              {getAllFlightGetApi?.offers?.map((getoffers, offerindex) => (
                <SearchCard
                  offerData={getoffers}
                  offerkey={`${offerindex}-${getoffers.id}`} // key prop
                />
              ))}
            </Box>
          )}
        </>
      ) : aiMessage?.ai?.response === "passengerFlowActive" ? (
        //  Separate UI for BookFlight
        <>
          <Box
            className={`${searchResultStyles.AiMessage}`}
          >
            <Typography fontWeight={"semibold"}>You have selected the flight option below.</Typography>
          </Box>
          <Box mt={2}>
            <SearchCard offerData={getselectedFlight} />
          </Box>
          {/* selected flight end */}
          {GetViewPassengers ? (
            <PassengerInfo
              getdata={GetViewPassengers}
            />
          ) : (
            <LoadingArea/>
          )}
        </>
      ) : (
        //  Default AI Response (Text)
        <Box
          className={`${searchResultStyles.AiMessage}`}
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
        </Box>
      )}
    </Box>
  );
};

export default AiMessage;
