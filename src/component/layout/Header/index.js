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
  useMediaQuery,
  useTheme,
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
  setMobileNaveDrawer,
  setThreadDrawer,
  thread,
} from "@/src/store/slices/Base/baseSlice";
import MessageInputBox from "../../SearchResult/chat/MessageInputBox";
import {
  createThread,
  deleteAndCreateThread,
} from "@/src/store/slices/sendMessageSlice";
import RegisterPopup from "../../Auth/RegisterPopup";
import SignUpPopup from "../../Auth/SignUpPopup";
import UserPopup from "../../Auth/UserPopup";
import LoginPopup from "../../Auth/LoginPopup";
import Feedback from "../Feedback";
import MobileLoading from "../../LoadingArea/MobileLoading";
import MobileNavDrawer from "./MobileNavDrawer";
import HeaderUser from "./HeaderUser";
import HeaderCurrencyLanguage from "./HeaderCurrencyLanguage";
import SearchProgressBar from "../../LoadingArea/SearchProgressBar";
import ContactDialog from "../ContactDialog";
import InviteEmailDialog from "../InviteEmailDialog";
import SearchFilterBar from "../../SearchResult/SearchFilterBar";
import Image from "next/image";
import ShareDropdown from "./ShareDropdown";
import MobileBuilderDialoge from "../../SearchResult/ChatInput/MobileBuilderDialoge";
import HeaderUtils from "@/src/utils/headerUtils";
import HotelDrawer from "../../SearchResult/Hotel/hotelDrawer";
import useIsMobile from "@/src/hooks/Hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = ({
  isMessage,
  IsActive,
  isHome,
  isChat,
  isUser,
  isLandingPages,
  isMytrip,
  isAiBooking
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [InputSticky, setInputSticky] = useState(false);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer
  const isBuilderDialoge = useSelector((state) => state?.base?.IsBuilderDialog);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50); // Sticky header after 50px

      // Separate logic for input sticky (e.g., after 200px)
      setInputSticky(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileNav = () => {
    dispatch(setMobileNaveDrawer(true))
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
    dispatch(deleteAndCreateThread({ isMessage: "forBook" }));

  };

  const HandleNewThread = () => {
    dispatch(deleteAndCreateThread());
  };

  
  const handleThreadDrawer = () => {
    dispatch(thread());
    dispatch(setThreadDrawer(true)); // opens the drawer
  };

  // const HandlePopup = () => {
  //   dispatch(setisUserPopup(true));
  // }; force sign

  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <>
      <Head></Head>
      <HeaderUtils />
      <Box
        component={"header"}
        className={`
          ${styles.Header} //normal header
          ${isMessage ? styles.isMessage : ""} // if message header change
          ${isSticky || IsActive ? styles.Sticky : ""} // if sticky or login
          ${isHome ? styles.isHome : ""} // if sticky or login
          ${isMytrip ? styles.isMytrip : ""} // if sticky or login
          
          `}
      >
        <Box className={styles.HeaderBox} component={"main"}>
          <Container className={styles.Container} sx={{ position: "relative" }}>
            <Grid container width={"100%"} sx={{ margin: 0 }}>
              <Grid
                item
                md={12}
                lg={12}
                xs={12}
                sx={{ position: { md: "relative", xs: "static" } }}
              >
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
                      <FontAwesomeIcon
                        onClick={handleMobileNav}
                        icon={faBars}
                        className={`${styles.humberer} cursor-pointer ${
                          isMytrip || isSticky | IsActive || isMessage
                            ? " basecolor "
                            : " white"
                        }`}
                      />
                    </Box>

                    <Box className={styles.Logo + " cursor-pointer"}>
                      <Box component="a" href="/">
                        <Box className="d-flex align-items-center">
                          {isChat && isMobile ? (
                            <img src="/images/chat-logo-2.svg" />
                          ) : (
                            <>
                              {!isHome ||
                              isMytrip ||
                              isSticky ||
                              isMessage ||
                              IsActive ? (
                                <img src="/images/logo-color2.svg" />
                              ) : (
                                <img src="/images/logo-white2.svg" />
                              )}
                            </>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* {!isMessage && !isMobile && isChat ? <ShareDropdown /> : ""} */}

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
                    sx={{ gap: { lg: 3, md: 2, xs: 20 } }}
                    className={styles.HeaderRightCol}
                  >
                    {/* Mobile Loader */}
                    <Box
                      sx={{ display: { xs: "block", md: "none", lg: "none" } }}
                    >
                      {isChat && <MobileLoading />}
                    </Box>

                    <HeaderCurrencyLanguage
                      forHeader={"forHeader"}
                      isSticky={isSticky}
                      IsActive={IsActive}
                      isMessage={isMessage}
                      isMytrip={isMytrip}
                      isHome={isHome}
                    />
                    {/*  */}
                    {/* show for home desk and mobiel chat for dektop only  */}
                    {isMytrip || isUser || isHome || isChat ? (
                      <HeaderUser
                        forHader={"forHader"}
                        isSticky={isSticky}
                        IsActive={IsActive}
                        isMessage={isMessage}
                        isChat={isChat}
                      />
                    ) : (
                      ""
                    )}

                    {isChat && !isMobile ? (
                      <>
                        <Box
                          className=" cursor-pointer"
                          onClick={HandleNewThread}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height={24}
                            className={styles.ChatIcon + " imggroup"}
                          >
                            <img
                              src="/images/chat-new-icon.svg"
                              alt="Chat Icon"
                            />
                          </Box>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}

                    {currentUser && !isMobile ? (
                      <>
                        <Box
                          className=" cursor-pointer"
                          alignItems={"center"}
                          sx={{ display: "flex" }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height={24}
                            className={styles.ChatIcon + " imggroup"}
                            onClick={() => {
                              window.location.href = "/my-trips";
                            }}
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              height={24}
                              // Optional
                              className={styles.ChatIcon + " imggroup"}
                            >
                              <img
                                width={24}
                                src={`${
                                  isMytrip || isSticky | IsActive || isMessage
                                    ? "/images/book-trip-icon.svg"
                                    : "/images/book-trip-icon-white.svg"
                                }`}
                                alt="book trip"
                              />
                            </Box>
                          </Box>
                        </Box>
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
                                isMytrip || isSticky | IsActive || isMessage
                                  ? "/images/chat-history-icon-black-v3.svg"
                                  : "/images/chat-history-icon-white-v2.svg"
                              }`}
                              alt="Chat History Icon"
                            />
                          </Box>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                    {isHome && (
                      <Box
                        sx={{ display: { xs: "none", md: "flex" } }}
                        display={"flex"}
                        alignItems={"center"}
                      >
                        <Box
                          className="btn btn-primary btn-lg-x  btn-round btn-shadow"
                          alignItems="center"
                          justifyContent="center"
                          gap={1}
                          component="button"
                          onClick={HandleBookThread}
                        >
                          <Box>Book a trip</Box>
                        </Box>
                      </Box>
                    )}

                    {isMytrip && !isMobile && (
                      <>
                        <Box
                          className=" cursor-pointer"
                          onClick={HandleNewThread}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height={24}
                            className={styles.ChatIcon + " imggroup"}
                          >
                            <img
                              src="/images/chat-new-icon.svg"
                              alt="Chat Icon"
                            />
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                  {/*  */}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {/* {isChat && !isBuilderDialoge && <SearchFilterBar />} */}
      </Box>

      {/* extra content for  */}
      {isHome ? (
        <MessageInputBox isSticky={InputSticky} HeaderInput={"HeaderInput"} />
      ) : (
        ""
      )}
      <MobileBuilderDialoge />

      <MobileNavDrawer isAiBooking={isAiBooking} isChat={isChat} />

      <UserPopup isChat={isChat} />
      {/* logoin popup */}

      <LoginPopup isChat={isChat} />
      <RegisterPopup isChat={isChat} />
      <SignUpPopup isChat={isChat} />
      <Feedback />
      <ContactDialog />
      <InviteEmailDialog />
      <ThreadDrawer />
      <HotelDrawer />
    </>
  );
};

export default Header;
