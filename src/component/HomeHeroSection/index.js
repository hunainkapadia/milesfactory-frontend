import {
  Box,
  Container
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "@/src/store/slices/GestMessageSlice";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Footer from "../layout/Footer";
import HerosectionContent from "../home/HerosectionContent";
import MessageInputBox from "../SearchResult/chat/MessageInputBox";
import { deleteChatThread, setThreadUUIDsend } from "@/src/store/slices/sendMessageSlice";

const HomeHeroSection = () => {
  //  Get past messages from API (GET)
  const sendMessages = useSelector(
    (state) => state.sendMessage?.messages.length
  );
  const getmessages = useSelector(
    (state) => state.getMessages.messages.length
  );
  const isMessage = sendMessages || getmessages; //check message length

  const dispatch = useDispatch();

  const threadUUID = useSelector((state) => state.sendMessage.ThreadUUIDsend);
  console.log("threadUUIDget", threadUUID);
  

  
  useEffect(() => {
    const localUUID = sessionStorage.getItem("chat_thread_uuid");
    if (localUUID) {
      dispatch(deleteChatThread(localUUID));   // Delete thread from server
      dispatch(setThreadUUIDsend(null));       // Clear from Redux + localStorage
    } {
      ""
    }
  }, []);

  return (
    <>
      <section>
        <Box
          className={`${styles.HeroSection} ${styles.mainHeroSection} ${
            isMessage.length ? styles.Active : ""
          }`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box className={styles.Box}>
            {!isMessage.length && <HerosectionContent />}
            {/* ////////////////////////// Search Box start ////////////////////////// */}
            <Container>
              <MessageInputBox isMessageHome={sendMessages} />
            </Container>
            {/* ////////////////////////// Search Box end ////////////////////////// */}
            
            {/* //////////////////////// Chat Message end ////////////////////////*/}
          </Box>
        </Box>
      </section>
      {!isMessage.length ? (
        <Footer id={"HowMylzWork"} forDark LearnMore={"Travel smarter"} />
      ) : (
        ""
      )}
    </>
  );
};

export default HomeHeroSection;