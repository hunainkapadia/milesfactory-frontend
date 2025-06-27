import {
  Box,
  Card,
  Typography,
  Avatar,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
// import TripStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDrawer,
  fetchflightDetail,
  setflightDetail,
  setOpenDrawer,
  setSelectFlightKey,
} from "@/src/store/slices/BookingflightSlice";

import { useEffect, useState } from "react";
import BookingDrawer from "../../Checkout/BookingDrawer/BookingDrawer";
import { currencySymbols } from "@/src/utils/utils";
import Link from "next/link";
import FilterParams from "../YourTripSidebar/FilterParams";

const YourTripSedebarCard = ({ offerData, FlightExpire, filterParams }) => {

  console.log("filterParams", filterParams?.isDirectFlight);
  
  const dispatch = useDispatch();
  const offerkey = offerData?.id;
  const HandleSelectDrawer = () => {
    // Dispatch flight detail and open drawer
    if (offerkey) {
      dispatch(setOpenDrawer(offerkey)); //setSelectFlightKey empty then close drawer
      dispatch(setflightDetail(offerData)); // Store flight details
    }
  };
  const isPassenger = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );

  const SearchHistoryGet = useSelector(
    (state) => state.getMessages.SearchHistory
  );
  const SearchHistorySend = useSelector(
    (state) => state.sendMessage?.SearchHistorySend
  );
  const SearchHistory = SearchHistorySend || SearchHistoryGet;

  console.log("SearchHistorySend", SearchHistory);
  
  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );

  const personQuantity = offerData?.passengers.length;
  const Passengers = Number(offerData?.per_passenger_amount) * personQuantity;
  const WithtaxAmount = Number(offerData?.tax_amount) + Passengers;
  const totalAmount = Math.round(WithtaxAmount);

  const validPassengers = GetViewPassengers?.filter(
    (p) => p.given_name && p.family_name
  );
  const totalTravelers = (SearchHistory.adults || 0) + (SearchHistory.children || 0) + (SearchHistory.infants || 0);

  return (
    <>
      {/* Open drawer only for the selected flight */}
      {SearchHistory ? (
        <Box
          mb={2}
          className={TripStyles.Header2 + " aaa"}
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <Box>
            <Box>
              <h4 className="regular mb-0">
                {SearchHistory?.from_title} to {SearchHistory?.to_title}
              </h4>
            </Box>
            <Box className=" ">
              <Typography className=" f12 black semibold">
                {SearchHistory?.departure_date ? (
                  <>
                    {new Date(SearchHistory?.departure_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )}
                  </>
                ) : (
                  ""
                )}
                {SearchHistory?.arrival_date ? (
                  <>
                    {" - "}
                    {new Date(SearchHistory.arrival_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )}
                  </>
                ) : (
                  ""
                )}
              </Typography>
              <Typography className=" gray mb-0 f12">
                {SearchHistory.flight_type == "round-trip"
                  ? "Return"
                  : "One way"}
                , {totalTravelers}{" "}
                {totalTravelers > 1 ? "Travellers" : "Traveller"}
              </Typography>
            </Box>
          </Box>

          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography className="f12 gray" component={"span"}>
              Reset{" "}
            </Typography>
            <img className="gray" src="/images/refresh-gray.svg" />
          </Box>
        </Box>
      ) : (
        ""
      )}

      {/* filter row */}
      <Box
        className={TripStyles.Header2 + " aaa"}
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        <FilterParams />

        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Typography className="f12 gray" component={"span"}>
            Clear filters
          </Typography>
        </Box>
      </Box>
      {/* filter row */}
      {offerData ? (
        <>
          <Box className={`${TripStyles.flightOfferCard}`} mt={2}>
            <Grid>
              <Grid className={TripStyles.CardLeft} lg={12} md={12}>
                {/* footer */}
                {/*  */}
                <Box>
                  {offerData?.slices.map((slice, index) => (
                    <>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        {index === 0 ? (
                          <Box display={"flex"}>
                            <Typography
                              className={
                                TripStyles.onewayReturn +
                                " btn btn-xs btn-black "
                              }
                            >
                              Outbound
                            </Typography>
                          </Box>
                        ) : (
                          <Box display={"flex"}>
                            <Typography
                              className={
                                TripStyles.onewayReturn +
                                " btn btn-xs btn-black"
                              }
                            >
                              Return
                            </Typography>
                          </Box>
                        )}
                        <Box style={{ cursor: "pointer" }}>
                          <Box
                            onClick={HandleSelectDrawer}
                            className="text-decoration-none cursor-pointer"
                          >
                            <Box
                              gap={1}
                              alignItems={"center"}
                              display={"flex"}
                              className=" basecolor1 semibold f12"
                            >
                              <span>See details</span>
                              <i className="fa-angle-right fa fas"></i>{" "}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      {/*  */}
                      <Box
                        className={TripStyles.fromAndToRow}
                        key={index}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        mt={2}
                      >
                        {/* Airline Logo */}

                        {/* Flight Details */}
                        <Box className={`${TripStyles.FlightTimingsCol} w-100`}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={2} // Optional spacing
                          >
                            {/* Departure Time & Code */}
                            <Box className={TripStyles.Timings}>
                              <Typography
                                className={TripStyles.flightDay + "  gray"}
                              >
                                {new Date(
                                  slice.departing_at
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                })}
                              </Typography>
                              <Typography className={TripStyles.flightTime}>
                                {new Date(
                                  slice.departing_at
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </Typography>
                              <Typography
                                className={TripStyles.flightRoute + " f12"}
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
                              className={TripStyles.flightDurationBox}
                            >
                              <Typography className={" gray f12"}>
                                {slice.duration}
                              </Typography>
                              {/* Dotted Line */}
                              <Box className={TripStyles.divider} py={0.5}>
                                <img
                                  src={
                                    slice.segments?.length === 1
                                      ? "/images/direct-plan-icon.svg"
                                      : "/images/stop-plan-icon.svg"
                                  }
                                />
                              </Box>
                              <Typography
                                className={
                                  TripStyles.flightDuration + " semibold"
                                }
                              >
                                {slice.segments?.length === 1 ? (
                                  "Direct"
                                ) : (
                                  <>
                                    <span className="red">
                                      {slice.segments.length - 1} stop
                                    </span>
                                    {slice.segments.length - 1 > 1 ? "s" : ""}
                                  </>
                                )}
                              </Typography>
                            </Box>

                            {/* Arrival Time & Code */}
                            <Box
                              textAlign={"right"}
                              className={TripStyles.Timings}
                            >
                              <Typography
                                className={TripStyles.flightDay + "  gray"}
                              >
                                {new Date(slice.arriving_at).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                  }
                                )}
                              </Typography>

                              <Typography className={TripStyles.flightTime}>
                                {new Date(slice.arriving_at).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  }
                                )}
                              </Typography>
                              <Typography
                                className={TripStyles.flightRoute + " f12"}
                              >
                                {slice.destination.iata_code}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      <Box py={2}>
                        <Divider />
                      </Box>
                    </>
                  ))}
                </Box>
                {/*  */}
              </Grid>

              {/* Price Section */}
              {/* <Grid
            className={TripStyles.CardRight}
            lg={3}
            md={3}
            alignItems={""}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            {FlightExpire ? (
              <>
                <Box
                  className="aa"
                  display={"flex"}
                  height={"100%"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  pt={0}
                  pb={1}
                >
                  <Box width={"100%"}>
                    <h3
                      className={
                        TripStyles.flightPriceSection +
                        " mb-0 gray regular"
                      }
                    >
                      Expired
                    </h3>
                    <Typography className=" f12 gray">
                      rates and availabilities
                    </Typography>
                  </Box>
                  <Box width={"100%"}>
                    <button
                      className={
                        "w-100 btn btn-border btn-round btn-md f12 " +
                        TripStyles.selectFlightBtn
                      }
                    >
                      <img src="/images/refresh-icon.svg" />
                      <span>Refresh results</span>
                    </button>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box width={"100%"}>
                  <h3
                    className={
                      TripStyles.flightPriceSection +
                      " mb-0 black exbold"
                    }
                  >
                    € {Math.round(offerData?.total_amount)}
                  </h3>
                  <Typography className=" f12 gray">
                    £ 340 per person
                  </Typography>
                </Box>
                <Box width={"100%"}>
                  <button
                    className={
                      "w-100 btn btn-primary btn-round btn-md " +
                      TripStyles.selectFlightBtn
                    }
                    onClick={HandleSelectDrawer}
                  >
                    Select
                  </button>
                </Box>
              </>
            )}
            
          </Grid> */}
            </Grid>
            {/* Extra Info bottom */}
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            {/*  */}
            {GetViewPassengers ? (
              <>
                {GetViewPassengers?.some(
                  (p) => p.given_name && p.family_name
                ) ? (
                  <>
                    <Box display={"flex"} flexDirection={"column"} gap={2}>
                      {validPassengers?.length ? (
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          gap={2}
                        >
                          <Box>
                            <Typography className="f12 bold">
                              Travellers
                            </Typography>
                            <Typography className="f12 gray">
                              {validPassengers?.map((p, i) => {
                                const isLast = i === validPassengers.length - 1;
                                return (
                                  <span key={i}>
                                    {p.given_name} {p.family_name}
                                    {!isLast && ", "}
                                  </span>
                                );
                              })}
                            </Typography>
                          </Box>
                          <Box>
                            <i className="fa f20 fa-angle-right basecolor1"></i>
                          </Box>
                        </Box>
                      ) : null}
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={2}
                    >
                      <Box>
                        <Typography className="f12  bold">
                          Included Baggage
                        </Typography>
                        <Typography className="f12 gray">
                          {(() => {
                            const baggageMap = new Map();

                            offerData?.slices.forEach((slice, sliceIndex) => {
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
                              <span>
                                {offerData?.slices.map((slice, sliceIndex) => {
                                  const sliceLabel =
                                    sliceIndex === 0 ? "Outbound" : "Return";
                                  const baggageSummary = uniqueBaggages
                                    .filter((baggage) => baggage.quantity > 0) // Filter out baggage with quantity 0
                                    .map(
                                      (baggage) =>
                                        `${baggage.quantity}x ${baggage.formatted_type}`
                                    )
                                    .join(", ");

                                  return (
                                    <span key={sliceIndex}>
                                      <strong>{sliceLabel}:</strong>{" "}
                                      {baggageSummary || "No baggage info"}
                                      {sliceIndex === 0 &&
                                      offerData?.slices.length > 1
                                        ? " / "
                                        : ""}
                                    </span>
                                  );
                                })}
                              </span>
                            );
                          })()}
                        </Typography>
                      </Box>
                      <Box>
                        <i className="fa f20 fa-angle-right basecolor1"></i>
                      </Box>
                    </Box>
                    <Box py={2}>
                      <Divider />
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </Box>
          <Box className={TripStyles.PaymentRow + " "}>
            <Box display={"flex"} alignItems={"center"}>
              <Box>
                <h4 className="exbold mb-0">
                  {currencySymbols[offerData?.tax_currency] ||
                    offerData?.tax_currency}
                  {Math.round(offerData?.per_passenger_amount)}
                </h4>
                <Typography className="gray f12">
                  {currencySymbols[offerData?.tax_currency] ||
                    offerData?.tax_currency}
                  {Math.round(offerData?.total_amount)} total
                </Typography>
              </Box>
            </Box>
          </Box>
          {/*  */}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default YourTripSedebarCard;
