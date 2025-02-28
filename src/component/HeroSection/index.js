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
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "@/src/store/slices/GestMessageSlice";
import { sendMessage } from "./sendMessageSlice";

const HeroSection = ({ isChatActive }) => {
  const [userMessage, setUserMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isnormalChat, setisnormalChat] = useState(false);
  const [AllSearchUrl, setAllSearchUrl] = useState(); // To store the full search URL
  const [getAllSearchUrl, setgetAllSearchUrl] = useState();
  const messagesEndRef = useRef(null);
  
  const dispatch = useDispatch();
  const messages = useSelector ((state)=> state.GestMessage.messages);
  console.log("getmessages", messages);
  
  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = () => {
    if (userMessage.trim()) {
      
      dispatch(sendMessage(userMessage))
      setUserMessage("");
    }
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
                  {console.log("msgrender")}
                  {/* User Message */}
                  <UserMessage userMessage={msg?.user} />

                  {/* AI Response or Loading Indicator */}
                  {msg?.ai?.response ? (
                    <AiMessage
                      aiMessage={msg?.ai?.response}
                      OfferMessage={msg}
                    />
                  ) : index === messages.length - 1 && isLoading ? (
                    <LoadingArea /> // Show loading only for the last message
                  ) : null}

                  {msg?.ai?.cheapest_offer &&
                  !msg?.ai?.all_search_results?.length ? (
                    <Box onClick={msg?.seeAllResultHandle} mt={2}>
                    <Link href={""} className="text-decuration-none">
                      <Box
                        mt={4}
                        mb={4}
                        gap={2}
                        alignItems={"center"}
                        display={"flex"}
                      >
                        <i className="fa-caret-down fa fas"></i>{" "}
                        <span>See all flightoptions</span>
                      </Box>
                    </Link>
                    </Box>
                  ) : null}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </section>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default HeroSection;
