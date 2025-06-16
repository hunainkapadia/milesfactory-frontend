import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PassengersCard from "../PassengersCard";
import {
  getPassPofile,
  passengerCaptain,
  PassengerForm,
  setAllPassengerFill,
  setCaptainSuccess,
  setFormSuccess,
  setOpenPassengerDrawer,
  setPassengerAge,
  setPassengerPassport,
  setPassengerType,
  setPassengerUUID,
  setPassengerUUIDfill,
  setPassProfile,
  setPassProfileDrawer,
  setSelectPassenger,
} from "@/src/store/slices/passengerDrawerSlice";
import ExtraServices from "../ExtraServices";
import { setpriceSummary } from "@/src/store/slices/PaymentSlice";

const PassengerInfo = ({ getdata }) => {
  const dispatch = useDispatch();
  const passengerDetails = useSelector(
    (state) => state.passengerDrawer.passengerDetails
  );

  // passenger toggle
  const [selectedPassenger, setSelectedPassenger] = useState(null); // Track selected passenger
  const handlePassengerToggle = (uuid) => {
    setSelectedPassenger((prev) => (prev === uuid ? null : uuid)); // Allow only one selection at a time
  };
  const passengerPofile = useSelector(
    (state) => state?.passengerDrawer?.passProfile
  );

  // if passenger profile or not handle
  const handlePassengerClick = (uuid, isFilled, type, age, passportNumber, passenger) => {
    if (passengerPofile?.length > 0) {
      dispatch(getPassPofile()); // call passenger profile
      dispatch(setPassProfileDrawer(true));
      dispatch(setPassengerUUID(uuid)); // set selected passenger UUID
      dispatch(setPassengerType(type));
      dispatch(setPassengerAge(age));
      dispatch(setPassengerPassport(passportNumber))
      dispatch(setSelectPassenger(passenger))
      
    } else {
      console.log("uuid111", isFilled);
      console.log("pass_type", uuid, isFilled, type);
      dispatch(setPassengerUUID(uuid)); // set selected passenger UUID
      if (!isFilled) {
        dispatch(setPassengerUUID(uuid)); // set selected passenger UUID
        dispatch(setPassengerType(type));
        dispatch(setPassengerAge(age));
        dispatch(setPassengerPassport(passportNumber))
        dispatch(PassengerForm()); // call PassengerForm thunk (calls APIs)
        dispatch(setOpenPassengerDrawer()); // open drawer
        dispatch(setSelectPassenger(passenger))
      }
    }
  };

  const handlePassengerAdd = () => {
    if (selectedPassenger) {
      // Ensure a passenger is selected
      dispatch(PassengerForm()); //must need to knw redux export const PassengerForm
      dispatch(setPassengerUUID(selectedPassenger));
      dispatch(setOpenPassengerDrawer());
    } else {
    }
  };

  // get pasenger form data
  const getPassFormData = useSelector(
    (state) => state?.passengerDrawer?.PassFormData
  );

  const filledPassengerUUIDs = useSelector(
    (state) => state.passengerDrawer.filledPassengerUUIDs
  );

  const getselectedFlight = useSelector(
    (state) => state?.booking?.flightDetail
  );
  const IsServices = useSelector(
    (state) => state?.booking?.singleFlightData?.available_services
  );
  console.log("IsServices", !IsServices?.length);

  if (!IsServices?.length) {
    dispatch(setpriceSummary(true));
  }
  const istLoading = useSelector((state) => state?.passengerDrawer?.isLoading);
  console.log("istLoading_pass", istLoading);

  // for captain
  useEffect(() => {
    if (filledPassengerUUIDs?.length === getdata?.length) {
      dispatch(passengerCaptain()); /// for get  fill pasenger boolean
      dispatch(setAllPassengerFill(true));
    } else {
      dispatch(setAllPassengerFill(false));
    }
  }, [filledPassengerUUIDs, getdata, dispatch]);

  console.log("getdata_0000", getdata.length);

  
  console.log("passengerPofile", passengerPofile);

  

  return (
    <>
      <Box py={2}>
        <Typography fontWeight={"semibold"}>
          Ready to fly? Let's add traveller details.
        </Typography>
      </Box>
      <Box variant="outlined" className={searchResultStyles.PassengersSection}>
        {/* profile fill passenger */}

        <Grid container spacing={2}>
          {getdata?.map((passenger, index) => {
            console.log("passenger__0", passenger);
            const isFilled = filledPassengerUUIDs.includes(passenger.uuid);
            console.log("isFilled", isFilled);

            return (
              <Grid item xs={12} sm={12} md={6} key={passenger.uuid}>

              {console.log("passenger_00", passenger)}
                <PassengersCard
                  totalPass={index + 1}
                  getdata={passenger}
                  passDetail={isFilled ? passenger : ""}
                  isMainPassenger={index === 0}
                  isFilled={isFilled}
                  onClickCard={() =>
                    handlePassengerClick(
                      passenger.uuid,
                      isFilled,
                      passenger.type,
                      passenger.age,
                      passenger.passport_number,
                      passenger, // while pasenger data
                    )
                  }
                />
              </Grid>
            );
          })}
        </Grid>
        {/*  */}
      </Box>
      {/* ////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////// */}

      {IsServices?.length > 0 &&
        filledPassengerUUIDs.length === getdata.length && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box py={4}>
                  <Typography>
                    Select now your seats and extra baggage.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box className={searchResultStyles.ExtraServicesWraper}>
              <Grid
                container
                spacing={2}
                className={searchResultStyles.ExtraServicesGrid}
              >
                {console.log(
                  "getdata_00",
                  getdata,
                  "filledPassengerUUIDs",
                  filledPassengerUUIDs
                )}
                {getdata
                  ?.filter((passenger) =>
                    filledPassengerUUIDs.includes(passenger.uuid)
                  ) // Filter only filled
                  .map((passenger, index) => (
                    <ExtraServices
                      key={passenger.uuid}
                      getServicesdata={passenger}
                      selectedFlight={getselectedFlight}
                    />
                  ))}
              </Grid>
            </Box>
          </>
        )}

      {/* {getPassFormData ? (
          <>
          </>
        ) : (
          ""
        )} */}
    </>
  );
};

export default PassengerInfo;
