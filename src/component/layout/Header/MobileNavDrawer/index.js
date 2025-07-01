import { Drawer, Box, Divider, Typography } from "@mui/material";
import Link from "next/link";

import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import { useState } from "react";
import Navbar from "../Navbar";
import HeaderUser from "../HeaderUser";
import {
  setContactDialog,
  setFeedbackDialog,
  setInviteEmailDialog,
  setThreadDrawer,
  thread,
} from "@/src/store/slices/Base/baseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  setisUserPopup,
} from "@/src/store/slices/Auth/SignupSlice";
import HeaderCurrencyLanguage from "../HeaderCurrencyLanguage";
import {
  createThreadAndRedirect,
  deleteAndCreateThread,
} from "@/src/store/slices/sendMessageSlice";
import { useRouter } from "next/router";
import { Logout } from "@/src/store/slices/Auth/LoginSlice";

const MobileNavDrawer = ({ isDrawerOpen, toggleDrawer, isChat, isAiBooking }) => {
  const HandleBookTrip = () => {
    // Your booking logic here
    
  };
  const dispatch = useDispatch();
  const handleThreadDrawer = () => {
    dispatch(thread());
    dispatch(setThreadDrawer(true)); // opens the drawer
  };
  const logoutHandle = () => {
    dispatch(Logout());
    toggleDrawer();
  };
  const currentUser = useSelector((state) => state.base?.currentUser);
  const feedbackHandle = () => {
    dispatch(setFeedbackDialog(true));
  };

  const HandlePopup = () => {
    dispatch(setisUserPopup(true));
  };
  const router = useRouter();

  const HandleBookThread = () => {
    dispatch(createThreadAndRedirect(router));
  };
  const HandleNewThread = () => {
    setTimeout(() => {
      const threaduuid = sessionStorage.getItem("chat_thread_uuid");
      
      if (threaduuid) {
        router.replace(`/chat/${threaduuid}`);
      }
    }, 1000);
    toggleDrawer(); // Close the drawer before creating a new thread
    dispatch(deleteAndCreateThread());
  };
  const contactHandle = () => {
    dispatch(setContactDialog(true));
  };
  const inviteEmailHandle = () => {
    dispatch(setInviteEmailDialog(true));
  };
  return (
    <>
      {/* Trigger button (optional) */}
      {/* <button onClick={toggleDrawer}>Open Drawer</button> */}

      <Drawer
        className={styles.MobileDrawer}
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        {isAiBooking ? (
          <>
            <Box
              className={styles.HeaderDrawer}
              sx={{
                px: { xs: 3 }, // Padding X (left & right)
                py: 3, // Padding Y (top & bottom)
              }}
              width={"280px"}
            >
              {/* Header with Back Button & Logo */}
              <Box
                component="header"
                display="flex"
                alignItems="center"
                gap={2}
              >
                {/* Close Button */}
                <Box fontSize="20px">
                  <i
                    onClick={toggleDrawer}
                    className="fa fa-arrow-left basecolor"
                    style={{ cursor: "pointer" }}
                  ></i>
                </Box>

                {/* Logo */}
                <Box className={styles.Logo}>
                  <Link href="/">
                    <Box className="d-flex align-items-center imggroup">
                      <img src="/images/airline-logo-gray.svg" alt="Logo" />
                    </Box>
                  </Link>
                </Box>
              </Box>

              <Box
                component={"section"}
                pt={7}
                display={"flex"}
                flexDirection={"column"}
                gap={3}
              >
                {/*  */}
                <Box className="text-decuration-none">
                  <Box
                    className={`${styles.Login} darkgray cursor-pointer`}
                    sx={{
                      display: { lg: "flex", md: "flex", xs: "flex" },
                      textDecoration: "none",
                    }}
                    alignItems="center"
                    gap={2}
                  >
                    <Box
                      className="imggroup"
                      alignItems="center"
                      display="flex"
                      sx={{ width: { lg: 32, md: 32, xs: 24 } }}
                    >
                      <img
                        src={"/images/book-flight-icon.svg"}
                        alt="chat history"
                      />
                    </Box>
                    <Typography
                      className="bold f16"
                      sx={{
                        display: {
                          lg: "block",
                          md: "block",
                        },
                      }}
                    >
                      Book a flight
                    </Typography>
                  </Box>
                </Box>
                {/*  */}
                <Box className="text-decuration-none">
                  <Box
                    className={`${styles.Login} darkgray cursor-pointer`}
                    sx={{
                      display: { lg: "flex", md: "flex", xs: "flex" },
                      textDecoration: "none",
                    }}
                    alignItems="center"
                    gap={2}
                  >
                    <Box
                      className="imggroup"
                      alignItems="center"
                      display="flex"
                      sx={{ width: { lg: 32, md: 32, xs: 24 } }}
                    >
                      <img
                        src={"/images/chech-in-icon.svg"}
                        alt="chat history"
                      />
                    </Box>
                    <Typography
                      className="bold f16"
                      sx={{
                        display: {
                          lg: "block",
                          md: "block",
                        },
                      }}
                    >
                      Check-in
                    </Typography>
                  </Box>
                </Box>
                {/*  */}
                <Box className="text-decuration-none">
                  <Box
                    className={`${styles.Login} darkgray cursor-pointer`}
                    sx={{
                      display: { lg: "flex", md: "flex", xs: "flex" },
                      textDecoration: "none",
                    }}
                    alignItems="center"
                    gap={2}
                  >
                    <Box
                      className="imggroup"
                      alignItems="center"
                      display="flex"
                      sx={{ width: { lg: 32, md: 32, xs: 24 } }}
                    >
                      <img
                        src={"/images/mybook-icon.svg"}
                        alt="chat history"
                      />
                    </Box>
                    <Typography
                      className="bold f16"
                      sx={{
                        display: {
                          lg: "block",
                          md: "block",
                        },
                      }}
                    >
                      My bookings
                    </Typography>
                  </Box>
                </Box>
                {/*  */}
                <Box className="text-decuration-none">
                  <Box
                    className={`${styles.Login} darkgray cursor-pointer`}
                    sx={{
                      display: { lg: "flex", md: "flex", xs: "flex" },
                      textDecoration: "none",
                    }}
                    alignItems="center"
                    gap={2}
                  >
                    <Box
                      className="imggroup"
                      alignItems="center"
                      display="flex"
                      sx={{ width: { lg: 32, md: 32, xs: 24 } }}
                    >
                      <img
                        src={"/images/info-icon.svg"}
                        alt="chat history"
                      />
                    </Box>
                    <Typography
                      className="bold f16"
                      sx={{
                        display: {
                          lg: "block",
                          md: "block",
                        },
                      }}
                    >
                      Information
                    </Typography>
                  </Box>
                </Box>
                {/*  */}
              </Box>
              <Box py={3}>
                <Divider />
              </Box>
              <Box display="flex">
                <Box
                  onClick={currentUser ? HandleBookThread : HandlePopup}
                  className="w-100 btn btn-primary btn-round btn-md cursor-pointer"
                >
                  Search
                </Box>
              </Box>
              <Box py={3}>
                <Divider />
              </Box>

              <Box
                component={"section"}
                sx={{
                  display: "flex",
                  gap: 3,
                }}
                flexDirection={"column"}
                mb={3}
              >
                <HeaderCurrencyLanguage formobileDrawer={"formobileDrawer"} />
                <Box
                  display="flex"
                  alignItems="center"
                  onClick={contactHandle}
                  sx={{ cursor: "pointer", gap: 0 }}
                  className={`basecolor1-dark2`}
                >
                  <Typography variant="body2">Contact support</Typography>
                </Box>
              </Box>
              {/*  */}
            </Box>
          </>
        ) : (
          <>
            <Box
              className={styles.HeaderDrawer}
              sx={{
                px: { xs: 3 }, // Padding X (left & right)
                py: 3, // Padding Y (top & bottom)
              }}
              width={"280px"}
            >
              {/* Header with Back Button & Logo */}
              <Box
                component="header"
                display="flex"
                alignItems="center"
                gap={2}
              >
                {/* Close Button */}
                <Box fontSize="20px">
                  <i
                    onClick={toggleDrawer}
                    className="fa fa-arrow-left basecolor"
                    style={{ cursor: "pointer" }}
                  ></i>
                </Box>

                {/* Logo */}
                <Box className={styles.Logo}>
                  <Link href="/">
                    <Box
                      sx={{ width: { xs: 53 } }}
                      className="d-flex align-items-center imggroup"
                    >
                      <img src="/images/logo-color2.svg" alt="Logo" />
                    </Box>
                  </Link>
                </Box>
              </Box>

              {/* Navigation & CTA */}
              <Box>
                <Box pt={7} display={"flex"} flexDirection={"column"} gap={3}>
                  <HeaderUser formobileDrawer={"formobileDrawer"} />

                  {/*  */}

                  {currentUser ? (
                    <>
                      <Link href="/my-trips" className="text-decuration-none">
                        <Box
                          className={`${styles.Login} darkgray cursor-pointer`}
                          sx={{
                            display: { lg: "flex", md: "flex", xs: "flex" },
                            textDecoration: "none",
                          }}
                          alignItems="center"
                          gap={2}
                        >
                          <Box
                            className="imggroup"
                            alignItems="center"
                            display="flex"
                            sx={{ width: { lg: 32, md: 32, xs: 24 } }}
                          >
                            <img
                              src={"/images/book-trip-icon.svg"}
                              alt="chat history"
                            />
                          </Box>
                          <Typography
                            className="bold f16"
                            sx={{
                              display: {
                                lg: "block",
                                md: "block",
                              },
                            }}
                          >
                            My booked trips
                          </Typography>
                        </Box>
                      </Link>

                      <Box
                        className={`${styles.Login} cursor-pointer`}
                        sx={{
                          display: { lg: "flex", md: "flex", xs: "flex" },
                        }}
                        alignItems="center"
                        gap={2}
                        onClick={handleThreadDrawer}
                      >
                        <Box
                          className="imggroup"
                          alignItems="center"
                          display="flex"
                          sx={{ width: { lg: 32, md: 32, xs: 24 } }}
                        >
                          <img
                            src={"/images/chat-history-icon.svg"}
                            alt="chat history"
                          />
                        </Box>
                        <Typography
                          className="bold f16"
                          sx={{
                            display: {
                              lg: "block",
                              md: "block",
                            },
                          }}
                        >
                          Search history
                        </Typography>
                      </Box>
                      {/* new search */}
                    </>
                  ) : (
                    <></>
                  )}

                  {isChat ? (
                    <>
                      <Box
                        className={`${styles.Login} cursor-pointer`}
                        sx={{
                          display: { lg: "flex", md: "flex", xs: "flex" },
                        }}
                        alignItems="center"
                        gap={2}
                        onClick={HandleNewThread}
                      >
                        <Box
                          className="imggroup"
                          alignItems="center"
                          display="flex"
                          sx={{ width: { lg: 32, md: 32, xs: 24 } }}
                        >
                          <img
                            width={20}
                            src="/images/chat-new-icon.svg"
                            alt="Chat Icon"
                          />
                        </Box>
                        <Typography
                          className="bold f16"
                          sx={{
                            display: {
                              lg: "block",
                              md: "block",
                            },
                          }}
                        >
                          New search
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    ""
                  )}

                  {currentUser ? (
                    <>
                      <Box
                        className={`${styles.Login} cursor-pointer`}
                        sx={{
                          display: { lg: "flex", md: "flex", xs: "flex" },
                        }}
                        alignItems="center"
                        gap={2}
                        onClick={logoutHandle}
                      >
                        <Box
                          className="imggroup"
                          alignItems="center"
                          display="flex"
                          sx={{ width: { lg: 32, md: 32, xs: 24 } }}
                          fontSize={20}
                        >
                          <i className="fa fa-sign-out"></i>
                        </Box>
                        <Typography
                          className="bold f16"
                          sx={{
                            display: {
                              lg: "block",
                              md: "block",
                            },
                          }}
                        >
                          Sign out
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    ""
                  )}
                </Box>
                <Box py={3}>
                  <Divider />
                </Box>
                {!isChat ? (
                  <>
                    <Box display="flex">
                      <Box
                        onClick={currentUser ? HandleBookThread : HandlePopup}
                        className="w-100 btn btn-primary btn-round btn-md cursor-pointer"
                      >
                        Book a trip
                      </Box>
                    </Box>
                    <Box py={3}>
                      <Divider />
                    </Box>
                  </>
                ) : (
                  ""
                )}
                <Box
                  component={"section"}
                  sx={{
                    display: "flex",
                    gap: 3,
                  }}
                  flexDirection={"column"}
                  mb={3}
                >
                  <HeaderCurrencyLanguage formobileDrawer={"formobileDrawer"} />
                  <Box
                    display="flex"
                    alignItems="center"
                    onClick={contactHandle}
                    sx={{ cursor: "pointer", gap: 0 }}
                    className={`basecolor1-dark2`}
                  >
                    <Typography variant="body2">Contact support</Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    onClick={inviteEmailHandle}
                    sx={{ cursor: "pointer", gap: 0 }}
                    className={`basecolor1-dark2`}
                  >
                    <Typography variant="body2">
                      Share Mylz with friends
                    </Typography>
                  </Box>
                  {/* <Box
                display="flex"
                alignItems="center"
                
                sx={{ cursor: "pointer", gap: 0 }}
                className={`basecolor1-dark2`}
              >
                <Typography variant="body2">Explore community trips</Typography>
              </Box> */}
                </Box>
                {/*  */}
                {/*  */}
              </Box>
            </Box>
          </>
        )}
      </Drawer>
    </>
  );
};

export default MobileNavDrawer;
