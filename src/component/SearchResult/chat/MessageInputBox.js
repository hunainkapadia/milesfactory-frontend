import React, { useEffect, useRef, useState } from "react";
import {
  IconButton,
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import MicAnimation from "../ChatInput/MicAnimation";
import { useDispatch, useSelector } from "react-redux";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import LabelAnimation from "../../home/LabelAnimation";
import { event } from "@/src/utils/utils";
import {
  createThread,
  deleteAndCreateThread,
  sendMessage,
} from "@/src/store/slices/sendMessageSlice";
import { useRouter } from "next/router";

// Import react-speech-recognition hooks
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  clearInputValue,
  setInputValue,
} from "@/src/store/slices/Base/baseSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MobileBuilder from "../ChatInput/mobileBuilderBUtton";
import MobileBuilderDialoge from "../ChatInput/MobileBuilderDialoge";
import SearchProgressBar from "../../LoadingArea/SearchProgressBar";

const MessageInputBox = ({
  isMessageHome,
  isHomePage,
  isSticky,
  HeaderInput,
  messagesEndRef,
  isAiBooking, // for aibook page
  aiBookingMessage,
  isChat,
  forInputSticky
}) => {
  const inputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only

  const [getuuid, setGetuuid] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);

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
  
  const inputLoading = useSelector((state) => state?.sendMessage?.inputLoading);
  
  console.log("inputLoading", isHomePage);
  

  const inputValue = useSelector((state) => state.base.inputValue); //get input value
  const getBuilder = useSelector((state) => state?.sendMessage?.AddBuilder); // builder
  

  // Using react-speech-recognition hook
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Sync react-speech-recognition transcript with local state and contentEditable div
  useEffect(() => {
    dispatch(setInputValue(transcript));
    if (inputRef.current) {
      inputRef.current.textContent = transcript;
    }
  }, [transcript]);

  const handleSearch = () => {
    if (!inputValue.trim()) return;

    dispatch(setInputValue(inputValue));
    dispatch(clearInputValue());

    if (inputRef.current) {
      inputRef.current.textContent = "";
    }

    dispatch(sendMessage(inputValue)); // This handles both creating & sending 

    resetTranscript();
    setIsTyping(false);

    event({
      action: 'click',
      category: 'engagement',
      label: 'chat_message_sent',
    });
  };
  


  console.log("listening", listening);
  const handleVoiceInput = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (isMicActive) {
      SpeechRecognition.stopListening();
      setIsMicActive(false);
    } else {
      resetTranscript();
      if (inputRef.current) inputRef.current.textContent = "";
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
      setIsMicActive(true);
    }
    event({
      action: 'click',
      category: 'engagement',
      label: 'voice_input_used',
    });
    console.log("voince_input_used");
  };

  // check  polling true and start new chat
  const FlightExpire = useSelector((state) => state.getMessages.flightExpire);

  const messages = useSelector((state) => state.sendMessage.messages);

  // Find message with ai.offers
  const checkPolling = messages.find((msg) => msg.ai && msg.ai.offers);
  const isPolling = checkPolling?.ai?.is_complete;

  const HandleNewThread = () => {
    dispatch(deleteAndCreateThread());
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const ScrollDown = () => {
    messagesEndRef?.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (
      inputRef.current &&
      inputRef.current.textContent !== inputValue &&
      !document.activeElement.isEqualNode(inputRef.current)
    ) {
      inputRef.current.textContent = inputValue || "";
    }
  }, [inputValue]);

  return (
    <>
      <Box
        className={`${
          isMessageHome
            ? inputStyles.SearchBoxSectionActive
            : inputStyles.SearchBoxSectionHome
        } ${HeaderInput ? inputStyles.HeaderInput : ""} 
        ${forInputSticky && inputStyles.forInputSticky }
        ${
          isSticky ? inputStyles.InputSticky : inputStyles.noInputSticky
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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              position={"relative"}
              sx={{
                gap: isAiBooking ? { lg: "26px", md: "26px", xs: "12px" } : "",
                flexDirection: isAiBooking
                  ? { lg: "row", md: "row", xs: "column" }
                  : "",
              }}
            >
              <Box className={inputStyles.SearchBoxContainer}>
                <Box className={inputStyles.SearchBoxIn}>
                  {(!isMobile || (isMobile && !isSticky)) &&
                  !isMessageHome &&
                  !inputValue.trim() &&
                  !listening ? (
                    <LabelAnimation aiBookingMessage={aiBookingMessage} />
                  ) : null}

                  <div
                    ref={inputRef}
                    onPaste={(e) => {
                      e.preventDefault(); // stop default paste
                      const text = e.clipboardData.getData("text/plain"); // get plain text
                      document.execCommand("insertText", false, text); // insert plain text
                    }}
                    contentEditable={true}
                    suppressContentEditableWarning
                    role="textbox"
                    placeholder="Ask anything about your trip"
                    className={inputStyles.SearchForm + " SearchForm 222"}
                    onInput={(e) => {
                      const value = e.currentTarget.textContent.trim();
                      dispatch(setInputValue(value));
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
                  {isChat && !inputValue && !listening && (
                    <Box
                      sx={{
                        position: "absolute",
                        left: { md: "35px", xs: "20px" },
                      }}
                      className={inputStyles.PlaceholderText}
                    >
                      {isMobile
                        ? "Ask Mylz..."
                        : "Ask anything about your trip"}
                    </Box>
                  )}

                  <Box className={inputStyles.buttonRow}>
                    {!isAiBooking && (
                      <Box
                        className={`${inputStyles.SearchButtonBox} ${
                          listening ? inputStyles.MicActive : ""
                        }`}
                      >
                        {isChat && isMobile ? (
                          <>
                            <Box
                              onClick={HandleNewThread}
                              className={
                                styles.newChatBtn +
                                " newChatBtn lg cursor-pointer"
                              }
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Box>
                            <Box sx={{ opacity: !getBuilder ? 0.5 : 1 }}>
                              <MobileBuilder />
                            </Box>
                          </>
                        ) : (
                          ""
                        )}
                        <Box className={inputStyles.rightCol}>
                          <Box width={"100%"}>
                            {isMicActive ? (
                              <MicAnimation active={isMicActive} />
                            ) : null}
                          </Box>
                          <Box className={inputStyles.BoxButtons}>
                            <IconButton
                              className={`${inputStyles.MicButton} ${isMicActive ? inputStyles.isMicActive : inputStyles.MicButton}`}
                              onClick={handleVoiceInput}
                              disabled={isLoading}
                            >
                              {isMicActive ? (
                                <i className="fa fa-check"></i>
                              ) : (
                                <Box className="imggroup">
                                  {isSticky ? (
                                    <img
                                      src="/images/mic-border-icon-v2.svg"
                                      style={{
                                        width: "12px",
                                        maxWidth: "12px",
                                      }}
                                      alt="Mic"
                                    />
                                  ) : isChat ? (
                                    <img
                                      src="/images/search-mic-icon.svg"
                                      style={{
                                        width: "12px",
                                        maxWidth: "12px",
                                      }}
                                      alt="Mic"
                                    />
                                  ) : (
                                    <img
                                      src="/images/mic-border-icon.svg"
                                      style={{
                                        width: "12px",
                                        maxWidth: "12px",
                                      }}
                                      alt="Mic"
                                    />
                                  )}
                                </Box>
                              )}
                            </IconButton>

                            {isMicActive ? (
                              <IconButton
                                className={inputStyles.MicButton}
                                onClick={handleVoiceInput}
                                disabled={isLoading}
                              >
                                <i className="fa fa-close"></i>
                              </IconButton>
                            ) : (
                              <>
                                <IconButton
                                  className={`${inputStyles.SearchButton} ${
                                    isLoading ? inputStyles.Disabled : ""
                                  }`}
                                  onClick={handleSearch}
                                  disabled={isLoading}
                                >
                                  <i className="fa fa-arrow-right"></i>
                                </IconButton>
                              </>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
                {inputLoading && isHomePage && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: `${isSticky ? "80px" : "15px"}`,
                      top: "15px",
                    }}
                  >
                    <CircularProgress
                      size={20}
                      color="inherit"
                      sx={{ color: `${!isSticky ? "#fff" : "#000"}` }}
                    />
                  </Box>
                )}

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
              </Box>
              {isAiBooking && (
                <Box
                  whiteSpace={"nowrap"}
                  sx={{
                    width: { xs: "100%", sm: "auto" }, // 100% on mobile, auto on larger
                    display: { xs: "flex", sm: "block" }, // flex on mobile, block on larger
                    justifyContent: { xs: "end", sm: "start" }, // end on mobile, start/default on larger
                  }}
                >
                  <Button
                    className={`btn btn-primary btn-round btn-xs  ${
                      inputStyles.SearchButton
                    } ${isLoading ? inputStyles.Disabled : ""}`}
                    onClick={handleSearch}
                    disabled={isLoading}
                  >
                    Search
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MessageInputBox;
