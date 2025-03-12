import React, { useState } from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Link from "next/link";

const FromAndToDetail = ({ getdata, logo }) => {
  const [isBaggage, setisBaggage] = useState(false);
  
  const bookingDetail = () => {
    setisBaggage(!isBaggage);
  };
  function getStopDetails(getdata) {
    let stops = 0;
    let stopAirports = [];

    if (getdata && getdata.segments) {
      stops = getdata.segments.length - 1;
      stopAirports = getdata.segments
        .slice(0, -1)
        .map((seg) => seg.destination.iata_code);
    }

    return stops > 0
      ? `${stops} stop${stops > 1 ? "s" : ""} (${stopAirports.join(" - ")})`
      : "Direct Flight";
  }
  console.log("getdata111", getdata.segments.length);
  return (
    <>
      <Box>
        
        {/* from and to row */}

        <Box
          className={styles.fromAndToRow}
          position={"relative"}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          my={3}
        >
          <Box
            className={styles.FromRow}
            position={"relative"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} gap={4}>
              <Typography variant="h5" className="h6 mb-0">
                {new Date(getdata?.departing_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
              <Typography variant="h5" className="h6 mb-0">
                {getdata?.origin?.iata_code}
                {` (${getdata?.origin?.city_name})`}
              </Typography>
            </Box>
            <Box display={"flex"} gap={4}>
              <Typography variant="p" className=" gray mb-0">
                {new Date(getdata?.departing_at).toLocaleDateString("en-US", {
                  weekday: "short", // Sat
                  month: "short", // Dec
                  day: "2-digit", // 14
                })}
              </Typography>
            </Box>
          </Box>
          {/* time */}
          <Box
            className={styles.flightDurationRow + " gray"}
            position={"relative"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} gap={1}>
              <Typography variant="p" className="mb-0">
                {getdata?.duration}
              </Typography>
              <Typography variant="p" className="mb-0 red">
                {getStopDetails(getdata)}
                {/* stops */}
              </Typography>
            </Box>
            <Box>
              <Avatar
                src={logo}
                alt={"image"}
                className={styles.airlineLogo}
                mr={0}
              />
            </Box>
          </Box>
          {/* time */}
          <Box
            position={"relative"}
            className={styles.ToRow}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} gap={4}>
              <Typography variant="h5" className="h6 mb-0">
                {new Date(getdata?.arriving_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
              <Typography variant="h5" className="h6 mb-0">
                {getdata?.destination?.iata_code}
                {` (${getdata?.destination?.city_name})`}
              </Typography>
            </Box>
            <Box display={"flex"} gap={4}>
              <Typography variant="p" className=" gray mb-0">
                {new Date(getdata?.arriving_at).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "2-digit",
                })}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/*  */}
        <Box>
          <Box mt={2}>
            <Link
              href={""}
              className="text-decoration-none darkgray"
              onClick={bookingDetail}
            >
              <Box mt={4} mb={4} gap={2} alignItems={"center"} display={"flex"}>
                <span>Flight details</span>
                <i className="fa-caret-down fa fas"></i>
              </Box>
            </Link>
          </Box>
          {isBaggage ? (
            <>
              <Box>
                
                <Box mb={2} >
                  <Typography variant="h4" className=" mb-0 h4">
                    Included in ticket
                  </Typography>
                </Box>
                <Box>
                  {console.log("tttt", getdata.segments)}
                  {getdata?.segments.map((getsegment, segmentIndex) =>
                    getsegment?.passengers.map((getpassenger, passengerIndex) =>
                      getpassenger?.baggages.map((getbaggage, baggageIndex) => (
                        <Box
                          // key={`${getdataIndex}-${segmentIndex}-${passengerIndex}-${baggageIndex}`}
                          display={"flex"}
                          gap={2}
                          alignItems={"center"}
                          px={1}
                          mb={1}
                          className={styles.normalOption}
                        >
                          <Box className={styles.BaggageIcon}>
                            <img
                              src={
                                getbaggage?.type === "checked"
                                  ? "/images/checkout/checked-bagg.svg"
                                  : getbaggage?.type === "carry_on"
                                  ? "/images/checkout/carryon-bagg.svg"
                                  : "/images/checkout/carryon-bagg.svg"
                              }
                            />
                          </Box>
                          <Typography>
                            {getbaggage.quantity}x {getbaggage.formatted_type}
                          </Typography>
                        </Box>
                      ))
                    )
                  )}
                </Box>
                {/* map end */}
              </Box>
            </>
          ) : (
            ""
          )}

          {/*  */}
        </Box>
        
      </Box>
    </>
  );
};

export default FromAndToDetail;
