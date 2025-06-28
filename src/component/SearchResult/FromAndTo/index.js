import { Box, Typography, Avatar, Divider, Tooltip } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { currencySymbols } from "@/src/utils/utils";

const FromAndTo = ({ offerData }) => {
  return (
    <>
      {offerData?.slices?.slice(0, 1).map((slice, index) => (
        <>
          <Box
            component={"section"}
            className={searchResultStyles.rowExtraInfo}
          >
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Box display={"flex"} alignItems={"center"} gap={"3px"}>
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
                    .map(
                      (cabin) =>
                        cabin
                          .replace(/\b\w/g, (c) => c.toUpperCase()) // Capitalize first letters
                          .slice(0, 3) // Show only first 3 letters
                    )
                    .join(", ") || "No Cabin Info"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="5px">
                {/* Refund with penalty */}
                {offerData?.conditions?.refund_before_departure?.allowed ===
                  true &&
                  offerData?.conditions?.refund_before_departure
                    ?.penalty_amount > 0 && (
                    <Tooltip
                      title={`Refundable - ${
                        currencySymbols[
                          offerData?.conditions?.refund_before_departure
                            ?.penalty_currency
                        ]
                      } ${
                        offerData?.conditions?.refund_before_departure
                          ?.penalty_amount
                      } penalty applies`}
                      placement="top"
                      arrow
                      enterTouchDelay={0}
                      leaveTouchDelay={3000}
                    >
                      <Box
                        className="imggroup"
                        sx={{ display: "inline-block", pointerEvents: "auto", opacity: 0.5 }}
                        
                      >
                        <img
                          width={11}
                          src="/images/refund-with-fee.svg"
                          alt="Refund with Fee"
                        />
                      </Box>
                    </Tooltip>
                  )}

                {/* Free refund */}
                {offerData?.conditions?.refund_before_departure?.allowed ===
                  true &&
                  offerData?.conditions?.refund_before_departure
                    ?.penalty_amount === 0 && (
                    <Tooltip
                      title="Free refund before departure"
                      placement="top"
                      arrow
                      enterTouchDelay={0}
                      leaveTouchDelay={3000}
                    >
                      <Box
                        className="imggroup"
                        sx={{ display: "inline-block", pointerEvents: "auto", opacity: 0.5 }}
                        
                      >
                        <img
                          width={11}
                          src="/images/refund-icon.svg"
                          alt="Free Refund"
                        />
                      </Box>
                    </Tooltip>
                  )}

                {/* Change with penalty */}
                {offerData?.conditions?.change_before_departure?.allowed ===
                  true &&
                  offerData?.conditions?.change_before_departure
                    ?.penalty_amount > 0 && (
                    <Tooltip
                      title={`Changes allowed - ${
                        currencySymbols[
                          offerData?.conditions?.change_before_departure
                            ?.penalty_currency
                        ]
                      } ${
                        offerData?.conditions?.change_before_departure
                          ?.penalty_amount
                      } penalty applies`}
                      placement="top"
                      arrow
                      enterTouchDelay={0}
                      leaveTouchDelay={3000}
                    >
                      <Box
                        className="imggroup"
                        sx={{ display: "inline-block", pointerEvents: "auto", opacity: 0.5 }}
                        
                      >
                        <img
                          width={11}
                          src="/images/flexible-change-with-fee.svg"
                          alt="Change with Fee"
                        />
                      </Box>
                    </Tooltip>
                  )}

                {/* Free change */}
                {offerData?.conditions?.change_before_departure?.allowed ===
                  true &&
                  offerData?.conditions?.change_before_departure
                    ?.penalty_amount === 0 && (
                    <Tooltip
                      title="Changes allowed - no fee"
                      placement="top"
                      arrow
                      enterTouchDelay={0}
                      leaveTouchDelay={3000}
                    >
                      <Box
                        className="imggroup"
                        sx={{ display: "inline-block", pointerEvents: "auto", opacity: 0.5 }}
                        
                      >
                        <img
                          width={11}
                          src="/images/flexible-change-icon.svg"
                          alt="Free Change"
                        />
                      </Box>
                    </Tooltip>
                  )}
              </Box>
            </Box>
            <Box
              className={searchResultStyles.RightColBaggage}
              display={"flex"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                // sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
                gap={2}
              >
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

                    const uniqueBaggages = Array.from(baggageMap.values());
                    return (
                      <Box display={"flex"} alignItems={"center"} gap={2}>
                        {uniqueBaggages.map((baggage, index) => (
                          <Box
                            key={index}
                            display="flex"
                            gap={0.5}
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
                              x{baggage.quantity}
                              {/* {baggage.formatted_type} */}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    );
                  })()}

                  {/* <Box display={"flex"} alignItems={"center"}>
                      <img src="/images/leave-icon.svg" />
                      <Typography
                        className={searchResultStyles.normalOption}
                      >
                        <span>
                          {" "}
                          {offerData?.total_emissions_kg} kg CO₂e
                        </span>
                      </Typography>
                    </Box> */}
                </Box>
                {/*  */}
              </Box>
            </Box>
          </Box>
          <Box width="100%" pt={"17px"}></Box>
          {index !== 0 && (
            <Box width="100%" py={"12px"}>
              <Divider />
            </Box>
          )}
        </>
      ))}

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          flexDirection: { lg: "row", md: "row", xs: "column" },
          gap: { lg: "18px", md: "18px", xs: 2 },
        }}
        width={"100%"}
      >
        {/* Airline Logo */}
        {offerData?.slices?.length > 0 &&
          offerData.slices.slice(0, 1).map((slice, index) => {
            const isRoundTrip = offerData.slices.length === 2;
            return (
              <Box
                key={index}
                className={`${searchResultStyles.logoCol} ${
                  isRoundTrip
                    ? searchResultStyles.round
                    : searchResultStyles.oneway
                }`}
                sx={{ display: { lg: "block", md: "block", xs: "none" } }}
              >
                <Avatar
                  src={offerData?.owner?.logo_symbol_url}
                  alt={offerData?.owner?.name}
                  className={searchResultStyles.airlineLogo}
                />
              </Box>
            );
          })}

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{
            flexDirection: { lg: "row", md: "row", xs: "column" },
            gap: { lg: 3, md: 3, xs: 2 },
          }}
          width={"100%"}
        >
          {offerData?.slices.map((slice, index) => (
            <>
              <Box
                className={searchResultStyles.FromAndToRow + " FromAndToGrid"}
              >
                <Box
                  component={"section"}
                  className={searchResultStyles.fromAndToDetail}
                  key={index}
                  display="flex"
                  alignItems="center"
                  justifyContent={"flex-start"}
                  sx={{ gap: { xs: "11px" } }}
                  // sx={{
                  //   mt: { xs: index === 0 ? 2 : 0, md: index === 0 ? 3 : 0 },
                  // }}
                >
                  {/* Flight Details */}
                  <Box
                    className={searchResultStyles.logoCol}
                    sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                  >
                    <Avatar
                      src={offerData?.owner?.logo_symbol_url}
                      alt={offerData?.owner?.name}
                      className={searchResultStyles.airlineLogo}
                    />
                  </Box>
                  <Box
                    className={`${searchResultStyles.FlightTimingsCol} w-100`}
                  >
                    <Box
                      className={searchResultStyles.FromTopRow}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
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
                      <Typography
                        lineHeight={1}
                        className={searchResultStyles.Duration + " gray"}
                      >
                        {slice.duration}
                      </Typography>
                      <Typography
                        className={searchResultStyles.flightDay + "  gray"}
                      >
                        {new Date(slice.arriving_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                          }
                        )}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={2} // Optional spacing
                    >
                      {/* Departure Time & Code */}
                      <Box className={searchResultStyles.Timings}>
                        <Typography className={searchResultStyles.flightTime}>
                          {new Date(slice.departing_at)
                            .toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                            .replace(/ AM| PM/, "")}
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
                        {/* Dotted Line */}
                        <Box
                          className={searchResultStyles.SearchDivider}
                          width="100%"
                          my={2}
                        >
                          <Box className={searchResultStyles.dots}>
                            {slice.segments?.length > 1 && (
                              <>
                                {Array.from({
                                  length: slice.segments.length - 1,
                                }).map((_, index) => (
                                  <Box key={index}>
                                    <Box
                                      className={searchResultStyles.dot}
                                    ></Box>
                                  </Box>
                                ))}
                              </>
                            )}
                          </Box>
                        </Box>
                      </Box>

                      {/* Arrival Time & Code */}
                      <Box
                        textAlign={"right"}
                        className={searchResultStyles.Timings}
                      >
                        <Typography className={searchResultStyles.flightTime}>
                          {new Date(slice.arriving_at)
                            .toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                            .replace(/ AM| PM/, "")}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      className={searchResultStyles.ToBottomRow}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography
                        className={searchResultStyles.flightRoute + "  f10"}
                      >
                        {slice.origin.iata_code}
                      </Typography>
                      <Typography
                        className={
                          searchResultStyles.destination +
                          " semibold gray"
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
                              <> - {segment.destination.iata_code}</>
                            ))}
                            {slice.segments.length - 1 > 1 ? "s" : ""}
                          </>
                        )}
                      </Typography>
                      <Typography
                        className={searchResultStyles.flightRoute + "  f10"}
                      >
                        {slice.destination.iata_code}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default FromAndTo;
