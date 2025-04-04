import React, { useEffect, useRef, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchCard";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import PassengerInfo from "../../Checkout/PassengerInfo";
import { setAllFlightResults } from "@/src/store/slices/sendMessageSlice";
import {
  setisLoading,
  setOfferId,
} from "@/src/store/slices/passengerDrawerSlice";
import LoadingArea from "../../LoadingArea";
import { sanitizeResponse } from "@/src/utils/utils";
import PaymentInfo from "../../Checkout/PaymentInfo";
import PaymentDrawer from "../../Checkout/PaymentDrawer";
import PaymentAddCard from "../../Checkout/PaymentAddCardDrawer";
import PaymentSuccess from "../../Checkout/PaymentSuccess";

const AiMessage = ({ aiMessage }) => {
  //  State to toggle flight search results
  const [showAllFlight, setShowAllFlight] = useState(false);

  // const [showAllResults, setShowAllResults] = useState(false);
  // all flight state remove

  const getAllFlightPostApi = useSelector(
    (state) => state.sendMessage.setAllFlightPostApi
  );
  //  Toggle function

  const allFlightSearcCount = useSelector(
    (state) => state.sendMessage.allFlightSearchResults
  );

  // show all flight button still remove

  const dispatch = useDispatch();

  useEffect(() => {
    if (aiMessage?.OfferId) {
      dispatch(setOfferId(aiMessage?.OfferId)); // Save the offer ID in Redux
    }
    {
      ("");
    }
  }, [aiMessage?.OfferId, dispatch]);

  // for get api
  const getAllFlightGetApi = useSelector(
    (state) => state?.getMessages?.allFlightSearchResults
  );
  console.log("getAllFlightGetApi", getAllFlightPostApi);

  // booking flow start
  const getselectedFlight = useSelector(
    (state) => state?.booking?.flightDetail
  );
  // get user book selecteet flight detail for show in ai message
  // collect passenger data from redux

  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (GetViewPassengers) {
      // Scroll to bottom with a slight delay to ensure rendering is complete
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [GetViewPassengers]); // Runs when GetViewPassengers changes

  // flight expire
  const FlightExpire = useSelector((state) => state.getMessages.flightExpire);

  // show all flight or click
  const seeAllResultHandle = () => {
    setShowAllFlight((prev) => !prev);
  };

  // Get the flight data

  const displayedPostFlights = showAllFlight
    ? getAllFlightPostApi?.offers
    : getAllFlightPostApi?.offers?.slice(0, 3);

  const displayedGetFlights = showAllFlight
    ? getAllFlightGetApi?.offers
    : getAllFlightGetApi?.offers?.slice(0, 3);

  const filledPassenger = useSelector(
    (state) => state.passengerDrawer.filledPassengerUUIDs
  );
  console.log("filledPassenger", filledPassenger);

  return (
    <Box
      className={searchResultStyles.Aibox + " ccc"}
      flexDirection={"column"}
      display="flex"
      justifyContent="flex-start"
    >
      {/* Show Top Offers if available */}
      {aiMessage?.ai?.offers ? (
        <>
          {/* top offer hide */}
          {/* {aiMessage.ai.offers.map((getoffers, offerindex) => (
            <SearchCard
              offerkey={`${offerindex}-${getoffers.id}`} // Corrected key prop
              selectedOfferkey={`${offerindex}-${getselectedFlight?.id}`} // selected flight id and offer key for show selected button
              offerData={getoffers}
              FlightExpire={FlightExpire}
            />
          ))} */}

          {/* Button to Show All Flight Results */}
          {/* <Box
            onClick={seeAllResultHandle}
            mt={2}
            style={{ cursor: "pointer" }}
          >
            <Link href={"#"} className="text-decoration-none">
              <Box
                mt={2}
                mb={2}
                gap={2}
                alignItems={"center"}
                display={"flex"}
                className=" bold"
              >
                <i className="fa-caret-down fa fas"></i>{" "}
                <span>
                  Show all flight options
                  {`${
                    getAllFlightGetApi?.count
                      ? " (" + getAllFlightGetApi?.count + ")"
                      : ""
                  }`}
                  {`${
                    allFlightSearcCount?.count
                      ? " (" + allFlightSearcCount?.count + ")"
                      : ""
                  }`}
                </span>
              </Box>
            </Link>
          </Box> */}
          {/* Show top 3 Flight get and post seperately Search Results */}
          <Box mt={2} className="aaa">
            {/* Render flights from POST API */}
            {displayedPostFlights?.map((getoffers, offerindex) => (
              <SearchCard
                offerData={getoffers}
                offerkey={`${offerindex}-${getoffers.id}`} // key prop
                FlightExpire={FlightExpire}
              />
            ))}

            {/* Render flights from GET API */}
            {displayedGetFlights?.map((getoffers, offerindex) => (
              <SearchCard
                offerData={getoffers}
                offerkey={`${offerindex}-${getoffers.id}`} // key prop
                FlightExpire={FlightExpire}
              />
            ))}
          </Box>
          {/* show all flight button  hide */}
          {!showAllFlight ? (
            <Box
              onClick={seeAllResultHandle}
              mt={2}
              style={{ cursor: "pointer" }}
            >
              <Link href={"#"} className="text-decoration-none">
                <Box
                  mb={2}
                  gap={2}
                  alignItems={"center"}
                  display={"flex"}
                  className=" bold"
                >
                  <i className="fa-caret-down fa fas"></i>{" "}
                  <span>
                    Show all flight options
                    {`${
                      getAllFlightGetApi?.count
                        ? " (" + getAllFlightGetApi?.count + ")"
                        : ""
                    }`}
                    {`${
                      allFlightSearcCount?.count
                        ? " (" + allFlightSearcCount?.count + ")"
                        : ""
                    }`}
                  </span>
                </Box>
              </Link>
            </Box>
          ) : (
            <Box
              onClick={seeAllResultHandle}
              mt={2}
              style={{ cursor: "pointer" }}
            >
              <Link href={"#"} className="text-decoration-none">
                <Box
                  mt={2}
                  mb={2}
                  gap={2}
                  alignItems={"center"}
                  display={"flex"}
                  className=" bold"
                >
                  <i className="fa-caret-up fa fas"></i>{" "}
                  <span>
                    Hide all flight options
                    {`${
                      getAllFlightGetApi?.count
                        ? " (" + getAllFlightGetApi?.count + ")"
                        : ""
                    }`}
                    {`${
                      allFlightSearcCount?.count
                        ? " (" + allFlightSearcCount?.count + ")"
                        : ""
                    }`}
                  </span>
                </Box>
              </Link>
            </Box>
          )}
        </>
      ) : aiMessage?.ai?.response === "passengerFlowActive" ? (
        //  Separate UI for BookFlight
        <>
          {/* <Box className={`${searchResultStyles.AiMessage}`}>
            <Typography fontWeight={"semibold"}>
              You have selected the flight option below.
            </Typography>
          </Box>
          <Box mt={2}>
            <SearchCard
              offerData={getselectedFlight}
              FlightExpire={FlightExpire}
            />
          </Box> */}
          {/* selected flight end */}
          {GetViewPassengers ? (
            <>
              <PassengerInfo getdata={GetViewPassengers} />
            </>
          ) : (
            <LoadingArea />
          )}
          {/* for all passenger fill  */}
          {GetViewPassengers &&
          filledPassenger.length === GetViewPassengers.length ? (
            <>
              <PaymentInfo />
              <PaymentDrawer />
              <PaymentAddCard />
              <PaymentSuccess />
            </>
          ) : null}
        </>
      ) : (
        //  Default AI Response (Text)
        <Box className={`${searchResultStyles.AiMessage}`}>
          {console.log("messages222", aiMessage?.ai?.response)}
          <Typography
            dangerouslySetInnerHTML={{
              __html: sanitizeResponse(aiMessage.ai.response),
            }}
          />
        </Box>
      )}
      <div ref={messagesEndRef} />
      {/* for scroll */}
    </Box>
  );
};

export default AiMessage;
