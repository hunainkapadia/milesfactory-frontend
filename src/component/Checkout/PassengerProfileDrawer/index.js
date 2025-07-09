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
  PassengerFormSubmit,
  setCaptainParams,
  setOpenPassengerDrawer,
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
import PassengersCard from "../PassengersCard";
import PassengerProfileTab from "./PassengerProfileTab";

const PassengerProfileDrawer = ({ getFlightDetail }) => {
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [activeTabUUID, setActiveTabUUID] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  // passenger select set for card

  const isPassengerProfileDrawer = useSelector(
    (state) => state.passengerDrawer.passProfileDrawer
  );

  const passengerPofile = useSelector(
    (state) => state?.passengerDrawer?.passProfile
  );

  const selectedType = useSelector(
    (state) => state.passengerDrawer?.PassengerType
  );
  const selectedProfilePass = useSelector(
    (state) => state?.passengerDrawer?.selectedProfilePass
  );

  const dispatch = useDispatch();
  const handleCloseDrawer = () => {
    dispatch(setPassProfileDrawer(false));
  };
  const FilledPassFormData = useSelector(
    (state) => state?.passengerDrawer?.PassFormData
  );
  console.log("FilledPassFormData", FilledPassFormData?.passport_number);

  // get filled pasenger form data from submit from to redux

  const handleModifyCard = (passenger) => {
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

  // add passenger [start]

  const passengerUuid = useSelector(
    (state) => state.passengerDrawer?.PassengerUUID
  );

  const handleAddPassenger = () => {
    dispatch(setOpenPassengerDrawer()); // open drawer
    dispatch(ViewPassengers());
    dispatch(setPassengerUUID(passengerUuid));
    dispatch(PassengerForm());
  };

  const selectPassenger = useSelector(
    (state) => state?.passengerDrawer?.SelectPassenger
  );

  console.log("passengerPofile", selectPassenger);
  const handleSavePassenger = () => {
    // Step 1: Check if any passenger is selected
    if (!selectedProfilePass?.uuid) {
      alert("Please select a passenger before saving.");
      return;
    }

    const passenger = selectedProfilePass;

    // Step 2: Calculate age of selected profile passenger
    const birthDate = dayjs(passenger?.born_on);
    const now = dayjs();
    const profilePassengerAge = now.diff(birthDate, "year");

    // Step 3: Validate passenger type and age match
    const isValidPassenger =
      selectPassenger?.type === "adult"
        ? passenger?.type === "adult"
        : profilePassengerAge === selectPassenger?.age &&
          passenger?.type === selectPassenger?.type;

    if (!isValidPassenger) {
      alert("Selected profile does not match passenger type or age.");
      return;
    }

    // Step 4: Create API-compatible params object
    const params = {
      gender: passenger.gender,
      given_name: passenger.given_name,
      family_name: passenger.family_name,
      born_on: passenger.born_on,
      passport_number: passenger.passport_number,
      passport_expire_date: passenger.passport_expire_date,
      phone_number: passenger.phone_number || "",
      email: passenger.email || "",
      nationality: passenger?.nationality?.id || "",
      region: passenger?.phone_number ? "US" : "", // default region if phone present
    };

    console.log("params_passengerprofile", params);

    // Step 5: Submit passenger form
    dispatch(PassengerFormSubmit(params));

    // Step 6: If it's the first passenger (captain), save separately
    if (tabValue === 0) {
      dispatch(setCaptainParams(params));
      dispatch(passengerCaptain(params));
    }

    //  Step 7: Show success message
    setShowSuccessSnackbar(true);

    //  Step 8: Unselect the profile after saving
    dispatch(setSelectedProfilePass(null));

    //  Step 9: Hide success message after 3 seconds
    setTimeout(() => setShowSuccessSnackbar(false), 3000);
  };

  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );

  
  // check pasenger remining count for footer
  const FillPassCountByUUID = useSelector(
    (state) => state.passengerDrawer.filledPassengerUUIDs
  );
  const totalPassengers = GetViewPassengers?.length || 0;
  const filledCount = FillPassCountByUUID?.length || 0;
  // for change state button and incomplete text
  const isAllPassengersFilled = filledCount === totalPassengers;

  const handleProfileCard = (passenger) => {
    dispatch(setSelectedProfilePass(passenger)); // dispatch profile pass
  };
  console.log("selectedProfilePass", selectedProfilePass);
  const filledPassengerUUIDs = useSelector(
    (state) => state.passengerDrawer.filledPassengerUUIDs
  );

  const handlePassengerTab = (isFilled, passenger) => {
    if (passengerPofile?.length) {
      dispatch(getPassPofile()); // call passenger profile
      dispatch(setPassProfileDrawer(true));
      dispatch(setPassengerUUID(passenger?.uuid)); // set selected passenger UUID
      dispatch(setPassengerType(passenger?.type));
      dispatch(setPassengerAge(passenger?.age));
      dispatch(setPassengerPassport(passenger?.passportNumber));
      dispatch(setSelectPassenger(passenger));
      setActiveTabUUID(passenger?.uuid); //  Set active tab
    }
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
              <Box className={Profilestyles.customTabs}>
                {GetViewPassengers?.map((passenger, index) => {
                  const isFilled = filledPassengerUUIDs.includes(
                    passenger.uuid
                  );

                  return (
                    <Box key={passenger.uuid}>
                      <PassengerProfileTab
                        totalPass={index + 1}
                        getdata={passenger}
                        passDetail={isFilled ? passenger : ""}
                        isMainPassenger={index === 0}
                        isFilled={isFilled}
                        onClickCard={() =>
                          handlePassengerTab(
                            isFilled,
                            passenger // while pasenger data
                          )
                        }
                        isActive={activeTabUUID === passenger.uuid} //  Pass active status
                      />
                    </Box>
                  );
                })}
              </Box>
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
            // pb={10}
          >
            {/* passport */}
            {/* if passport_number  equal and show selected profile */}

            {/* ?.filter((passenger) => {
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
              }) */}

            <Box pt={3}>
              {passengerPofile?.[tabValue] && (
                <>
                  <Box px={3} pb={2}>
                    <Typography className="semibold">
                      Select traveller {tabValue + 1} (
                      {passengerPofile[tabValue]?.type})
                    </Typography>
                  </Box>
                  {passengerPofile?.map((passenger, index) => {
                    const isPassFilled =
                      passenger?.passport_number ===
                      FilledPassFormData?.passport_number;

                    console.log(
                      "passport_number_2",
                      FilledPassFormData?.passport_number
                    );
                    {
                      /* if age is not uqual disable */
                    }

                    // Calculate age from born_on date
                    const birthDate = dayjs(passenger?.born_on);
                    const today = dayjs();
                    const profilePassengerAge = today.diff(birthDate, "year");

                    // Log for debugging

                    let ispassDisabled = false;

                    if (selectPassenger?.type === "adult") {
                      // Disable if passenger is not adult
                      ispassDisabled = passenger?.type !== "adult";
                    } else {
                      // For child or infant, disable if age or type doesn't match
                      ispassDisabled =
                        profilePassengerAge !== selectPassenger?.age ||
                        passenger?.type !== selectPassenger?.type;
                    }
                    const isSelected =
                      selectedProfilePass?.uuid === passenger?.uuid;
                    {
                      /* check if selected pas uuid equal */
                    }

                    return (
                      <PassengerProfilecard
                        key={passenger?.uuid || index}
                        getdata={passenger}
                        onClickModifyCard={() => handleModifyCard(passenger)}
                        // pas profile card on click
                        onClickProfileCard={() => handleProfileCard(passenger)}
                        isSelected={isSelected} //  Pass selection status
                        passFilled={isPassFilled}
                        passDisabled={ispassDisabled}
                      />
                    );
                  })}
                </>
              )}
            </Box>

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
                    onClick={
                      isAllPassengersFilled
                        ? () => {
                            // Continue action here (maybe close drawer or next step)
                            dispatch(setPassProfileDrawer(false));
                          }
                        : handleSavePassenger
                    }
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
