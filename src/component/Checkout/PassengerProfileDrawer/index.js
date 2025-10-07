import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Drawer, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import dayjs from "dayjs";
import {
  getPassPofile,
  PassengerFormFlight,
  setAddFilledPassenger,
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
} from "@/src/store/slices/passengerDrawerSlice";
import {
  getPassPofileHotel,
  PassengerFormHotel,
} from "@/src/store/slices/passengerDrawerHotelSlice";
import PassengerProfilecard from "./PassengerProfilecard";
import PassengerProfileHeader from "./PassengerProfileHeader";
import AddPassCard from "./AddPassCard";
import { setChatscroll } from "@/src/store/slices/Base/baseSlice";

const PassengerProfileDrawer = () => {
  const dispatch = useDispatch();
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [stopPolling, setStopPolling] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [tabType, setTabType] = useState("adult"); // default type

  console.log("tabType", tabType);

  // Redux states
  const isPassengerProfileDrawer = useSelector(
    (state) => state.passengerDrawer.passProfileDrawer
  );
  const passengerPofile = useSelector(
    (state) => state.passengerDrawer.passProfile
  );
  console.log("passengerPofile", passengerPofile);

  const CartType = useSelector((state) => state.booking.cartType);
  const FilledPassFormData = useSelector(
    (state) => state.passengerDrawer.PassFormData
  );
  console.log("FilledPassFormData", FilledPassFormData);

  const selectPassenger = useSelector(
    (state) => state.passengerDrawer.SelectPassenger
  );
  const selectedProfilePass = useSelector(
    (state) => state.passengerDrawer.SelectedProfilePass
  );
  const GetViewPassengers = useSelector(
    (state) => state.passengerDrawer.ViewPassengers
  );
  const filledPassengerUUIDs = useSelector(
    (state) => state.passengerDrawer.filledPassengerUUIDs
  );
  const allPassengerFill = useSelector(
    (state) => state.passengerDrawer.allPassengerFill
  );

  const { selectPassProfile } = useSelector((state) => state.passengerDrawer);

  const totalPassengers = GetViewPassengers?.length || 0;
  const filledCount = filledPassengerUUIDs?.length || 0;
  const isAllPassengersFilled = filledCount === totalPassengers;
  console.log("isAllPassengersFilled", isAllPassengersFilled);

  // --- Polling for profile updates ---

  console.log("GetViewPassengers", GetViewPassengers);

  console.log("passenger_type11", passengerPofile?.length);
  // --- Polling for profile updates ---
  useEffect(() => {
    if (!FilledPassFormData || stopPolling) return;

    const interval = setInterval(() => {
      dispatch(getPassPofile());
      console.log("Polling API for profiles...");
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, FilledPassFormData, stopPolling]);

  // --- Stop polling when passport match is found ---
  useEffect(() => {
    if (!FilledPassFormData || !passengerPofile) return;

    const isMatch = passengerPofile.some(
      (p) => p.passport_number === FilledPassFormData.passport_number
    );

    if (isMatch) {
      console.log(" Stopping polling: passenger found (passport match)");
      setStopPolling(true);
    }
  }, [passengerPofile, FilledPassFormData]);

  // --- Stop polling when all passengers are present ---
  useEffect(() => {
    if (!GetViewPassengers || !passengerPofile) return;

    const isLengthEqual = passengerPofile.length === GetViewPassengers.length;

    if (isLengthEqual) {
      console.log(" Stopping polling: all passengers synced (lengths equal)");
      setStopPolling(true);
    }
  }, [passengerPofile, GetViewPassengers]);

  // --- Initialize tabType ---
  useEffect(() => {
    if (GetViewPassengers?.length && tabType === null) {
      setTabType(GetViewPassengers[0].type); // set only once
    }
  }, [GetViewPassengers, tabType]);

  // --- Close drawer ---
  const handleCloseDrawer = () => dispatch(setPassProfileDrawer(false));

  // --- Modify passenger ---
  const onClickModifyCard = (passenger) => {
    dispatch(setSelectedProfilePass(passenger));
    const age = dayjs().diff(dayjs(passenger.born_on), "year");
    dispatch(setPassengerType(passenger.type));
    dispatch(setPassengerAge(age));
    dispatch(setisPassengerDrawer(true));
  };

  // --- Save passenger ---
  const handleSavePassenger = (passenger) => {
    if (!passenger) return;
    const formatDate = (date) =>
      date && dayjs(date).isValid() ? dayjs(date).format("YYYY-MM-DD") : "";
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

    // If first passenger, set captain params
    const isFirstPassenger =
      GetViewPassengers?.[0]?.uuid === selectPassenger?.uuid;
    if (isFirstPassenger) dispatch(setCaptainParams(params));

    // Dispatch save and mark as filled
    if (CartType === "all" || CartType === "flight") {
      dispatch(PassengerFormFlight(params));
      dispatch(getPassPofile());
    } else if (CartType === "hotel") {
      dispatch(PassengerFormHotel(params));
      dispatch(getPassPofileHotel());
    }
  };

  const handleContinuePassenger = () => {
    dispatch(setFilledPass(true));
    handleCloseDrawer();
  };

  // --- Select card ---
  const selectCardHandle = (passenger) => {
    dispatch(setSelectPassProfile(passenger));
  };

  // --- Tab click ---
  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
    const passenger = GetViewPassengers[newValue];
    if (!passenger) return;
    setTabType(passenger.type);
    dispatch(setPassengerUUID(passenger.uuid));
    dispatch(setPassengerType(passenger.type));
    dispatch(setPassengerAge(passenger.age));
    dispatch(setPassengerPassport(passenger.passportNumber));
    dispatch(setSelectPassenger(passenger));
  };

  // --- Auto switch to next unfilled passenger ---
  useEffect(() => {
    if (!GetViewPassengers?.length) return;

    // If all passengers are filled → stop
    if (filledPassengerUUIDs.length === GetViewPassengers.length) {
      return;
    }

    // Find the next unfilled passenger
    const nextPassenger = GetViewPassengers.find(
      (p) => !filledPassengerUUIDs.includes(p.uuid)
    );

    if (nextPassenger && nextPassenger.uuid !== selectPassenger?.uuid) {
      const nextIndex = GetViewPassengers.findIndex(
        (p) => p.uuid === nextPassenger.uuid
      );

      setTabValue(nextIndex);
      setTabType(nextPassenger.type);

      dispatch(setSelectPassenger(nextPassenger));
      dispatch(setPassengerUUID(nextPassenger.uuid));
      dispatch(setPassengerType(nextPassenger.type));
      dispatch(setPassengerAge(nextPassenger.age));
      dispatch(setPassengerPassport(nextPassenger.passportNumber));
    }
  }, [filledPassengerUUIDs, GetViewPassengers, selectPassenger, dispatch]);

  useEffect(()=> {
    if (isAllPassengersFilled) {
      dispatch(setFilledPass(true));
      dispatch(setPassProfileDrawer(false))
    }
  },[dispatch, isAllPassengersFilled])
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

          <Box
            className={styles.checkoutDrowerBody}
            component={"section"}
            pb={10}
            sx={{ px: { lg: 3, md: 3, xs: 2 } }}
          >
            {console.log("passenger_test", passengerPofile)}
            {passengerPofile
              ?.filter((p) => p.type === tabType)
              .filter(
                (p) =>
                  !filledPassengerUUIDs.includes(p.uuid) &&
                  p.passport_number !== FilledPassFormData?.passport_number &&
                  p.passport_number !== null
              )
              .map((passenger, index) => {
                const isPassFilled =
                  passenger?.uuid === selectPassProfile?.uuid ||
                  passenger?.passport_number ===
                    FilledPassFormData?.passport_number;

                return (
                  <PassengerProfilecard
                    key={passenger.uuid || index}
                    getdata={passenger}
                    onClickModifyCard={() => onClickModifyCard(passenger)}
                    selectCardHandle={() => selectCardHandle(passenger)}
                    passFilled={isPassFilled}
                  />
                );
              })}

            <AddPassCard />
          </Box>

          <Box className={styles.checkoutDrowerFooter}>
            <Divider />
            <Box
              py={1}
              px={{ lg: 3, md: 3, xs: 2 }}
              display="flex"
              flexDirection="column"
              className={styles.Row}
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
                  <Typography variant="p" className="gray f12">
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
                  {!isAllPassengersFilled && (
                    <Button
                      type="submit"
                      className="btn btn-primary chat-btn btn-round"
                      onClick={() => handleSavePassenger(selectPassProfile)}
                      disabled={!selectPassProfile?.uuid}
                    >
                      <Typography component={"span"}>Save</Typography>
                    </Button>
                  )}

                  {/* Continue Button */}
                  {/* {isAllPassengersFilled && (
                    <Button
                      type="submit"
                      className="btn btn-primary chat-btn btn-round"
                      onClick={() => handleContinuePassenger()}
                    >
                      <Typography component={"span"}>Continue</Typography>
                    </Button>
                  )} */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default PassengerProfileDrawer;
