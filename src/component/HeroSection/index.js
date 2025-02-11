import {
  Box,
  Card,
  Typography,
  IconButton,
  InputAdornment,
  TextField,
  Container,
} from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import { useEffect, useState, useRef } from "react";
import LoadingArea from "../LoadingArea";
import IdeaDetailSection from "../home/IdeaDetailSection";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";
import api from "@/src/store/api";

const HeroSection = ({ isChatActive }) => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null); // For auto-scrolling

  // Fetch messages when the component mounts
  useEffect(() => {
    setIsLoading(true);
    api
      .get(API_ENDPOINTS.CHAT.GET_MESSAGE)
      .then((res) => {
        console.log("Fetched messages:", res.data);
        if (Array.isArray(res.data)) {
          setMessages(res.data.map((item) => ({ user: item.message, ai: item.response })));
        }
      })
      .catch((error) => console.error("Error fetching messages:", error.response?.data || error))
      .finally(() => setIsLoading(false));
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSearch = () => {
    if (!userMessage.trim()) return;

    setIsLoading(true);
    isChatActive?.(true); // Activate chat if function is provided

    api
      .post(API_ENDPOINTS.CHAT.SEND_MESSAGE, { user_message: userMessage })
      .then((res) => {
        setMessages((prev) => [...prev, { user: userMessage, ai: res.data.response }]);
        setUserMessage("");
      })
      .catch((error) => console.error("Error:", error.response?.data || error))
      .finally(() => setIsLoading(false));
  };

  return (
    <section>
      <Container>
        <Box
          className={`${styles.HeroSection} ${
            messages.length > 0 ? styles.Active : ""
          }`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box className={styles.Box}>
            {/* Welcome Message */}
            {messages.length === 0 && (
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
                className={`${styles.SearchBoxSection} ${
                  messages.length > 0 ? styles.active : ""
                } SearchBoxSection basecolor1-light-bg`}
              >
                <Container>
                  <Box
                    className={styles.SearchBox}
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
            <section className={styles.messageBody}>
              {messages.map((msg, index) => (
                <div key={index}>
                  {/* User Message */}
                  <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Card
                      className={styles.UserMessage}
                      sx={{ maxWidth: "75%" }}
                    >
                      <Typography variant="body2">{msg.user}</Typography>
                    </Card>
                  </Box>

                  {/* AI Response */}
                  <Box display="flex" justifyContent="flex-start" mb={2}>
                    <Card
                      className={`${styles.AiMessage} white-bg`}
                      variant="outlined"
                    >
                      <Typography
                        variant="body2"
                        dangerouslySetInnerHTML={{
                          __html: msg.ai.replace(/\n/g, "<br>"),
                        }}
                      />
                    </Card>
                  </Box>
                </div>
              ))}
              {isLoading && (
                <Box display="flex" justifyContent="center">
                  <LoadingArea />
                </Box>
              )}

              {/* Scroll to the latest message */}
              <div ref={messagesEndRef} />

              {/* Loading Indicator */}
            </section>

            {/* Suggestion Section */}
            {messages.length === 0 && <IdeaDetailSection />}
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default HeroSection;
