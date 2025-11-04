import Header from "../component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Section4Reviews from "../component/home/Section4Reviews";
import Section5App from "../component/home/Section5App";
import PoweredByglobal from "../component/home/PoweredByglobal";
import { useRouter } from "next/router";
import HomeHeroSection from "../component/HomeHeroSection";
import Footer from "../component/layout/Footer";
import {
  createThread,
  OnlydeleteChatThread,
  setThreadUUIDsend,
} from "../store/slices/sendMessageSlice";
import HomeSection3 from "../component/home/HomeSection3";
import HomeSection4 from "../component/home/HomeSection4";
import HomeSection2 from "../component/home/HomeSection2";
import Cookies from "js-cookie";
import { Box } from "@mui/material";
import { setContactDialog } from "../store/slices/Base/baseSlice";

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

  
  
  // useEffect(() => {
  //   dispatch(OnlydeleteChatThread());
  // }, [0]);
  
  // 1st creat thread befor befor message from home 
  const router = useRouter()
  useEffect (()=> {
    const isContact = router?.query?.isContact
    if (isContact) {
      dispatch(setContactDialog(true));
    }
    
  },[router])
  

  return (
    <>
      <Box>
        <Header isHome={"isHome"} />
        <Box  className={styles.homeBody}>

          <Box component={"section"} id="fold1" className={styles.HomeBanner} zIndex={1}>
            <HomeHeroSection />
          </Box>
          <HomeSection3 id={"HomeSection3"} />
          <HomeSection4 id={"HomeSection4"} />
          <HomeSection2 id={"HomeSection2"} />

          <PoweredByglobal id={"PoweredByglobal"} />
          {/* <Section4Reviews id={"Section4Reviews"} /> */}
          <Section5App id={"Section5App"} />
          <Footer forLight />
          {/* for home section */}
          {sendMessages ? (
            <>{/* sending send message for chat prop only */}</>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;
