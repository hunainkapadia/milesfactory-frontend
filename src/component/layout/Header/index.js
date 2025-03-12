import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import Head from "next/head";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { logoutUser, openDrawer, setsignUpUser } from "@/src/store/slices/Auth/SignupSlice";
import Cookies from "js-cookie";
import { setLoginUser } from "@/src/store/slices/Auth/LoginSlice";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch()
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

  // for login signup
  const HandleSignup = ()=> {
    dispatch(openDrawer());
  } 
  
  
  // Load user from Cookies when the component mounts
  const isFormSupmit = useSelector((state) => state.signup?.user?.user);
  console.log("isFormSupmit22", isFormSupmit);
    

  // // Handle logout
  const isUserLogin = useSelector((state)=>state?.login?.loginUser?.user);

  console.log("isUserLogin", isUserLogin);  
  const logoutHandle = () => {
    dispatch(logoutUser());
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

              <Box display={"flex"} gap={4}>
                {isUserLogin || isFormSupmit ? (
                  <Box className={styles.Dropdown} position={"relative"}>
                    <Box
                      className={styles.Login}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={1}
                    >
                      <i className="fa fa-user-circle"></i>
                      <div>{isFormSupmit?.first_name}</div>
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
                    <div>Sign in / sign up</div>
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
                  <div>Book a trip</div>
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
