import Header from "../component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Section4Reviews from "../component/home/Section4Reviews";
import Section5App from "../component/home/Section5App";
import HowMylzWork from "../component/home/HowMylzWork";
import MylzDifferent from "../component/home/MylzDifferent";
import SignUpDrawer from "../component/Auth/SignUpDrawer";
import LoginDrawer from "../component/Auth/LoginDrawer";
import PoweredByglobal from "../component/home/PoweredByglobal";
import { useRouter } from "next/router";
import HomeHeroSection from "../component/HomeHeroSection";
import { fetchMessages } from "../store/slices/GestMessageSlice";

const Home = () => {
  //  Fetch messages from Redux store
  
  const dispatch = useDispatch();

  //  Fetch messages from Redux store
  const sendMessages = useSelector((state) => state.sendMessage?.messages);
  
  //  Get past messages from API (GET)
  const getmessages = useSelector((state) => state.getMessages.messages);

  //  Combine stored messages (live chat) with fetched messages (history)
  const isMessage = [...getmessages, ...sendMessages];
  console.log("isMessage", isMessage);

  useEffect(() => {
    dispatch(fetchMessages()); //  Fetch messages when the page loads
  }, [dispatch]);

  const router = useRouter();
  useEffect(() => {
    // Redirect only when there is at least 1 message
    if (isMessage.length) {
      router.push("/chat");
    }
  }, [isMessage.length, router]);

  return (
    <>
      <main>
        <section
          id="fold1"
          className={`${
            !isMessage.length ? styles.HomeBanner : styles.HomeBannerActive
          }`}
        >
          <HomeHeroSection />
        </section>
        {/* for home section */}
        {!isMessage.length ? (
          <>
            <HowMylzWork id={"HowMylzWork"} />
            <MylzDifferent id={"MylzDifferent"} />
            <PoweredByglobal id={"PoweredByglobal"} />
            <Section4Reviews id={"Section4Reviews"} />
            <Section5App />
            <Header />
          </>
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default Home;
