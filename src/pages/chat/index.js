import HeroSection from "@/src/component/HeroSection";
import Header from "@/src/component/layout/Header";
import styles from "@/src/styles/sass/components/Home.module.scss";
import { useSelector } from "react-redux";

const Home = () => {
   const sendMessages = useSelector((state) => state.sendMessage?.messages.length);
   const getmessages = useSelector((state) => state.getMessages.messages.length); 
   const isMessage = sendMessages > 0 || getmessages > 0; //check message length

   return (
      <main>
      <section
          id="fold1"
          className={`${
            !isMessage ? styles.HomeBanner : styles.HomeBannerActive
          }`}
        >
        <HeroSection />
         <Header />
      </section>
    </main>
   );
}

export default Home;