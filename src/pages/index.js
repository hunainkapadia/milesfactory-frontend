import HeroSection from "../component/HeroSection";
import Header from "../component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import styles from "@/src/styles/sass/components/Home.module.scss"
import Section4Reviews from "../component/home/Section4Reviews";
import Section5App from "../component/home/Section5App";
import HowMylzWork from "../component/home/HowMylzWork";
import MylzDifferent from "../component/home/MylzDifferent";
import SignUpDrawer from "../component/Auth/SignUpDrawer";
import LoginDrawer from "../component/Auth/LoginDrawer";
import PoweredByglobal from "../component/home/PoweredByglobal";

const Home = () => {
  const dispatch = useDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  // check message length
  const sendMessages = useSelector((state) => state.sendMessage?.messages.length || 0);
  const getmessages = useSelector((state) => state.getMessages.messages.length || 0);
  const isMessage = sendMessages > 0 || getmessages > 0; //check message length
  
  const SignupDrawer = useSelector((state)=>state.signup.openDrawer);
  const openLoginDrawer = useSelector((state)=>state?.login?.loginOpenDrawer);
  const isUserLogin = useSelector((state)=>state?.login);
  

  
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
            <PoweredByglobal id={"PoweredByglobal"} />
            <Section4Reviews id={"Section4Reviews"} />
            <Section5App />
            <Header />
          </>
        ) : (
          ""
        )}
        {SignupDrawer ? <SignUpDrawer /> : ""}
        {openLoginDrawer ? <LoginDrawer/>  : ""}
        
      </main>
    </>
  );
};

export default Home;
