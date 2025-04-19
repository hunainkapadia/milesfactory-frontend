import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  IsSignupUser,
  logoutUser,
  openDrawer,
  setIsSignupPopup,
  setIsSignupUser,
  setOpenDrawer,
  setSignupPopup,
  setsignUpUser,
} from "@/src/store/slices/Auth/SignupSlice";
import Cookies from "js-cookie";
import {
  setIsUser,
  setLoginCloseDrawer,
  setLoginOpenDrawer,
  setLoginPopup,
  setLoginUser,
} from "@/src/store/slices/Auth/LoginSlice";
import { useRouter } from "next/router";
import LoginForm from "../../Auth/LoginForm";
import SignUpForm from "../../Auth/SignupForm";

const Header = ({ isMessage, IsActive }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isUserPopup, setisUserPopup] = useState(false);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50); // Add sticky class after scrolling 50px
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
  }, []); // Empty array = only runs once on component mount
  /////
  // logout
  const logoutHandle = () => {
    dispatch(logoutUser());
  };

  const currentUser =
    isuserLoginGoogle || getSignUpUser || isuserLogin || isUserSignup; // Use single reference
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // for login dialog
  const HandleBookTrip = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setisUserPopup(true);
  };
  const HandlePopup = () => {
    setisUserPopup(true);
  };
  const handlePopupClose = () => {
    setisUserPopup(false);
  };
  // for login dialog
  const HandleSigninPopup = () => {
    setisUserPopup(false); // for close user popup
    dispatch(setLoginPopup(true)); // for close login popup
  };
  const handleLoginPopupClose = () => {
    dispatch(setLoginPopup(false));
  };
  const HandleSignupPopup = () => {
    setisUserPopup(false);
    dispatch(setSignupPopup(true));
  };
  const handleSignupPopupClose = () => {
    dispatch(setSignupPopup(false));
  };
  const isLoginPopup = useSelector((state) => state.login.LoginPopup);
  const isSignupPopup = useSelector((state) => state.signup.SignupPopup);

  const router = useRouter();
  const logoHandle = () => {
    if (router.pathname !== "/") {
      // Navigate to Home
      router.push("/").then(() => {
        // Force page refresh after routing to Home
        window.location.reload();
      });
    } else {
      // Already on Home — just refresh
      window.location.reload();
    }
  };
  const ChatClearHandle = () => {
    Cookies.remove("sessionid"); // Clear the cookie
    // Reload the page after 1 second
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };
  return (
    <>
      <Head></Head>
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
                    isSticky | IsActive || isMessage
                      ? " basecolor "
                      : " white"
                  }`}
                  aria-hidden="true"
                ></i>
              </Box>

              <Box className={styles.Logo + " cursor-pointer"}>
                <Box onClick={logoHandle}>
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

            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Navbar />
            </Box>

            <Box
              display={"flex"}
              sx={{ gap: { lg: 3, md:3, xs: 0 } }}
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
                    <Typography className="bold f16"
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
                  <Box className=" cursor-pointer" onClick={ChatClearHandle} display={"flex"} alignItems={"center"}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height={48}
                       // Optional: make it square for better centering
                      className={styles.ChatIcon + " imggroup"}
                    >
                      <img src="/images/chat-new-icon.svg" alt="Chat Icon" />
                    </Box>
                  </Box>

                  <Box className=" cursor-pointer" display={"flex"} alignItems={"center"}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height={48}
                       // Optional
                      className={styles.ChatIcon + " imggroup"}
                    >
                      <img
                        src="/images/chat-history-icon.svg"
                        alt="Chat History Icon"
                      />
                    </Box>
                  </Box>
                  </>
              ) : (
                <Box sx={{ display: { xs: "none", md: "flex" } }} display={"flex"} alignItems={"center"} pl={2}>
                  <Box
                    className="btn btn-primary btn-md btn-round btn-shadow"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    component="button"
                    onClick={HandlePopup}
                  >
                    <Box>Book a trip</Box>
                  </Box>
                </Box>
              )}
            </Box>
            {/*  */}
          </Box>
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
      <Dialog
        open={isUserPopup}
        onClose={handlePopupClose}
        maxWidth="sm" // Set max width to 1280px
        fullWidth // Forces Dialog to expand to maxWidth
      >
        <IconButton
          aria-label="close"
          onClick={handlePopupClose}
          sx={{
            position: "absolute",
            right: 16,
            zIndex: 1,
            top: 8,
            color: "#000", // Change color if needed
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </IconButton>

        <DialogContent
          sx={{
            textAlign: { xs: "center", md: "left", lg: "left" },
          }}
        >
          <Box mb={1}>
            <h4 className="mb-0">Sign in to continue</h4>
          </Box>
          <Box mb={2}>
            <Typography>
              Create an account or sign in before booking a trip
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            sx={{
              paddingBottom: { xs: 4, md: 0, lg: 0 },
            }}
          >
            <Button
              className={"btn btn-secondary btn-md no-rounded"}
              onClick={HandleSigninPopup}
              component="button"
            >
              <Box>Sign in</Box>
            </Button>
            <Button
              className={"btn btn-primary btn-md no-rounded"}
              onClick={HandleSignupPopup}
              component="button"
            >
              <Box>Sign up for free</Box>
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* logoin popup */}
      <Dialog
        open={isLoginPopup}
        onClose={HandleSigninPopup}
        maxWidth="sm" // Set max width to 1280px
        fullWidth // Forces Dialog to expand to maxWidth
      >
        <IconButton
          aria-label="close"
          onClick={handleLoginPopupClose}
          sx={{
            position: "absolute",
            right: 16,
            zIndex: 1,
            top: 8,
            color: "#000", // Change color if needed
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </IconButton>

        <DialogContent
          sx={{
            textAlign: { xs: "center", md: "left", lg: "left" },
          }}
        >
          <LoginForm />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isSignupPopup}
        onClose={HandleSignupPopup}
        maxWidth="sm" // Set max width to 1280px
        fullWidth // Forces Dialog to expand to maxWidth
      >
        <IconButton
          aria-label="close"
          onClick={handleSignupPopupClose}
          sx={{
            position: "absolute",
            right: 16,
            zIndex: 1,
            top: 8,
            color: "#000", // Change color if needed
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </IconButton>

        <DialogContent
          sx={{
            textAlign: { xs: "center", md: "left", lg: "left" },
          }}
        >
          <SignUpForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
