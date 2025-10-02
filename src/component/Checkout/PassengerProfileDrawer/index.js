import React, { useEffect, useState } from "react";
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
  Tabs,
  Tab,
} from "@mui/material";
import paymentStyles from "@/src/styles/sass/components/checkout/Payment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSelectFlightKey } from "@/src/store/slices/BookingflightSlice";
import Link from "next/link";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Profilestyles from "@/src/styles/sass/components/profileDrawer/ProfileDrawer.module.scss";

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
  getPassPofile,
  passengerCaptain,
  PassengerForm,
  PassengerFormFlight,
  setCaptainParams,
  setFilledPass,
  setisPassengerDrawer,
  setPassengerAge,
  setPassengerPassport,
  setPassengerType,
  setPassengerUUID,
  setPassProfileDrawer,
  setSelectedProfilePass,
  setSelectPassenger,
  ViewPassengers,
} from "@/src/store/slices/passengerDrawerSlice";
import PassengerProfilecard from "./PassengerProfilecard";
import {
  getPassPofileHotel,
  PassengerFormHotel,
  PassengerSetupHotel,
  ViewPassengersHotel,
} from "@/src/store/slices/passengerDrawerHotelSlice";
import PassengerProfileTab from "./PassengerProfileTab";
import { setChatscroll } from "@/src/store/slices/Base/baseSlice";

const PassengerProfileDrawer = ({ getFlightDetail }) => {
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [stopPolling, setStopPolling] = useState(false);
  const [passTypeIndex, setPassTypeIndex] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const dispatch = useDispatch();

  // Redux states
  const isPassengerProfileDrawer = useSelector(
    (state) => state.passengerDrawer.passProfileDrawer
  );
  const passengerPofile = useSelector(
    (state) => state?.passengerDrawer?.passProfile
  );
  const PassengerType = useSelector(
    (state) => state?.passengerDrawer?.SelectPassenger?.type
  );
  const CartType = useSelector((state) => state.booking.cartType);
  const FilledPassFormData = useSelector(
    (state) => state?.passengerDrawer?.PassFormData
  );
  const selectPassenger = useSelector(
    (state) => state?.passengerDrawer?.SelectPassenger
  );
  const selectedProfilePass = useSelector(
    (state) => state?.passengerDrawer?.SelectedProfilePass
  );
  console.log("selectPassenger11", selectPassenger);

  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );
  const filledPassengerUUIDs = useSelector(
    (state) => state.passengerDrawer.filledPassengerUUIDs
  );
  const allPassengerFill = useSelector(
    (state) => state.passengerDrawer.allPassengerFill
  );

  //  Close drawer
  const handleCloseDrawer = () => {
    dispatch(setPassProfileDrawer(false));
  };

  //  Modify passenger
  const onClickModifyCard = (passenger) => {
    console.log("modify_passenger", passenger);

    dispatch(setSelectedProfilePass(passenger));

    const birthDate = dayjs(passenger.born_on);
    const now = dayjs();
    const age = now.diff(birthDate, "year");

    dispatch(setPassengerType(passenger.type));
    dispatch(setPassengerAge(age));
    dispatch(setisPassengerDrawer(true));
  };

  console.log("PassengerType", PassengerType);

  //  Add passenger
  const handleAddPassenger = () => {
    dispatch(setSelectedProfilePass(null));
    dispatch(setisPassengerDrawer(true));

    if (CartType === "flight" || CartType === "all") {
      dispatch(ViewPassengers());
    } else if (CartType === "hotel") {
      dispatch(ViewPassengersHotel());
    }
  };

  //  Polling for profile updates
  useEffect(() => {
    if (!FilledPassFormData || stopPolling) return;

    const interval = setInterval(() => {
      if (CartType === "all" || CartType === "flight") {
        dispatch(getPassPofile());
      } else if (CartType === "hotel") {
        dispatch(getPassPofileHotel());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, FilledPassFormData, stopPolling]);

  useEffect(() => {
    if (!FilledPassFormData || !passengerPofile) return;

    const isMatch = passengerPofile.some(
      (p) => p.family_name === FilledPassFormData.family_name
    );

    if (isMatch) {
      setStopPolling(true);
    }
  }, [passengerPofile, FilledPassFormData]);

  //  Save passenger
  const handleContinuePassenger = () => {
    // for active continue button if true all condition
    if (
      isPassengerProfileDrawer &&
      passengerPofile?.length > 0 &&
      allPassengerFill
    ) {
      dispatch(setFilledPass(true));
    }

    if (isAllPassengersFilled) {
      dispatch(setPassProfileDrawer(false));
    }
    dispatch(setChatscroll(true));

    const passenger = selectedProfilePass;

    const birthDate = dayjs(passenger?.born_on);
    const now = dayjs();
    const profilePassengerAge = now.diff(birthDate, "year");

    const isValidPassenger =
      selectPassenger?.type === "adult"
        ? passenger?.type === "adult"
        : profilePassengerAge === selectPassenger?.age &&
          passenger?.type === selectPassenger?.type;

    setShowSuccessSnackbar(true);
    dispatch(setSelectedProfilePass(null));
    setTimeout(() => setShowSuccessSnackbar(false), 3000);
  };

const handleSavePassenger = () => {
  const passenger = passengerPofile?.[tabValue]; // active tab passenger
  if (!passenger) return;

  const formatDate = (date) => {
    if (!date) return "";
    return dayjs(date).isValid() ? dayjs(date).format("YYYY-MM-DD") : "";
  };

  const params = {
    gender: passenger.gender || "",
    given_name: passenger.given_name || "",
    family_name: passenger.family_name || "",
    born_on: formatDate(passenger.born_on),
    phone_number: passenger.phone_number || "",
    email: passenger.email || "",
    nationality: passenger.nationality?.id ?? "",
    region: passenger.nationality?.code || "",
    passport_number: passenger.passport_number || "",
    passport_expire_date: formatDate(passenger.passport_expire_date),
    passenger_id: passenger.passenger_id || "",
    type: passenger.type || "",
  };

  console.log("passenger_save_params", params);

  // 🔹 Check if this passenger is the FIRST one
  const isFirstPassenger = GetViewPassengers?.[0]?.uuid === selectPassenger?.uuid;

  if (isFirstPassenger) {
    dispatch(setCaptainParams(params));
  }

  // 🔹 Save passenger
  dispatch(PassengerFormFlight(params));

  // 🔹 Also call passengerCaptain if first passenger
  if (isFirstPassenger) {
    dispatch(passengerCaptain(params));
  }
};




  //  Passenger Tab click
  const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
  
      const passenger = GetViewPassengers[newValue];
      if (passenger) {
        dispatch(setPassengerUUID(passenger.uuid));
        dispatch(setPassengerType(passenger.type));
        dispatch(setPassengerAge(passenger.age));
        dispatch(setPassengerPassport(passenger.passportNumber));
        dispatch(setSelectPassenger(passenger));
      }
    };
  

  const totalPassengers = GetViewPassengers?.length || 0;
  const filledCount = filledPassengerUUIDs?.length || 0;
  const isAllPassengersFilled = filledCount === totalPassengers;
  

  useEffect(() => {
      if (!isAllPassengersFilled && filledPassengerUUIDs?.length) {
        const nextPassengerIndex = GetViewPassengers.findIndex(
          (p) => !filledPassengerUUIDs.includes(p.uuid)
        );
  
        if (nextPassengerIndex !== -1 && nextPassengerIndex !== tabValue) {
          setTabValue(nextPassengerIndex);
  
          const nextPassenger = GetViewPassengers[nextPassengerIndex];
          dispatch(setSelectPassenger(nextPassenger));
          dispatch(setPassengerUUID(nextPassenger.uuid));
          dispatch(setPassengerType(nextPassenger.type));
          dispatch(setPassengerAge(nextPassenger.age));
          dispatch(setPassengerPassport(nextPassenger.passportNumber));
        }
      }
    }, [filledPassengerUUIDs, GetViewPassengers, isAllPassengersFilled, dispatch]);
  

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
        width={483}
      >
        <Box
          className={`${styles.checkoutDrowerSection} ${styles.ProfileDrowerSection} aa white-bg`}
        >
          <Box
            px={3}
            component={"header"}
            className={styles.checkoutDrowerHeder}
            py={3}
            mb={0}
            display="flex"
            justifyContent="space-between"
            flexDirection={"column"}
            gap={3}
          >
            <Box
              component={"section"}
              gap={"5px"}
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
                      <>
                        Infant {selectPassenger?.age > 1 ? "s" : ""}{" "}
                        {selectPassenger?.age}{" "}
                        {selectPassenger?.age > 1 ? "years" : "year"}
                      </>
                    ) : selectPassenger?.type === "child" ? (
                      <>
                        Child {selectPassenger?.age}{" "}
                        {selectPassenger?.age > 1 ? "years" : "year"}
                      </>
                    ) : (
                      <>{selectPassenger?.type} 18+ years</>
                    )}
                  </span>{" "}
                </h3>
              </Box>
            </Box>
            <Divider />

            <Box className={Profilestyles.scrollTabsWrapper}>
              <Tabs
                TabIndicatorProps={{ style: { display: "none" } }}
                scrollButtons={false} 
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                className={Profilestyles.customTabs}
              >
                {GetViewPassengers?.map((passenger, index) => {
                  const isActive = tabValue === index;
                  const isFilled = filledPassengerUUIDs?.includes(
                    passenger.uuid
                  );

                  return (
                    <Tab
                      key={passenger.uuid || index}
                      disableRipple
                      disableFocusRipple
                      className={`${Profilestyles.inactiveTab} ${
                        isActive ? Profilestyles.activeTab : ""
                      }`}
                      
                      
                      label={
                        <PassengerProfileTab
                          passName={`${passenger.type} ${index + 1}`}
                          getdata={passenger}
                          totalPass={index + 1}
                          isActive={isActive}
                          isFilled={isFilled}
                          onClickCard={() => handleTabChange(null, index)} // triggers tab switch
                          passDetail={passenger}
                        />
                      }
                    />
                  );
                })}
              </Tabs>
            </Box>

            {showSuccessSnackbar && (
              <Box
                position="fixed"
                bottom={20}
                left="50%"
                sx={{ transform: "translateX(-50%)" }}
                zIndex={9999}
                color="white"
                px={3}
                py={1}
                borderRadius={100}
                className=" f14 basecolor1-bg"
              >
                Passenger saved successfully
              </Box>
            )}
          </Box>
          {/*  */}
          <Box
            className={styles.checkoutDrowerBody}
            component={"section"}
            pb={10}
            sx={{ px: { lg: 3, md: 3, xs: 2 } }}
          >
            {console.log("FilledPassFormData00", passengerPofile)}
            {passengerPofile &&
              passengerPofile
                .filter((_, index) => index === tabValue)
                .map((passenger, index) => {
                  const isPassFilled =
                    passenger?.passport_number ===
                    FilledPassFormData?.passport_number;

                  return (
                    <PassengerProfilecard
                      key={passenger?.uuid || index}
                      getdata={passenger}
                      onClickModifyCard={() => onClickModifyCard(passenger)}
                      passFilled={isPassFilled}
                    />
                  );
                })}

            {/*  */}
            <Box pb={2} onClick={handleAddPassenger}>
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
              <Box display="flex" justifyContent={"space-between"} gap={3}>
                <Box>
                  <Typography
                    className={`bold mb-0 ${
                      isAllPassengersFilled ? "basecolor1" : "yellow"
                    }`}
                  >
                    {isAllPassengersFilled ? "Complete" : "Incomplete"}
                  </Typography>

                  <Typography variant="p" className=" gray f12">
                    {isAllPassengersFilled
                      ? `${totalPassengers} of ${totalPassengers} travellers saved`
                      : `${
                          totalPassengers - filledCount
                        } of ${totalPassengers} travellers missing`}
                  </Typography>
                </Box>
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
                    className="f14"
                    style={{ cursor: "pointer" }}
                    onClick={handleCloseDrawer}
                    disabled={"isFormLoading"} // Disable when loading
                  >
                    <span>Close</span>
                  </Box>

                  <Button
                    type="submit"
                    className="btn btn-primary chat-btn btn-round"
                    onClick={isAllPassengersFilled ? handleContinuePassenger : ()=>handleSavePassenger(selectPassenger)}
                    variant="contained"
                    color={isAllPassengersFilled ? "primary" : "success"}
                  >
                    <span>{isAllPassengersFilled ? "Continue" : "Save"}</span>
                  </Button>
                </Box>
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
