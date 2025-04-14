import Header from "../component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Section4Reviews from "../component/home/Section4Reviews";
import Section5App from "../component/home/Section5App";
import HowMylzWork from "../component/home/HowMylzWork";
import MylzDifferent from "../component/home/MylzDifferent";
import PoweredByglobal from "../component/home/PoweredByglobal";
import { useRouter } from "next/router";
import HomeHeroSection from "../component/HomeHeroSection";
import { fetchMessages } from "../store/slices/GestMessageSlice";

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

  const router = useRouter();
  useEffect(() => {
    if (sendMessages.length > 0 && uuid) {
      router.push(`/chat/${uuid}`);
    }
  }, [sendMessages.length, uuid]);


  
  
  

  useEffect(() => {
    if (uuid) {
      router.push(`/chat/${uuid}`);
    }
  }, [uuid]);

  return (
    <>
      <main>
        <section
          id="fold1"
          className={styles.HomeBanner}
        >
          <HomeHeroSection />
        </section>
        {/* for home section */}
        {sendMessages ? (
          <>
            <HowMylzWork id={"HowMylzWork"} />
            <MylzDifferent id={"MylzDifferent"} />
            <PoweredByglobal id={"PoweredByglobal"} />
            <Section4Reviews id={"Section4Reviews"} />
            <Section5App id={"Section5App"}/>
            <Header isMessage={sendMessages.length} />
            {/* sending send message for chat prop only */}
          </>
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default Home;
