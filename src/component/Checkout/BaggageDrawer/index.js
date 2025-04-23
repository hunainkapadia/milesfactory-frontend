import React, { useState } from "react";
import { Box, Typography, Grid, Drawer, Tabs, Tab, Divider, Button } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BaggageDrower.module.scss";
import BaggageDrawerFooter from "./BaggageDrawerFooter";
import { useDispatch, useSelector } from "react-redux";
import {addSelectedBaggage, setBaggageDrawer } from "@/src/store/slices/BookingflightSlice";

const BaggageDrawer = ({ getFlightDetail }) => {
  const dispatch = useDispatch();
  const [selectedBaggageUUIDs, setSelectedBaggageUUIDs] = useState([]);
  const [baggageCount, setBaggageCount] = useState({});


  const BaggageDrawer = useSelector((state) => state.booking.BaggageDrawer);
  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );

  const [tabValue, setTabValue] = useState(0);

  const HandlecloseDrawer = () => {
    dispatch(setBaggageDrawer(false));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const getselectedFlight = useSelector(
    (state) => state?.booking?.flightDetail
  );
  console.log("getselectedFlight", getselectedFlight);
  const baggageOptions = useSelector((state) => state.booking.baggageOptions);
  console.log("baggageOptions", baggageOptions);

  console.log("uuid000", selectedBaggageUUIDs);
  const handleIncrement = (uuid) => {
   if (baggageCount[uuid]) return; // Already added once, don't increment again
 
   setBaggageCount((prev) => ({
     ...prev,
     [uuid]: 1,
   }));
 
   if (!selectedBaggageUUIDs.includes(uuid)) {
     setSelectedBaggageUUIDs([...selectedBaggageUUIDs, uuid]);
     dispatch(addSelectedBaggage(uuid));
   }
 };
 const handleDecrement = (uuid) => {
   setBaggageCount((prev) => {
     const current = prev[uuid] || 0;
     if (current <= 0) return prev;
     return {
       ...prev,
       [uuid]: current - 1,
     };
   });
 };


 const baggageError = useSelector(((state)=> state.booking.baggageError));
 console.log("baggageError", baggageError?.error);
 


  return (
    <Drawer
      anchor="right"
      open={BaggageDrawer}
      onClose={HandlecloseDrawer}
      className={`${styles.BaggageDrawer} BaggageDrawer`}
      transitionDuration={300}
    >
      <Box className={styles.BaggageDrawerSection}>
        {/* Body */}
        <Box className={styles.BaggageDrawerBody}>
          {/* Header */}
          <Grid
            container
            className={styles.checkoutDrowerHeder}
            px={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={3}
              >
                <Box>
                  <h3 className={styles.title + " regular mb-0"}>Baggage</h3>
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

          {/* Tabs */}

          {/* Passengers Section */}
          <Box px={3} py={2}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              className={styles.customTabs}
            >
              <Tab
                label="Outbound flight"
                className={`${styles.inactiveTab} ${
                  tabValue === 0
                    ? styles.activeTab + " "
                    : styles.inactiveTab + " "
                }`}
              />
              <Tab
                label="Return flight"
                className={`${styles.inactiveTab} ${
                  tabValue === 1
                    ? styles.activeTab + " "
                    : styles.inactiveTab + " "
                }`}
              />
            </Tabs>
            <Box display={"flex"} gap={0.5} py={2} flexDirection={"column"}>
              <Typography className=" f11 bold">Flight 2 of 2</Typography>
              <h4 className={styles.title + " mb-0"}>
                {getselectedFlight?.slices[0]?.origin.city_name} to{" "}
                {getselectedFlight?.slices[0]?.destination.city_name}
              </h4>
              <Typography className="f14 bold">
                {getselectedFlight?.slices
                  .slice(0, 2)
                  .map((slice) =>
                    new Date(slice.departing_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric", // ✅ Add this
                    })
                  )
                  .join(" - ")}
              </Typography>
            </Box>
            {/*  */}
            {GetViewPassengers?.map((passenger, key) => (
              <Box key={key} py={2}>
                <Box mb={2}>
                  <Typography className=" bold">
                    {`${passenger.title} ${passenger.given_name} ${passenger.family_name}`}
                  </Typography>
                </Box>
                <Grid
                  container
                  className={styles.BaggageRows}
                  display={"flex"}
                  flexDirection={"row"}
                  columnSpacing={2}
                >
                {console.log("getselectedFlight", getselectedFlight)}
                  {getselectedFlight?.slices.map((slice, index) => {
                    const isOutbound = index === 0;

                    // Build baggage map (to remove duplicates)
                    const baggageMap = new Map();

                    slice?.segments.forEach((segment) => {
                      segment?.passengers.forEach((passenger) => {
                        passenger?.baggages.forEach((baggage) => {
                          const key = `${baggage.type}-${baggage.formatted_type}`;
                          if (!baggageMap.has(key)) {
                            baggageMap.set(key, {
                              ...baggage,
                              totalQuantity: baggage.quantity || 0,
                            });
                          } else {
                            // Accumulate quantity if duplicate
                            const existing = baggageMap.get(key);
                            existing.totalQuantity += baggage.quantity || 0;
                          }
                        });
                      });
                    });

                    const uniqueBaggages = Array.from(baggageMap.values());

                    // Map type to image and label
                    const getBaggageInfo = (type) => {
                      switch (type) {
                        case "personal_item":
                          return {
                            label: "Handbag/laptop bag",
                            icon: "/images/checkout/personal-items.svg",
                          };
                        case "carry_on":
                          return {
                            label: "Carry-on bags",
                            icon: "/images/checkout/carryon-bagg.svg",
                          };
                        case "checked":
                          return {
                            label: "Checked bags",
                            icon: "/images/checkout/checked-bagg.svg",
                          };
                        default:
                          return {
                            label: type,
                            icon: "",
                          };
                      }
                    };

                    return (
                      <Grid
                        className={styles.BaggageBox + " "}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                        key={index}
                        xs={4}
                        pb={3}
                        item
                      >
                        <Box display={"flex"} gap={1} alignItems={"center"}>
                          <Box>
                            <img src={"/images/included-baggage.svg"} />
                          </Box>
                          <Typography
                            className={styles.baggageTotal + " bold f12"}
                          >
                            included
                          </Typography>
                        </Box>
                        {/* Baggage details row */}
                        <Box className={styles.BaggageRow}>
                          {uniqueBaggages.map((baggage, bIndex) => {
                            const { icon, label } = getBaggageInfo(
                              baggage.type
                            );

                            return (
                              <Box
                                key={bIndex}
                                className={styles.BaggageCol + " "}
                                width={"100%"}
                                display={"flex"}
                                gap={1}
                                flexDirection={"row"}
                              >
                                <Box
                                  display={"flex"}
                                  gap={1}
                                  alignItems={"center"}
                                >
                                  <Typography
                                    className={styles.baggageTotal + " f14"}
                                  >
                                    {baggage.totalQuantity}
                                  </Typography>
                                </Box>
                                <Typography
                                  className={styles.baggageLabel + " f11 gray"}
                                >
                                  {label}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      </Grid>
                    );
                  })}

                  {Object.entries(baggageOptions).map(
                    ([sliceUuid, options]) => (
                      <Grid
                        xs={4}
                        className={styles.BaggageBox + " "}
                        item
                        key={sliceUuid}
                      >
                        {console.log("sliceUuid", options)}
                        {options?.checked_bag_options.map((getbaggage) => {
                          const weightMatch =
                            getbaggage?.label?.match(/(\d+kg)/);
                          const priceMatch =
                            getbaggage?.label?.match(/GBP\s(\d+\.\d{2})/);

                          const weight = weightMatch?.[1]; // e.g., "23kg"
                          const price = priceMatch?.[1]; // e.g., "21.00"
                          return (
                            <>
                              <Box
                                display={"flex"}
                                gap={1}
                                alignItems={"center"}
                                mb={1}
                              >
                                <Box>
                                  {getbaggage?.baggage_type === "checked" ? (
                                    <img
                                      src="/images/checkout/checked-bagg.svg"
                                      alt="label"
                                    />
                                  ) : (
                                    <img
                                      src="/images/checkout/carryon-bagg.svg"
                                      alt="label"
                                    />
                                  )}
                                </Box>
                                <Typography
                                  className={styles.baggageTotal + " bold f12"}
                                >
                                  {baggageCount[getbaggage?.uuid] || 0}
                                </Typography>
                              </Box>
                              <Box mb={2}>
                                <Typography className="f11 gray">
                                  {options?.checked_bag_options
                                    ? "Checked bags"
                                    : "Carry-on bags"}
                                </Typography>
                                <Typography className="f11 gray">
                                  £{price} | {weight}
                                </Typography>
                              </Box>
                              <Box
                                display={"flex"}
                                gap={1}
                                alignItems={"center"}
                              >
                                <Box
                                  onClick={() =>
                                    handleDecrement(getbaggage?.uuid)
                                  }
                                  className={"CounterBtn"}
                                >
                                  <i className="fa fa-minus"></i>
                                </Box>
                                <Box
                                  onClick={() =>
                                    handleIncrement(getbaggage?.uuid)
                                  }
                                  className={"CounterBtn active"}
                                >
                                  <i className="fa fa-plus"></i>
                                </Box>
                              </Box>
                            </>
                          );
                        })}

                        {options.checked_bag_options.length === 0 && (
                          <Typography>No checked bag options</Typography>
                        )}
                      </Grid>
                    )
                  )}
                </Grid>
              </Box>
            ))}
            <Typography className="f12 red">
               {baggageError?.error}
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"} my={2}>
               <Typography>Price of added bags</Typography>
               <Typography className="bold">£30</Typography>
            </Box>
            <Box py={2}>
               <Divider />
            </Box>
          </Box>
        </Box>
        <BaggageDrawerFooter
          HandlecloseDrawer={HandlecloseDrawer}
          getFlightDetails={getFlightDetail}
        />

        {/* Footer */}
      </Box>

      {/* Backdrop */}
      <Box
        onClick={HandlecloseDrawer}
        className={styles.checkoutDrowerBackdrop}
      ></Box>
    </Drawer>
  );
};

export default BaggageDrawer;
