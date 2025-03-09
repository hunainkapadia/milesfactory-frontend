import HeroSection from "../component/HeroSection";
import Footer from "../component/layout/Footer";
import Header from "../component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useState } from "react";
import styles from "@/src/styles/sass/components/Home.module.scss"
import IdeaDetailSection from "../component/home/IdeaDetailSection";
import Section2Stats from "../component/home/Section2Stats";
import Section3Stats from "../component/home/Section3Stats";
import Section4Reviews from "../component/home/Section4Reviews";
import Section5App from "../component/home/Section5App";

const Home = () => {
  const dispatch = useDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const isChatHandle = (isSearching) => {
    setIsSearchActive(isSearching);
  };
  const isMessage = useSelector((state)=> state?.sendMessage?.messages.length);
  
  
  return (
    <>
      <main>
        <section
          id="fold1"
          className={`${
            !isMessage ? styles.HomeBanner : styles.HomeBannerActive
          }`}
        >
          <Header isSearchActive={isSearchActive} />
          <HeroSection isChatActive={isChatHandle} />
        </section>
        {!isMessage ? (
          <>
            <Section2Stats id={"Section2Stats"} />
            <Section3Stats id={"Section3Stats"} />
            <Section4Reviews id={"Section4Reviews"} />
            <Section5App />
          </>
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default Home;
