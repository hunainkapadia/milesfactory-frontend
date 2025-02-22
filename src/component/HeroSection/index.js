import { Box, Button, Container } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import LoadingArea from "../LoadingArea";
import AiMessage from "../SearchResult/chat/AiMessage";
import UserMessage from "../SearchResult/chat/UserMessage";
import Link from "next/link";
import MessageInputBox from "../SearchResult/chat/MessageInputBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage } from "@/src/store/slices/messagesSlice";
import styles from "@/src/styles/sass/components/Home.module.scss";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import BookingDrawer from "@/src/component/Checkout/BookingDrawer";

const HeroSection = ({ isChatActive }) => {
  const dispatch = useDispatch();
  const { messages, isLoading } = useSelector((state) => state.messages);
  const [userMessage, setUserMessage] = useState("");
  const [localMessages, setLocalMessages] = useState([]); // Temporary messages before API response
  const [isBooking, setisBooking]= useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [localMessages]);

  const handleSearch = () => {
    if (!userMessage.trim()) return;

    // Immediately update UI with user's message
    const newMessage = { user: userMessage, ai: null };
    setLocalMessages((prev) => [...prev, newMessage]);

    // Dispatch Redux action to send message and fetch AI response
    dispatch(sendMessage(userMessage));

    // Clear input field
    setUserMessage("");
  };

  useEffect(() => {
    // Sync local messages with Redux state when API response comes
    setLocalMessages(messages);
  }, [messages]);

  const BookingDrawerHandle =()=> {
    setisBooking(true)
  }
  
  return (
    <section>
      <Container>
        <Box
          className={`${styles.HeroSection} ${
            localMessages.length ? styles.Active : ""
          }`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box className={styles.Box}>
            {/* Welcome Message */}
            {!localMessages.length && (
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
              messages={localMessages}
            />

            {/* Chat Messages */}
            <section className={searchResultStyles.messageBody}>
              {localMessages.map((msg, index) => (
                <div key={index}>
                  {/* User Message */}
                  <UserMessage userMessage={msg?.user} />

                  {/* AI Response OR Loading */}
                  {msg?.ai ? (
                    <AiMessage aiMessage={msg?.ai?.response} OfferMessage={msg} />
                  ) : index === localMessages.length - 1 && isLoading ? (
                    <LoadingArea />
                  ) : null}

                  {/* Flight Results - "See all flight options" */}
                  {msg?.ai?.cheapest_offer &&
                  !msg?.ai?.all_search_results?.length ? (
                    <Box onClick={msg?.seeAllResultHandle} mt={2}>
                      <Link href={""} className="text-decoration-none">
                        <Box
                          mt={4}
                          mb={4}
                          gap={2}
                          alignItems={"center"}
                          display={"flex"}
                        >
                          <i className="fa-caret-down fa fas"></i>
                          <span>See all flight options</span>
                        </Box>
                      </Link>
                    </Box>
                  ) : null}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </section>
            <Button onClick={BookingDrawerHandle}>
              Flight Bookink
            </Button>
            
            <BookingDrawer />
            <Box py={10}></Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default HeroSection;
