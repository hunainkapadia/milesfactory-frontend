import {
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

  // const isMessage = sendMessages > 0 || getmessages > 0; //check message length

  // signup
  const isuserLogin = useSelector((state) => state?.login?.loginUser?.user); // get user from cookie with redux
  const isUserSignup = useSelector((state) => state?.signup?.user?.user);
  

  // login set user in redux from cookies
  useEffect(() => {
    const cookieUserString = Cookies.get("set-user");

    if (cookieUserString) {
      const cookieUser = JSON.parse(cookieUserString);
      dispatch(
        setIsSignupUser({
          user: {
            first_name: cookieUser.first_name,
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

  const currentUser = isuserLogin || isUserSignup; // Use single reference
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
  const handleLoginPopupClose = ()=> {
    dispatch(setLoginPopup(false));
  }
  const HandleSignupPopup = () => {
    setisUserPopup(false);
    dispatch(setSignupPopup(true));
  };
  const handleSignupPopupClose = ()=> {
    dispatch(setSignupPopup(false));
  }
  const isLoginPopup = useSelector((state) => state.login.LoginPopup);
  const isSignupPopup = useSelector((state) => state.signup.SignupPopup);
  console.log("isSignupPopup", isSignupPopup);
  

  
  
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
    Cookies.remove('sessionid'); // Clear the cookie
    // Reload the page after 1 second
    if (typeof window !== 'undefined') {
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
        <Container className="">
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
                      ? " basecolor-dark "
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

            <Box display={"flex"} sx={{ gap: { md: 4, lg: 4, xs: 0 } }}>
              {currentUser ? (
                <Box className={styles.Dropdown} position={"relative"}>
                {console.log("currentUser", currentUser?.first_name)}
                  <Box
                    className={styles.Login}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <i className="fa fa-user-circle"></i>
                    <Box>{currentUser?.first_name || ""}</Box>
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
                      <Link
                        className={
                          styles.DropdownItem + " text-decuration-none"
                        }
                        href={""}
                      >
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <Box width={"20px"}>
                            <i className="fa fa-cog" aria-hidden="true"></i>
                          </Box>
                          <Typography>Profile</Typography>
                        </Box>
                      </Link>
                      <Link
                        className={
                          styles.DropdownItem + " text-decuration-none"
                        }
                        href={""}
                      >
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <Box width={"20px"}>
                            <i className="fa fa-cog" aria-hidden="true"></i>
                          </Box>
                          <Typography>Settings</Typography>
                        </Box>
                      </Link>
                      <Link
                        className={
                          styles.DropdownItem + " text-decuration-none"
                        }
                        href={""}
                        onClick={logoutHandle}
                      >
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <Box width={"20px"}>
                            <i className=" fa fa-sign-out"></i>
                          </Box>
                          <Typography>Sign out</Typography>
                        </Box>
                      </Link>
                      {/*  */}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box
                  className={styles.Login + " "}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  component={Link}
                  href=""
                  onClick={HandlePopup}
                >
                  <Typography>Sign in</Typography>
                  <Box
                    className="imggroup"
                    alignItems={"center"}
                    display={"flex"}
                  >
                    {isSticky || isMessage ? (
                      <img src="/images/user-icon-gray.svg" />
                    ) : (
                      <img src="/images/user-icon-white.svg" />
                    )}
                  </Box>
                  {/*  */}
                </Box>
              )}
              {isMessage ? (
                <Box display="flex" alignItems="center" gap={3}>
                  <Box className=" cursor-pointer" onClick={ChatClearHandle}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height={48}
                      width={48} // Optional: make it square for better centering
                      className="imggroup"
                    >
                      <img src="/images/chat-new-icon.svg" alt="Chat Icon" />
                    </Box>
                  </Box>

                  <Box className=" cursor-pointer">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height={48}
                      width={48} // Optional
                      className="imggroup"
                    >
                      <img
                        src="/images/chat-history-icon.svg"
                        alt="Chat History Icon"
                      />
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box display={"flex"} alignItems={"center"}>
                  <Box
                    sx={{ display: { xs: "none", md: "flex" } }}
                    className="btn btn-primary btn-md btn-round"
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
            <Navbar />
            <Divider />

            <Box pb={3} pt={5} display={"flex"}>
              <Link
                href={""}
                onClick={HandleBookTrip}
                className="w-100 btn btn-primary no-rounded btn-md"
              >
                Book a trip
              </Link>
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
              href="#"
              onClick={HandleSigninPopup}
              component="button"
            >
              <Box>Sign in</Box>
            </Button>
            <Button
              className={"btn btn-primary btn-md no-rounded"}
              href="#"
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
