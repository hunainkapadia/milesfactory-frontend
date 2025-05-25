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
import { loadNextFlightResultsPage } from "@/src/store/slices/sendMessageSlice";

const AiMessage = ({ aiMessage }) => {
  const dispatch = useDispatch();

  console.log("aiMessage_00", aiMessage);

  const [showAllFlight, setShowAllFlight] = useState(false);
  const messagesEndRef = useRef(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

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
    setShowAllFlight((prev) => !prev);
  };
  const moreflightsHandle = () => {
    const nextPage = aiMessage?.ai?.next_page_number;

    if (!nextPage) {
      console.warn("No next page available.");
      return;
    }

    setIsFetchingMore(true);
    dispatch(loadNextFlightResultsPage(nextPage)).finally(() => {
      setIsFetchingMore(false);
    });
  };


  console.log("GetViewPassengers", GetViewPassengers.length > 0);
  console.log("filledPassenger", filledPassenger);

  const displayedGetFlights = showAllFlight
    ? aiMessage?.ai?.offers
    : aiMessage?.ai?.offers?.slice(0, 3);

  // scroll payment success
  const paymentSuccess = useSelector(
    (state) => state.payment.PaymentFormSuccess
  );
  console.log("paymentSuccess", paymentSuccess);

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
  useEffect(() => {
    if (showAllFlight && aiboxRef.current) {
      aiboxRef.current.classList.add("showAllFlightActive"); //  Your custom class
    } else if (!showAllFlight && aiboxRef.current) {
      aiboxRef.current.classList.remove("showAllFlightActive"); //  Remove when hidden
    }
  }, [showAllFlight]);

  const isPolling = useSelector((state) => state?.sendMessage?.isPolling);

  // const IsServices = useSelector((state)=> state.booking.singleFlightData.available_services)
  // console.log("singleflight111", singleflight);

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
                    <PriceSummary />
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
            sx={{ marginTop: { xs: 2, lg: 0, md: 0 } }}
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
          {!GetViewPassengers.length > 0 ? (
            <>
              <Box
                component={"section"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                
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
                <Box onClick={moreflightsHandle} style={{ cursor: "pointer" }} >
                  <Box
                    sx={{ my: { lg: 2, md: 2, xs: 0 } }}
                    gap={2}
                    alignItems="center"
                    display="flex"
                    className="bold"
                  >
                    <span>Show more flights</span>
                    <i className="fa fa-caret-right fas" />
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        // Default AI response
        <>
          {/* {console.log("aiMessage111", aiMessage?.ai)} */}
          {console.log("ai_test111", aiMessage?.ai?.newThread)}
          {!aiMessage?.ai?.response?.results ||
          aiMessage?.ai?.newThread ||
          aiMessage?.ai?.deleteThread ? (
            <>
              <Box className={" aaa"}>
                {aiMessage?.ai?.isPolling?.status && (
                  <>
                    {console.log(
                      "displayedGetFlights_length",
                      aiMessage?.ai?.isPolling
                    )}
                    <PollingMessage
                      PollingData={aiMessage?.ai?.isPolling?.argument}
                    />
                  </>
                )}
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: formatTextToHtmlList(
                      sanitizeResponse(
                        aiMessage?.ai?.response ||
                          aiMessage?.ai?.newThread ||
                          aiMessage?.ai?.deleteThread
                      )
                    ),
                  }}
                />
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
