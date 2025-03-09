import { Box, Button, Container, Grid } from "@mui/material";
import Link from "next/link";
import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import Head from "next/head";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50); // Add sticky class after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sendMessages = useSelector((state) => state.sendMessage?.messages.length);
  const getmessages = useSelector((state) => state.getMessages.messages.length);
  const isMessage = sendMessages > 0 || getmessages > 0; //check message length

  return (
    <>
      <Head></Head>
      <header
        className={`${styles.Header} ${
          isMessage ? " basecolor1-light-bg bacecolor pt-50 " : ""
        } ${isMessage ? styles.isMessage : ""} ${
          isSticky ? styles.Sticky : ""
        }`}
      >
        <Container className="">
          <Box
            className={styles.Box}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <div className={styles.Logo}>
              <Link href={"/"}>
                <div className="d-flex align-items-center">
                  {isSticky || isMessage ? (
                    <img src="/images/logo-color2.svg" />
                  ) : (
                    <img src="/images/mylz-logo-white.svg" />
                  )}
                </div>
              </Link>
            </div>
            <Navbar />

            <Box
              className={styles.Login}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
              component={Link}
              href="#"
            >
              <i className="fa fa-user-circle"></i>
              <div>Login</div>
              {/*  */}
            </Box>
            {/*  */}
          </Box>
        </Container>
      </header>
    </>
  );
};

export default Header;
