"use client";

import {
  Box,
  Grid,
  Stack,
  Dialog,
  IconButton,
  useTheme,
  useMediaQuery,
  Icon,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import hotelStyles from "@/src/styles/sass/components/search-result/hotelDrawer.module.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotelDrawerFacilityLocation = ({ hotel }) => {
 
  return (
    <>

      {/* --- Facilities Section --- */}
      {hotel?.content?.facilities && 
        Array.isArray(hotel.content.facilities) && 
        hotel.content.facilities.length > 0 && (
        <>
          <Box mb={2}>
            <Divider className={`${styles.Divider} Divider`} />
          </Box>
          <Stack className={styles.fromAndToBodyBottom + " "} gap={1}>
            <Stack
              gap={"5px 18px"}
              flexWrap={"wrap"}
              flexDirection={"row"}
              mb={2}
            >
              {/* Dynamic Hotel Facilities with Number Field */}
              {hotel.content.facilities
                .filter(facility => facility?.facilityGroupCode == 10) // Filter for group code 10 and code 100
                .map((facility, index) => (
                  <Box
                    key={index}
                    display="flex"
                    gap={1}
                    alignItems="center"
                    className={styles.normalOption}
                  >
                    <Box
                      className={styles.BaggageIcon + "  "}
                      display={"flex"}
                      alignItems={"center"}
                    >
                    </Box>
                    <Typography className="f12 basecolor ">
                      {facility?.facility?.description.content} - {facility?.number}
                    </Typography>
                  </Box>
                ))}
            </Stack>
          </Stack>
          <Box mb={2}>
            <Divider className={`${styles.Divider} Divider`} />
          </Box>
        </>
      )}

      {/*  */}
    </>
  );
};

export default HotelDrawerFacilityLocation;
