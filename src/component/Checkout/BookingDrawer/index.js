import React from "react";
import { Drawer, Box, Typography, Button, Divider } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Header from "../../layout/Header";
import FromAndToDetail from "./FromAndToDetail";
import BookingDrawerFooter from "./BookingDrawerFooter";

const BookingDrawer = () => {
  return (
    <>
      <Box className={styles.checkoutDrower + " white-bg"}>
        <Box className={styles.checkoutDrowerSection + " white-bg"}>
          <Box className={styles.checkoutDrowerBody}>
            {/* Header */}
            <Box
              className={styles.checkoutDrowerHeder}
              py={2}
              px={3}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="h3" className={styles.title + " mb-0 h3"}>
                Roundtrip AMS - PER
              </Typography>
              <Box
                display={"flex"}
                alignItems={"center"}
                className="normalOption fastestOption"
              >
                <div>
                  <img src="/images/euro-icon.svg" />{" "}
                </div>
                <Typography>
                  <span>Fastest option</span>
                </Typography>
              </Box>
            </Box>
            <Divider />
            {/* Flight Details */}
            <FromAndToDetail />
          </Box>
          <BookingDrawerFooter />
        </Box>
        <Box className={styles.checkoutDrowerBackdrop}></Box>
      </Box>
    </>
  );
};

export default BookingDrawer;
