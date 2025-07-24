import React, { useEffect, useRef, useState } from "react";
import {
  IconButton,
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
import {
  clearInputValue,
  setInputValue,
} from "@/src/store/slices/Base/baseSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MobileBuilder from "../ChatInput/mobileBuilderBUtton";
import MobileBuilderDialoge from "../ChatInput/MobileBuilderDialoge";

const MessageInputBox = ({
  isMessageHome,
  isSticky,
  HeaderInput,
  messagesEndRef,
  isAiBooking, // for aibook page
  aiBookingMessage,
  isChat,
}) => {
  const inputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only

  const [getuuid, setGetuuid] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
    


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

  const inputValue = useSelector((state) => state.base.inputValue); //get input value
  useEffect(() => {
    const storedUuid = sessionStorage.getItem("chat_thread_uuid");

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
    dispatch(setInputValue(transcript));
    if (inputRef.current) {
      inputRef.current.textContent = transcript;
    }
  }, [transcript]);

  const handleSearch = () => {
    dispatch(setInputValue(inputValue)); // inputvalue set in redux state
    dispatch(clearInputValue()); // clear input value
    if (!inputValue.trim()) return;
    if (inputRef.current) inputRef.current.textContent = "";

    dispatch(sendMessage(inputValue));
    resetTranscript();
    setIsTyping(false);
    if (!uuid) return null; // Skip rendering or logic

    // Only runs when uuid is defined

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

  // check  polling true and start new chat
  const FlightExpire = useSelector((state) => state.getMessages.flightExpire);

  const messages = useSelector((state) => state.sendMessage.messages);

  // Find message with ai.offers
  const checkPolling = messages.find((msg) => msg.ai && msg.ai.offers);
  const isPolling = checkPolling?.ai?.is_complete;

  // const HandleNewThread = () => {
  //   alert("test")
  //   dispatch(deleteAndCreateThread());
  // };

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
    <Box
      className={`${
        isMessageHome
          ? inputStyles.SearchBoxSectionActive
          : inputStyles.SearchBoxSectionHome
      } ${HeaderInput ? inputStyles.HeaderInput : ""} ${
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
                {!isMessageHome && !inputValue.trim() && !listening ? (
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
                            className={
                              styles.newChatBtn + " newChatBtn lg"
                            }
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </Box>
                          <MobileBuilder />
                          <MobileBuilderDialoge />
                        </>
                      ) : (
                        ""
                      )}
                      <Box className={inputStyles.rightCol}>
                        <Box width={"100%"}>
                          {listening ? (
                            <MicAnimation active={listening} />
                          ) : null}
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
  );
};

export default MessageInputBox;
