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

  // Get layover info
  function getLayoverDetails(getdata) {
    if (getdata?.segments?.length > 1) {
      const layovers = [];

      for (let i = 0; i < getdata.segments.length - 1; i++) {
        const first = new Date(getdata.segments[i].arriving_at);
        const second = new Date(getdata.segments[i + 1].departing_at);

        const layoverTimeMs = second - first;
        const hours = Math.floor(layoverTimeMs / (1000 * 60 * 60));
        const minutes = Math.floor((layoverTimeMs / (1000 * 60)) % 60);

        const layoverDuration = `${hours}h${minutes}m`;
        const airport = getdata.segments[i].destination.iata_code;
        const layoversCityName = getdata.segments[i].destination.city_name;

        layovers.push(`${layoverDuration} layover - ${layoversCityName} (${airport})`);
      }

      return layovers;
    }

    return [];
  }

  return (
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
        {/* From Row */}
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
            <Typography variant="p" className="gray mb-0">
              {new Date(getdata?.departing_at).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
              })}
              <br />
            </Typography>
          </Box>
        </Box>

        {/* Duration + Stops */}
        <Box
          className={styles.flightDurationRow + " gray"}
          position={"relative"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Box display={"flex"} gap={1}>
              <Typography variant="p" className="mb-0">
                {getdata?.duration}
              </Typography>
              <Typography variant="p" className="mb-0 red">
                {getStopDetails(getdata)}
              </Typography>
            </Box>
            <Typography variant="p" className="mb-0 gray">
              {[
                ...new Set(
                  getdata?.segments
                    ?.flatMap((segment) =>
                      segment?.passengers?.map((p) => p?.cabin_class)
                    )
                    ?.filter(Boolean)
                ),
              ]
                .join(", ")
                .replace(/\b\w/g, (c) => c.toUpperCase()) || "No Cabin Info"}
            </Typography>
          </Box>
          <Box className={styles.airlineLogo + " imggroup"}>
            <img src={logo} alt={"image"} />
          </Box>
        </Box>

        {/* To Row */}
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
            <Typography variant="p" className="gray mb-0">
              {new Date(getdata?.arriving_at).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
              })}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Layover Details */}
      <Box
        px={3}
        mt={3}
        py={2}
        className={styles.LayoverSection + " lightgray-bg "}
      >
        {getLayoverDetails(getdata).map((layover, index) => (
          <Typography
            key={index}
            variant="p"
            className="gray mb-0 basecolor-dark"
          >
            {layover}
          </Typography>
        ))}
      </Box>

      {/* Toggle Flight Details */}
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

      {/* Flight Details Expanded */}
      {isBaggage && (
        <Box>
          <Box mb={2}>
            <Typography variant="h4" className="mb-0 h4">
              Included in ticket
            </Typography>
          </Box>

          {/* Unique Baggage Items */}
          {(() => {
            const baggageMap = new Map();

            getdata?.segments.forEach((segment) => {
              segment?.passengers.forEach((passenger) => {
                passenger?.baggages.forEach((baggage) => {
                  const key = `${baggage.type}-${baggage.formatted_type}`;
                  if (!baggageMap.has(key)) {
                    baggageMap.set(key, {
                      ...baggage,
                    });
                  }
                });
              });
            });

            const uniqueBaggages = Array.from(baggageMap.values());

            return (
              <Box px={1}>
                {uniqueBaggages.map((baggage, index) => (
                  <Box
                    key={index}
                    display={"flex"}
                    gap={2}
                    alignItems={"center"}
                    mb={1}
                    className={styles.normalOption}
                  >
                    <Box className={styles.BaggageIcon}>
                      <img
                        src={
                          baggage?.type === "checked"
                            ? "/images/checkout/checked-bagg.svg"
                            : "/images/checkout/carryon-bagg.svg"
                        }
                      />
                    </Box>
                    <Typography>
                      {baggage.quantity}x {baggage.formatted_type}
                    </Typography>
                  </Box>
                ))}
              </Box>
            );
          })()}

          {/* Carbon Emission Placeholder */}
          <Box display={"flex"} pt={3} gap={2} alignItems={"center"}>
            <img src="/images/leave-icon.svg" />
            <Typography className={styles.normalOption}>
              <span>{"nodata"} kg CO₂e</span>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FromAndToDetail;
