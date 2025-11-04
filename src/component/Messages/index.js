import {
  Box,
  Container,
  TextField,
  IconButton,
  InputAdornment,
  FormLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  RefreshHandle,
  setRefreshSearch,
} from "@/src/store/slices/GestMessageSlice";
import { sendMessage } from "@/src/store/slices/sendMessageSlice";

import styles from "@/src/styles/sass/components/Home.module.scss";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

import AiMessage from "../SearchResult/chat/AiMessage";
import UserMessage from "../SearchResult/chat/UserMessage";
import LoadingArea from "../LoadingArea";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import LabelAnimation from "../home/LabelAnimation";
import HerosectionContent from "../home/HerosectionContent";
import MessageInputBox from "../SearchResult/chat/MessageInputBox";

import Link from "next/link";
import PollingMessage from "../SearchResult/PollingMessage/PollingMessage";
import BaggageDrawer from "../Checkout/BaggageDrawer";
import PassengerProfileDrawer from "../Checkout/PassengerProfileDrawer";
import SearchFilterBar from "../SearchResult/SearchFilterBar";
import PassengerDrawerForm from "../Checkout/PassengerDrawerForm";

const Messages = () => {
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [hasFlightOffers, sethasFlightOffers] = useState(false);

  const messagesEndRef = useRef(null);

  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state) => state.sendMessage?.isLoading || false
  );

  //  Fetch messages from Redux store
  const sendMessages = useSelector((state) => state.sendMessage?.messages);

  //  Get past messages from API (GET)
  const getmessages = useSelector((state) => state.getMessages.messages);

  //  Combine stored messages (live chat) with fetched messages (history)
  const messages = [...getmessages, ...sendMessages];

  // for bookingdrawer selector
  const flightDetail = useSelector((state) => state.booking.flightDetail);
  const SelectedFlightId = useSelector(
    (state) => state.booking?.selectedFlightId
  );

  // for passenger form

  const BookFlightAiresponse = useSelector(
    (state) => state.sendMessage?.messages || []
  );
  

  const refreshHandle = () => {
    dispatch(RefreshHandle());
    dispatch(setRefreshSearch());
  };

  const SearchHistoryGet = useSelector(
    (state) => state.getMessages.SearchHistory
  );

  const SearchHistorySend = useSelector(
    (state) => state.sendMessage?.SearchHistorySend
  );
  const SearchHistory = SearchHistorySend || SearchHistoryGet;
  const passengerPofile = useSelector(
      (state) => state?.passengerDrawer?.passProfile
    );

  return (
    <>
      {messages.length ? (
        <Box component={"section"}>
          <Box
            className={`${searchResultStyles.messageContent} ${
              SearchHistory ? searchResultStyles.FilterActive : ""
            }`}
          >
            <Box className={searchResultStyles.messageContentIn}>
              {messages.map((msg, index) => (
                <Box key={index}>
                  
                  {msg?.user && !msg.user.startsWith("SYSTEM MESSAGE:") ? (
                    <UserMessage userMessage={msg.user} />
                  ) : msg?.user && msg.user.startsWith("SYSTEM MESSAGE:") ? (
                    // Custom UI for system message
                    ""
                  ) : null}

                  {msg?.ai && (
                    <AiMessage aiMessage={msg} offerId={msg?.OfferId} />
                  )}

                  {/* Show loader only once after the last message */}
                  {isLoading && index === messages.length - 1 && (
                    <Box my={2} >
                      <LoadingArea />
                    </Box>
                  )}
                </Box>
              ))}

              {/*  */}

              {!hasFlightOffers ? <Box ref={messagesEndRef} /> : ""}
              {/* booking flow start */}

              <PassengerDrawerForm />
              {/* {passengerPofile?.length > 0 && 
              } */}
              <PassengerProfileDrawer />
            </Box>
          </Box>
        </Box>
      ) : (
        <></>
      )}
      {/* {FlightExpire ? (
        <>
          <section>
            <Box className={searchResultStyles.messageContent}>
              <Box className={searchResultStyles.messageContentIn}>
                <Box py={2}>
                  <Box
                    onClick={refreshHandle}
                    className="text-decuration-none bold cursor-pointer"
                  >
                    Refresh this search
                  </Box>
                </Box>
                <Typography>
                  Your search has expired. Please enter a new search or refresh
                  the old one.{" "}
                </Typography>
              </Box>
            </Box>
          </section>
        </>
      ) : (
        ""
      )} */}

      {/* //////////////////////// Chat Messages end ////////////////////////*/}
    </>
  );
};

export default Messages;
