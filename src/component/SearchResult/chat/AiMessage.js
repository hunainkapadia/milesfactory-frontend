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
import PollingMessage from "../PollingMessage/PollingMessage";
import SearchProgressBar from "../../LoadingArea/SearchProgressBar";
import { loadNextFlights } from "@/src/store/slices/sendMessageSlice";

const AiMessage = ({ aiMessage }) => {
  const dispatch = useDispatch();
  const [flightsToShow, setFlightsToShow] = useState(3); // how many flights to display
  const [hasLoadedNextPage, setHasLoadedNextPage] = useState(false); // control when to load next page

  

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
  
  

  useEffect(() => {
    if (GetViewPassengers.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [GetViewPassengers]);

  const seeAllResultHandle = () => {
    if (!showAllFlight) {
      setShowAllFlight(true); // only enable showing all flights once
    }
  };
  
  

  const getNextFlight = useSelector(
    (state) => state.sendMessage?.appendFlights?.ai
  );
  

  const displayedGetFlights = showAllFlight
    ? [...(aiMessage?.ai?.offers || []), ...(getNextFlight?.offers || [])]
    : aiMessage?.ai?.offers;

  
  
  

  

  // scroll payment success
  const paymentSuccess = useSelector(
    (state) => state.payment.PaymentFormSuccess
  );
  

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

  const aiboxRef = useRef(null); //  Add this ref

  // Add class when all flights are shown
  

  const isPolling = useSelector((state) => state?.sendMessage?.isPolling);

  const moreflightsHandle = () => {
    dispatch(loadNextFlights());
  };

  function convertMarkdownToHtml(text) {
    if (!text) return "";
    // 1. Convert **bold** to span with class
    let result = text.replace(
      /\*\*(.*?)\*\*/g,
      "<span class='exbold'>$1</span>"
    );
    // 2. Remove leading "- " before text on each line
    result = result.replace(/^- /gm, "");

    return result;
  }

  const getuser = useSelector((state) => state.base?.currentUser?.user);

  

  const orderDetail = useSelector(
    (state) => state?.payment?.OrderConfirm?.order?.selected_offer
  ); //from order api

  
  
  return (
    <Box
      ref={aiboxRef}
      className={searchResultStyles.Aibox + " Aibox"}
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

          {/* If all passengers are filled, show payment components */}

          {Array.isArray(GetViewPassengers) && GetViewPassengers.length > 0 ? (
            <>
              <PassengerInfo getdata={GetViewPassengers} />

              {Array.isArray(filledPassenger) &&
                filledPassenger.length === GetViewPassengers.length && (
                  <>
                    {orderDetail ? (
                      <PriceSummary />
                    ) : (
                      <>
                        <Box my={3}>
                          <LoadingArea />
                        </Box>
                      </>
                    )}
                    <PaymentDrawer />
                    <PaymentAddCard />
                    {paymentSuccess && <PaymentSuccess />}
                  </>
                )}
            </>
          ) : (
            <Box my={3}>
              <LoadingArea />
            </Box>
          )}
        </>
      ) : (
        ""
      )}

      {displayedGetFlights?.length > 0 ? (
        <>
          <Box
            className={searchResultStyles.SearchCardWrapper}
          >
            <Box className="SearchBar SearchBar_000">
              <SearchProgressBar />
            </Box>
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

          <Box
            onClick={() => {
              seeAllResultHandle(); // First show all flights
              moreflightsHandle(); // Then dispatch to load more flights
            }}
            style={{ cursor: "pointer" }}
          >
            <Box
              sx={{ my: { lg: 2, md: 2, xs: 2 } }}
              gap={2}
              alignItems="center"
              display="flex"
              className="bold"
              
            >
              <span>See more flights</span>
              <i className="fa fa-caret-right fas" />
            </Box>
          </Box>
        </>
      ) : (
        // Default AI response
        <>
          
          {!aiMessage?.ai?.response?.results ||
          aiMessage?.ai?.newThread ||
          aiMessage?.ai?.deleteThread ? (
            <>
              <Box className={searchResultStyles.AiMessage + " aaa"}>
                {aiMessage?.ai?.isPolling?.status && (
                  <>
                    
                    <PollingMessage
                      PollingData={aiMessage?.ai?.isPolling?.argument}
                    />
                  </>
                )}

                
                <>
                  {aiMessage?.ai?.response ? (
                    <Typography
                      component="div"
                      variant="body1"
                      dangerouslySetInnerHTML={{
                        __html: formatTextToHtmlList(
                          convertMarkdownToHtml(
                            sanitizeResponse(aiMessage.ai.response)
                          )
                        ),
                      }}
                    />
                  ) : aiMessage?.ai?.newThread ? (
                    <Typography component="div" variant="body1">
                      Hello{" "}
                      <Typography component="span" textTransform="capitalize">
                        {getuser?.first_name ?? "there"}
                      </Typography>{" "}
                      <Typography component="span" textTransform="capitalize">
                        {getuser?.last_name ?? ""}
                      </Typography>
                      , I'm{" "}
                      <Typography component="span" textTransform="capitalize">
                        Mylz
                      </Typography>
                      . How can I help you?
                    </Typography>
                  ) : aiMessage?.ai?.deleteThread ? (
                    <Typography
                      component="div"
                      variant="body1"
                      dangerouslySetInnerHTML={{
                        __html: formatTextToHtmlList(
                          convertMarkdownToHtml(
                            sanitizeResponse(aiMessage.ai.deleteThread)
                          )
                        ),
                      }}
                    />
                  ) : null}
                </>
              </Box>
            </>
          ) : (
            ""
          )}
        </>
      )}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default AiMessage;
