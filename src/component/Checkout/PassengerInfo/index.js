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
  PassengerFormFlight,
  setAllPassengerFill,
  setCaptainSuccess,
  setFormSuccess,
  setisLoading,
  setisPassengerDrawer,
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
import { event } from "@/src/utils/utils";
import {
  getPassPofileHotel,
  passengerCaptainHotel,
  PassengerFormHotel,
} from "@/src/store/slices/passengerDrawerHotelSlice";

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

  const searchType = useSelector(
    (state) =>
      state?.sendMessage?.SearchHistorySend || state?.getMessages?.SearchHistory
  );
  // if passenger profile or not handle
  const selectPassenger = useSelector(
    (state) => state?.passengerDrawer?.SelectPassenger
  );

  
  
  const handlePassengerClick = (
    uuid,
    isFilled,
    type,
    age,
    passportNumber,
    passenger
  ) => {
    event({
      action: "click",
      category: "engagement",
      label: "Add Passenger Start",
      value: type,
    });
    
    const passengerTypeFinal =
    age <= 1 ? "infant" : age <= 12 ? "child" : "adult";
    
    if (passengerPofile?.length > 0) {

      console.log("passenger_age", passenger);
      
      
      dispatch(setPassProfileDrawer(true));
      dispatch(setPassengerUUID(uuid));
      dispatch(setPassengerType(passengerTypeFinal));
      dispatch(setPassengerAge(passenger?.age));
      dispatch(setPassengerPassport(passportNumber));
      dispatch(setSelectPassenger(passenger));
    } else {
      if (!isFilled) {
        dispatch(setPassengerPassport(passportNumber));
        dispatch(setisPassengerDrawer(true));
        dispatch(setSelectPassenger(passenger));
      }
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
    (state) => state?.booking?.addCart?.raw_data?.available_services
  );

  if (!IsServices?.length) {
    dispatch(setpriceSummary(true));
  }
  const istLoading = useSelector((state) => state?.passengerDrawer?.isLoading);

  const CartType = useSelector((state) => state.booking.cartType);

  // for captain
  useEffect(() => {
    if (filledPassengerUUIDs?.length === getdata?.length) {
      if (CartType === "all" || CartType === "flight") {
        dispatch(passengerCaptain()); /// for get  fill pasenger boolean
        dispatch(setAllPassengerFill(true));
      } else if (CartType === "hotel") {
        dispatch(passengerCaptainHotel()); /// for get  fill pasenger boolean
        dispatch(setAllPassengerFill(true));
      } else {
      }
    } else {
      dispatch(setAllPassengerFill(false));
    }
  }, [filledPassengerUUIDs, getdata, dispatch]);

  var initialMsg = "";
  if (CartType === "all") {
    initialMsg = "Please add traveller details to proceed to payment.";
  } else if (CartType === "flight") {
    initialMsg = "Let's confirm who’s flying.";
  } else if (CartType === "hotel") {
    initialMsg = "Please add guest details to proceed to payment.";
  } else {
    initialMsg = "Please add traveller details to proceed to payment.";
  }

  return (
    <>
      <Box pb={2}>
        <Typography fontWeight={"semibold"}>{initialMsg}</Typography>
      </Box>
      <Box variant="outlined" className={searchResultStyles.PassengersSection + " aaa"}>
        {/* profile fill passenger */}

        <Grid container spacing={2}>
          {getdata?.map((passenger, index) => {
            const isFilled = filledPassengerUUIDs.includes(passenger.uuid);

            return (
              <Grid item xs={12} sm={12} md={6} key={passenger.uuid}>
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
                      passenger // while pasenger data
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
                <Box
                  sx={{
                    pb: { lg: "24px", md: "24px", xs: "10px" },
                  }}
                >
                  <Typography>Select now your extra baggage.</Typography>
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
