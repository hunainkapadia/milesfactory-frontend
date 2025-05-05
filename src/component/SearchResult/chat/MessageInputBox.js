import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import LabelAnimation from "../../home/LabelAnimation";
import { sendMessage } from "@/src/store/slices/sendMessageSlice";
import { useRouter } from "next/router";

const MessageInputBox = ({ isMessageHome }) => {
  console.log("isMessageHome", isMessageHome);
  const inputRef = useRef(null); // Add this
  const recognitionRef = useRef(null); // voice recognition instance
  const [isListening, setIsListening] = useState(false);

  const [isTyping, setIsTyping] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const dispatch = useDispatch();

  const sendMessages = useSelector(
    (state) => state.sendMessage?.messages.length || 0
  );
  const isLoading = useSelector((state) => state.sendMessage?.isLoading); // track for send message loading

  const getmessages = useSelector(
    (state) => state.getMessages.messages.length || 0
  );
  const isMessage = sendMessages > 0 || getmessages > 0; //check message length
  // for search button triger
  const handleSearch = () => {
    if (!userMessage.trim()) return;
    if (inputRef.current) {
      inputRef.current.textContent = "";
    } // clears actual on-screen input
    dispatch(sendMessage(userMessage)); //  Sends message to API (POST)
    setUserMessage(""); //  Clears input after sending
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserMessage(transcript);
        if (inputRef.current) inputRef.current.textContent = transcript;
      };

      recognition.onerror = (event) => {
        console.error("Voice recognition error:", event.error);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);
  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening((prev) => !prev);
  };
    const isPolling = useSelector((state) => state.sendMessage?.isPollingComplete);
  return (
    <section>
      <Box
        className={
          isMessageHome
            ? inputStyles.SearchBoxSectionActive
            : inputStyles.SearchBoxSection
        }
      >
        <Box className={styles.Content}>
          <Box
            className={styles.ContentIn}
            textAlign={"center"}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box className={inputStyles.SearchBoxContainer}>
                <Box className={inputStyles.SearchBoxIn} position={"relative"}>
                  {!isMessageHome && !userMessage.trim() && !isListening ? (
                    <LabelAnimation />
                  ) : (
                    ""
                  )}
                  <div
                    ref={inputRef} //
                    contentEditable={true}
                    suppressContentEditableWarning
                    role="textbox"
                    placeholder="Ask anything about your trip"
                    className={inputStyles.SearchForm + " SearchForm 222"}
                    onInput={(e) => {
                      const value = e.currentTarget.textContent.trim();
                      setUserMessage(value);

                      // Update isTyping based on value length
                      if (value.length > 0) {
                        if (!isTyping) setIsTyping(true);
                      } else {
                        if (isTyping) setIsTyping(false);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (isLoading) return; // Do nothing if loading
                        e.preventDefault(); // Prevent newline
                        handleSearch();
                        e.currentTarget.textContent = ""; // Clear input
                        setIsTyping(false); // Reset typing
                      }
                    }}
                    style={{
                      textAlign: "left",
                    }}
                  ></div>

                  <Box className={inputStyles.SearchButtonBox}>
                    <IconButton
                      className={inputStyles.MicButton + "  "}
                      onClick={handleVoiceInput}
                      disabled={isLoading}
                    >
                      <i
                        className={`fa ${
                          isListening ? "fa-microphone-slash" : "fa-microphone"
                        }`}
                      ></i>
                    </IconButton>
                    {/* voice btn */}
                    <IconButton
                      className={`${inputStyles.SearchButton} ${
                        isLoading ? inputStyles.Disabled : ""
                      }`}
                      onClick={handleSearch}
                      disabled={isLoading}
                    >
                      <i className="fa fa-arrow-right"></i>
                    </IconButton>
                    {console.log("isLoading", isLoading)}
                  </Box>
                </Box>
                {!isMessageHome ? (
                  <>
                    {/* <Box
                    display={"flex"}
                    gap={2}
                    mt={2}
                    justifyContent={"center"}
                  >
                    <Box>
                      <img height={28} src="/images/app-google-play.svg" />
                    </Box>
                    <Box>
                      <img height={28} src="/images/app-app-store.svg" />
                    </Box>
                  </Box> */}
                    <Box
                      className={styles.ChatBullets}
                      display={"flex"}
                      flexWrap={"wrap"}
                    >
                      <Box className={styles.ChatBullet1 + " " + styles.ChatBullet + " br-12 "}>
                        Surprise me with a foodie weekend
                      </Box>
                      <Box className={styles.ChatBullet2 + " " + styles.ChatBullet + " br-12 "}>
                        Book Paris for 2 from Friday to Sunday, departing 6pm
                      </Box>
                      <Box className={styles.ChatBullet3 + " " + styles.ChatBullet + " br-12 "}>
                        I want a 3-day sunny getaway from London under £300
                      </Box>
                      <Box className={styles.ChatBullet4 + " " + styles.ChatBullet + " br-12 "}>
                        Plan a solo adventure to Spain
                      </Box>
                    </Box>
                  </>
                ) : (
                  ""
                )}
                {/*  */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default MessageInputBox;
