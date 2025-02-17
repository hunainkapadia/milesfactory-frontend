import {
  Box,
  Card,
  Typography,
  IconButton,
  InputAdornment,
  TextField,
  Container,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import LoadingArea from "../LoadingArea";
import IdeaDetailSection from "../home/IdeaDetailSection";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";
import api from "@/src/store/api";

import styles from "@/src/styles/sass/components/Home.module.scss";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchResult/SearchCard";
import AiMessage from "../SearchResult/chat/AiMessage";
import UserMessage from "../SearchResult/chat/UserMessage";
import Link from "next/link";

const HeroSection = ({ isChatActive }) => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [topOffersMessage, setTopOffersMessage] = useState(); // Fixed initialization
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isnormalChat, setisnormalChat] = useState(false); // Ensure default is false
  const [flightExpire, setflightExpire]= useState()

  // Fetch chat messages on mount
  useEffect(() => {
    setIsLoading(true);
    api
      .get(API_ENDPOINTS.CHAT.GET_MESSAGE)
      .then((res) => {
        if (!Array.isArray(res?.data)) {
          setIsLoading(false);
          return;
        }

        // Set initial messages before fetching flights
        const initialMessages = res.data.map((item) => ({
          user: item?.message,
          ai: item, // Placeholder for AI response
        }));

        setMessages(initialMessages);
        console.log("initialMessages", initialMessages);
        initialMessages.map((msg, index) => {
          const flightSearchApi =
            msg?.ai?.response?.results?.view_top_flight_result_api?.url;
            console.log("flightResultsUrl", msg?.ai?.response?.results?.view_top_flight_result_api?.method);
          
        });
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setIsLoading(false);
      });
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const seeAllResultHandle = ()=> {
    alert("asas")
  }
  const handleSearch = () => {
    if (!userMessage.trim()) return;
    
    // Optimistically add user message first
    setMessages((prev) => [
      ...prev,
      { user: userMessage, ai: null }, // Show user message immediately
    ]);
    
    setIsLoading(true)
    setUserMessage(""); // Clear input immediately
    api.post(API_ENDPOINTS.CHAT.SEND_MESSAGE, { user_message: userMessage })
      .then((res) => {
        setIsLoading(false)
        setisnormalChat(res?.data?.is_function);
  
        if (res?.data?.is_function) {
          const flightSearchApi = res?.data?.response?.results?.view_top_flight_result_api?.url;
  
          if (flightSearchApi) {
            const flightResultsUrl = `https://demo.milesfactory.com${flightSearchApi}`;
            console.log("Fetching flight results:", flightResultsUrl);
  
            api.get(flightResultsUrl)
              .then((flightRes) => {
                setMessages((prev) =>
                  prev.map((msg, index) =>
                    index === prev.length - 1 // Update last message AI response
                      ? {
                          ...msg,
                          ai: {
                            ...flightRes.data,
                            cheapest_offer:
                              flightRes.data.cheapest_offer ||
                              msg?.ai?.cheapest_offer,
                          },
                          button: {
                            text: `See all flight options (10) with this offer`,
                            seeAllResultHandle: () => {
                              alert("asas")
                              // Handle the action for showing all flight options (you can modify this)
                              console.log("Show all flight options");
                            },
                          },
                        }
                      : msg
                  )
                );
              })
              .catch((error) => console.error("Error fetching flight data:", error));
          } else {
            console.warn("Flight results URL not available.");
          }
        } else {
          setMessages((prev) =>
            prev.map((msg, index) =>
              index === prev.length - 1 ? { ...msg, ai: res.data } : msg
            )
          );
        }
      })
      .catch((error) => console.error("Error:", error.response?.data || error));
  };
  

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
            {/* Welcome Message */}
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
                    className={searchResultStyles.SearchBox}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <TextField
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
                  {console.log("msg11", msg)}
                  {/* User Message */}
                  <UserMessage userMessage={msg?.user} />

                  {/* AI Response or Loading Indicator */}
                  {msg?.ai ? (
                    <AiMessage
                      aiMessage={msg?.ai?.response}
                      OfferMessage={msg}
                      isnormalChat={isnormalChat}
                    />
                  ) : index === messages.length - 1 && isLoading ? (
                    <LoadingArea /> // Show loading only for the last message
                  ) : null}

                  {/* {ai?.all_flight_options &&
                    ai.all_flight_options.length > 0 && (
                      <Box mt={2}>
                        <Typography variant="h6">
                          Other flight options:
                        </Typography>
                        {OfferMessage.ai.all_flight_options.map(
                          (option, index) => (
                            <SearchCard key={index} offerData={option} />
                          )
                        )}
                      </Box>
                    )} */}
                </div>
              ))}
              

              {/* Scroll to the latest message */}
              <div ref={messagesEndRef} />
            </section>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default HeroSection;
