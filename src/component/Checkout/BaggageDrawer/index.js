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

import {
  addBaggage,
  removeBaggage,
  setAddSelectedBaggage,
  setBaggageDrawer,
} from "@/src/store/slices/BaggageSlice";
import { currencySymbols } from "@/src/utils/utils";

const BaggageDrawer = ({ getFlightDetail }) => {
  const dispatch = useDispatch();
  const [selectedBaggageUUIDs, setSelectedBaggageUUIDs] = useState([]);
  const [baggageCount, setBaggageCount] = useState({});
  const [tabValue, setTabValue] = useState(0);
  // const[newCount, setNewCount]=useState();

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
  

  const HandlecloseDrawer = () => {
    dispatch(setBaggageDrawer(false));
  };
  const segmentId = useSelector((state) => state.bagage.SegmentId);
  

  const handleIncrement = (uuid, passengerId) => {    
    const currentCount = baggageCount[passengerId]?.[uuid] || 0;

    if (currentCount >= 1) return; // Allow only one increment

    const newCount = currentCount + 1;

    
    
    
    

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

    

    dispatch(setAddSelectedBaggage(uuid));
    dispatch(addBaggage(uuid)); //
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
    dispatch(removeBaggage(uuid));
  };

  const totalBaggageCount = Object.values(baggageCount).reduce(
    (passengerTotal, baggageMap) => {
      const baggageSum = Object.values(baggageMap).reduce(
        (sum, count) => sum + count,
        0
      );
      return passengerTotal + baggageSum;
    },
    0
  );

  

  // respons baggage add data
  const baggageAddData = useSelector((state) => state.bagage.baggageAddData);
  
  // Check if baggageOptions is an array before filtering

  // calculate totalInitialBaggagePrice [start]
  let totalInitialBaggagePrice = 0;
  GetViewPassengers?.forEach((passenger) => {
    const passengerUUID = passenger?.uuid;
    const passengerData = baggageOptions?.[passengerUUID];

    if (passengerData) {
      const checkedAmount =
        passengerData.initial_checked_bag?.service_amount || 0;
      const carryOnAmount =
        passengerData.initial_carry_on_bag?.service_amount || 0;
      totalInitialBaggagePrice += checkedAmount + carryOnAmount;
    }
  });
  // calculate totalInitialBaggagePrice [end]

  return (
    <Drawer
      anchor="right"
      open={BaggageDrawerOpen}
      onClose={HandlecloseDrawer}
      className={`${styles.BaggageDrawer} BaggageDrawer`}
      transitionDuration={300}
    >
      <Box className={styles.BaggageDrawerSection} width={375}>
        <Box
          component={"header"}
          className={styles.BaggageDrawerHeder}
          pt={3}
          px={3}
          display="flex"
          justifyContent="space-between"
          flexDirection={"column"}
          gap={18}
        >
          <Box
            component={"section"}
            gap={1}
            alignItems="center"
            display="flex"
            className={" bold basecolor1 btn-link cursor-pointer"}
            onClick={HandlecloseDrawer}
          >
            <i className={`fa fa-arrow-left fas`}></i>{" "}
            <Box component={"span"}>Back to Mylz Chat</Box>
          </Box>
          <Box
            component={"section"}
            display="flex"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Box>
              <h3 className="regular mb-0">Extra baggage</h3>
            </Box>
          </Box>
        </Box>
        <Box className={styles.BaggageDrawerBody}>
          <Box px={"18px"}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              TabIndicatorProps={{ style: { display: "none" } }}
              className={styles.customTabs}
            >
              <Tab
                label={
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                  >
                    <img
                      src="/images/direct-plan-icon.svg"
                      alt="Flight icon"
                      style={{ width: 16, height: 16 }} // optional: control image size
                    />
                    <Typography className="basecolor-dark">
                      Departing flight
                    </Typography>
                  </Box>
                }
                className={`${styles.inactiveTab} ${
                  tabValue === 0 ? styles.activeTab : ""
                }`}
              />

              <Tab
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <img src="/images/direct-plan-icon.svg" alt="Return icon" />
                    <Typography className="basecolor-dark f12">
                      Return flight
                    </Typography>
                  </Box>
                }
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
                            className={styles.Passenger + " passengers"}
                            key={passenger?.uuid}
                          >
                            <Box>
                              <Typography className="bold passengerName">
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
                                      Handbag
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
                                              ? "Checked bags"
                                              : "Carry-on bags"}
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
              {baggageAddData && (
                <>
                  <Box py={2} display="flex" justifyContent="space-between">
                    <Typography>Price of added bags</Typography>

                    <Typography
                      className={styles.priceRow + " bold basecolor1"}
                    >
                      {currencySymbols[getFlightDetail?.tax_currency]}
                      {totalInitialBaggagePrice.toFixed(0)}
                    </Typography>
                  </Box>
                  <Box>
                    <Divider />
                  </Box>
                </>
              )}

              <Box py={2}>
                {baggageAddData?.request_type === "remove" ? (
                  <Alert severity="success" className="f12">
                    Baggage removed successfully.
                  </Alert>
                ) : baggageAddData?.request_type === "add" ? (
                  <Alert severity="success" className="f12">
                    Baggage added successfully.
                  </Alert>
                ) : baggageAddData?.error ? (
                  <Alert severity="error" className="f12">
                    {baggageAddData?.error}
                  </Alert>
                ) : null}
              </Box>
              {/* <Alert severity="error" className="f12">
                  {"baggageError.error"}
                </Alert> */}
            </Box>
            {/* body enf passengerbody */}
          </Box>
        </Box>

        <BaggageDrawerFooter
          newCount={totalBaggageCount}
          totalInitialBaggagePrice={totalInitialBaggagePrice.toFixed(2)}
          HandlecloseDrawer={HandlecloseDrawer}
          getFlightDetails={getFlightDetail}
        />
      </Box>
    </Drawer>
  );
};

export default BaggageDrawer;
