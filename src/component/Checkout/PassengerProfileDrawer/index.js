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
import {
  PassengerForm,
  setOpenPassengerDrawer,
  setPassengerAge,
  setPassengerType,
  setPassengerUUID,
  setPassProfileDrawer,
  setSelectedProfilePass,
  ViewPassengers,
} from "@/src/store/slices/passengerDrawerSlice";
import PassengerProfilecard from "./PassengerProfilecard";

const PassengerProfileDrawer = ({ getFlightDetail }) => {
  const isPassengerProfileDrawer = useSelector(
    (state) => state.passengerDrawer.passProfileDrawer
  );

  console.log("isPassengerProfileDrawer", isPassengerProfileDrawer);
  const passengerPofile = useSelector(
    (state) => state?.passengerDrawer?.passProfile
  );
  const selectedType = useSelector(
    (state) => state.passengerDrawer?.PassengerType
  );

  console.log("selectedType", selectedType);

  const dispatch = useDispatch();
  const handleCloseDrawer = () => {
    dispatch(setPassProfileDrawer(false));
  };
  const FilledPassFormData = useSelector(
    (state) => state?.passengerDrawer?.PassFormData
  );
  // get filled pasenger form data from submit from to redux

  const handleCardClick = (passenger) => {
    dispatch(setSelectedProfilePass(passenger));

    const birthDate = dayjs(passenger.born_on);
    const now = dayjs();
    const age = now.diff(birthDate, "year");
    dispatch(setPassengerType(passenger.type));
    dispatch(setPassengerAge(age));
    dispatch(setOpenPassengerDrawer()); // open drawer

    dispatch(PassengerForm(passenger)); // call PassengerForm thunk (calls APIs)
  };
  const getFillPass = useSelector(
    (state) => state.passengerDrawer.allPassengerFill
  );
  const getFillPass2 = useSelector((state) => state.passengerDrawer);

  console.log("getFillPass", getFillPass);

  // add passenger [start]

  const passengerUuid = useSelector(
    (state) => state.passengerDrawer?.PassengerUUID
  );

  console.log("passengerUuid_Addnew", passengerUuid);

  const handleAddPassenger = () => {
    dispatch(setOpenPassengerDrawer()); // open drawer
    dispatch(ViewPassengers());
    dispatch(setPassengerUUID(passengerUuid));
    dispatch(PassengerForm());
  };


    const selectPassenger = useSelector(
      (state) => state?.passengerDrawer?.SelectPassenger
    );
    console.log("selectPassenger", selectPassenger);

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
                <h3 className="regular mb-0">
                  Traveller details -{" "}
                  <span className="capitalize">
                    {selectPassenger?.type === "infant_without_seat" ? (
                      <>Infants</>
                    ) : (
                      <>{selectPassenger?.type}</>
                    )}
                  </span>{" "}
                  {selectPassenger?.age} year
                </h3>
              </Box>
            </Box>
            <Divider />
          </Box>
          {/*  */}
          <Box component={"section"} pb={10}>
            {/* passport */}
            {/* if passport_number  equal and show selected profile */}

            {passengerPofile
              ?.filter((passenger) => {
                if (
                  selectedType === "child" ||
                  selectedType === "infant_without_seat"
                ) {
                  return (
                    passenger?.type === "child" ||
                    passenger?.type === "infant_without_seat"
                  );
                }
                return passenger?.type === selectedType;
              })
              .map((passenger, index) => {
                const isPassFilled =
                  passenger?.passport_number ===
                  FilledPassFormData?.passport_number;

                return (
                  <PassengerProfilecard
                    key={passenger?.uuid || index}
                    getdata={passenger}
                    onClickCard={() => handleCardClick(passenger)}
                    passFilled={isPassFilled}
                  />
                );
              })}

            {/*  */}
            <Box px={3} pb={2} onClick={handleAddPassenger}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                p={3}
                gap={2}
                className={
                  styles.addtravellerBtn + " basecolor1 cursor-pointer"
                }
              >
                <i className="fa fa-plus"></i>
                <Typography>Add new traveller</Typography>
              </Box>
            </Box>
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
                  onClick={handleCloseDrawer}
                  disabled={"isFormLoading"} // Disable when loading
                >
                  <span>Close</span>
                </Box>

                <Button
                  type="submit"
                  className="btn btn-primary chat-btn btn-round"
                  onClick={getFillPass ? handleCloseDrawer : ""} // Remove quotes
                  disabled={!getFillPass} // Disable when false, enable when true
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
