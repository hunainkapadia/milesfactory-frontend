import { Box, Container } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import LoadingArea from "../LoadingArea";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";
import api from "@/src/store/api";

import styles from "@/src/styles/sass/components/Home.module.scss";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchResult/SearchCard";
import AiMessage from "../SearchResult/chat/AiMessage";
import UserMessage from "../SearchResult/chat/UserMessage";
import Link from "next/link";
import MessageInputBox from "../SearchResult/chat/MessageInputBox";

const HeroSection = ({ isChatActive }) => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [AllSearchUrl, setAllSearchUrl] = useState();
  
  const messagesEndRef = useRef(null);
  const searchBoxRef = useRef(null);

  // Fetch Initial Messages
  useEffect(() => {
    setIsLoading(true);

    api.get(API_ENDPOINTS.CHAT.GET_MESSAGE)
      .then((res) => {
        if (!Array.isArray(res?.data)) {
          setIsLoading(false);
          return;
        }

        isChatActive(true);

        const initialMessages = res.data.map((item) => ({
          user: item?.message,
          ai: item?.is_function ? null : item,
          expireTime: item.is_function
            ? new Date(item?.response?.results?.search_result_expire_time).getTime()
            : null,
        }));

        setMessages(initialMessages);

        res?.data.forEach((item) => {
          if (item?.is_function === true) {
            const flightSearchApi = item?.response?.results?.view_top_flight_result_api?.url;
            const AllSearchApi = item?.response?.results?.view_all_flight_result_api?.url;
            const AllSearchUrl = `https://demo.milesfactory.com${AllSearchApi}`;

            if (flightSearchApi) {
              const OfferSearchUrl = `https://demo.milesfactory.com${flightSearchApi}`;

              api.get(OfferSearchUrl)
                .then((response) => {
                  setMessages((prev) =>
                    prev.map((msg, index) =>
                      index === prev.length - 1
                        ? { ...msg, ai: { ...msg.ai, ...response?.data } }
                        : msg
                    )
                  );

                  if (AllSearchUrl) {
                    api.get(AllSearchUrl)
                      .then((allResultsRes) => {
                        setMessages((prev) =>
                          prev.map((msg, index) =>
                            index === prev.length - 1
                              ? { ...msg, ai: { ...msg.ai, all_search_results: allResultsRes.data.offers } }
                              : msg
                          )
                        );
                      })
                      .catch((error) => console.error("Error fetching all search results:", error));
                  }
                })
                .catch((error) => console.error("Error fetching additional flight data:", error));
            }
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setIsLoading(false);
      });
  }, []);

  // Scroll to the latest message when messages update
  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  }, [messages]);

  const handleSearch = () => {
    if (!userMessage.trim()) return;

    isChatActive(true);
    setMessages((prev) => [...prev, { user: userMessage, ai: null }]);

    setIsLoading(true);
    setUserMessage("");

    api.post(API_ENDPOINTS.CHAT.SEND_MESSAGE, { user_message: userMessage })
      .then((res) => {
        setIsLoading(false);

        if (res?.data?.is_function) {
          const flightSearchApi = res?.data?.response?.results?.view_top_flight_result_api?.url;
          const AllSearchApi = res?.data?.response?.results?.view_all_flight_result_api?.url;
          const AllSearchUrl = `https://demo.milesfactory.com${AllSearchApi}`;

          setAllSearchUrl(AllSearchUrl);

          if (flightSearchApi) {
            const flightResultsUrl = `https://demo.milesfactory.com${flightSearchApi}`;

            api.get(flightResultsUrl)
              .then((flightRes) => {
                setMessages((prev) =>
                  prev.map((msg, index) =>
                    index === prev.length - 1
                      ? {
                          ...msg,
                          ai: { ...flightRes.data },
                          seeAllResultHandle: () => {
                            if (AllSearchUrl) {
                              api.get(AllSearchUrl)
                                .then((allResultsRes) => {
                                  setMessages((prev) =>
                                    prev.map((msg, index) =>
                                      index === prev.length - 1
                                        ? { ...msg, ai: { ...msg.ai, all_search_results: allResultsRes.data.offers } }
                                        : msg
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
          className={`${styles.HeroSection} ${messages.length ? styles.Active : ""}`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box className={styles.Box}>
            {!messages.length && (
              <div className="mb-40 align-center">
                <h1 className="darkgray">Travel made simple</h1>
                <p className="darkgray">Your AI travel buddy, for smarter, stress-free trips</p>
              </div>
            )}

            {/* Search Box */}
            <div ref={searchBoxRef}>
              <MessageInputBox
                userMessage={userMessage}
                setUserMessage={setUserMessage}
                handleSearch={handleSearch}
                messages={messages}
              />
            </div>

            {/* Messages */}
            <section className={searchResultStyles.messageBody}>
              {messages.map((msg, index) => (
                <div key={index}>
                  <UserMessage userMessage={msg?.user} />

                  {msg?.ai ? (
                    <AiMessage aiMessage={msg?.ai?.response} OfferMessage={msg} />
                  ) : index === messages.length - 1 && isLoading ? (
                    <LoadingArea />
                  ) : null}

                  {msg?.ai?.cheapest_offer &&
                  !msg?.ai?.all_search_results?.length ? (
                    <Box onClick={msg?.seeAllResultHandle} mt={2}>
                      <Link href={""} className="text-decoration-none">
                        <Box mt={4} mb={4} gap={2} alignItems={"center"} display={"flex"}>
                          <i className="fa-caret-down fa fas"></i>{" "}
                          <span>See all flight options</span>
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
