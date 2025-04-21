import React, { useState } from "react";
import { Box, Typography, Grid, Drawer, Tabs, Tab } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/MainDrower.module.scss";
import BaggageDrawerFooter from "./BaggageDrawerFooter";
import { useDispatch, useSelector } from "react-redux";
import { setBaggageDrawer } from "@/src/store/slices/BookingflightSlice";

const BaggageDrawer = ({ getFlightDetail }) => {
  const dispatch = useDispatch();

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
  

  return (
    <Drawer
      anchor="right"
      open={BaggageDrawer}
      onClose={HandlecloseDrawer}
      className={`${styles.MainDrawer} MainDrower`}
      transitionDuration={300}
    >
      <Box className={styles.MainDrowerSection}>
        {/* Body */}
        <Box className={styles.checkoutDrowerBody}>
          {/* Header */}
          <Grid
            container
            className={styles.checkoutDrowerHeder}
            py={3}
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

          {/* Passengers Section */}
          <Box px={3} py={2}>
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

              {console.log("22222", getselectedFlight)}
              {getselectedFlight?.slices?.length <= 1 ? (
                <Typography className={"f14 gray"}>{"One way"}</Typography>
              ) : (
                <Typography className={"f14 gray"}>{"Return"}</Typography>
              )}
            </Box>
            {GetViewPassengers?.map((passenger) => (
              <Box key={passenger.uuid}>
                <Box mb={2}>
                  <Typography className=" bold">
                    {`${passenger.title} ${passenger.given_name} ${passenger.family_name}`}
                  </Typography>
                </Box>
                <Box display={"flex"} gap={1} alignItems={"center"}>
                  <Box>
                    <img src={"/images/included-baggage.svg"}  />
                  </Box>
                  <Typography className={styles.baggageTotal + " bold f12"}>
                     included 
                  </Typography>
                </Box>

                <Box
                  className={styles.BaggageRows}
                  display={"flex"}
                  flexDirection={"row"}
                  gap={4}
                >
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
                      <Box
                        className={styles.BaggageBox + " "}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                        key={index}
                      >
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
                      </Box>
                    );
                  })}
                  <Box
                        className={styles.BaggageBox + " "}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                      >
                      {Object.entries(baggageOptions).map(([sliceUuid, options]) => (
  <Box key={sliceUuid} sx={{ mb: 2 }}>
  {console.log("sliceUuid", options)}
    <Typography variant="h6">Slice UUID: {sliceUuid}</Typography>

    {options.checked_bag_options.map((bag) => (
      <Typography key={bag.uuid}>
        {bag.label} — {bag.service_id}
      </Typography>
    ))}

    {options.checked_bag_options.length === 0 && (
      <Typography>No checked bag options</Typography>
    )}
  </Box>
))}
                      </Box>
                      
                </Box>

                <Grid container spacing={2}>
                  {/* Included */}
                  <Grid item xs={4}>
                    <Box
                      border="1px solid #eee"
                      p={2}
                      borderRadius={2}
                      textAlign="center"
                    >
                      <Typography fontWeight={500}>1 included</Typography>
                      <Typography variant="body2">
                        Handbag/laptop bag
                      </Typography>
                    </Box>
                  </Grid>
                  {/* Carry-on */}
                  <Grid item xs={4}>
                    <Box
                      border="1px solid #eee"
                      p={2}
                      borderRadius={2}
                      textAlign="center"
                    >
                      <Typography fontWeight={500}>0</Typography>
                      <Typography variant="body2">Carry-on bags</Typography>
                      <Typography variant="body2">
                        £25 each | 8kg max
                      </Typography>
                      <Box
                        mt={1}
                        display="flex"
                        justifyContent="center"
                        gap={1}
                      >
                        <i className="fa fa-minus cursor-pointer basecolor"></i>
                        <i className="fa fa-plus cursor-pointer basecolor"></i>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Checked */}
                  <Grid item xs={4}>
                    <Box
                      border="1px solid #eee"
                      p={2}
                      borderRadius={2}
                      textAlign="center"
                    >
                      <Typography fontWeight={500}>0</Typography>
                      <Typography variant="body2">Checked bags</Typography>
                      <Typography variant="body2">
                        £45 each | 23kg max
                      </Typography>
                      <Box
                        mt={1}
                        display="flex"
                        justifyContent="center"
                        gap={1}
                      >
                        <i className="fa fa-minus cursor-pointer basecolor"></i>
                        <i className="fa fa-plus cursor-pointer basecolor"></i>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Footer */}
        <BaggageDrawerFooter getFlightDetails={getFlightDetail} />
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
