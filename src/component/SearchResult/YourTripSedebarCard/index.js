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

const YourTripSedebarCard = ({ offerData, FlightExpire }) => {
  useEffect(() => {
    console.log("offerDataofferData");
  }, []);
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

  const SearchHistoryGet = useSelector((state) => state.getMessages.SearchHistory);
  const SearchHistorySend = useSelector((state) => state.sendMessage.SearchHistory);
  const SearchHistory = SearchHistorySend || SearchHistoryGet;

  console.log("SearchHistorySend", SearchHistory);

  return (
    <>
      {/* Open drawer only for the selected flight */}
      {SearchHistory ? (
        <Box className={TripStyles.Header2 + " "}>
          <Box>
            <h4 className="regular mb-0">
              {SearchHistory?.from_title} to {SearchHistory?.to_title}
            </h4>
          </Box>
          <Box className=" " mb={2}>
            <Typography className=" f12 black semibold">
              {new Date(SearchHistory?.departure_date).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                }
              )}
              {" - "}
              {new Date(SearchHistory?.arrival_date).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                }
              )}
            </Typography>
            <Typography className=" gray mb-0 f12">
              Return, {SearchHistory.adults} Travellers
            </Typography>
          </Box>
        </Box>
      ) : (
        ""
      )}
      {offerData ? (
        <>
          <Box className={`${TripStyles.flightOfferCard}`}>
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
                              className=" semibold f12"
                            >
                              <span>Flight details</span>
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
                              {/* Dotted Line */}
                              <Box className={TripStyles.divider} py={0.5}>
                                <img src="/images/plan-icon-sm.svg" />
                              </Box>
                              <Typography className={" gray f12"}>
                                {slice.duration}
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
          <Box display={"none"} flexDirection={"column"} gap={2}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Typography className="bold">Travellers</Typography>
                <Typography className="gray">
                  Lucia Abella, Mike Oleg
                </Typography>
              </Box>
              <Box>
                <i className="fa f20 fa-angle-right basecolor1"></i>
              </Box>
            </Box>
            {/*  */}
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Typography className="bold">Seats</Typography>
                <Typography className="gray">
                  Outbound: 40E, 40F / Return: predefined
                </Typography>
              </Box>
              <Box>
                <i className="fa f20 fa-angle-right basecolor1"></i>
              </Box>
            </Box>
            {/*  */}
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Typography className="bold">Extra luggage</Typography>
                <Typography className="gray">
                  Outbound: 1 carry-on / Return: 1 carry-on
                </Typography>
              </Box>
              <Box>
                <i className="fa f20 fa-angle-right basecolor1"></i>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box display={"flex"} alignItems={"center"} mb={2}>
              <Box>
                <h4 className="bold mb-0">
                  {currencySymbols[offerData?.tax_currency] ||
                    offerData?.tax_currency}{" "}
                  {Math.round(offerData?.total_amount)}
                </h4>
                <Typography className="gray f12">
                  {currencySymbols[offerData?.tax_currency] ||
                    offerData?.tax_currency}{" "}
                  {Math.round(offerData?.per_passenger_amount)} per person
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
