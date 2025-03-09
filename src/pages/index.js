import HeroSection from "../component/HeroSection";
import Footer from "../component/layout/Footer";
import Header from "../component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useState } from "react";
import styles from "@/src/styles/sass/components/Home.module.scss"
import IdeaDetailSection from "../component/home/IdeaDetailSection";
import Section4Reviews from "../component/home/Section4Reviews";
import Section5App from "../component/home/Section5App";
import HowMylzWork from "../component/home/HowMylzWork";
import MylzDifferent from "../component/home/MylzDifferent";
import CheapestFlights from "../component/home/CheapestFlights";

const Home = () => {
  const dispatch = useDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);
  
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
          
          <HeroSection />
        </section>
        {/* for home section */}
        {!isMessage ? (
          <>
            <HowMylzWork id={"HowMylzWork"} />
            <MylzDifferent id={"MylzDifferent"} />
            <CheapestFlights id={"CheapestFlights"} />
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
