import { Drawer, Box, Divider, Typography } from "@mui/material";
import Link from "next/link";

import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import { useState } from "react";
import Navbar from "../Navbar";
import HeaderUser from "../HeaderUser";
import { setThreadDrawer, thread } from "@/src/store/slices/Base/baseSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/src/store/slices/Auth/SignupSlice";
import HeaderCurrencyLanguage from "../HeaderCurrencyLanguage";

const MobileNavDrawer = ({ isDrawerOpen, toggleDrawer }) => {
  const HandleBookTrip = () => {
    // Your booking logic here
    console.log("Book a trip clicked");
  };
  const dispatch = useDispatch();
  const handleThreadDrawer = () => {
    dispatch(thread());
    dispatch(setThreadDrawer(true)); // opens the drawer
  };
  const logoutHandle = () => {
    dispatch(logoutUser());
  };
  const currentUser = useSelector((state) => state.base?.currentUser);

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
        <Box
          className={styles.HeaderDrawer}
          sx={{
            px: { xs: 3 }, // Padding X (left & right)
            py: 3, // Padding Y (top & bottom)
          }}
          width={"280px"}
        >
          {/* Header with Back Button & Logo */}
          <Box component="header" display="flex" alignItems="center" gap={2}>
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
              {/*  */}
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

            <Box display="flex">
              <Box
                onClick={HandleBookTrip}
                className="w-100 btn btn-primary btn-round btn-md cursor-pointer"
              >
                Book a trip
              </Box>
            </Box>
            <Box py={3}>
              <Divider />
            </Box>
            <Box component={"section"}
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
                // onClick={handleCurrencyClick}
                sx={{ cursor: "pointer", gap: 0 }}
                className={`basecolor1-dark2`}
              >
                <Typography variant="body2">Contact support</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                // onClick={handleCurrencyClick}
                sx={{ cursor: "pointer", gap: 0 }}
                className={`basecolor1-dark2`}
              >
                <Typography variant="body2">
                  Share an idea or give us feedback
                </Typography>
              </Box>
            </Box>
              {/*  */}
            {/*  */}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileNavDrawer;
