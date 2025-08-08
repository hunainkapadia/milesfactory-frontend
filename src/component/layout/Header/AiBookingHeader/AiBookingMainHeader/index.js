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
  
  const HandlePopup = () => {
    dispatch(setisUserPopup(true));
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only

  return (
    <>
      <Head></Head>
      {/* <ThreadDrawer /> */}
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
              <Box
                className={`${styles.Login} cursor-pointer`}
                sx={{
                  display: { lg: "flex", md: "flex", xs: "flex" },
                  justifyContent: {
                    lg: "center",
                    md: "center",
                    xs: "flex-start", // or conditionally change if needed
                  },
                  gap: { lg: 2, md: 2, xs: 1.5 }, // spacing unit (1 = 8px by default)
                }}
                alignItems="center"
              >
                <Typography
                  className="bold f16"
                  sx={{
                    display: {
                      lg: "block",
                      md: "block",
                      xs: isMessage ? "none" : "block",
                    },
                  }}
                >
                  Sign in
                </Typography>

                <Box
                  className="imggroup"
                  alignItems="center"
                  display="flex"
                  sx={{ width: { lg: 24, md: 24, xs: 24 } }}
                >
                  <img src={"/images/user-icon-white.svg"} alt="User Icon" />
                </Box>
              </Box>
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
                    sx={{
                      display: { xs: "block", md: "none", lg: "none" },
                      cursor: "pointer",
                    }}
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
                    <i className={`fa fa-bars`} aria-hidden="true"></i>
                  </Box>

                  <Box className={" cursor-pointer"}>
                    <Box>
                      <Box
                        className="d-flex align-items-center"
                        sx={{ width: { xs: "138px" } }}
                      >
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
