import { Drawer, Box, Divider } from "@mui/material";
import Link from "next/link";

import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import { useState } from "react";
import Navbar from "../Navbar";

const MobileNavDrawer = ({ isDrawerOpen, toggleDrawer }) => {
  const HandleBookTrip = () => {
    // Your booking logic here
    console.log("Book a trip clicked");
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
            <Box pt={3}>
              <Navbar />
            </Box>

            <Box py={4}>
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
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileNavDrawer;
