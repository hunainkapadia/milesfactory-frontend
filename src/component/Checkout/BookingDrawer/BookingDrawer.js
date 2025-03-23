import React from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import FromAndToDetail from "./FromAndToDetail";
import BookingDrawerFooter from "./BookingDrawerFooter";
import { useDispatch } from "react-redux";
import { setSelectFlightKey } from "@/src/store/slices/BookingflightSlice";

const BookingDrawer = ({ getFlightDetail }) => {
  const dispatch = useDispatch();
  const HandlecloseDrawer = () => {
    dispatch(setSelectFlightKey()); //setSelectFlightKey empty then close drawer
  };
  return (
    <Box className={styles.checkoutDrower + " white-bg"}>
      <Box className={styles.checkoutDrowerSection + " white-bg"}>
        <Box className={styles.checkoutDrowerBody}>
          {/* Header Section */}
          <Grid
            container
            className={styles.checkoutDrowerHeder}
            py={3}
            px={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid xs={4}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography variant="h3" className={styles.title + " mb-0 h5"}>
                  {getFlightDetail?.slices?.length > 1
                    ? "Roundtrip "
                    : "One way "}
                  {"  "}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={8}>
              <Box
                className={styles.flightDay + ""}
              >
                  {console.log("getFlightDetail11", getFlightDetail)}
                  {getFlightDetail?.slices.map((slice, index) => (
                    <Typography textAlign={"right"} key={index}>
                      {new Date(slice.departing_at).toLocaleDateString(
                        "en-GB",
                        {
                          weekday: "long",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </Typography>
                  ))}
              </Box>
            </Grid>
          </Grid>

          <Divider />

          <Box className={styles.detailsSection} px={3}>
            {getFlightDetail?.slices.map((slice, index) => (
              <>
                {index === 0 ? (
                  <Box display={"flex"}>
                    <Typography className={styles.onewayReturn}>
                      Outbound flight
                    </Typography>
                  </Box>
                ) : (
                  <Box display={"flex"}>
                    <Typography className={styles.onewayReturn}>Return flight</Typography>
                  </Box>
                )}

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
      <Box
        onClick={HandlecloseDrawer}
        className={styles.checkoutDrowerBackdrop}
      ></Box>
    </Box>
  );
};

export default BookingDrawer;
