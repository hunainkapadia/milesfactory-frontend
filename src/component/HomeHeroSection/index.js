import {
  Box
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "@/src/store/slices/GestMessageSlice";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Footer from "../layout/Footer";
import HerosectionContent from "../home/HerosectionContent";
import MessageInputBox from "../SearchResult/chat/MessageInputBox";

const HomeHeroSection = () => {
  //  Get past messages from API (GET)
  const sendMessages = useSelector(
    (state) => state.sendMessage?.messages.length
  );
  const getmessages = useSelector(
    (state) => state.getMessages.messages.length
  );
  const isMessage = sendMessages || getmessages; //check message length
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
            <MessageInputBox />
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