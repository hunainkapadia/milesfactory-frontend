import {
  Box,
  Container,
  TextField,
  IconButton,
  InputAdornment,
  FormLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "@/src/store/slices/GestMessageSlice";
import { sendMessage } from "@/src/store/slices/sendMessageSlice";

import styles from "@/src/styles/sass/components/Home.module.scss";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

import AiMessage from "../SearchResult/chat/AiMessage";
import UserMessage from "../SearchResult/chat/UserMessage";
import LoadingArea from "../LoadingArea";
import BookingDrawer from "../Checkout/BookingDrawer/BookingDrawer";
import PassengerDrawerForm from "../Checkout/passengerDrawerForm";
import inputStyles from "@/src/styles/sass/components/input-box/inputBox.module.scss";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import LabelAnimation from "../home/LabelAnimation";
import HerosectionContent from "../home/HerosectionContent";
import MessageInputBox from "../SearchResult/chat/MessageInputBox";
import Messages from "../Messages";

const HerosectionChat = () => {
  const dispatch = useDispatch();
  //  Fetch messages from Redux store
  const sendMessages = useSelector(
   (state) => state.sendMessage?.messages.length
 );
 const getmessages = useSelector(
   (state) => state.getMessages.messages.length
 );
 const isMessage = sendMessages || getmessages; //check message length
  // for bookingdrawer selector
  
  return (
    <>
      <section>
        <Box
          className={`${styles.HeroSection} ${styles.mainHeroSection} ${
            isMessage ? styles.Active : ""
          }`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box className={styles.Box}>
         {!isMessage && <HerosectionContent />}
            {/* ////////////////////////// Search Box start ////////////////////////// */}
            <MessageInputBox />
            {/* ////////////////////////// Search Box end ////////////////////////// */}
            <Messages />
            {/* //////////////////////// Chat Messages end ////////////////////////*/}
          </Box>
        </Box>
      </section>
    </>
  );
};

export default HerosectionChat;