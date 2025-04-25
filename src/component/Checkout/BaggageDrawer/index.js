import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Drawer,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BaggageDrower.module.scss";
import BaggageDrawerFooter from "./BaggageDrawerFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedBaggage,
  setBaggageDrawer,
} from "@/src/store/slices/BookingflightSlice";

const BaggageDrawer = ({ getFlightDetail }) => {
  const dispatch = useDispatch();
  const [selectedBaggageUUIDs, setSelectedBaggageUUIDs] = useState([]);
  const [baggageCount, setBaggageCount] = useState({});
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const BaggageDrawerOpen = useSelector((state) => state.booking.BaggageDrawer);
  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );
  const getselectedFlight = useSelector(
    (state) => state?.booking?.flightDetail
  );
  const baggageOptions = useSelector((state) => state.booking.baggageOptions);
  const baggageError = useSelector((state) => state.booking.baggageError);

  const HandlecloseDrawer = () => {
    dispatch(setBaggageDrawer(false));
  };

  const handleIncrement = (uuid, passengerId) => {
    setBaggageCount((prev) => {
      const currentPassengerBaggage = prev[passengerId] || {};
      const currentCount = currentPassengerBaggage[uuid] || 0;
      return {
        ...prev,
        [passengerId]: {
          ...currentPassengerBaggage,
          [uuid]: currentCount + 1,
        },
      };
    });

    if (!selectedBaggageUUIDs.includes(uuid)) {
      setSelectedBaggageUUIDs([...selectedBaggageUUIDs, uuid]);
      dispatch(addSelectedBaggage(uuid));
    }
  };

  const handleDecrement = (uuid, passengerId) => {
    setBaggageCount((prev) => {
      const currentPassengerBaggage = prev[passengerId] || {};
      const currentCount = currentPassengerBaggage[uuid] || 0;
      if (currentCount <= 0) return prev;
      return {
        ...prev,
        [passengerId]: {
          ...currentPassengerBaggage,
          [uuid]: currentCount - 1,
        },
      };
    });
  };

  // Check if baggageOptions is an array before filtering
  

  return (
    <Drawer
      anchor="right"
      open={BaggageDrawerOpen}
      onClose={HandlecloseDrawer}
      className={`${styles.BaggageDrawer} BaggageDrawer`}
      transitionDuration={300}
    >
      <Box className={styles.BaggageDrawerSection}>
        <Box className={styles.BaggageDrawerBody}>
          <Grid
            container
            className={styles.checkoutDrowerHeder}
            px={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={3}
              >
                <Box>
                  <h3 className={`${styles.title} regular mb-0`}>Baggage</h3>
                  <Typography className="f14">
                    Choose extra bags for each traveller
                  </Typography>
                </Box>
                <Box
                  onClick={HandlecloseDrawer}
                  className="cursor-pointer basecolor"
                >
                  <i className="fa fa-close fas"></i>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box px={3} py={2}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              className={styles.customTabs}
            >
              <Tab
                label="Outbound flight"
                className={`${styles.inactiveTab} ${
                  tabValue === 0 ? styles.activeTab : ""
                }`}
              />
              <Tab
                label="Return flight"
                className={`${styles.inactiveTab} ${
                  tabValue === 1 ? styles.activeTab : ""
                }`}
              />
            </Tabs>

            {getselectedFlight?.slices?.[tabValue] && (
              <>
                <Box display="flex" gap={0.5} py={4} flexDirection="column">
                  <Typography className="f11 bold">
                    Flight {tabValue + 1} of {getselectedFlight?.slices?.length}
                  </Typography>
                  <h4 className={`${styles.title} mb-0`}>
                    {getselectedFlight.slices[tabValue].origin.city_name} to{" "}
                    {getselectedFlight.slices[tabValue].destination.city_name}
                  </h4>
                  <Typography className="f14 bold">
                    {new Date(
                      getselectedFlight.slices[tabValue].departing_at
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </Typography>
                </Box>

                {GetViewPassengers?.map((passenger, key) => {
  const passengerUUID = passenger?.uuid; // Assuming this is the current passenger UUID

  // Extract passenger IDs
  const passengerIds = Object.keys(baggageOptions);

  // Filter passengerIds based on the current passengerUUID
  const filteredPassengerIds = passengerIds.filter((id) => id === passengerUUID);

  console.log("Filtered Passenger IDs:", filteredPassengerIds);

  // Initialize checkedBagOptions
  let checkedBagOptions = [];

  if (filteredPassengerIds.length > 0) {
    const matchingPassengerId = filteredPassengerIds[0];
    const passengerData = baggageOptions[matchingPassengerId];

    // Access checked_bag_options for the matched passenger UUID
    checkedBagOptions = passengerData?.checked_bag_options || [];
  }

  return (
    <Box key={passenger?.uuid} py={2}>
      <Box mb={2}>
        <Typography className="bold">
          {`${passenger.title} ${passenger.given_name} ${passenger.family_name}`}
        </Typography>
      </Box>
      <Grid container className={styles.BaggageRows} spacing={2}>
        <Grid item xs={4} className={`${styles.BaggageBox} aa`}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" gap={1} alignItems="center">
              <img src="/images/included-baggage.svg" />
              <Typography className={`${styles.baggageTotal} bold f12`}>
                included
              </Typography>
            </Box>
            <Typography className="f11 gray">Handbag/laptop bag</Typography>
          </Box>
        </Grid>

        {/* Baggage options for the passenger */}
        {checkedBagOptions.length > 0 ? (
          checkedBagOptions.map((option, index) => {
            const weight = option?.label?.match(/\d+kg/)[0]; // Extract weight like "15kg"
            const price =
              option?.label?.match(/GBP\s(\d+\.\d{2})/)[1]; // Extract price like "68.00"

            return (
              <Grid item xs={4} key={index}>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Box display="flex" gap={1} alignItems="center">
                    <img src="/images/checkout/checked-bagg.svg" alt="Checked bag" />
                    <Typography className={`${styles.baggageTotal} bold f12`}>1</Typography>
                  </Box>
                  <Typography className="f11 gray">Checked bag</Typography>
                  <Typography className="f11 gray">{`£${price} | ${weight}`}</Typography>
                  <Box display="flex" gap={1} alignItems="center">
                    <Box
                      onClick={() => handleDecrement(option.uuid, passenger?.uuid)}
                      className="CounterBtn"
                    >
                      <i className="fa fa-minus"></i>
                    </Box>
                    <Box
                      onClick={() => handleIncrement(option.uuid, passenger?.uuid)}
                      className="CounterBtn active"
                    >
                      <i className="fa fa-plus"></i>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })
        ) : (
          <Typography>No checked bag options</Typography>
        )}
      </Grid>
    </Box>
  );
})}

              </>
            )}

            <Typography className="f12 red">{baggageError?.error}</Typography>
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography>Price of added bags</Typography>
              <Typography className="bold">£30</Typography>
            </Box>
            <Divider />
          </Box>
        </Box>
        <BaggageDrawerFooter
          HandlecloseDrawer={HandlecloseDrawer}
          getFlightDetails={getFlightDetail}
        />
      </Box>
    </Drawer>
  );
};

export default BaggageDrawer;
