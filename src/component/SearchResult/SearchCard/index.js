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

const SearchCard = ({ offerData, offerkey }) => {
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

  return (
    <>
      {/* Open drawer only for the selected flight */}

      <Card className={searchResultStyles.flightOfferCard}>
        <CardContent className="p-0">
          <Grid container spacing={4}>
            <Grid item xs={9}>
              {offerData?.slices.map((slice, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  mb={index === 0 ? 2 : 0}
                >
                  {/* Airline Logo */}
                  <Box sx={{ mr: { xs: 0, sm: 4, md: 4 } }}>
                    <Avatar
                      src={offerData?.owner?.logo_symbol_url}
                      alt={offerData?.owner?.name}
                      className={searchResultStyles.airlineLogo}
                    />
                  </Box>

                  {/* Flight Details */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                  >
                    {/* Departure Time & Code */}
                    <Box
                      textAlign="center"
                      flex={1}
                      className={searchResultStyles.Timings}
                    >
                      <Typography className={searchResultStyles.flightTime}>
                        {new Date(slice.departing_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                      <Typography className={searchResultStyles.flightRoute}>
                        {slice.origin.iata_code}
                      </Typography>
                    </Box>

                    {/* Separator */}
                    <Box
                      sx={{ display: { xs: "none", md: "block" } }}
                      className={searchResultStyles.separater}
                      flex={1}
                      textAlign="center"
                    >
                      <span></span>
                    </Box>

                    {/* Flight Duration */}
                    <Box
                      textAlign="center"
                      className={searchResultStyles.flightDurationBox}
                    >
                      <Typography
                        className={searchResultStyles.flightDuration + " "}
                      >
                        {slice.segments?.length > 1 ? "Stopover" : "Direct"}
                      </Typography>
                      <Typography className={searchResultStyles.flightDuration}>
                        {slice.duration}
                      </Typography>
                    </Box>

                    {/* Separator */}
                    <Box
                      sx={{ display: { xs: "none", md: "block" } }}
                      className={searchResultStyles.separater}
                      flex={1}
                      textAlign="center"
                    >
                      <span></span>
                    </Box>

                    {/* Arrival Time & Code */}
                    <Box
                      textAlign="center"
                      flex={1}
                      className={searchResultStyles.Timings}
                    >
                      <Typography className={searchResultStyles.flightTime}>
                        {new Date(slice.arriving_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                      <Typography className={searchResultStyles.flightRoute}>
                        {slice.destination.iata_code}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Grid>

            {/* Price Section */}
            <Grid display={"flex"} justifyContent={"end"} item xs={3}>
              <Box>
                <h3
                  className={
                    searchResultStyles.flightPriceSection +
                    " mb-0 basecolor1 semibold"
                  }
                >
                  €{offerData?.total_amount}
                </h3>
              </Box>
            </Grid>
          </Grid>

          {/* Extra Info bottom */}
          <Box className={searchResultStyles.rowExtraInfo}>
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Box display={"flex"} alignItems={"center"}>
                <Typography
                  className={`${searchResultStyles.normalOption}  ${searchResultStyles.fastestOption}`}
                >
                  <img src="/images/clock-icon.svg" />{" "}
                  <span>{`${offerData?.flight_type}`}</span>
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <img src="/images/leave-icon.svg" />
                <Typography className={searchResultStyles.normalOption}>
                  <span> {offerData?.total_emissions_kg} kg CO₂e</span>
                </Typography>
              </Box>
            </Box>
            {isPassenger ? (
              <Box display={"flex"} justifyContent={"flex-end"} pt={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  className={searchResultStyles.LableActive + " LableActive basecolor1"}
                >
                  <i className="fa fa-check"></i>
                  <span>Selected flight</span>
                </Box>
              </Box>
            ) : (
              <Box>
                <button
                  className={
                    "btn btn-primary btn-md " +
                    searchResultStyles.selectFlightBtn
                  }
                  onClick={HandleSelectDrawer}
                >
                  <Box display={"flex"} gap={2}>
                    <i className="fa fa-arrow-right"></i>{" "}
                    <Box
                      sx={{ display: { md: "block", sm: "block", xs: "none" } }}
                    >
                      {" "}
                      Select flight
                    </Box>
                  </Box>
                </button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SearchCard;
