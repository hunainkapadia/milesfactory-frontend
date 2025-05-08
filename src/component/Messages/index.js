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
import BookingDrawer from "../Checkout/BookingDrawer/BookingDrawer";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import LabelAnimation from "../home/LabelAnimation";
import HerosectionContent from "../home/HerosectionContent";
import MessageInputBox from "../SearchResult/chat/MessageInputBox";
import PassengerDrawerForm from "../Checkout/passengerDrawerForm";
import Link from "next/link";
import PollingMessage from "../SearchResult/PollingMessage/PollingMessage";
import BaggageDrawer from "../Checkout/BaggageDrawer";

const Messages = () => {
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = () => {
    if (!userMessage.trim()) return;
    dispatch(sendMessage(userMessage)); //  Sends message to API (POST)
    setUserMessage(""); //  Clears input after sending
  };
  const getselectedFlight = useSelector(
    (state) => state.booking.setselectedFlighDetail
  );

  // for bookingdrawer selector
  const flightDetail = useSelector((state) => state.booking.flightDetail);
  const SelectedFlightId = useSelector(
    (state) => state.booking?.selectedFlightId
  );
  const getFlightKey = useSelector((state) => state.booking.setSelectFlightKey);

  // for passenger form

  
  console.log("isLoading111", isLoading);

  const BookFlightAiresponse = useSelector(
    (state) => state.sendMessage?.messages || []
  );
  const FlightExpire = useSelector((state) => state.getMessages.flightExpire);

  const refreshHandle = () => {
    dispatch(RefreshHandle());
    dispatch(setRefreshSearch());
  };

  return (
    <>
      {messages.length ? (
        <section>
          <Box className={searchResultStyles.messageContent}>
            <Box className={searchResultStyles.messageContentIn}>
              {messages.map((msg, index) => (
                <Box key={index}>
                  {msg?.user && <UserMessage userMessage={msg.user} />}
                  {msg?.ai ? (
                    <AiMessage aiMessage={msg} offerId={msg?.OfferId} />
                  ) : index === messages.length - 1 && isLoading ? (
                    <Box my={2}>
                      <LoadingArea />
                    </Box>
                  ) : null}
                </Box>
              ))}

              {/*  */}
              <Box ref={messagesEndRef} />
              {/* booking flow start */}

              {getFlightKey && <BookingDrawer getFlightDetail={flightDetail} />}
              <PassengerDrawerForm />
              <BaggageDrawer getFlightDetail={flightDetail} />
              {FlightExpire ? (
                <>
                  {/* <Box py={2}>
                    <Box  onClick={refreshHandle} className="text-decuration-none bold cursor-pointer">
                      Refresh this search
                    </Link>
                  </Box>
                  <Typography>
                    Your search has expired. Please enter a new search or
                    refresh the old one.{" "}
                  </Typography> */}
                </>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </section>
      ) : (
        ""
      )}

      {/* //////////////////////// Chat Messages end ////////////////////////*/}
    </>
  );
};

export default Messages;
