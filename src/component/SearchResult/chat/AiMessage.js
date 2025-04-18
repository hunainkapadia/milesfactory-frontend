import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchCard";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import PassengerInfo from "../../Checkout/PassengerInfo";
import {
  setisLoading,
  setOfferId,
} from "@/src/store/slices/passengerDrawerSlice";
import LoadingArea from "../../LoadingArea";
import { formatTextToHtmlList, sanitizeResponse } from "@/src/utils/utils";
import PaymentDrawer from "../../Checkout/PaymentDrawer";
import PaymentAddCard from "../../Checkout/PaymentAddCardDrawer";
import PaymentSuccess from "../../Checkout/PaymentSuccess";
import PriceSummary from "../../Checkout/PriceSummary";

const AiMessage = ({ aiMessage }) => {
  const dispatch = useDispatch();

  const [showAllFlight, setShowAllFlight] = useState(false);
  const messagesEndRef = useRef(null);

  
  const getAllFlightGetApi = useSelector(
    (state) => state?.getMessages?.allFlightSearchResults
  );
  const allFlightSearcCount = useSelector(
    (state) => state.sendMessage.allFlightSearchResults
  );

  // const getselectedFlight = useSelector(
  //   (state) => state?.booking?.flightDetail
  // );
  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );
  const FlightExpire = useSelector((state) => state.getMessages.flightExpire);
  const filledPassenger = useSelector(
    (state) => state.passengerDrawer.filledPassengerUUIDs
  );

  console.log("getAllFlightPostApi", aiMessage.ai.offers);
  

  useEffect(() => {
    if (GetViewPassengers) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [GetViewPassengers]);

  const seeAllResultHandle = () => {
    setShowAllFlight((prev) => !prev);
  };

  
  const displayedGetFlights = showAllFlight
    ? aiMessage?.ai?.offers
    : aiMessage?.ai?.offers?.slice(0, 3);

    // scroll payment success
    const paymentSuccess = useSelector((state)=> state.payment.PaymentFormSuccess);
    useEffect(() => {
      if (paymentSuccess) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }, [paymentSuccess]);
    // scroll
      const isLoading = useSelector((state) => state.sendMessage?.isLoading);
      // track for send message loading
    
    console.log("aiMessage000", aiMessage);
    
    return (
      <Box
        className={searchResultStyles.Aibox + " "}
        flexDirection="column"
        display="flex"
        justifyContent="flex-start"
      >
        {/* Passenger Flow */}
        {aiMessage?.ai?.passengerFlowRes === "passengerFlowActive" ? (
          <>
            {/* <Box className={searchResultStyles.AiMessage}>
            <Typography fontWeight="semibold">
              You have selected the flight option below.
            </Typography>
          </Box> */}

            {/* Selected flight preview */}
            {/* <Box mt={2}>
            <SearchCard
              offerData={getselectedFlight}
              FlightExpire={FlightExpire}
            />
          </Box> */}

            {/* Show passenger form or loading */}

            {GetViewPassengers ? (
              <PassengerInfo getdata={GetViewPassengers} />
            ) : (
              <Box my={3}>
                <LoadingArea />
              </Box>
            )}

            {/* If all passengers are filled, show payment components */}
            {GetViewPassengers &&
            filledPassenger.length === GetViewPassengers.length ? (
              <>
                <PriceSummary />
                <PaymentDrawer />
                <PaymentAddCard />
                {paymentSuccess ? <PaymentSuccess /> : ""}
              </>
            ) : null}
          </>
        ) : (
          ""
        )}

        {displayedGetFlights?.length > 0 ? (
          <>
            <Box
              sx={{ marginTop: { xs: 2, lg: 0, md: 0 } }}
              className={searchResultStyles.SearchCardWrapper}
            >
              <Box mt={2} className={searchResultStyles.SearchCardGrid}>
                {/* Render POST flight offers */}
                {displayedGetFlights?.map((offer, i) => (
                  <SearchCard
                    key={`post-${i}-${offer.id}`}
                    offerData={offer}
                    offerkey={`${i}-${offer.id}`}
                    FlightExpire={FlightExpire}
                  />
                ))}

                {/* Render GET flight offers */}
              </Box>
            </Box>

            {/* Toggle button */}
            {!GetViewPassengers ? (
              <Box onClick={seeAllResultHandle} style={{ cursor: "pointer" }}>
                <Link href={"#"} className="text-decoration-none">
                  <Box
                    sx={{ my: { lg: 2, md: 2, xs: 0 } }}
                    gap={2}
                    alignItems="center"
                    display="flex"
                    className="bold"
                  >
                    <i
                      className={`fa ${
                        showAllFlight ? "fa-caret-up" : "fa-caret-down"
                      } fas`}
                    ></i>{" "}
                    <span>
                      {showAllFlight
                        ? "Hide all flight options"
                        : "Show all flight options"}
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
              ""
            )}
          </>
        ) : (
          // Default AI response
          <>
            {/* {console.log("aiMessage111", aiMessage?.ai)} */}
            {!aiMessage?.ai?.response?.results ? (
              <Box className={searchResultStyles.AiMessage + " aaa"}>
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: formatTextToHtmlList(
                      sanitizeResponse(aiMessage?.ai?.response)
                    ),
                  }}
                />
              </Box>
            ) : (
              ""
            )}
            {console.log("aiMessageLoading", aiMessage?.ai?.SearchingMessage)}
            {aiMessage?.ai?.SearchingMessage ? (
              <Box className={searchResultStyles.AiMessage}>
                <Typography className="bold">
                    {aiMessage?.ai?.SearchingMessage}
                </Typography>
              </Box>
            ) : ""}
          </>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </Box>
    );
};

export default AiMessage;
