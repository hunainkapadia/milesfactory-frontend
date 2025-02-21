import HeroSection from "../component/HeroSection";
import Footer from "../component/layout/Footer";
import Header from "../component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/features/counter/counterSlice";
import { Button } from "@mui/material";
import { useState } from "react";
import styles from "@/src/styles/sass/components/Home.module.scss"

const Home = () => {
   const count = useSelector((state)=> state.counter.value);
   const dispatch = useDispatch();
   const [isSearchActive, setIsSearchActive] = useState(false);
   const isChatHandle = (isSearching) => {
      setIsSearchActive(isSearching);
    };
   // const count = useSelector((state)=> state.counter.value);
   // const dispaaptch = useDispatch();
  return (
    <>
      <main className={styles.HomeMain + " basecolor1-light-bg"}>
        <Header isSearchActive={isSearchActive} />
        <HeroSection isChatActive={isChatHandle} />
        {isSearchActive ? (
          <Footer isSearchActive={isSearchActive} />
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default Home;
