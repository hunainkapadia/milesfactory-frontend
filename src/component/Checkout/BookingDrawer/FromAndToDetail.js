import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const FromAndToDetail = ({
  SearchHistoryGet,
  getdata,
  logo,
  flightType,
  sliceLength,
  total_emissions,
}) => {
  const [flightDetailToggle, setflightDetailToggle] = useState({});

  
  
  const toggleBaggage = (index) => {
    setflightDetailToggle((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const flightDetail = !flightDetailToggle[flightType];
  
  console.log("sliceLength11", sliceLength);
  

  function getStopDetails(getdata) {
    let stops = 0;
    let stopAirports = [];

    if (getdata && getdata.segments) {
      stops = getdata.segments.length - 1;
      stopAirports = getdata.segments
        .slice(0, -1)
        .map((seg) => seg.destination.iata_code); // or seg.destination.city_name
    }

    return stops > 0
      ? `${stops} stop${stops > 1 ? "s" : ""} (${stopAirports.join(" - ")})`
      : "";
  }

  const firstSegment = getdata?.segments?.[0];
  const lastSegment = getdata?.segments?.[getdata?.segments?.length - 1];

  return (
    <>
      {/* === Header (One Way / Return + Flight Details Toggle) === */}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={styles.FromandToHeader}
      >
        {/* sliceLength <= 1 */}
        {getdata?.segments?.length > 1 ? (
          <>
            <Box display="flex">
              {sliceLength > 1 ? (
                <Typography className={styles.onewayReturn}>
                  {flightType}
                </Typography>
              ) : (
                ""
              )}
            </Box>
            <Box>
              <Box
                className="cursor-pointer text-decoration-none basecolor1 f12"
                onClick={() => toggleBaggage(flightType)}
              >
                <Box gap={2} alignItems="center" display="flex">
                  {flightDetail ? (
                    <>
                      <span>Flight details</span>
                      <i className="fa-angle-down fa fas"></i>
                    </>
                  ) : (
                    <>
                      <span>Flight details</span>
                      <i className="basecolor1 fa-angle-up fa fas"></i>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </>
        ) : null}
      </Box>

      {/* === Segment Details === */}
      <Box
        className={`${styles.fromAndToContainer} ${
          flightDetail ? styles.isBaggage : ""
        }`}
      >
        {flightDetail ? (
          <>
            {firstSegment && lastSegment && (
              <Box className={styles.fromAndToBody + " fromAndToBodyNosegment"}>
                <Box className={styles.fromAndToBodyTop}>
                  <Box className={styles.fromAndToRow}>
                    <Box
                      className={styles.fromAndToRowIn}
                      position="relative"
                      display="flex"
                      flexDirection="column"
                      gap={3}
                    >
                      {/* From */}
                      <Box
                        className={styles.FromRow}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box className={styles.Col1}>
                          <h5 className={styles.Country + " f12m mb-0"}>
                            {new Date(
                              firstSegment?.departing_at
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </h5>
                        </Box>
                        <Box className={styles.Col2}>
                          <h5 className={styles.Country + " f12m mb-0"}>
                            {firstSegment?.origin?.iata_code} (
                            {firstSegment?.origin?.city_name})
                          </h5>
                        </Box>
                        <Box className={styles.Col3}>
                          <Typography
                            className={styles.Dates + " semibold gray mb-0"}
                          >
                            {new Date(
                              firstSegment?.departing_at
                            ).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "2-digit",
                            })}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Flight Duration and Stops */}
                      <Box
                        className={styles.flightDurationRow + " gray"}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1}
                      >
                        <Box className={styles.Col1}>
                          <Typography className="f14 mb-0">
                            {firstSegment?.duration}
                          </Typography>
                        </Box>
                        <Box className={styles.Col2}>
                          {getdata.segments.length > 1 ? (
                            <>
                              <Typography className="f14 f12m red">
                                {getStopDetails(getdata)}
                              </Typography>
                            </>
                          ) : (
                            <>
                              {console.log("segment111", getdata?.segments)}
                              {getdata.segments.map((segment) => (
                                <div key={segment.id}>
                                  <Typography className="f14 mb-0">
                                    {segment.operating_carrier?.iata_code}-
                                    {segment.operating_carrier_flight_number}{" "}
                                    {segment.marketing_carrier?.name}
                                  </Typography>
                                  <Typography>
                                    {segment.passengers.map((getPassengers) => (
                                      <React.Fragment
                                        key={getPassengers.passenger_id}
                                      >
                                        {getPassengers?.cabin_class}
                                      </React.Fragment>
                                    ))}
                                  </Typography>
                                </div>
                              ))}
                            </>
                          )}
                        </Box>
                        <Box className={styles.Col3}>
                          <Box className={styles.airlineLogo + " imggroup"}>
                            <img src={logo} alt="Airline logo" />
                          </Box>
                        </Box>
                      </Box>

                      {/* To */}
                      <Box
                        className={styles.ToRow}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box className={styles.Col1}>
                          <h5 className={styles.Country + " f12m mb-0"}>
                            {new Date(
                              lastSegment?.arriving_at
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </h5>
                        </Box>
                        <Box className={styles.Col2}>
                          <h5 className={styles.Country + " f12m mb-0"}>
                            {lastSegment?.destination?.iata_code} (
                            {lastSegment?.destination?.city_name})
                          </h5>
                        </Box>
                        <Box className={styles.Col3}>
                          <Typography
                            className={styles.Dates + " semibold gray mb-0"}
                          >
                            {new Date(
                              lastSegment?.arriving_at
                            ).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "2-digit",
                            })}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </>
        ) : (
          <>
            {getdata?.segments?.length > 1 && (
              <Box
                className={
                  styles.multiSegmentDetails + " fromAndToBodyNosegment"
                }
              >
                {getdata?.segments?.map((segment, index) => (
                  <Box className={`${styles.fromAndToBody}`} key={index}>
                    {/* Layover Info */}
                    {segment?.stop_duration && (
                      <Box
                        px={3}
                        mt={1}
                        py={2}
                        className={styles.LayoverSection}
                        textAlign="center"
                      >
                        <Typography variant="body2" className="f12 mb-0">
                          <i
                            className="lightgray2 fa-clock fa"
                            style={{ marginRight: 4 }}
                          ></i>
                          <span className="basecolor">
                            {segment.stop_duration} layover in{" "}
                            {segment.origin.city_name} (
                            {segment.origin.iata_country_code})
                          </span>
                        </Typography>
                      </Box>
                    )}

                    {/* Flight Row */}
                    <Box className={styles.fromAndToBodyTop}>
                      <Box className={styles.fromAndToRow}>
                        <Box
                          className={styles.fromAndToRowIn}
                          position="relative"
                          display="flex"
                          flexDirection="column"
                          gap={3}
                        >
                          {/* From */}
                          <Box
                            className={styles.FromRow}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box className={styles.Col1}>
                              <h5 className={styles.Country + " f12m mb-0"}>
                                {new Date(
                                  segment?.departing_at
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </h5>
                            </Box>
                            <Box className={styles.Col2}>
                              <h5 className={styles.Country + " f12m mb-0"}>
                                {segment?.origin?.iata_code} (
                                {segment?.origin?.city_name})
                              </h5>
                            </Box>
                            <Box className={styles.Col3} display="flex" gap={4}>
                              <Typography
                                className={styles.Dates + " semibold gray mb-0"}
                              >
                                {new Date(
                                  segment?.departing_at
                                ).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "2-digit",
                                })}
                              </Typography>
                            </Box>
                          </Box>

                          {/* Duration + Carrier */}
                          <Box
                            className={styles.flightDurationRow + " gray"}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            gap={1}
                          >
                            <Box className={styles.Col1}>
                              <Typography className="f14 mb-0">
                                {segment?.duration}
                              </Typography>
                            </Box>
                            <Box className={styles.Col2}>
                              {getdata.segments.length > 1 ? (
                                <>
                                  <Typography
                                    className="Direct Flight

"
                                  >
                                    {getStopDetails(getdata)}
                                  </Typography>
                                </>
                              ) : (
                                <>
                                  <Typography className={"f14 mb-0"}>
                                    {segment.operating_carrier.iata_code}-
                                    {segment.operating_carrier_flight_number}{" "}
                                    {segment.marketing_carrier.name}
                                  </Typography>
                                  <Typography>
                                    {segment.passengers.map((getPassengers) => (
                                      <React.Fragment key={getPassengers.id}>
                                        {getPassengers?.cabin_class}
                                      </React.Fragment>
                                    ))}
                                  </Typography>
                                </>
                              )}
                            </Box>
                            <Box className={styles.Col3}>
                              <Box className={styles.airlineLogo + " imggroup"}>
                                <img src={logo} alt="Airline logo" />
                              </Box>
                            </Box>
                          </Box>

                          {/* To */}
                          <Box
                            className={styles.ToRow}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box className={styles.Col1}>
                              <h5 className={styles.Country + " f12m mb-0"}>
                                {new Date(
                                  segment?.arriving_at
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </h5>
                            </Box>
                            <Box className={styles.Col2}>
                              <h5 className={styles.Country + " f12m mb-0"}>
                                {segment?.destination?.iata_code} (
                                {segment?.destination?.city_name})
                              </h5>
                            </Box>
                            <Box className={styles.Col3} display="flex" gap={4}>
                              <Typography
                                className={styles.Dates + " semibold gray mb-0"}
                              >
                                {new Date(
                                  segment?.arriving_at
                                ).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "2-digit",
                                })}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>

      {/* === Baggage Info === */}
      <Box className={styles.fromAndToBodyBottom + " "}>
        <Box mb={2}>
          <Typography className="bold f12 mb-0 h4">
            Included in this ticket
          </Typography>
        </Box>

        {(() => {
          const baggageMap = new Map();

          getdata?.segments?.forEach((segment) => {
            segment?.passengers?.forEach((passenger) => {
              passenger?.baggages?.forEach((baggage) => {
                const key = `${baggage.type}-${baggage.formatted_type}`;
                if (!baggageMap.has(key)) {
                  baggageMap.set(key, { ...baggage });
                }
              });
            });
          });

          const uniqueBaggages = Array.from(baggageMap.values());
          return (
            <Box>
              {SearchHistoryGet?.adults && (
                <Box
                  display="flex"
                  gap={2}
                  alignItems="center"
                  mb={1}
                  className={styles.normalOption}
                >
                  <Box className={styles.BaggageIcon}>
                    <img width={14} src={"/images/user-sm.svg"} />
                  </Box>
                  <Typography className="f12">
                    {console.log("SearchHistoryGet")}
                    {SearchHistoryGet?.adults} adult
                    {SearchHistoryGet?.adults > 1 ? "s" : ""}
                  </Typography>
                </Box>
              )}
              {uniqueBaggages.map((baggage, index) => (
                <Box
                  key={index}
                  display="flex"
                  gap={2}
                  alignItems="center"
                  mb={1}
                  className={styles.normalOption}
                >
                  <Box className={styles.BaggageIcon}>
                    <img
                      width={14}
                      src={
                        baggage?.type === "checked"
                          ? "/images/checkout/checked-bagg.svg"
                          : "/images/checkout/carryon-bagg.svg"
                      }
                    />
                  </Box>
                  <Typography className="f12">
                    {baggage.quantity}x {baggage.formatted_type}
                  </Typography>
                </Box>
              ))}
            </Box>
          );
        })()}
      </Box>
    </>
  );
};

export default FromAndToDetail;
