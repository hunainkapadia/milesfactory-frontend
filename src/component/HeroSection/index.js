import {
  Box,
  Container,
  TextField,
  IconButton,
  InputAdornment,
  FormLabel,
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
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const HeroSection = () => {
  const [userMessage, setUserMessage] = useState("");
  const messagesEndRef = useRef(null);

  const dispatch = useDispatch();

  //  Fetch messages from Redux store
  const sendMessages = useSelector((state) => state.sendMessage?.messages);
  const isLoading = useSelector(
    (state) => state.sendMessage?.isLoading || false
  );

  //  Get past messages from API (GET)
  const getmessages = useSelector((state) => state.getMessages.messages);
  //  Combine stored messages (live chat) with fetched messages (history)
  const messages = [...getmessages, ...sendMessages];
  console.log("messages222", messages);
  

  useEffect(() => {
    dispatch(fetchMessages()); //  Fetch messages when the page loads
  }, [dispatch]);

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

  // for passenger form
  const isPassengerDrawerOpen = useSelector(
    (state) => state.passengerDrawer.isOpen
  );
  const BookFlightAiresponse = useSelector(
    (state) => state.sendMessage?.messages || []
  );

  console.log("selectedflightAi", BookFlightAiresponse);

  return (
    <>
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
                  <h1 className="white">Travel smarter with AI</h1>
                  <p className="white">
                    Find and book your perfect trip at the best price -
                    effortlessly. Mylz has access to live prices and
                    availability directly from all airlines, hotels, and travel
                    partners.
                  </p>
                </div>
              )}

              {/* Search Box */}
              <section>
                <Box
                  className={
                    messages.length
                      ? inputStyles.SearchBoxSectionActive
                      : inputStyles.SearchBoxSection
                  }
                >
                  <Box
                    className={inputStyles.SearchBox + " SearchBox"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Container>
                      <Box
                        className={inputStyles.SearchBoxIn}
                        position={"relative"}
                      >
                        {!messages.length ? (
                          <FormLabel className={inputStyles.label}>
                            Where do you want to go today?
                          </FormLabel>
                        ) : (
                          ""
                        )}
                        <TextField
                          placeholder={
                            messages.length
                              ? "Ask anything about your trip"
                              : ""
                          }
                          className={inputStyles.SearchForm + " SearchForm"}
                          fullWidth
                          value={userMessage}
                          onChange={(e) => setUserMessage(e.target.value)}
                          variant="outlined"
                          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />

                        <IconButton
                          className={inputStyles.SearchButton}
                          onClick={handleSearch}
                        >
                          <i className="fa fa-arrow-right"></i>
                        </IconButton>
                      </Box>
                    </Container>
                  </Box>
                </Box>
              </section>

              {/* Chat Messages */}
              {messages.length ? (
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
                  {/*  */}
                  <div ref={messagesEndRef} />
                  {/* booking flow start */}
                  
                  {SelectedFlightId && (
                    <BookingDrawer getFlightDetail={flightDetail} />
                  )}
                  {isPassengerDrawerOpen && <PassengerDrawerForm />}
                  <Header/>
                </section>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Container>
      </section>
      {!messages.length ? (
        <Footer
          id={"HowMylzWork"}
          forDark
          LearnMore={"Get to know Mylz"}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default HeroSection;
