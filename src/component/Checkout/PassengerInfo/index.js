import React, { useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PassengersCard from "../PassengersCard";
import { openPassengerDrawer, PassengerForm, setPassengerUUID } from "@/src/store/slices/passengerDrawerSlice";
import ExtraServices from "../ExtraServices";

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
  
  const handlePassengerAdd = () => {  
    if (selectedPassenger) { // Ensure a passenger is selected
      dispatch(PassengerForm()) //must need to knw redux export const PassengerForm
      dispatch(setPassengerUUID(selectedPassenger));
      dispatch(openPassengerDrawer());
    } else {
    }
  };
  
  // get pasenger form data
  const getPassFormData = useSelector((state)=> state?.passengerDrawer?.PassFormData);
  
  const filledPassengerUUIDs = useSelector((state) => state.passengerDrawer.filledPassengerUUIDs);
  
console.log("getPassFormData", getPassFormData);



  

  return (
    <>
      <Box py={1}>
        <Typography fontWeight={"semibold"}>
          Now, let’s add the traveller details
        </Typography>
      </Box>
      <Box
        variant="outlined"
        className={searchResultStyles.PassengersSection}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          {getdata?.map((passenger, index) => {
            const isFilled = filledPassengerUUIDs.includes(passenger.uuid);

            return (
              <Grid item xs={12} sm={6} key={passenger.uuid}>
                <PassengersCard
                  totalPass={index + 1}
                  getdata={passenger}
                  passName={isFilled ? passenger.given_name : ""}
                  isMainPassenger={index === 0}
                  isActive={selectedPassenger === passenger.uuid}
                  onToggle={isFilled ? null : handlePassengerToggle}
                  isFilled={isFilled} // Now a boolean
                />
              </Grid>
            );
          })}
        </Grid>
        <Box display={"flex"} justifyContent={"flex-end"} pt={2}>
          <Button
            className="btn btn-primary btn-md btn-round"
            onClick={handlePassengerAdd}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <span>Fill in travellers details</span>
            </Box>
          </Button>
        </Box>
      </Box>
      {/* ////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////// */}
      {console.log("filledPassengerUUIDs", filledPassengerUUIDs.length)}
{filledPassengerUUIDs.length > 0 && (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box py={4}>
        <Typography>You can now choose to add extra services</Typography>
      </Box>
    </Grid>

    {getdata
      ?.filter((passenger) => filledPassengerUUIDs.includes(passenger.uuid)) // 🔥 Filter only filled
      .map((passenger, index) => (
        <ExtraServices key={passenger.uuid} getServicesdata={passenger} />
      ))}
  </Grid>
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
