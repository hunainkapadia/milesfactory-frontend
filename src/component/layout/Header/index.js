import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
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
import {
  setIsUser,
} from "@/src/store/slices/Auth/LoginSlice";
import { useRouter } from "next/router";
import ThreadDrawer from "../../SearchResult/ThreadDrawer";
import { setCurrentUser, setThreadDrawer, thread } from "@/src/store/slices/Base/baseSlice";
import MessageInputBox from "../../SearchResult/chat/MessageInputBox";
import { createThreadAndRedirect, deleteAndCreateThread, deleteChatThread, setThreadUUIDsend } from "@/src/store/slices/sendMessageSlice";
import RegisterPopup from "../../Auth/RegisterPopup";
import SignUpPopup from "../../Auth/SignUpPopup";
import UserPopup from "../../Auth/UserPopup";
import LoginPopup from "../../Auth/LoginPopup";

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

  // signup
  const isuserLogin = useSelector((state) => state?.login?.loginUser?.user); // get user from cookie with redux
  const isuserLoginGoogle = useSelector(
    (state) => state?.login?.loginUser?.user?.user
  ); // get user from cookie with redux
  const isUserSignup = useSelector((state) => state?.signup?.user?.user);
  const getSignUpUser = useSelector((state) => state?.signup?.SignupUser?.user);

  // login set user in redux from cookies
  useEffect(() => {
    const cookieUserString = Cookies.get("set-user");

    if (cookieUserString) {
      const cookieUser = JSON.parse(cookieUserString);
      console.log("isuserLogin", cookieUser);
      dispatch(
        setIsSignupUser({
          user: {
            first_name: cookieUser.first_name,
            last_name: cookieUser.last_name,
            access_token: cookieUser.access_token,
            refresh_token: cookieUser.refresh_token,
            email: cookieUser.email,
          },
          status: 200,
        })
      );

      dispatch(
        setIsUser({
          user: {
            first_name: cookieUser.first_name,
            last_name: cookieUser.last_name,
            access_token: cookieUser.access_token,
            refresh_token: cookieUser.refresh_token,
            email: cookieUser.email,
          },
          status: 200,
        })
      );
    }
  }, [0]); // Empty array = only runs once on component mount
  /////
  // logout
  const logoutHandle = () => {
    dispatch(logoutUser());
  };

  const currentUser =
    isuserLoginGoogle || getSignUpUser || isuserLogin || isUserSignup; // Use single reference

    dispatch(setCurrentUser(currentUser))
    const userget = useSelector((state)=> state.base.currentUser);
        
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // for login dialog
  const HandleBookTrip = () => {
    setIsDrawerOpen(!isDrawerOpen);
    dispatch(setisUserPopup(true));
  };

  const HandlePopup = () => {
    dispatch(setisUserPopup(true))
  };
  
  // for login dialog
  
  
  const isSignupPopup = useSelector((state) => state.signup.SignupPopup);

  const router = useRouter();
  const handleThreadDrawer = () => {
    dispatch(thread());
    dispatch(setThreadDrawer(true)); // opens the drawer
  };
  // book a trip new thread
  
  const HandleBookThread = () => {
    dispatch(createThreadAndRedirect(router));
  };
  const HandleNewThread = () => {
    dispatch(deleteAndCreateThread()); // No then, no async
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
              {currentUser ? (
                <Box className={styles.Dropdown} position={"relative"}>
                  <Box
                    className={styles.Login}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                  >
                    {console.log("currentUser", currentUser)}
                    <Typography
                      // sx={{ display: { xs: "none", sm: "block" } }}
                      className={styles.userName + " f14 bold"}
                    >
                      {!isMessage ? (
                        <>
                          {currentUser?.first_name.charAt(0).toUpperCase()}.
                          <span className="capitalize">
                            {" "}
                            {currentUser?.last_name || ""}
                          </span>
                        </>
                      ) : (
                        <>
                          {currentUser?.first_name || ""}{" "}
                          {currentUser?.last_name || ""}
                        </>
                      )}
                    </Typography>

                    <Box className={styles.userLater}>
                      <Avatar
                        src={"image"}
                        alt={"review.name"}
                        sx={{
                          width: 32,
                          height: 32,
                          margin: "0 auto",
                          mb: 2,
                          bgcolor: "#80E1E5",
                        }}
                        className="white mb-0 f16 bold"
                      >
                        {currentUser?.first_name.charAt(0).toUpperCase()}
                      </Avatar>
                    </Box>
                    {/*  */}
                  </Box>
                  <Box className={styles.DropdownItems}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      gap={2}
                      className={
                        styles.DropdownItemsBox + "  br-12 box-shadow-md"
                      }
                    >
                      <Box
                        className={
                          styles.DropdownItem +
                          " text-decuration-none cursor-pointer"
                        }
                      >
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <Box width={"20px"}>
                            <i class="far fa-user-circle"></i>
                          </Box>
                          <Typography>Profile</Typography>
                        </Box>
                      </Box>
                      <Box
                        className={
                          styles.DropdownItem +
                          " text-decuration-none cursor-pointer"
                        }
                      >
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <Box width={"20px"}>
                            <i className="fa fa-cog" aria-hidden="true"></i>
                          </Box>
                          <Typography>Settings</Typography>
                        </Box>
                      </Box>
                      <Box
                        className={
                          styles.DropdownItem +
                          " text-decuration-none cursor-pointer"
                        }
                        onClick={logoutHandle}
                      >
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <Box width={"20px"}>
                            <i className=" fa fa-sign-out"></i>
                          </Box>
                          <Typography>Sign out</Typography>
                        </Box>
                      </Box>
                      {/*  */}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box
                  className={styles.Login + " cursor-pointer "}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  onClick={HandlePopup}
                >
                  {!isMessage ? (
                    <Typography
                      className="bold f16"
                      // sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                    >
                      Sign in
                    </Typography>
                  ) : (
                    <Typography
                      className="bold f16"
                      sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                    >
                      Sign in
                    </Typography>
                  )}
                  <Box
                    className="imggroup"
                    alignItems={"center"}
                    display={"flex"}
                  >
                    {isSticky || isMessage ? (
                      <img width={32} src="/images/user-icon-gray.svg" />
                    ) : (
                      <img width={32} src="/images/user-icon-white.svg" />
                    )}
                  </Box>
                  {/*  */}
                </Box>
              )}
              {isMessage ? (
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
                      height={48}
                      className={styles.ChatIcon + " imggroup"}
                    >
                      <img src="/images/chat-new-icon.svg" alt="Chat Icon" />
                    </Box>
                  </Box>

                  <Box
                    className=" cursor-pointer"
                    display={"flex"}
                    alignItems={"center"}
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
                        src="/images/chat-history-icon.svg"
                        alt="Chat History Icon"
                      />
                    </Box>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{ display: { xs: "none", md: "flex" } }}
                  display={"flex"}
                  alignItems={"center"}
                  pl={2}
                >
                  <Box
                    className="btn btn-primary btn-md btn-round btn-shadow"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    component="button"
                    onClick={currentUser ? HandleBookThread : HandlePopup}
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
      <Drawer
        className={styles.MobileDrawer}
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <Box
          className={styles.HeaderDrawer}
          sx={{
            px: { xs: 3 }, // Padding X (left & right) of 3 units only on extra-small (xs) screens
            py: 3,
          }}
          width={"280px"}
        >
          <Box display={"flex"} alignItems={"center"} gap={3}>
            {/* Close Button */}
            <Box fontSize={"24px"}>
              <i
                onClick={toggleDrawer}
                className="fa fa-arrow-left basecolor1"
              ></i>
            </Box>
            <Box className={styles.Logo}>
              <Link href={"/"}>
                <Box className="d-flex align-items-center">
                  <img src="/images/logo-color2.svg" />
                </Box>
              </Link>
            </Box>
          </Box>
          <Box>
            <Box pt={3}>
              <Navbar />
            </Box>
            <Box py={4}>
              <Divider />
            </Box>

            <Box display={"flex"}>
              <Box
                onClick={HandleBookTrip}
                className="w-100 btn btn-primary btn-round btn-md cursor-pointer"
              >
                Book a trip
              </Box>
            </Box>
          </Box>
        </Box>

        {/*  */}
      </Drawer>

      <UserPopup />
      {/* logoin popup */}
      
      <LoginPopup />
      <RegisterPopup  />
      <SignUpPopup />
    </>
  );
};

export default Header;
