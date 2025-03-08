import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import FromAndToDetail from "./FromAndToDetail";
import BookingDrawerFooter from "./BookingDrawerFooter";

const BookingDrawer = ({ getFlightDetail }) => {
  console.log("getFlightDetail111", getFlightDetail?.flight_type);

  return (
    <Box className={styles.checkoutDrower + " white-bg"}>
      <Box className={styles.checkoutDrowerSection + " white-bg"}>
        <Box className={styles.checkoutDrowerBody}>
          {/* Header Section */}
          <Box
            className={styles.checkoutDrowerHeder}
            py={2}
            px={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <span>
                {getFlightDetail?.slices?.length > 1 ? "Roundtrip " : "One way "}
                {"  "}
              </span>
              {getFlightDetail?.slices?.map((getSliceres, key) => {
                return (
                  <>
                    <Typography
                      variant="h3"
                      className={styles.title + " mb-0 h5"}
                    >
                      {`${getSliceres?.origin?.iata_code} -
                     ${getSliceres?.destination?.iata_code}`}
                    </Typography>
                  </>
                );
              })}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              className="normalOption fastestOption"
            >
              <img src="/images/euro-icon.svg" alt="Euro Icon" />
              <Typography>
                <span>{getFlightDetail?.flight_type}</span>
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box className={styles.detailsSection} px={3}>
            {getFlightDetail?.slices.map((slice, index) => (
              <>
                <FromAndToDetail
                  key={index} // Always add a unique key when mapping
                  getdata={slice}
                  logo={getFlightDetail?.owner?.logo_symbol_url}
                />
              </>
            ))}
          </Box>
        </Box>

        {/* Footer Section */}
        <BookingDrawerFooter getFlightDetails={getFlightDetail} />
      </Box>
      <Box className={styles.checkoutDrowerBackdrop}></Box>
    </Box>
  );
};

export default BookingDrawer;
