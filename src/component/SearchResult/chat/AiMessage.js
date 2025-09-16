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
import PassengerFlowBlock from "../PassengerFlowBlock";
import HotelCard from "../HotelCard";
import NotfoundCard from "./NotfoundCard";

const AiMessage = ({ aiMessage }) => {
  const dispatch = useDispatch();
  const [flightsToShow, setFlightsToShow] = useState(3); // how many flights to display
  const [hasLoadedNextPage, setHasLoadedNextPage] = useState(false); // control when to load next page
  const [hotelsToShow, setHotelsToShow] = useState(10); // initial 10 hotels

  const [showAllFlight, setShowAllFlight] = useState(false);
  const messagesEndRef = useRef(null);

  const getMessages = useSelector((state) => state.getMessages?.messages);

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
  const getHotels = aiMessage?.ai?.hotels;
 const handleSeeMoreHotels = () => {
    setHotelsToShow((prev) => prev + 10); // load 10 more each click
  };
  // end hotel

  useEffect(() => {
    if (GetViewPassengers.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [GetViewPassengers]);

  const getNextFlight = useSelector(
    (state) => state.sendMessage?.appendFlights?.ai
  );
  const filterUrl = useSelector((state) => state.sendMessage?.FilterUrl);
  // check if filter is applied
  const isFilter = filterUrl && filterUrl.includes("?");
  

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
  const Selectloading = useSelector((state) => state.booking.isLoading);

  // track for send message loading

  const aiboxRef = useRef(null); //  Add this ref

  // Add class when all flights are shown

  const isPolling = useSelector((state) => state?.sendMessage?.isPolling);
  const isUpdateOffer = useSelector((state) => state?.sendMessage?.isUpdateOffer);
  console.log("isUpdateOffer", isUpdateOffer);
  


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

  const isFunction = useSelector(
    (state) => state?.sendMessage?.IsFunction?.status
  );

  // Find message with ai.offers
  // const checkPolling = messages.find((msg) => msg.ai && msg.ai.offers);
  const noMoreFlights = useSelector((state) => state.sendMessage.noMoreFlights);

  const handleSeeMoreFlights = () => {
    if (!showAllFlight) {
      setShowAllFlight(true);
    }
    dispatch(loadNextFlights());
  };

  const isLoadingPassenger = useSelector(
    (state) => state?.passengerDrawer?.isPassengerLoading
  );
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  console.log("aiMessage_ai_0", aiMessage?.ai === "isNotFound");
  
  return (
    <Box
      ref={aiboxRef}
      className={searchResultStyles.Aibox + " Aibox"}
      flexDirection="column"
      display="flex"
      justifyContent="flex-start"
    >
      {/* If all passengers are filled, show payment components */}

      {displayedGetFlights?.length > 0 ? (
        <>
          <Box className={searchResultStyles.SearchCardWrapper}>
            <Box className="SearchBar SearchBar_000">
              <SearchProgressBar />
            </Box>
            <Box className={searchResultStyles.SearchCardGrid}>
              {/* Render POST flight offers */}
              {displayedGetFlights?.map((offer, i) => (
                <>
                  <SearchCard
                    key={i}
                    offerData={offer}
                    offerkey={`${offer.id}`}
                    FlightExpire={FlightExpire}
                  />
                </>
              ))}

              {/* Render GET flight offers */}
            </Box>
          </Box>

          {/* Toggle button */}

          {getNextFlight?.offers?.length === 6 && !isFilter ? (
            // Do nothing (hide both)
            <NotfoundCard />
          ) : !noMoreFlights &&
            (aiMessage?.ai?.next_page_number ||
              getNextFlight?.next_page_number) ? (
            // Show "See more flights"
            <Box
              onClick={handleSeeMoreFlights}
              className="basecolor1"
              style={{ cursor: "pointer" }}
            >
              <Box
                sx={{ my: { lg: 2, md: 2, xs: 2 } }}
                gap={2}
                alignItems="center"
                display="flex"
                className="bold"
              >
                <span>See 6 more flight options</span>
              </Box>
            </Box>
          ) : (
            // Show "No more flights found."
            <Box
              sx={{ my: { lg: 2, md: 2, xs: 2 } }}
              gap={2}
              alignItems="center"
              display="flex"
              className="bold"
            >
              No more flights found.
            </Box>
          )}
        </>
      ) : (
        // Default AI response
        <>
          {aiMessage?.ai === "isNotFound" && (
            <Box
              mb={3}
              elevation={0}
              sx={{
                width: "100%",
                p: 3,
                textAlign: "center",
                borderRadius: "12px",
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#1e293b", fontWeight: 600, mb: 1 }}
              >
                No flights found
              </Typography>
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                Looks like there are no flights available right now. Please
                search again with new options.
              </Typography>
            </Box>
          )}
          {!aiMessage?.ai?.response?.results ||
          aiMessage?.ai?.newThread ||
          aiMessage?.ai?.deleteThread ? (
            <>
              {/* when is function true hide polling mesage */}
              {aiMessage?.ai?.isPolling?.status && !isFunction && (
                <>
                  <Box className={searchResultStyles.AiMessage + " aaa"}>
                    <PollingMessage
                      PollingData={aiMessage?.ai?.isPolling?.argument}
                    />
                  </Box>
                </>
              )}

              <>
                {aiMessage?.ai?.response ? (
                  <>
                    <Box className={searchResultStyles.AiMessage + " aaa"}>
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
                    </Box>
                  </>
                ) : aiMessage?.ai?.newThread ? (
                  <Box pb={3} className={"newChatBox"}>
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
                  </Box>
                ) : aiMessage?.ai?.deleteThread ? (
                  <>
                    <Box className={searchResultStyles.AiMessage + " aaa"}>
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
                    </Box>
                  </>
                ) : null}
              </>
            </>
          ) : (
            ""
          )}
        </>
      )}

      {/* Hotel Results */}
      {Array.isArray(getHotels?.hotels) && getHotels.hotels.length > 0 && (
        <Box className={searchResultStyles.HotelCardWrapper}>
          {getHotels.hotels.slice(0, hotelsToShow).map((hotel, idx) => (
            <HotelCard
              key={hotel.code || idx}
              hotel={hotel}
              price={getHotels?.total}
              allHotels={getHotels}
            />
          ))}

          {/* See more hotels button */}
          {hotelsToShow < getHotels.hotels.length ? (
            <Box
              onClick={handleSeeMoreHotels}
              sx={{ my: 2, cursor: "pointer" }}
              display="flex"
              alignItems="center"
              gap={1}
              className="bold basecolor1"
            >
              <Typography className="bold" lineHeight={1} component={"span"}>
                Show more stays
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{ my: 2 }}
              display="flex"
              alignItems="center"
              className="bold"
            >
              No more hotels found.
            </Box>
          )}
        </Box>
      )}

      {/* passenger flow start */}
      <PassengerFlowBlock
        aiMessage={aiMessage}
        GetViewPassengers={GetViewPassengers}
        filledPassenger={filledPassenger}
        orderDetail={orderDetail}
        paymentSuccess={paymentSuccess}
      />
      {/* passenger flow end */}
      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default AiMessage;
