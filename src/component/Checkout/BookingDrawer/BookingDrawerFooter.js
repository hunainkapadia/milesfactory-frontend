import React from "react";
import { Drawer, Box, Typography, Button, Divider } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const BookingDrawerFooter = () => {
  return (
    <>
      <Box className={styles.checkoutDrowerFooter} position={"absolute"}>
        <Divider />

        {/* Header */}
        <Box
          className={styles.checkoutDrowerHeder}
          py={1}
          px={3}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box>
            <Typography variant="p" className={" gray f12 p"}>
              *The airline policy will apply if you decide to cancel or modify
              your trip.
            </Typography>
          </Box>
          <Box
            className={styles.priceRow}
            display={"flex"}
            justifyContent={"space-between"}
          >
            {/* colum */}
            <Box display={"flex"} flexDirection={"column"}>
              <Box
                className={styles.priceSection}
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                <Typography
                  variant="subtitle2"
                  className={styles.priceLabel + " mb-0"}
                >
                  Price:
                </Typography>
                <Typography
                  variant="h3"
                  className={styles.price + " h3 mb-0 basecolor1"}
                >
                  <span> € 240</span>
                </Typography>
              </Box>
              <Box className={styles.totalPersonPrice}>
                <Typography variant="p" className={" darkgray f14"}>
                  {/* {bookingData.return.departure} - {bookingData.return.arrival} */}
                  Total per person: €120
                </Typography>
              </Box>
            </Box>
            {/* colum */}
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              gap={3}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                className={" basecolor1 f14"}
              >
                <i className="fa-close fa fas"></i> <span>Close</span>
              </Box>
              {/* column */}
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                className={" basecolor1"}
              >
                <button className={"btn btn-green btn-sm "}>
                  <Box display={"flex"} gap={1}>
                    <i className="fa fa-arrow-right"></i>{" "}
                    <span> Select flight</span>
                  </Box>
                </button>
              </Box>
            </Box>
            {/* end colums */}
          </Box>
        </Box>

        {/*  */}
      </Box>
    </>
  );
};

export default BookingDrawerFooter;
