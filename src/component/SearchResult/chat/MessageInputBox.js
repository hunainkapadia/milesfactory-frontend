import React, { useState } from "react";
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

const MessageInputBox = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const dispatch = useDispatch();


  const sendMessages = useSelector(
    (state) => state.sendMessage?.messages.length || 0
  );
  const getmessages = useSelector(
    (state) => state.getMessages.messages.length || 0
  );
  const isMessage = sendMessages > 0 || getmessages > 0; //check message length
  // for search button triger
  const handleSearch = () => {
    if (!userMessage.trim()) return;
    dispatch(sendMessage(userMessage)); //  Sends message to API (POST)
    setUserMessage(""); //  Clears input after sending
  };


  return (
    <section>

      <Box
        className={
          isMessage
            ? inputStyles.SearchBoxSectionActive
            : inputStyles.SearchBoxSection
        }
      >
        <Container>
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
                  <Box
                    className={inputStyles.SearchBoxIn}
                    position={"relative"}
                  >
                    {!isMessage && !isTyping ? <LabelAnimation /> : ""}
                    <div
                      contentEditable
                      role="textbox"
                      placeholder="Ask anything about your trip"
                      className={inputStyles.SearchForm + " SearchForm 222"}
                      onInput={(e) =>
                        setUserMessage(e.currentTarget.textContent)
                      }
                      onKeyDown={(e) => {
                        if (!isTyping) setIsTyping(true);
                        if (e.key === "Enter") {
                          e.preventDefault(); // Prevents new line in the div
                          handleSearch();
                          e.currentTarget.textContent = ""; // Clear div after sending
                        }
                      }}
                      style={{
                        textAlign: "left", // Ensures text starts from the left
                      }}
                    ></div>

                    <IconButton
                      className={inputStyles.SearchButton}
                      onClick={handleSearch}
                    >
                      <i className="fa fa-arrow-right"></i>
                    </IconButton>
                  </Box>
                  {!isMessage ? (
                    <Box
                      display={"flex"}
                      gap={2}
                      mt={3}
                      justifyContent={"center"}
                    >
                      <Box >
                        <img height={28} src="/images/app-google-play.svg" />
                      </Box>
                      <Box >
                        <img height={28} src="/images/app-app-store.svg" />
                      </Box>
                    </Box>
                  ) : (
                    ""
                  )}
                  {/*  */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </section>
  );
};

export default MessageInputBox;
