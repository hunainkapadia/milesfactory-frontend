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
import MessageInputBox from "../SearchResult/chat/MessageInputBox";
import { useDispatch } from "react-redux";
import { selectedFlight } from "@/src/store/slices/BookingflightSlice";

const HeroSection = ({ isChatActive }) => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isnormalChat, setisnormalChat] = useState(false);
  const [AllSearchUrl, setAllSearchUrl] = useState(); // To store the full search URL
  const [getAllSearchUrl, setgetAllSearchUrl] = useState();
  const messagesEndRef = useRef(null);
  const [isbookingDrowerOpen, setisBookingDrower] = useState(false);
  

  useEffect(() => {
    setIsLoading(true);
    

    api
      .get(API_ENDPOINTS.CHAT.GET_MESSAGE)
      .then((res) => {
        
        if (!Array.isArray(res?.data)) {
          setIsLoading(false);
          return;
        }
        isChatActive(true);

        // Convert response data into initial messages
        const initialMessages = res.data.map((item) => ({
          user: item?.message,
          ai: item?.is_function ? null : item, // Placeholder for AI response
          expireTime: item.is_function
            ? new Date(
                item?.response?.results?.search_result_expire_time
              ).getTime()
            : null,
          
        }));
        setMessages(initialMessages);

        res?.data.forEach((item) => {
          if (item?.is_function === true) {
            const flightSearchApi =
              item?.response?.results?.view_top_flight_result_api?.url;

            // Store AllSearchUrl in state
            if (flightSearchApi) {
              const OfferSearchUrl = `https://demo.milesfactory.com${flightSearchApi}`;
              const AllSearchApi =
                item?.response?.results?.view_all_flight_result_api?.url;
              const AllSearchUrl = `https://demo.milesfactory.com${AllSearchApi}`;

              api
                .get(OfferSearchUrl)
                .then((response) => {
                  // Use `map` to update only the last message
                  
                  setMessages((prev) =>
                    prev.map(
                      (msg, index) =>
                        index === prev.length - 1
                          ? {
                              ...msg,
                              ai: {
                                ...msg.ai, // Keep existing AI data
                                ...response?.data, // Add new flight data
                              },
                            }
                          : msg // Keep other messages unchanged
                    )
                  );

                  // Fetch full flight results immediately

                  
                  if (AllSearchUrl) {
                    api
                      .get(AllSearchUrl)
                      .then((allResultsRes) => {
                        setMessages((prev) =>
                          prev.map((msg, index) =>
                            index === prev.length - 1
                              ? {
                                  ...msg,
                                  ai: {
                                    ...msg.ai,
                                    all_search_results:
                                      allResultsRes.data.offers, // Automatically append all search results
                                  },
                                }
                              : msg
                          )
                        );
                      })
                      .catch((error) =>
                        console.error(
                          "Error fetching all search results:",
                          error
                        )
                      );
                  }
                })
                .catch((error) => {
                  console.error(
                    "Error fetching additional flight data:",
                    error
                  );
                });
            }
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setIsLoading(false);
      });
  }, []);
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = () => {
    if (!userMessage.trim()) return;

    isChatActive(true);
    setMessages((prev) => [
      ...prev,
      { user: userMessage, ai: null }, // Show user message immediately
    ]);
    
    setIsLoading(true);
    setUserMessage(""); // Clear input immediately

    api.post(API_ENDPOINTS.CHAT.SEND_MESSAGE, { user_message: userMessage })
      .then((res) => {
        setIsLoading(false);
        setisnormalChat(res?.data?.is_function);

        if (res?.data?.is_function) {
          const flightSearchApi = res?.data?.response?.results?.view_top_flight_result_api?.url;
          const AllSearchApi = res?.data?.response?.results?.view_all_flight_result_api?.url;
          const AllSearchUrl = `https://demo.milesfactory.com${AllSearchApi}`;

          // Store AllSearchUrl in state
          setAllSearchUrl(AllSearchUrl);

          if (flightSearchApi) {
            const flightResultsUrl = `https://demo.milesfactory.com${flightSearchApi}`;

            api.get(flightResultsUrl)
              .then((flightRes) => {
                console.log("flightRes", flightRes);
                
                setMessages((prev) =>
                  prev.map((msg, index) =>
                    index === prev.length - 1 // Check if it's the last message
                      ? {  /* Modify this message */
                          ...msg, // Keep the existing message properties
                          ai: {
                            ...flightRes.data, // Store flight API response inside `ai`
                          },
                          seeAllResultHandle: () => {
                            console.log("Fetching full flight results...");
                            // Call to fetch full flight results here using AllSearchUrl
                            if (AllSearchUrl) {
                              api
                                .get(AllSearchUrl)
                                .then((allResultsRes) => {
                                  // Add the full search results to the messages
                                  setMessages((prev) =>
                                    prev.map((msg, index) =>
                                      index === prev.length - 1
                                        ? {
                                            ...msg,
                                            ai: {
                                              ...msg.ai,
                                              all_search_results: allResultsRes.data.offers, // Store full search results here
                                            },
                                          }
                                        : msg // Keep other messages unchanged
                                    )
                                  );
                                })
                                .catch((error) => console.error("Error fetching all results:", error));
                            }
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
            <MessageInputBox
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              handleSearch={handleSearch}
              messages={messages}
            />
            {/* Chat Messages */}
            <section className={searchResultStyles.messageBody}>
              {messages.map((msg, index) => (
                <div key={index}>
                  {console.log("msgrender", msg)}
                  {/* User Message */}
                  <UserMessage userMessage={msg?.user} />

                  {/* AI Response or Loading Indicator */}
                  {msg?.ai ? (
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
              {!messages.length ? (
                <>
                  <div ref={messagesEndRef} />
                </>
              ) : (
                ""
              )}
            </section>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default HeroSection;