import React, { useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PassengersCard from "../PassengersCard";
import {
  PassengerForm,
  setCaptainSuccess,
  setFormSuccess,
  setOpenPassengerDrawer,
  setPassengerUUID,
  setPassengerUUIDfill,
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

  const handlePassengerClick = (uuid, isFilled) => {
    console.log("uuid111", isFilled);
    
    if (!isFilled) {
      
      dispatch(setPassengerUUID(uuid)); // set selected passenger UUID
      dispatch(PassengerForm()); // call PassengerForm thunk (calls APIs)
      dispatch(setOpenPassengerDrawer()); // open drawer
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
  const IsServices = useSelector((state)=> state?.booking?.singleFlightData?.available_services);
  console.log("IsServices", IsServices);

  if (!IsServices?.length) {
    dispatch(setpriceSummary(true));
  }
  

  return (
    <>
      <Box py={2}>
        <Typography fontWeight={"semibold"}>
          Ready to fly? Let’s add traveller details.
        </Typography>
      </Box>
      <Box
        variant="outlined"
        className={searchResultStyles.PassengersSection}
      >
        <Grid container spacing={2}>
          {getdata?.map((passenger, index) => {
            console.log("passenger__0", passenger)
            const isFilled = filledPassengerUUIDs.includes(passenger.uuid);
            console.log("isFilled", isFilled)
            

            return (
              <Grid item xs={12} sm={12} md={6} key={passenger.uuid}>
                <PassengersCard
                  totalPass={index + 1}
                  getdata={passenger}
                  passDetail={isFilled ? passenger : ""}
                  isMainPassenger={index === 0}
                  isFilled={isFilled}
                  onClickCard={() =>
                    handlePassengerClick(passenger.uuid, isFilled)
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {/* ////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////// */}
      {!IsServices?.length || filledPassengerUUIDs.length > 0 && (
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
