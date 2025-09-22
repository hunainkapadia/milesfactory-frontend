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
import { getPassPofileHotel, passengerCaptainHotel, PassengerFormHotel } from "@/src/store/slices/passengerDrawerHotelSlice";

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
const searchType = useSelector((state) => 
    state?.sendMessage?.SearchHistorySend || state?.getMessages?.SearchHistory
  );
  // if passenger profile or not handle
  const handlePassengerClick = (uuid, isFilled, type, age, passportNumber, passenger) => {
    //ga_event
    event({
      action: 'click',
      category: 'engagement',
      label: 'Add Passenger Start',
      value: passenger.type,
    });
    console.log("passengerPofile", passengerPofile?.length);
    
    //for save profile
    if (passengerPofile?.length > 0) {
      if (searchType?.flight) {
        dispatch(getPassPofile());
      } else if (searchType?.hotel) {
        dispatch(getPassPofileHotel());
      }
      
       // call passenger profile
      dispatch(setPassProfileDrawer(true));
      dispatch(setPassengerUUID(uuid)); // set selected passenger UUID
      dispatch(setPassengerType(type));
      dispatch(setPassengerAge(age));
      dispatch(setPassengerPassport(passportNumber))
      dispatch(setSelectPassenger(passenger))
      
      //for non save profile normal
    } else { 
      dispatch(setPassengerUUID(uuid)); // set selected passenger UUID
      if (!isFilled) {
        dispatch(setPassengerUUID(uuid)); // set selected passenger UUID
        dispatch(setPassengerType(type));
        dispatch(setPassengerAge(age));
        dispatch(setPassengerPassport(passportNumber))
         // call PassengerForm thunk (calls APIs)
        dispatch(setisPassengerDrawer(true)); // open drawer
        dispatch(setSelectPassenger(passenger))
      }
    }
  };

  const handlePassengerAdd = () => {
    if (selectedPassenger) {
      // Ensure a passenger is selected
      dispatch(PassengerForm()); //must need to knw redux export const PassengerForm
      dispatch(setPassengerUUID(selectedPassenger));
      dispatch(setisPassengerDrawer(true));
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
    (state) => state?.booking?.addCart?.raw_data?.available_services
  );  
  console.log("IsServices2", IsServices);

  
  if (!IsServices?.length) {
    dispatch(setpriceSummary(true));
  }
  const istLoading = useSelector((state) => state?.passengerDrawer?.isLoading);
  
  
    
  // for captain
  useEffect(() => {
    if (filledPassengerUUIDs?.length === getdata?.length) {
      if (searchType?.flight) {
        dispatch(passengerCaptain()); /// for get  fill pasenger boolean
        dispatch(setAllPassengerFill(true));
      } else if (searchType?.hotel) {
        dispatch(passengerCaptainHotel()); /// for get  fill pasenger boolean
        dispatch(setAllPassengerFill(true));
      }
    } else {
      dispatch(setAllPassengerFill(false));
    }
  }, [filledPassengerUUIDs, getdata, dispatch]);


  return (
    <>
      <Box py={2}>
        <Typography fontWeight={"semibold"}>
          Your flight has been added to the Builder! Let's now confirm who’s flying.
        </Typography>
      </Box>
      <Box variant="outlined" className={searchResultStyles.PassengersSection}>
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
                    pt: { lg: "30px", md: "30px", xs: "24px" },
                    pb: { lg: "24px", md: "24px", xs: "10px" },
                  }}
                >
                  <Typography>
                    Select now your extra baggage.
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
