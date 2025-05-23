import React, { useEffect, useRef, useState } from "react";
import { IconButton, Box } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import MicAnimation from "../ChatInput/MicAnimation";
import { useDispatch, useSelector } from "react-redux";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import LabelAnimation from "../../home/LabelAnimation";
import { sendMessage } from "@/src/store/slices/sendMessageSlice";
import { useRouter } from "next/router";

// Import react-speech-recognition hooks
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const MessageInputBox = ({ isMessageHome, isSticky, HeaderInput, messagesEndRef }) => {
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
  const uuid = useSelector((state) => state?.sendMessage?.ThreadUUIDsend);

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
    router.push(`/chat/${getuuid}`);
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
              <Box className={inputStyles.SearchBoxIn} position={"relative"}>
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

                

                <Box className={`${inputStyles.SearchButtonBox} ${listening ? inputStyles.active : ""}`}>
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

              {!isMessageHome && !isSticky && (
                <>
                  <Box display={"none"} gap={2} mt={2} justifyContent={"center"}>
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
                    flexWrap={"wrap"}
                  >
                    <Box
                      className={`${styles.ChatBullet1} ${styles.ChatBullet} br-12`}
                    >
                      Surprise me with a foodie weekend
                    </Box>
                    <Box
                      className={`${styles.ChatBullet2} ${styles.ChatBullet} br-12`}
                    >
                      Book Paris for 2 from Friday to Sunday, departing 6pm
                    </Box>
                    <Box
                      className={`${styles.ChatBullet3} ${styles.ChatBullet} br-12`}
                    >
                      I want a 3-day sunny getaway from London under £300
                    </Box>
                    <Box
                      className={`${styles.ChatBullet4} ${styles.ChatBullet} br-12`}
                    >
                      Plan a solo adventure to Spain
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
