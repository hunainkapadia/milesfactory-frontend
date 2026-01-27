import React, { useEffect, useRef, useState } from "react";
import {
  IconButton,
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Stack,
  Tooltip,
  ClickAwayListener,
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
  forInputSticky,
}) => {
  const inputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only
  const [open, setOpen] = useState(false);

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

  const { inputLoading, isPolling } = useSelector((state) => state?.sendMessage);
  console.log("isPolling_status", isPolling.status); // ✅ true/false
  


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
      action: "click",
      category: "engagement",
      label: "chat_message_sent",
    });
  };

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
      action: "click",
      category: "engagement",
      label: "voice_input_used",
    });
  };

  // check  polling true and start new chat

  const messages = useSelector((state) => state.sendMessage.messages);

  // Find message with ai.offers
  const checkPolling = messages.find((msg) => msg.ai && msg.ai.offers);
  

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
        ${forInputSticky && inputStyles.forInputSticky}
        ${isSticky ? inputStyles.InputSticky : inputStyles.noInputSticky}`}
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
                  {isChat && !isMobile && (
                    <Box>
                      <Tooltip
                        title="Coming soon - share documents"
                        arrow
                        placement="top"
                      >
                        <Box
                          onClick={HandleNewThread}
                          className={
                            styles.newChatBtn + " newChatBtn lg cursor-pointer"
                          }
                        >
                          <FontAwesomeIcon
                            className="basecolor"
                            icon={faPlus}
                          />
                        </Box>
                      </Tooltip>
                    </Box>
                  )}
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
                        if (isPolling.status) return;
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
                            <Box className={inputStyles.leftCol + ""}>
                              <Box
                                onClick={HandleNewThread}
                                className={
                                  styles.newChatBtn +
                                  " newChatBtn lg cursor-pointer"
                                }
                              >
                                <FontAwesomeIcon
                                  className="basecolor"
                                  icon={faPlus}
                                />
                              </Box>
                            </Box>
                            <Box
                              display={"flex"}
                              justifyContent={"center"}
                              className={inputStyles.centerCol}
                            >
                              <MobileBuilder />
                            </Box>
                          </>
                        ) : (
                          ""
                        )}
                        <Box className={inputStyles.rightCol}>
                          {isHomePage && (
                            <Stack
                              className={inputStyles.BoxButtons}
                              flexDirection={"row"}
                            >
                              <Tooltip
                                title="Coming soon - share documents"
                                arrow
                                placement="top"
                              >
                                <Box
                                  onClick={HandleNewThread}
                                  className={
                                    styles.newChatBtn +
                                    " newChatBtn dark cursor-pointer"
                                  }
                                >
                                  <FontAwesomeIcon
                                    className="white"
                                    icon={faPlus}
                                  />
                                </Box>
                              </Tooltip>

                              <ClickAwayListener
                                onClickAway={() => setOpen(false)}
                              >
                                <div>
                                  <Tooltip
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    onOpen={() => setOpen(true)}
                                    arrow
                                    placement="top"
                                    title={
                                      "Coming soon - Change the privacy of your trip"
                                    }
                                  >
                                    <Box
                                      onClick={() => setOpen((prev) => !prev)} // toggle on tap
                                      className={`${styles.newChatBtn} ${styles.publicBtn} newChatBtn auto cursor-pointer TapNone`}
                                      whiteSpace={"nowrap"}
                                      gap={"4px"}
                                      px={"12px"}
                                      display={"flex"}
                                      alignItems={"center"}
                                    >
                                      <svg
                                        width="10"
                                        height="11"
                                        viewBox="0 0 10 11"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M5 10.5C4.30833 10.5 3.65833 10.3688 3.05 10.1062C2.44167 9.84375 1.9125 9.4875 1.4625 9.0375C1.0125 8.5875 0.65625 8.05833 0.39375 7.45C0.13125 6.84167 0 6.19167 0 5.5C0 4.80833 0.13125 4.15833 0.39375 3.55C0.65625 2.94167 1.0125 2.4125 1.4625 1.9625C1.9125 1.5125 2.44167 1.15625 3.05 0.89375C3.65833 0.63125 4.30833 0.5 5 0.5C5.69167 0.5 6.34167 0.63125 6.95 0.89375C7.55833 1.15625 8.0875 1.5125 8.5375 1.9625C8.9875 2.4125 9.34375 2.94167 9.60625 3.55C9.86875 4.15833 10 4.80833 10 5.5C10 6.19167 9.86875 6.84167 9.60625 7.45C9.34375 8.05833 8.9875 8.5875 8.5375 9.0375C8.0875 9.4875 7.55833 9.84375 6.95 10.1062C6.34167 10.3688 5.69167 10.5 5 10.5ZM5 9.5C6.11667 9.5 7.0625 9.1125 7.8375 8.3375C8.6125 7.5625 9 6.61667 9 5.5C9 5.44167 8.99792 5.38125 8.99375 5.31875C8.98958 5.25625 8.9875 5.20417 8.9875 5.1625C8.94583 5.40417 8.83333 5.60417 8.65 5.7625C8.46667 5.92083 8.25 6 8 6H7C6.725 6 6.48958 5.90208 6.29375 5.70625C6.09792 5.51042 6 5.275 6 5V4.5H4V3.5C4 3.225 4.09792 2.98958 4.29375 2.79375C4.48958 2.59792 4.725 2.5 5 2.5H5.5C5.5 2.30833 5.55208 2.13958 5.65625 1.99375C5.76042 1.84792 5.8875 1.72917 6.0375 1.6375C5.87083 1.59583 5.70208 1.5625 5.53125 1.5375C5.36042 1.5125 5.18333 1.5 5 1.5C3.88333 1.5 2.9375 1.8875 2.1625 2.6625C1.3875 3.4375 1 4.38333 1 5.5H3.5C4.05 5.5 4.52083 5.69583 4.9125 6.0875C5.30417 6.47917 5.5 6.95 5.5 7.5V8H4V9.375C4.16667 9.41667 4.33125 9.44792 4.49375 9.46875C4.65625 9.48958 4.825 9.5 5 9.5Z"
                                          fill="white"
                                        />
                                      </svg>
                                      <Typography
                                        className="f12"
                                        sx={{
                                          pt: "4px",
                                          display: { md: "block", xs: "none" },
                                        }}
                                      >
                                        Public
                                      </Typography>
                                    </Box>
                                  </Tooltip>
                                </div>
                              </ClickAwayListener>
                            </Stack>
                          )}
                          <Box width={"100%"}>
                            {isMicActive ? (
                              <MicAnimation active={isMicActive} />
                            ) : null}
                          </Box>
                          <Stack
                            className={inputStyles.BoxButtons}
                            flexDirection={"row"}
                          >
                            
                            {((isChat && (!isMobile || !isTyping)) ||
                              isHomePage ||
                              isSticky) && (
                              <>
                                {isMicActive ? (
                                  <>
                                    {isChat && !isMobile ? (
                                      <IconButton
                                        className={`${inputStyles.MicButton} ${
                                          isMicActive
                                            ? inputStyles.isMicActive
                                            : inputStyles.MicButton
                                        }`}
                                        onClick={handleVoiceInput}
                                        disabled={isLoading}
                                      >
                                        <i className="fa fa-check"></i>
                                      </IconButton>
                                    ) : isHomePage || isSticky ? (
                                      <IconButton
                                        className={`${inputStyles.MicButton} ${
                                          isMicActive
                                            ? inputStyles.isMicActive
                                            : inputStyles.MicButton
                                        }`}
                                        onClick={handleVoiceInput}
                                        disabled={isLoading}
                                      >
                                        <i className="fa fa-check"></i>
                                      </IconButton>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                ) : (
                                  <>
                                  
                                  <IconButton
                                    className={`${inputStyles.MicButton} ${
                                      isMicActive
                                        ? inputStyles.isMicActive
                                        : inputStyles.MicButton
                                    }`}
                                    onClick={handleVoiceInput}
                                    disabled={isLoading || isPolling.status}
                                  >
                                    <Tooltip
                                      placement="top"
                                      title="Record a message"
                                      arrow
                                    >
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
                                            src="/images/search-mic-icon2.svg"
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
                                    </Tooltip>
                                  </IconButton>
                                  </>
                                )}
                              </>
                            )}

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
                                {(isTyping ||
                                  !isChat ||
                                  !isMobile ||
                                  !isMessage) && (
                                  <Tooltip
                                    title="Start planning your trip!"
                                    arrow
                                    placement="top"
                                  >
                                    <IconButton
                                      sx={{ p: 0 }}
                                      className={`${inputStyles.SearchButton} ${
                                        isLoading || isPolling.status ? inputStyles.Disabled : ""
                                      }`}
                                      onClick={handleSearch}
                                      disabled={isLoading || isPolling.status}
                                    >
                                      {inputLoading && isHomePage ? (
                                        <>
                                          <Box>
                                            <CircularProgress
                                              size={15}
                                              color="inherit"
                                              sx={{ color: "white" }}
                                            />
                                          </Box>
                                        </>
                                      ) : (
                                        <>
                                          <i className="fa fa-arrow-right"></i>
                                        </>
                                      )}
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </>
                            )}
                          </Stack>
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
                    className={`btn btn-primary btn-round btn-lg-x  ${
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
