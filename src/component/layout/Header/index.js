import {
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
  openDrawer,
  setsignUpUser,
} from "@/src/store/slices/Auth/SignupSlice";
import Cookies from "js-cookie";
import { setLoginUser } from "@/src/store/slices/Auth/LoginSlice";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50); // Add sticky class after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sendMessages = useSelector(
    (state) => state.sendMessage?.messages.length
  );
  const getmessages = useSelector((state) => state.getMessages.messages.length);
  const isMessage = sendMessages > 0 || getmessages > 0; //check message length

  // for login signup
  const HandleSignup = () => {
    dispatch(openDrawer());
  };

  // signup
  const isUserSignup = useSelector((state) => state?.signup?.user?.user);

  // login
  const isUserLogin = useSelector(
    (state) => state?.login?.loginUser?.user || null
  );
  // logout
  const logoutHandle = () => {
    dispatch(logoutUser());
  };
  const currentUser = isUserLogin || isUserSignup; // Use single reference
  console.log("isUserLogin", currentUser);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Head></Head>
      <header>
        <Box
          className={`${styles.Header} ${
            isMessage ? " basecolor1-light-bg bacecolor " : ""
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
              <Box
                color="white"
                className={styles.leftCol}
                display={"flex"}
                alignItems={"center"}
                gap={2}
              >
                <Box fontSize={"24px"}>
                  <i
                    onClick={toggleDrawer}
                    class="fa fa-bars"
                    aria-hidden="true"
                  ></i>
                </Box>

                <Box className={styles.Logo}>
                  <Link href={"/"}>
                    <Box className="d-flex align-items-center">
                      {isSticky || isMessage ? (
                        <img src="/images/logo-color2.svg" />
                      ) : (
                        <img src="/images/mylz-logo-white.svg" />
                      )}
                    </Box>
                  </Link>
                </Box>
              </Box>
              <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
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
                    <Typography
                      variant="h5"
                      pb={3}
                      pt={5}
                      textAlign={"center"}
                      fontWeight={"medium"}
                    >
                      Fabrice El Gohary
                    </Typography>
                    <Box display={"flex"}>
                      <Link
                        href={""}
                        className="w-100 btn btn-primary no-rounder btn-md"
                      >
                        Book a trip
                      </Link>
                    </Box>
                  </Box>
                </Box>

                {/*  */}
              </Drawer>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Navbar />
              </Box>

              <Box display={"flex"} gap={4}>
                {currentUser ? (
                  <Box className={styles.Dropdown} position={"relative"}>
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
                        px={2}
                        py={2}
                        gap={2}
                        className={
                          styles.DropdownItemsBox +
                          " white-bg br-12 box-shadow-md"
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
                              <i class="fa fa-cog" aria-hidden="true"></i>
                            </Box>
                            <Typography>Setting</Typography>
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
                            <Typography>logout</Typography>
                          </Box>
                        </Link>
                        {/*  */}
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    className={styles.Login}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    component={Link}
                    href="#"
                    onClick={HandleSignup}
                  >
                    <i className="fa fa-user-circle"></i>
                    <Box>Sign in / sign up</Box>
                    {/*  */}
                  </Box>
                )}

                <Box
                  sx={{ display: { xs: "none", md: "block" } }}
                  className={"btn btn-primary btn-md"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                  component={Link}
                  href="#"
                >
                  <Box>Book a trip</Box>
                  {/*  */}
                </Box>
              </Box>
              {/*  */}
            </Box>
          </Container>
        </Box>
      </header>
    </>
  );
};

export default Header;
