import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Drawer,
  Tabs,
  Tab,
  Divider,
  Alert,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BaggageDrower.module.scss";
import BaggageDrawerFooter from "./BaggageDrawerFooter";
import { useDispatch, useSelector } from "react-redux";

import {setAddSelectedBaggage, setBaggageDrawer } from "@/src/store/slices/BaggageSlice";
import { currencySymbols } from "@/src/utils/utils";

const BaggageDrawer = ({ getFlightDetail }) => {
  const dispatch = useDispatch();
  const [selectedBaggageUUIDs, setSelectedBaggageUUIDs] = useState([]);
  const [baggageCount, setBaggageCount] = useState({});
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const BaggageDrawerOpen = useSelector((state) => state.bagage.BaggageDrawer);
  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );
  const getselectedFlight = useSelector(
    (state) => state?.booking?.flightDetail
  );
  const baggageOptions = useSelector((state) => state.bagage.baggageOptions);
  const baggageError = useSelector((state) => state.bagage.baggageError);
  console.log("baggageError00", baggageError);
  

  const HandlecloseDrawer = () => {
    dispatch(setBaggageDrawer(false));
  };

  const handleIncrement = (uuid, passengerId) => {
    const currentCount = baggageCount[passengerId]?.[uuid] || 0;
  
    if (currentCount >= 1) return; // Allow only one increment
  
    const newCount = currentCount + 1;
  
    console.log("Incremented Baggage:");
    console.log("Passenger UUID:", passengerId);
    console.log("Baggage UUID:", uuid, newCount);
    console.log("New Quantity:", newCount);
  
    setBaggageCount((prev) => {
      const currentPassengerBaggage = prev[passengerId] || {};
      return {
        ...prev,
        [passengerId]: {
          ...currentPassengerBaggage,
          [uuid]: newCount,
        },
      };
    });
  
    console.log("selectedBaggageUUIDs", selectedBaggageUUIDs);
    
    dispatch(setAddSelectedBaggage(uuid));
    
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
  console.log("BaggageDrawerOpen", BaggageDrawerOpen);

  // respons baggage add data
  const baggageAddData = useSelector((state)=> state.bagage.baggageAddData);
  console.log("baggageAddData", baggageAddData);
  
  

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
              TabIndicatorProps={{ style: { display: "none" } }}
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

            <Box py={3} className={styles.passengerBody}>
              {getselectedFlight?.slices?.[tabValue] && (
                <>
                  <Box
                    className={styles.flightDetail}
                    display="flex"
                    gap={0.5}
                    pb={2}
                    flexDirection="column"
                  >
                    <Typography className="f11 bold">
                      Flight {tabValue + 1} of{" "}
                      {getselectedFlight?.slices?.length}
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
                  <Box className={styles.Passengers}>
                    {GetViewPassengers?.map((passenger, key) => {
                      const passengerUUID = passenger?.uuid; // Assuming this is the current passenger UUID
                      const isLast = key === GetViewPassengers.length - 1;

                      // Extract passenger IDs
                      const passengerIds = Object.keys(baggageOptions);

                      // Filter passengerIds based on the current passengerUUID
                      const filteredPassengerIds = passengerIds.filter(
                        (id) => id === passengerUUID
                      );
                      console.log(
                        "Filtered Passenger IDs:",
                        filteredPassengerIds
                      );

                      // Initialize checkedBagOptions
                      let checkedBagOptions = [];
                      let carryOnBagOptions = [];

                      if (filteredPassengerIds.length > 0) {
                        const matchingPassengerId = filteredPassengerIds[0];
                        const passengerData =
                          baggageOptions[matchingPassengerId];

                        checkedBagOptions =
                          passengerData?.checked_bag_options?.filter(
                            (option) => option?.slices_index === tabValue
                          ) || [];

                        carryOnBagOptions =
                          passengerData?.carry_on_bag_options?.filter(
                            (option) => option?.slices_index === tabValue
                          ) || [];
                      }

                      return (
                        <>
                          <Box
                            className={styles.Passenger}
                            key={passenger?.uuid}
                          >
                            <Box>
                              <Typography className="bold">
                                {`${passenger.title} ${passenger.given_name} ${passenger.family_name}`}
                              </Typography>
                            </Box>
                            <Box pt={2} pb={3}>
                              <Grid
                                container
                                className={styles.BaggageRows}
                                columnSpacing={2} // Only horizontal spacing
                              >
                                <Grid
                                  item
                                  xs={4}
                                  className={`${styles.BaggageBox} aa`}
                                >
                                  <Box
                                    display="flex"
                                    flexDirection="column"
                                    gap={1}
                                  >
                                    <Box
                                      display="flex"
                                      gap={1}
                                      alignItems="center"
                                    >
                                      <img src="/images/included-baggage.svg" />
                                      <Typography
                                        className={`${styles.baggageTotal} bold f12`}
                                      >
                                        included
                                      </Typography>
                                    </Box>
                                    <Typography className="f11 gray">
                                      Handbag/laptop bag
                                    </Typography>
                                  </Box>
                                </Grid>

                                {/* Baggage options for the passenger */}
                                {checkedBagOptions.length > 0 ||
                                carryOnBagOptions.length > 0 ? (
                                  [
                                    checkedBagOptions[0],
                                    carryOnBagOptions[0],
                                  ].map((option, index) => {
                                    if (!option) return null;
                                    const isChecked =
                                      checkedBagOptions.includes(option);
                                    const iconSrc = isChecked
                                      ? "/images/checkout/checked-bagg.svg"
                                      : "/images/checkout/carryon-bagg.svg";
                                    const quantity =
                                      baggageCount[passengerUUID]?.[
                                        option.uuid
                                      ] ?? 0;

                                    return (
                                      <Grid
                                        item
                                        xs={4}
                                        key={index}
                                        className={`${styles.BaggageBox} ${
                                          styles.AddBaggeSection
                                        } ${
                                          quantity === 0 ? "" : styles.active
                                        }`}
                                      >
                                        <Box
                                          display="flex"
                                          flexDirection="column"
                                          gap={1}
                                        >
                                          <Box
                                            display="flex"
                                            gap={1}
                                            alignItems="center"
                                            className={styles.Header}
                                          >
                                            <img
                                              src={iconSrc}
                                              alt={
                                                isChecked
                                                  ? "Checked bag"
                                                  : "Carry-on bag"
                                              }
                                            />
                                            <Typography
                                              className={`${styles.baggageTotal} bold f12`}
                                            >
                                              {quantity}{" "}
                                              {quantity === 0 ? (
                                                ""
                                              ) : (
                                                <span>added</span>
                                              )}
                                            </Typography>
                                          </Box>
                                          <Typography
                                            className="f11 gray"
                                            textTransform={"capitalize"}
                                          >
                                            {option?.baggage_type === "checked"
                                              ? "Carry-on bags"
                                              : "Checked bags"}
                                          </Typography>
                                          <Typography className="f11 gray">
                                            £{option?.service_amount} each
                                            {option?.metadata?.maximum_weight_kg
                                              ? ` | ${option.metadata.maximum_weight_kg} kg max`
                                              : ""}
                                          </Typography>
                                          <Box
                                            display="flex"
                                            gap={1}
                                            alignItems="center"
                                          >
                                            <Box
                                              onClick={() =>
                                                handleDecrement(
                                                  option.uuid,
                                                  passenger?.uuid
                                                )
                                              }
                                              className={`CounterBtn ${
                                                quantity === 0 ? "" : "active"
                                              }`}
                                            >
                                              <i className="fa fa-minus"></i>
                                            </Box>
                                            <Box
                                              onClick={() =>
                                                handleIncrement(
                                                  option.uuid,
                                                  passenger?.uuid
                                                )
                                              }
                                              className={`CounterBtn ${
                                                quantity === 0 ? "active" : ""
                                              }`}
                                            >
                                              <i className="fa fa-plus"></i>
                                            </Box>
                                          </Box>
                                        </Box>
                                      </Grid>
                                    );
                                  })
                                ) : (
                                  <Grid
                                    item
                                    xs={4}
                                    className={`${styles.BaggageBox}`}
                                  >
                                    <Typography className="f12">
                                      No baggage options available
                                    </Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </Box>

                            {!isLast && (
                              <Box py={2}>
                                <Divider />
                              </Box>
                            )}
                          </Box>
                        </>
                      );
                    })}
                  </Box>
                </>
              )}
              {/* price of baggage row */}
              {baggageAddData &&
                <>
                  <Box py={2} display="flex" justifyContent="space-between" >
                    <Typography>Price of added bags</Typography>
                    <Typography className="bold basecolor1">
                      {currencySymbols[getFlightDetail?.tax_currency]}
                      {
                        baggageAddData?.per_passenger_amount_plus_markup_and_all_services
                      }
                    </Typography>
                  </Box>
                  <Box >
                    <Divider />
                  </Box>
                </>
              }
              {baggageError?.error && (
                <Box py={2}>
                  <Alert severity="error" className="f12">
                    {baggageError.error}
                  </Alert>
                </Box>
              )}
            </Box>
            {/* body enf passengerbody */}
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
