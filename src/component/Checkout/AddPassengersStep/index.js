import React, { useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PassengersCard from "../PassengersCard";
import {PassengerForm, setOpenPassengerDrawer, setPassengerUUID } from "@/src/store/slices/passengerDrawerSlice";

const AddPassengersStep = ({ getdata }) => {
  console.log("getdata", getdata);
  

  const dispatch = useDispatch();
  const passengerDetails = useSelector(
    (state) => state.passengerDrawer.passengerDetails
  );

  // passenger toggle
  const [selectedPassenger, setSelectedPassenger] = useState(null); // Track selected passenger
  const handlePassengerToggle = (uuid) => {
    
    setSelectedPassenger((prev) => (prev === uuid ? null : uuid)); // Allow only one selection at a time
  };
  
  const handlePassengerAdd = () => {  
    if (selectedPassenger) { // Ensure a passenger is selected
      dispatch(PassengerForm()) //must need to knw redux export const PassengerForm
      dispatch(setPassengerUUID(selectedPassenger));
      dispatch(setOpenPassengerDrawer());
    } else {
    }
  };
  
  // get pasenger form data
  const getPassFormData = useSelector((state)=> state?.passengerDrawer?.PassFormData);
  
  

  

  return (
    <>
      <Box
        variant="outlined"
        className={searchResultStyles.PassengersSection}
        sx={{ mt: 3, }}
      >
        <Grid container spacing={2}>
          {getdata?.map((passenger, index) => (
            <Grid item xs={12} sm={12} key={passenger.uuid}>
              <PassengersCard
                totalPass={index + 1}
                getdata={passenger}
                passName={
                  selectedPassenger === passenger.uuid
                    ? getPassFormData?.given_name
                    : ""
                }
                isMainPassenger={index === 0} // Check if it's the first passenger
                isActive={selectedPassenger === passenger.uuid} // Ensure only one is active
                onToggle={handlePassengerToggle} // Handle selection
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AddPassengersStep;
