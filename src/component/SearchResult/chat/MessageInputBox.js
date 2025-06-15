import React, { useEffect, useRef, useState } from "react";
import { IconButton, Box, Button } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import MicAnimation from "../ChatInput/MicAnimation";
import { useDispatch, useSelector } from "react-redux";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import LabelAnimation from "../../home/LabelAnimation";
import {
  deleteAndCreateThread,
  sendMessage,
} from "@/src/store/slices/sendMessageSlice";
import { useRouter } from "next/router";

// Import react-speech-recognition hooks
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const MessageInputBox = ({
  isMessageHome,
  isSticky,
  HeaderInput,
  messagesEndRef,
}) => {
  const inputRef = useRef(null);

  const [getuuid, setGetuuid] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  console.log("userMessage", userMessage);
  console.log("isTyping", isTyping);

  const dispatch = useDispatch();
  const router = useRouter();
  const sendMessages = useSelector(
    (state) => state.sendMessage?.messages.length || 0
  );
  const isLoading = useSelector((state) => state.sendMessage?.isLoading);
  const getmessages = useSelector(
    (state) => state.getMessages.messages.length || 0
  );
  const isMessage = sendMessages > 0 || getmessages > 0;
  const uuid = useSelector((state) => state?.sendMessage?.threadUuid);

  useEffect(() => {
    const storedUuid = sessionStorage.getItem("chat_thread_uuid");
    console.log("storedUuid", storedUuid);
    setGetuuid(storedUuid);
  }, []);

  // Using react-speech-recognition hook
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Sync react-speech-recognition transcript with local state and contentEditable div
  useEffect(() => {
    setUserMessage(transcript);
    if (inputRef.current) {
      inputRef.current.textContent = transcript;
    }
  }, [transcript]);

  const handleSearch = () => {
    if (!userMessage.trim()) return;
    if (inputRef.current) inputRef.current.textContent = "";

    dispatch(sendMessage(userMessage));
    setUserMessage("");
    resetTranscript();
    setIsTyping(false);
    if (!uuid) return null; // Skip rendering or logic

    // Only runs when uuid is defined
    console.log("get_uuid", uuid);
    router.push(`/chat/${uuid}`);
  };

  const handleVoiceInput = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      if (inputRef.current) inputRef.current.textContent = "";
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    }
  };
  const ScrollDown = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // check  polling true and start new chat
  const FlightExpire = useSelector((state) => state.getMessages.flightExpire);
    console.log("FlightExpire222", FlightExpire);
  const messages = useSelector((state) => state.sendMessage.messages);

// Find message with ai.offers
const checkPolling = messages.find(
  (msg) => msg.ai && msg.ai.offers
);
const isPolling = checkPolling?.ai?.is_complete;
console.log("checkPolling", messages || FlightExpire);

  
  const HandleNewThread = () => {
    alert("test")
    dispatch(deleteAndCreateThread());
  };

  return (
    <Box
      className={`${
        isMessageHome
          ? inputStyles.SearchBoxSectionActive
          : inputStyles.SearchBoxSection
      } ${HeaderInput ? inputStyles.HeaderInput : ""} ${
        isSticky ? inputStyles.InputSticky : ""
      }`}
    >
      <Box className={styles.Content + " " + inputStyles.Content}>
        <Box
          className={styles.ContentIn}
          textAlign={"center"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            {/* <IconButton sx={{position:"absolute", top:-60,}}
              className={" CircleButton btn-white " + inputStyles.CircleButton}
              onClick={ScrollDown}

            >
              <i className="fa fa-arrow-down"></i>
            </IconButton> */}
            <Box className={inputStyles.SearchBoxContainer}>
                  <Box
                    className={inputStyles.SearchBoxIn}
                    position={"relative"}
                  >
                    {!isMessageHome && !userMessage.trim() && !listening ? (
                      <LabelAnimation />
                    ) : null}

                    <div
                      ref={inputRef}
                      contentEditable={true}
                      suppressContentEditableWarning
                      role="textbox"
                      placeholder="Ask anything about your trip"
                      className={inputStyles.SearchForm + " SearchForm 222"}
                      onInput={(e) => {
                        const value = e.currentTarget.textContent.trim();
                        setUserMessage(value);
                        setIsTyping(value.length > 0);
                        // If user edits manually, reset transcript so react-speech-recognition does not override
                        resetTranscript();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (isLoading) return;
                          e.preventDefault();
                          handleSearch();
                          e.currentTarget.textContent = "";
                          setIsTyping(false);
                          resetTranscript();
                        }
                      }}
                      style={{ textAlign: "left" }}
                    ></div>

                    <Box
                      className={`${inputStyles.SearchButtonBox} ${
                        listening ? inputStyles.active : ""
                      }`}
                    >
                      <Box width={"100%"}>
                        {listening ? <MicAnimation active={listening} /> : null}
                      </Box>
                      <Box className={inputStyles.BoxButtons}>
                        <IconButton
                          className={inputStyles.MicButton}
                          onClick={handleVoiceInput}
                          disabled={isLoading}
                        >
                          <i
                            className={`fa ${
                              listening ? "fa-check" : "fa-microphone"
                            }`}
                          ></i>
                        </IconButton>

                        {listening ? (
                          <IconButton
                            className={inputStyles.MicButton}
                            onClick={handleVoiceInput}
                            disabled={isLoading}
                          >
                            <i className="fa fa-close"></i>
                          </IconButton>
                        ) : (
                          <IconButton
                            className={`${inputStyles.SearchButton} ${
                              isLoading ? inputStyles.Disabled : ""
                            }`}
                            onClick={handleSearch}
                            disabled={isLoading}
                          >
                            <i className="fa fa-arrow-right"></i>
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </Box>
              {/* {!isPolling && !FlightExpire ? (
                <>
                </>
              ) : (
                <Box
                  onClick={HandleNewThread}
                  className="btn btn-basecolor1 btn-border  btn-sm cursor-pointer"
                >
                  Start new chat
                </Box>
              )} */}

              {!isMessageHome && !isSticky && (
                <>
                  <Box
                    display={"none"}
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
                  </Box>

                  <Box
                    sx={{ display: { xs: "none", lg: "flex", md: "flex" } }}
                    className={styles.ChatBullets}
                    textAlign={"center"}
                    justifyContent={"center"}
                    flexWrap={"wrap"}
                    fontSize={14}
                  >
                    <Box
                      className={`${styles.ChatBullet} `}
                    >
                      ✅ Lowest price guaranteed
                    </Box>
                    <Box
                      className={` ${styles.ChatBullet} `}
                    >
                      🛡️ Airline-direct booking and protection
                    </Box>
                    <Box
                      className={`${styles.ChatBullet} `}
                    >
                      🔒 Privacy-safe
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: { xs: "flex", lg: "none", md: "none" } }}
                    className={styles.ChatBullets}
                    textAlign={"center"}
                    justifyContent={"center"}
                    flexWrap={"wrap"}
                    fontSize={12}
                  >
                    <Box
                      className={`${styles.ChatBullet} `}
                    >
                      ✅ Best price
                    </Box>
                    <Box
                      className={` ${styles.ChatBullet} `}
                    >
                      🛡️ Airline-protected
                    </Box>
                    <Box
                      className={`${styles.ChatBullet} `}
                    >
                      🔒 Privacy-safe
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageInputBox;
