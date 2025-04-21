import { Box, Typography, Avatar } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

const FromAndTo = ({ offerData }) => {
  return (
    <>
      {offerData?.slices.map((slice, index) => (
        <>
          <Box className={searchResultStyles.FromAndToRow + " FromAndToGrid"}>
            <Box className={searchResultStyles.rowExtraInfo}>
              <Box>
                <Typography className="f12 mb-0 bold black ">
                  {offerData?.owner?.name}
                </Typography>
                <Typography
                  textTransform={"capitalize"}
                  className="f12 mb-0 bold gray "
                >
                  {[
                    ...new Set(
                      slice?.segments
                        ?.flatMap((segment) =>
                          segment?.passengers?.map((p) => p?.cabin_class)
                        )
                        ?.filter(Boolean)
                    ),
                  ]
                    .join(", ")
                    .replace(/\b\w/g, (c) => c.toUpperCase()) ||
                    "No Cabin Info"}
                </Typography>
              </Box>
              <Box
                className={StyleSheet.RightCol}
                display={"flex"}
                alignItems={"center"}
              >
                {/* <Box display={"flex"} gap={2}>
                <Box display={"flex"} alignItems={"center"}>
                  <img src={"/images/checkout/carryon-bagg.svg"} />
                  <Typography className={searchResultStyles.normalOption}>
                    <span> 2outb pieces</span>
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <img src="/images/leave-icon.svg" />
                  <Typography className={searchResultStyles.normalOption}>
                    <span> {offerData?.total_emissions_kg} kg CO₂e</span>
                  </Typography>
                </Box>
              </Box> */}

                <Box
                  display={"flex"}
                  // sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
                  gap={2}
                >
                  {offerData?.slices.length > 1 ? ( // Only show for round trips
                    index === 0 ? (
                      <Box>
                        <Box display={"flex"}>
                          <Typography
                            className={
                              searchResultStyles.onewayReturn +
                              " btn btn-xs btn-gray "
                            }
                          >
                            Outbound
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <Box display={"flex"}>
                          <Typography
                            className={
                              searchResultStyles.onewayReturn +
                              " btn btn-xs btn-gray"
                            }
                          >
                            Return
                          </Typography>
                        </Box>
                      </Box>
                    )
                  ) : (
                    <>
                      <Box
                        sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
                        gap={2}
                      >
                        {(() => {
                          const baggageMap = new Map();

                          offerData?.slices.forEach((slice) => {
                            slice?.segments?.forEach((segment) => {
                              segment?.passengers?.forEach((passenger) => {
                                passenger?.baggages?.forEach((baggage) => {
                                  const key = `${baggage.type}-${baggage.formatted_type}`;
                                  if (!baggageMap.has(key)) {
                                    baggageMap.set(key, { ...baggage });
                                  }
                                });
                              });
                            });
                          });

                          const uniqueBaggages = Array.from(
                            baggageMap.values()
                          );
                          return (
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                              {uniqueBaggages.map((baggage, index) => (
                                <Box
                                  key={index}
                                  display="flex"
                                  gap={1}
                                  alignItems="center"
                                >
                                  <Box
                                    className={searchResultStyles.BaggageIcon}
                                    style={{ opacity: 0.7 }}
                                  >
                                    <img
                                      width={11}
                                      src={
                                        baggage?.type === "checked"
                                          ? "/images/checkout/checked-bagg.svg"
                                          : "/images/checkout/carryon-bagg.svg"
                                      }
                                    />
                                  </Box>
                                  <Typography className={" basecolor f11"}>
                                    {baggage.quantity}x {baggage.formatted_type}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          );
                        })()}

                        <Box display={"flex"} alignItems={"center"}>
                          <img src="/images/leave-icon.svg" />
                          <Typography
                            className={searchResultStyles.normalOption}
                          >
                            <span>
                              {" "}
                              {offerData?.total_emissions_kg} kg CO₂e
                            </span>
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  )}
                  {/*  */}
                </Box>
              </Box>
            </Box>
            <Box
              className={searchResultStyles.fromAndToDetail}
              key={index}
              display="flex"
              alignItems="center"
              gap={2}
              // sx={{
              //   mt: { xs: index === 0 ? 2 : 0, md: index === 0 ? 3 : 0 },
              // }}
            >
              {/* Airline Logo */}
              <Box
                className={searchResultStyles.logoCol}
                sx={{ mr: { xs: 0, sm: 1, md: 1 } }}
              >
                <Avatar
                  src={offerData?.owner?.logo_symbol_url}
                  alt={offerData?.owner?.name}
                  className={searchResultStyles.airlineLogo}
                />
              </Box>

              {/* Flight Details */}
              <Box className={`${searchResultStyles.FlightTimingsCol} w-100`}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2} // Optional spacing
                >
                  {/* Departure Time & Code */}
                  <Box className={searchResultStyles.Timings}>
                    <Typography
                      className={searchResultStyles.flightDay + "  gray"}
                    >
                      {new Date(slice.departing_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                        }
                      )}
                    </Typography>
                    <Typography className={searchResultStyles.flightTime}>
                      {new Date(slice.departing_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                    <Typography
                      className={searchResultStyles.flightRoute + " bold f12"}
                    >
                      {slice.origin.iata_code}
                    </Typography>
                  </Box>

                  {/* Flight Duration with Dotted Line */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    flex={1}
                    className={searchResultStyles.flightDurationBox}
                  >
                    <Typography className={" gray f12"}>
                      {slice.duration}
                    </Typography>

                    {/* Dotted Line */}
                    <Box
                      className={searchResultStyles.SearchDivider}
                      width="100%"
                      my={2}
                    >
                      <Box className={searchResultStyles.dots}>
  {slice.segments?.length > 1 && (
    <>
      {Array.from({ length: slice.segments.length - 1 }).map((_, index) => (
        <Box key={index}>
          <Box className={searchResultStyles.dot}></Box>
        </Box>
      ))}
    </>
  )}
</Box>

                    </Box>

                    <Typography
                      className={
                        searchResultStyles.flightDuration + " semibold gray f12"
                      }
                    >
                      {slice.segments?.length === 1 ? (
                        "Direct"
                      ) : (
                        <>
                          <span className="red">
                            {slice.segments.length - 1} stop
                          </span>
                          {slice.segments.slice(0, -1).map((segment) => (
                            <> {segment.destination.iata_code}</>
                          ))}
                          {slice.segments.length - 1 > 1 ? "s" : ""}
                        </>
                      )}
                    </Typography>
                  </Box>

                  {/* Arrival Time & Code */}
                  <Box
                    textAlign={"right"}
                    className={searchResultStyles.Timings}
                  >
                    <Typography
                      className={searchResultStyles.flightDay + "  gray"}
                    >
                      {new Date(slice.arriving_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </Typography>

                    <Typography className={searchResultStyles.flightTime}>
                      {new Date(slice.arriving_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                    <Typography
                      className={searchResultStyles.flightRoute + " bold f12"}
                    >
                      {slice.destination.iata_code}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ))}
    </>
  );
};

export default FromAndTo;
