import React from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import FromAndToDetail from "./FromAndToDetail";
import BookingDrawerFooter from "./BookingDrawerFooter";
import { useDispatch } from "react-redux";
import { setSelectFlightKey } from "@/src/store/slices/BookingflightSlice";
import { currencySymbols } from "@/src/utils/utils";
import Link from "next/link";

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
            <Grid xs={12}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <h4 className={styles.title + " mb-0 regular"}>
                    {getFlightDetail?.slices[0]?.origin.city_name} to{" "}
                    {getFlightDetail?.slices[0]?.destination.city_name}
                  </h4>
                  <Typography className="semibold">
                    {getFlightDetail?.slices
                      .slice(0, 2)
                      .map((slice) =>
                        new Date(slice.departing_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                          }
                        )
                      )
                      .join(" - ")}
                  </Typography>
                </Box>
                <Link href={""} onClick={HandlecloseDrawer} className=" basecolor">
                  <i className="fa fa-close fas"></i>
                </Link>
              </Box>
            </Grid>
          </Grid>

          <Box className={styles.detailsSection} px={3}>
            {getFlightDetail?.slices.map((slice, index) => (
              <>
                <FromAndToDetail
                  key={index} // Always add a unique key when mapping
                  getdata={slice}
                  logo={getFlightDetail?.owner?.logo_symbol_url}
                  flightType={index === 0 ? "Outbound" : "Return"}
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
