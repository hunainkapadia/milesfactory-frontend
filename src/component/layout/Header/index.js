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
  setThreadDrawer,
  thread,
} from "@/src/store/slices/Base/baseSlice";
import MessageInputBox from "../../SearchResult/chat/MessageInputBox";
import {
  createThread,
  createThreadAndRedirect,
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

const Header = ({
  isMessage,
  IsActive,
  isHome,
  isChat,
  isUser,
  isBuilder,
  isLandingPages,
}) => {
  console.log("isBuilder_isBuilder", isBuilder);

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
    dispatch(deleteAndCreateThread({ isMessage: "forBook" }));

  };

  // delete and create thread and show message chat clear
  // const {uuid} = router.query
  // console.log("router_test", uuid);
  
  const uuid = useSelector((state) => state?.sendMessage?.threadUuid);
  useEffect(() => {
    if (uuid) {
      router.push(`/chat/${uuid}`); //if uuid exist move to chat page
      
    }
  }, [uuid]);
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only

  return (
    <>
      <Head></Head>
      <ThreadDrawer />
      <Box
        component={"header"}
        className={`
          ${styles.Header} //normal header
          ${isMessage ? styles.isMessage : ""} // if message header change
          ${isSticky || IsActive ? styles.Sticky : ""} // if sticky or login
          ${isHome ? styles.isHome : ""} // if sticky or login
          
          
          `}
      >
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
                    <i
                      onClick={toggleDrawer}
                      className={`fa fa-bars ${
                        isSticky | IsActive || isMessage
                          ? " basecolor "
                          : " white"
                      }`}
                      aria-hidden="true"
                    ></i>
                  </Box>

                  <Box className={styles.Logo + " cursor-pointer"}>
                    <Box component="a" href="/">
                      <Box className="d-flex align-items-center">
                        {isChat && isMobile ? (
                          <img src="/images/chat-logo-2.svg" />
                        ) : (
                          <>
                            {isSticky || isMessage || IsActive ? (
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
                {isMessage && isMobile && isChat ? <ShareDropdown /> : ""}

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
                  sx={{ gap: { lg: 3, md: 2, xs: 0 } }}
                  className={styles.HeaderRightCol}
                >
                  {/* Mobile Loader */}
                  <Box
                    sx={{ display: { xs: "block", md: "none", lg: "none" } }}
                  >
                    <MobileLoading />
                  </Box>

                  <HeaderCurrencyLanguage
                    forHeader={"forHeader"}
                    isSticky={isSticky}
                    IsActive={IsActive}
                    isMessage={isMessage}
                  />
                  {/*  */}
                  {/* show for home desk and mobiel chat for dektop only  */}
                  {isUser || isHome || (isChat && !isMobile) ? (
                    <HeaderUser
                      forHader={"forHader"}
                      isSticky={isSticky}
                      IsActive={IsActive}
                      isMessage={isMessage}
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

                  {currentUser ? (
                    <>
                      <Box
                        className=" cursor-pointer"
                        alignItems={"center"}
                        sx={{ display: { lg: "flex", md: "flex", xs: "none" } }}
                      >
                        <Link href={"/my-trips"}>
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
                                isSticky | IsActive || isMessage
                                  ? "/images/book-trip-icon.svg"
                                  : "/images/book-trip-icon-white.svg"
                              }`}
                              alt="book trip"
                            />
                          </Box>
                        </Link>
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
                              isSticky | IsActive || isMessage
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
                        onClick={HandleBookThread}
                      >
                        <Box>Book a trip</Box>
                      </Box>
                    </Box>
                  )}
                </Box>
                {/*  */}
              </Box>
              {isChat && !isBuilder && <SearchFilterBar />}

              {isHome ? (
                <MessageInputBox
                  isSticky={InputSticky}
                  HeaderInput={"HeaderInput"}
                />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* extra content for  */}
      <MobileNavDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        MobileNavDrawer={MobileNavDrawer}
        isChat={isChat}
      />

      <UserPopup isChat={isChat} />
      {/* logoin popup */}

      <LoginPopup isChat={isChat} />
      <RegisterPopup isChat={isChat} />
      <SignUpPopup isChat={isChat} />
      <Feedback />
      <ContactDialog />
      <InviteEmailDialog />
    </>
  );
};

export default Header;
