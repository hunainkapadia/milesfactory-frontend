import {
  Box,
  Card,
  Typography,
  Avatar,
  CardContent,
  Grid,
} from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
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

const SearchCard = ({ offerData, offerkey, FlightExpire }) => {

  const dispatch = useDispatch();

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
  console.log("isPassenger", offerData);

  return (
    <>
      {/* Open drawer only for the selected flight */}

      <Box className={`${searchResultStyles.flightOfferCard}`}>
        <Grid container>
          <Grid className={searchResultStyles.CardLeft} lg={9} md={9}>
            {/* footer */}
            {/*  */}
            {offerData?.slices.map((slice, index) => (
              <>
                <Box className={searchResultStyles.rowExtraInfo}>
                  <Box>
                    <Typography className="f12 mb-0 bold black ">
                      {console.log("offerData111", offerData.slices)}
                      {offerData?.owner?.name}
                    </Typography>
                    <Typography
                      textTransform={"capitalize"}
                      className="f12 mb-0 bold gray "
                    >
                      {offerData?.flight_type}
                    </Typography>
                  </Box>
                  <Box display={"flex"} gap={2}>
                    <Box display={"flex"} alignItems={"center"}>
                      <img src={"/images/checkout/carryon-bagg.svg"} />
                      <Typography className={searchResultStyles.normalOption}>
                        <span> 2 pieces</span>
                      </Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <img src="/images/leave-icon.svg" />
                      <Typography className={searchResultStyles.normalOption}>
                        <span> {offerData?.total_emissions_kg} kg CO₂e</span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  className={searchResultStyles.fromAndToRow}
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  mb={index === 0 ? 3 : 0}
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
                  <Box
                    className={`${searchResultStyles.FlightTimingsCol} w-100`}
                  >
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
                          className={searchResultStyles.flightRoute + " f12"}
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
                        ></Box>

                        <Typography
                          className={
                            searchResultStyles.flightDuration + " semibold"
                          }
                        >
                          {console.log("slice1111", slice.segments)}

                          {slice.segments?.length === 1 ? (
                            "Direct"
                          ) : (
                            <>
                              <span className="red">
                                {slice.segments.length - 1} stop
                              </span>
                              {slice.segments.length - 1 > 1 ? "s" : ""} -{" "}
                              {slice.segments
                                .slice(0, -1) // get all segments *except* the last one
                                .map(
                                  (segment) =>
                                    `${segment.destination.city_name}, (${segment.destination.iata_code})`
                                )
                                .join(", ")}
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
                          {new Date(slice.arriving_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                            }
                          )}
                        </Typography>

                        <Typography className={searchResultStyles.flightTime}>
                          {new Date(slice.arriving_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography
                          className={searchResultStyles.flightRoute + " f12"}
                        >
                          {slice.destination.iata_code}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            ))}
            {/*  */}
          </Grid>

          {/* Price Section */}
          <Grid
            className={searchResultStyles.CardRight}
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
                        searchResultStyles.flightPriceSection +
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
                        searchResultStyles.selectFlightBtn
                      }
                      // onClick={HandleSelectDrawer}
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
                      searchResultStyles.flightPriceSection +
                      " mb-0 black exbold"
                    }
                  >
                    {currencySymbols[offerData?.tax_currency] || offerData?.tax_currency} {Math.round(offerData?.total_amount)}
                  </h3>
                  <Typography className=" f12 gray">
                  {currencySymbols[offerData?.tax_currency] || offerData?.tax_currency} 340 per person
                  </Typography>
                </Box>
                {!isPassenger ? (
                  <Box width={"100%"}>
                    <button
                      className={
                        "w-100 btn btn-primary btn-round btn-md " +
                        searchResultStyles.selectFlightBtn
                      }
                      onClick={HandleSelectDrawer}
                    >
                      Select
                    </button>
                  </Box>
                ) : (
                  ""
                )}
              </>
            )}
            {/* {isPassenger ? (
              <Box display={"flex"} pt={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  className={
                    searchResultStyles.LableActive + " LableActive basecolor1"
                  }
                >
                  <i className="fa fa-check"></i>
                  <span>Selected flight</span>
                </Box>
              </Box>
            ) : (
              ""
            )} */}
          </Grid>
        </Grid>
        {/* Extra Info bottom */}
      </Box>
    </>
  );
};

export default SearchCard;
