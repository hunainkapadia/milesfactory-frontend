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
import { loadNextFlightResultsSend } from "@/src/store/slices/sendMessageSlice";
import { loadNextFlightResultsforGet } from "@/src/store/slices/GestMessageSlice";

const AiMessage = ({ aiMessage }) => {
  const dispatch = useDispatch();

  const [showAllFlight, setShowAllFlight] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const messagesEndRef = useRef(null);
  const aiboxRef = useRef(null);

  const getAllFlightGetApi = useSelector(
    (state) => state?.getMessages?.allFlightSearchResults
  );
  const allFlightSearcCount = useSelector(
    (state) => state.sendMessage.allFlightSearchResults
  );
  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );
  const FlightExpire = useSelector((state) => state.getMessages.flightExpire);
  const filledPassenger = useSelector(
    (state) => state.passengerDrawer.filledPassengerUUIDs
  );
  const paymentSuccess = useSelector(
    (state) => state.payment.PaymentFormSuccess
  );
  const isPolling = useSelector((state) => state?.sendMessage?.isPolling);
  const isLoading = useSelector((state) => state.sendMessage?.isLoading);

  const getNextPageNumber = useSelector(
    (state) => state?.getMessages?.NextMessage?.next_page_number
  );

  const SendNextPageNumber = useSelector(
    (state) => state?.sendMessage?.NextMessageSend?.next_page_number
  );

  const displayedGetFlights = aiMessage?.ai?.offers || [];
  const getNextflight =
    useSelector((state) => state?.getMessages?.NextMessage?.offers) || [];
  const SendNextflight =
    useSelector((state) => state?.sendMessage?.NextMessageSend?.offers) || [];

  const combinedFlights = [
    ...displayedGetFlights,
    ...getNextflight,
    ...SendNextflight,
  ].filter(
    (offer, index, self) => index === self.findIndex((o) => o.id === offer.id)
  );

  // Scroll to bottom when passenger form or payment succeeds
  useEffect(() => {
    if (GetViewPassengers.length > 0 || paymentSuccess) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [GetViewPassengers, paymentSuccess]);

  // Toggle show/hide flight results
  const seeAllResultHandle = () => {
    setShowAllFlight((prev) => !prev);
  };

  // Load next page of flights
  const moreflightsHandle = () => {
    const nextPageGet = getNextPageNumber || aiMessage?.ai?.next_page_number;
    const nextPageSend = SendNextPageNumber;

    if (!nextPageGet && !nextPageSend) {
      console.warn("No next page available for either Get or Send messages.");
      return;
    }

    setIsFetchingMore(true);
    setShowAllFlight(true);

    const promises = [];

    if (nextPageGet) {
      promises.push(dispatch(loadNextFlightResultsforGet(nextPageGet)));
    }

    
    
    if (nextPageSend) {
      promises.push(dispatch(loadNextFlightResultsSend(nextPageSend)));
    }

    Promise.all(promises).finally(() => {
      setIsFetchingMore(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    });
  };

  // Add custom class for showAllFlight
  useEffect(() => {
    if (showAllFlight && aiboxRef.current) {
      aiboxRef.current.classList.add("showAllFlightActive");
    } else if (!showAllFlight && aiboxRef.current) {
      aiboxRef.current.classList.remove("showAllFlightActive");
    }
  }, [showAllFlight]);

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
      ) : null}

      {/* Render Flight Cards */}
      {combinedFlights?.length > 0 ? (
        <>
          <Box
            sx={{ marginTop: { xs: 2, lg: 0, md: 0 } }}
            className={searchResultStyles.SearchCardWrapper}
          >
            <Box className="SearchBar SearchBar_000">
              <SearchProgressBar />
            </Box>

            <Box mt={2} className={searchResultStyles.SearchCardGrid}>
              {combinedFlights.map((offer, i) => (
                <SearchCard
                  key={`flight-${i}-${offer.id}`}
                  offerData={offer}
                  offerkey={`${i}-${offer.id}`}
                  FlightExpire={FlightExpire}
                />
              ))}
            </Box>
          </Box>

          {/* Toggle Buttons */}
          {!GetViewPassengers.length > 0 && (
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

              {(getNextPageNumber || SendNextPageNumber || aiMessage?.ai?.next_page_number) && (
                <Box onClick={moreflightsHandle} style={{ cursor: "pointer" }}>
                  <Box
                    sx={{ my: { lg: 2, md: 2, xs: 0 } }}
                    gap={2}
                    alignItems="center"
                    display="flex"
                    className="bold"
                  >
                    <span>See more flights</span>
                    <i className="fa fa-caret-right fas" />
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {/* Show spinner when fetching more */}
          {isFetchingMore && (
            <Box my={2}>
              <LoadingArea />
            </Box>
          )}
        </>
      ) : (
        // AI text or polling fallback
        <Box className={"aaa"}>
          {aiMessage?.ai?.isPolling?.status && (
            <PollingMessage PollingData={aiMessage?.ai?.isPolling?.argument} />
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
      )}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default AiMessage;
