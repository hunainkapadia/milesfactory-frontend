import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Drawer,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Profilestyles from "@/src/styles/sass/components/profileDrawer/ProfileDrawer.module.scss";

import dayjs from "dayjs";
import {
  getPassPofile,
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
  setSelectPassProfile,
  setUnSelectPassProfile,
} from "@/src/store/slices/passengerDrawerSlice";
import PassengerProfilecard from "./PassengerProfilecard";
import {
  getPassPofileHotel,
  PassengerFormHotel,
} from "@/src/store/slices/passengerDrawerHotelSlice";
import PassengerProfileTab from "./PassengerProfileTab";
import { setChatscroll } from "@/src/store/slices/Base/baseSlice";
import PassengerProfileHeader from "./PassengerProfileHeader";
import AddPassCard from "./AddPassCard";

const PassengerProfileDrawer = ({ getFlightDetail }) => {
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [stopPolling, setStopPolling] = useState(false);
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
  console.log("filledPassengerUUIDs", filledPassengerUUIDs);

  const allPassengerFill = useSelector(
    (state) => state.passengerDrawer.allPassengerFill
  );
  const { selectPassProfile, unSelectPassProfile } = useSelector(
    (state) => state.passengerDrawer
  );

  console.log(
    "selectPassProfile:",
    selectPassProfile?.uuid === unSelectPassProfile?.uuid
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

  // allpasenger fill and active
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

  // for save pasenge roneby one
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

    // Check if this passenger is the FIRST one
    const isFirstPassenger =
      GetViewPassengers?.[0]?.uuid === selectPassenger?.uuid;

    if (isFirstPassenger) {
      dispatch(setCaptainParams(params));
    }
    // Save passenger

    // Also call passengerCaptain if first passenger
    if (CartType === "all" || CartType === "flight") {
      dispatch(getPassPofile());
      dispatch(PassengerFormFlight(params));
    } else if (CartType === "hotel") {
      dispatch(PassengerFormHotel(params));
    }
  };
  const selectCardHandle = (passenger) => {
    console.log("passenger_get", passenger);
    dispatch(setSelectPassProfile(passenger));
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

  // for pasenger fill tab auto move next tab
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
  }, [
    filledPassengerUUIDs,
    GetViewPassengers,
    isAllPassengersFilled,
    dispatch,
  ]);

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
          <PassengerProfileHeader
            styles={styles}
            selectPassenger={selectPassenger}
            handleCloseDrawer={handleCloseDrawer}
            tabValue={tabValue}
            handleTabChange={handleTabChange}
            GetViewPassengers={GetViewPassengers}
            filledPassengerUUIDs={filledPassengerUUIDs}
            showSuccessSnackbar={showSuccessSnackbar}
          />
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
                      FilledPassFormData?.passport_number || // for pasenger filled click filled
                    passenger?.uuid === selectPassProfile?.uuid; // for pasenger click filled
                  console.log("passenger_uuid", passenger?.uuid);
                  dispatch(setUnSelectPassProfile(passenger));

                  return (
                    <PassengerProfilecard
                      key={passenger?.uuid || index}
                      getdata={passenger}
                      onClickModifyCard={() => onClickModifyCard(passenger)}
                      selectCardHandle={() => selectCardHandle(passenger)}
                      passFilled={isPassFilled}
                    />
                  );
                })}

            <AddPassCard />
          </Box>
          {/* footer [start] */}
          <Box className={styles.checkoutDrowerFooter + " test11"}>
            <Divider />
            <Box
              py={1}
              px={{ lg: 3, md: 3, xs: 2 }}
              display="flex"
              flexDirection="column"
            >
              <Box display="flex" justifyContent={"space-between"} gap={3}>
                <Box>
                  <Typography
                    lineHeight={1}
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
                  <Button
                    type="submit"
                    className="btn btn-primary chat-btn btn-round"
                    onClick={
                      isAllPassengersFilled
                        ? handleContinuePassenger
                        : () => handleSavePassenger(selectPassProfile) // use selected card
                    }
                    variant="contained"
                    color={isAllPassengersFilled ? "primary" : "success"}
                    disabled={
                      (!isAllPassengersFilled && !selectPassProfile) || // for all pass filled
                      selectPassProfile?.uuid !== unSelectPassProfile?.uuid // for pasengercard click
                    } // disable if no card selected
                  >
                    <Typography component={"span"}>
                      {isAllPassengersFilled ? "Continue" : "Save"}
                    </Typography>
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
