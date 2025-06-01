import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Drawer,
  FormControlLabel,
  Checkbox,
  FormLabel,
  TextField,
  Button,
} from "@mui/material";
import paymentStyles from "@/src/styles/sass/components/checkout/Payment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSelectFlightKey } from "@/src/store/slices/BookingflightSlice";
import Link from "next/link";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

import {
  closeDrawer,
  setAddCardDrawer,
  setCloseCardDrawer,
} from "@/src/store/slices/PaymentSlice";
import PaymentCard from "../PaymentCard";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { setPassProfileDrawer } from "@/src/store/slices/passengerDrawerSlice";
import PassengerProfilecard from "./PassengerProfilecard";

const PassengerProfileDrawer = ({ getFlightDetail }) => {
  const isPassengerProfileDrawer = useSelector(
    (state) => state.passengerDrawer.passProfileDrawer
  );
  console.log("isPassengerProfileDrawer", isPassengerProfileDrawer);
  const passengerPofile = useSelector(
    (state) => state?.passengerDrawer?.passProfile
  );
  console.log("passengerPofile", passengerPofile);

  const dispatch = useDispatch();
  const handleCloseDrawer = () => {
    dispatch(setPassProfileDrawer(false));
  };
  return (
    <Drawer
      anchor="right"
      open={isPassengerProfileDrawer}
      onClose={handleCloseDrawer}
      className={`${styles.checkoutDrower} checkoutDrower00`}
      transitionDuration={300}
    >
      <Box
        className={`${styles.checkoutDrower} bbb white-bg ${styles.PassengerDrower}`}
        width={480}
      >
        <Box className={styles.checkoutDrowerSection + " aa white-bg"}>
          <Box
            px={3}
            component={"header"}
            className={styles.checkoutDrowerHeder}
            py={3}
            display="flex"
            justifyContent="space-between"
            flexDirection={"column"}
            gap={3}
          >
            <Box
              component={"section"}
              gap={1}
              alignItems="center"
              display="flex"
              className={" bold basecolor1 btn-link cursor-pointer"}
              onClick={handleCloseDrawer}
            >
              <i className={`fa fa-arrow-left fas`}></i>{" "}
              <Box component={"span"}>Back to Mylz Chat</Box>
            </Box>
            <Box
              component={"section"}
              display="flex"
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Box>
                <h3 className="regular mb-0">Traveller details</h3>
              </Box>
            </Box>
            <Divider />
          </Box>
          {/*  */}
          <Box component={"section"}>
            {passengerPofile?.length > 0 ? (
              <>
                {passengerPofile.map((passenger, index) => {
                  console.log("passenger__1", passenger);
                  return (
                    <PassengerProfilecard
                      getdata={passenger}
                      onClickCard={() => handleCardClick(passenger)}
                    />
                  );
                })}
                <Box px={3} pb={2}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    p={3}
                    gap={2}
                    
                    className={styles.addtravellerBtn + " basecolor1 cursor-pointer"}
                  >
                    <i className="fa fa-plus"></i>
                    <Typography>Add new traveller</Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <Typography>No passengers found.</Typography>
            )}
          </Box>
          {/* footer [start] */}
          <Box className={styles.checkoutDrowerFooter + " test11"}>
                        <Divider />
                        <Box py={1} px={3} display="flex" flexDirection="column">
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                            gap={3}
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              gap={2}
                              className="basecolor1 f14"
                              style={{ cursor: "pointer" }}
                              onClick={"handleCloseDrawer"}
                              disabled={"isFormLoading"} // Disable when loading
                            >
                              <span>Close</span>
                            </Box>
          
                            <Button
                              type="submit" // Important!
                              className="btn btn-primary chat-btn btn-round"
                              onClick={"SubmitPassenger"}
                              disabled={"isFormLoading"} // Disable when loading
                              variant="contained"
                              color="success"
                            >
                              <span>Continue</span>
                            </Button>
                          </Box>
                        </Box>
                      </Box>
          {/* footer */}
        </Box>
      </Box>
    </Drawer>
  );
};

export default PassengerProfileDrawer;
