import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import Head from "next/head";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import {
  logoutUser,
  setIsSignupUser,
  setisUserPopup,
  setSignupPopup,
} from "@/src/store/slices/Auth/SignupSlice";
import Cookies from "js-cookie";
import { setIsUser } from "@/src/store/slices/Auth/LoginSlice";
import { useRouter } from "next/router";
import ThreadDrawer from "../../SearchResult/ThreadDrawer";
import {
  setCurrentUser,
  setThreadDrawer,
  thread,
} from "@/src/store/slices/Base/baseSlice";
import MessageInputBox from "../../SearchResult/chat/MessageInputBox";
import {
  createThreadAndRedirect,
  deleteAndCreateThread,
  deleteChatThread,
  setThreadUUIDsend,
} from "@/src/store/slices/sendMessageSlice";
import RegisterPopup from "../../Auth/RegisterPopup";
import SignUpPopup from "../../Auth/SignUpPopup";
import UserPopup from "../../Auth/UserPopup";
import LoginPopup from "../../Auth/LoginPopup";
import Feedback from "../Feedback";
import MobileLoading from "../../LoadingArea/MobileLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import HeaderRightforChat from "./HeaderRightforChat";
import MobileNavDrawer from "./MobileNavDrawer";
import HeaderUser from "./HeaderUser";

const Header = ({ isMessage, IsActive }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [InputSticky, setInputSticky] = useState(false);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50); // Sticky header after 50px

      // Separate logic for input sticky (e.g., after 200px)
      setInputSticky(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // for login dialog
  const HandleBookTrip = () => {
    setIsDrawerOpen(!isDrawerOpen);
    dispatch(setisUserPopup(true));
  };

  

  // for login dialog

  const currentUser = useSelector((state) => state.base?.currentUser);
  
  const router = useRouter();
  // book a trip new thread

  const HandleBookThread = () => {
    dispatch(createThreadAndRedirect(router));
  };

  const HandleNewThread = () => {
    dispatch(deleteAndCreateThread());
  };
  const handleThreadDrawer = () => {
    dispatch(thread());
    dispatch(setThreadDrawer(true)); // opens the drawer
  };
  return (
    <>
      <Head></Head>
      <ThreadDrawer />
      <header
        className={`
          ${styles.Header} //normal header
          ${isMessage ? styles.isMessage : ""} // if message header change
          ${isSticky || IsActive ? styles.Sticky : ""} // if sticky or login
          `}
      >
        <Container>
          <Box
            className={styles.Box}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              color="white"
              className={styles.leftCol}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <Box
                sx={{ display: { xs: "block", md: "none", lg: "none" } }}
                fontSize={"24px"}
              >
                <i
                  onClick={toggleDrawer}
                  className={`fa fa-bars ${
                    isSticky | IsActive || isMessage ? " basecolor " : " white"
                  }`}
                  aria-hidden="true"
                ></i>
              </Box>

              <Box className={styles.Logo + " cursor-pointer"}>
                <Box component="a" href="/">
                  <Box className="d-flex align-items-center">
                    {isSticky || isMessage || IsActive ? (
                      <img src="/images/logo-color2.svg" />
                    ) : (
                      <img src="/images/logo-white2.svg" />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "block" },
                pl: { xs: 8, lg: 0, md: 0 },
              }}
            >
              <Navbar />
            </Box>

            <Box
              display={"flex"}
              sx={{ gap: { lg: 3, md: 3, xs: 0 } }}
              className={styles.HeaderRightCol}
            >
              {/* Mobile Loader */}
              <Box sx={{ display: { xs: "block", md: "none", lg: "none" } }}>
                <MobileLoading />
              </Box>
              {console.log("isSticky_1", isSticky)}
              <HeaderRightforChat isSticky={isSticky | IsActive || isMessage} />
              {/*  */}
              <HeaderUser forhHader={"forhHader"} isMessage={isMessage || isSticky || IsActive} />

              <Box
                className=" cursor-pointer"
                alignItems={"center"}
                sx={{ display: { lg: "flex", md: "flex", xs: "none" } }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height={48}
                  // Optional
                  className={styles.ChatIcon + " imggroup"}
                  onClick={handleThreadDrawer}
                >
                  <img
                    src={`${
                      isSticky | IsActive || isMessage
                        ? "/images/chat-history-icon.svg"
                        : "/images/chat-history-icon-white.svg"
                    }`}
                    alt="Chat History Icon"
                  />
                </Box>
              </Box>
              {isMessage ? (
                <></>
              ) : (
                <Box
                  sx={{ display: { xs: "none", md: "flex" } }}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Box
                    className="btn btn-primary btn-sm  btn-round btn-shadow"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    component="button"
                    onClick={currentUser ? HandleBookThread : "HandlePopup"}
                  >
                    <Box>Book a trip</Box>
                  </Box>
                </Box>
              )}
            </Box>
            {/*  */}
          </Box>
          <MessageInputBox isSticky={InputSticky} HeaderInput={"HeaderInput"} />
        </Container>
      </header>
      {/* extra content for  */}
      <MobileNavDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        MobileNavDrawer={MobileNavDrawer}
      />

      <UserPopup />
      {/* logoin popup */}

      <LoginPopup />
      <RegisterPopup />
      <SignUpPopup />
      <Feedback />
    </>
  );
};

export default Header;
