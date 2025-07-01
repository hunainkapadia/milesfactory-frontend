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
import ThreadDrawer from "@/src/component/SearchResult/ThreadDrawer";
import {
  setCurrentUser,
  setThreadDrawer,
  thread,
} from "@/src/store/slices/Base/baseSlice";
import MessageInputBox from "@/src/component/SearchResult/chat/MessageInputBox";
import {
  createThreadAndRedirect,
  deleteAndCreateThread,
} from "@/src/store/slices/sendMessageSlice";
import RegisterPopup from "@/src/component/Auth/RegisterPopup";
import SignUpPopup from "@/src/component/Auth/SignUpPopup";
import UserPopup from "@/src/component/Auth/UserPopup";
import LoginPopup from "@/src/component/Auth/LoginPopup";
import Feedback from "@/src/component/layout/Feedback";
import MobileLoading from "@/src/component/LoadingArea/MobileLoading";
import MobileNavDrawer from "@/src/component/layout/Header/MobileNavDrawer";
import HeaderUser from "@/src/component/layout/Header/HeaderUser";
import HeaderCurrencyLanguage from "@/src/component/layout/Header/HeaderCurrencyLanguage";
import SearchProgressBar from "@/src/component/LoadingArea/SearchProgressBar";
import ContactDialog from "@/src/component/layout/ContactDialog";
import InviteEmailDialog from "@/src/component/layout/InviteEmailDialog";
import SearchFilterBar from "@/src/component/SearchResult/SearchFilterBar";
import AiBookingNavbar from "@/src/component/layout/Header/AiBookingHeader";
import AiBookingMainHeaderNav from "@/src/component/AiBookingHero/AiBookingMainHeaderNav";

const AiBookingMainHeader = ({
  isMessage,
  IsActive,
  isHome,
  isChat,
  isUser,
}) => {
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

  // delete and create thread and show message chat clear
  const HandleNewThread = () => {
    dispatch(deleteAndCreateThread());
  };
  const handleThreadDrawer = () => {
    dispatch(thread());
    dispatch(setThreadDrawer(true)); // opens the drawer
  };

  const HandlePopup = () => {
    dispatch(setisUserPopup(true));
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only

  return (
    <>
      <Head></Head>
      <ThreadDrawer />
      <Box
        sx={{
          display: {
            xs: "none", // hide on extra-small (mobile)
            sm: "block", // show on small and up
          },
        }}
      >
        <Box
          component={"header"}
          className={`
            ${styles.Header} ${styles.AiBookingMainHeaderRow1}`}
        >
          <Container className={styles.Container} sx={{ position: "relative" }}>
            <Box
              display="flex"
              justifyContent={"end"}
              sx={{ gap: { lg: 3, md: 2, xs: 0 } }}
              className={styles.HeaderRightCol}
            >
              {/* Mobile Loader - visible only on mobile */}
              <Box sx={{ display: { xs: "block", md: "none", lg: "none" } }}>
                <MobileLoading />
              </Box>

              {/* Currency & Language Selector */}
              <HeaderCurrencyLanguage
                forHeader="forHeader"
                // isSticky={isSticky}
                IsActive={IsActive}
                isMessage={isMessage}
              />

              {/* User section: visible on home, user page, or chat (desktop only) */}
              <Box>
                <HeaderUser
                  forHader="forHader"
                  // isSticky={isSticky}
                  IsActive={IsActive}
                  isMessage={isMessage}
                />
              </Box>

              {/* New Chat Icon: show only in desktop chat view */}
              {isChat && !isMobile && (
                <Box
                  className="cursor-pointer"
                  onClick={HandleNewThread}
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height={24}
                    className={`${styles.ChatIcon} imggroup`}
                  >
                    <img src="/images/chat-new-icon.svg" alt="Chat Icon" />
                  </Box>
                </Box>
              )}

              {/* Current User Actions (e.g. My Trips, Chat History) */}
              {currentUser ? (
                <>
                  <Box
                    className=" currentUser111 cursor-pointer"
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
                          src={`/images/book-trip-icon-white.svg`}
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
                        src={`/images/chat-history-icon-white-v2.svg`}
                        alt="Chat History Icon"
                      />
                    </Box>
                  </Box>
                </>
              ) : (
                ""
              )}
            </Box>
          </Container>
        </Box>
      </Box>
      <Box
        component={"header"}
        className={`
          ${styles.Header} ${styles.AiBookingMainHeaderRow2}`}
      >
        <Container className={styles.Container} sx={{ position: "relative" }}>
          {/* end header */}
          <Grid container width={"100%"} sx={{ margin: 0 }}>
            <Grid item md={12} lg={12} xs={12}>
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
                    sx={{ display: { xs: "block", md: "none", lg: "none" }, cursor:"pointer" }}
                    fontSize={"24px"}
                    
                  >
                    <i
                      onClick={toggleDrawer}
                      className={`fa fa-bars`}
                      aria-hidden="true"
                    ></i>
                  </Box>
                  <Box
                    sx={{ display: { xs: "none", md: "block", lg: "block" } }}
                    fontSize={"24px"}
                  >
                    <i
                      
                      className={`fa fa-bars`}
                      aria-hidden="true"
                    ></i>
                  </Box>

                  <Box className={" cursor-pointer"}>
                    <Box >
                      <Box className="d-flex align-items-center" sx={{width:{xs:"138px"}}}>
                        <img src="/images/airline-logo.svg" />
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
                  <AiBookingMainHeaderNav />
                </Box>

                {/*  */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* extra content for  */}
      <MobileNavDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        MobileNavDrawer={MobileNavDrawer}
        isAiBooking={"isAiBooking"}
      />

      <UserPopup />
      {/* logoin popup */}

      <LoginPopup />
      <RegisterPopup />
      <SignUpPopup />
      <Feedback />
      <ContactDialog />
      <InviteEmailDialog />
    </>
  );
};

export default AiBookingMainHeader;
