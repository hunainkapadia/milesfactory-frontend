import { 
  Box,
  Container,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "@/src/store/slices/GestMessageSlice";
import { sendMessage } from "@/src/store/slices/sendMessageSlice";

import styles from "@/src/styles/sass/components/Home.module.scss";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

import AiMessage from "../SearchResult/chat/AiMessage";
import UserMessage from "../SearchResult/chat/UserMessage";
import LoadingArea from "../LoadingArea";
import Link from "next/link";
import passengerDrawerForm from "../Checkout/BookingDrawer/BookingDrawerPassenger";
import SearchCard from "../SearchResult/SearchCard";
import BookingDrawer from "../Checkout/BookingDrawer/BookingDrawer";
import PassengerDrawerForm from "../Checkout/passengerDrawerForm";

const HeroSection = ({ isChatActive }) => {
  const [userMessage, setUserMessage] = useState("");
  const messagesEndRef = useRef(null);

  const dispatch = useDispatch();
  
  //  Fetch messages from Redux store
  const sendMessages = useSelector((state) => state.sendMessage?.messages);
  const isLoading = useSelector((state) => state.sendMessage?.isLoading || false);
  
  //  Get past messages from API (GET)
  const getmessages = useSelector((state) => state.getMessages.messages);
  //  Combine stored messages (live chat) with fetched messages (history)
  const messages = [...getmessages, ...sendMessages];

  
  
  
  
  useEffect(() => {
    dispatch(fetchMessages()); //  Fetch messages when the page loads
  }, [dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = () => {
    if (!userMessage.trim()) return;
    isChatActive(true);
    dispatch(sendMessage(userMessage)); //  Sends message to API (POST)
    setUserMessage(""); //  Clears input after sending
  };
  const getselectedFlight = useSelector((state) => state.booking.setselectedFlighDetail);

  // for bookingdrawer selector
  const flightDetail = useSelector((state)=> state.booking.flightDetail);
  const SelectedFlightId = useSelector((state)=> state.booking?.selectedFlightId)

  // for passenger form
  const isPassengerDrawerOpen = useSelector((state) => state.passengerDrawer.isOpen);
  const BookFlightAiresponse = useSelector((state) => state.sendMessage?.messages || []);

  console.log("selectedflightAi", BookFlightAiresponse);
    
  return (
    <section>
      <Container>
        <Box
          className={`${styles.HeroSection} ${
            messages.length ? styles.Active : ""
          }`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box className={styles.Box}>
            {!messages.length && (
              <div className="mb-40 align-center">
                <h1 className="darkgray">Travel made simple</h1>
                <p className="darkgray">
                  Your AI travel buddy, for smarter, stress-free trips
                </p>
              </div>
            )}

            {/* Search Box */}
            <section>
              <div
                className={`${searchResultStyles.SearchBoxSection} ${
                  messages.length ? searchResultStyles.active : ""
                } SearchBoxSection basecolor1-light-bg`}
              >
                <Container>
                  <Box
                    className={searchResultStyles.SearchBox + " SearchBox"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <TextField
                      className={searchResultStyles.SearchForm + " SearchForm"}
                      fullWidth
                      placeholder="Describe your trip, and I’ll do the rest"
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleSearch}>
                              <i className="fa fa-arrow-right"></i>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </Box>
                </Container>
              </div>
            </section>

            {/* Chat Messages */}

            <section className={searchResultStyles.messageBody}>
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg?.user && <UserMessage userMessage={msg.user} />}
                  {msg?.ai ? (
                    <AiMessage aiMessage={msg} />
                  ) : index === messages.length - 1 && isLoading ? (
                    <LoadingArea />
                  ) : null}
                </div>
              ))}
              <>
                {/* {getselectedFlight && <SearchCard offerData={getselectedFlight} />} */}
              </>
              <div ref={messagesEndRef} />
              {/* booking flow start */}
              {SelectedFlightId && (
                <BookingDrawer getFlightDetail={flightDetail} />
              )}
              {isPassengerDrawerOpen && <PassengerDrawerForm />}
              
            </section>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default HeroSection;
