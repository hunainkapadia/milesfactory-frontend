import Header from "@/src/component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import styles from "@/src/styles/sass/components/AiBooking/AiBooking.module.scss";
import { useRouter } from "next/router";
import {
  createThread,
  OnlydeleteChatThread,
  setThreadUUIDsend,
} from "@/src/store/slices/sendMessageSlice";

import Cookies from "js-cookie";
import { Box } from "@mui/material";
import AiBookingHero from "@/src/component/AiBookingHero";
import AiBookingHeader from "@/src/component/layout/Header/AiBookingHeader";
import AiBookingFrontHeader from "@/src/component/layout/Header/AiBookingHeader";

const Home = () => {
  const dispatch = useDispatch();
  //  Fetch messages from Redux store

  //  Fetch messages from Redux store
  const sendMessages = useSelector((state) => state.sendMessage?.messages);
  //  Get past messages from API (GET)
  const getmessages = useSelector((state) => state.getMessages.messages);

  //  Combine stored messages (live chat) with fetched messages (history)
  const isMessage = [...getmessages, ...sendMessages];

  const uuid = useSelector((state) => state.sendMessage.ThreadUUIDsend); // <-- Adjust based on your store

  

  return (
    <>
      <Box>
        <Box sx={{display:"none"}}> 
          <Header />
        </Box>
        {/* header function only works but hidden */}
        <AiBookingFrontHeader />
        <Box className={styles.homeBody}>
          <Box component={"section"} id="fold1" className={styles.HomeBanner}>
            <AiBookingHero />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
