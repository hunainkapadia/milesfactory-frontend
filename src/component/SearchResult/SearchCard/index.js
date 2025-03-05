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
import {closeDrawer, fetchflightDetail} from "@/src/store/slices/BookingflightSlice"
import BookingDrawer from "../../Checkout/BookingDrawer";
import { useEffect, useState } from "react";

const SearchCard = ({ offerData }) => {
  const dispatch = useDispatch()

  // Get Redux state
  // const selectedFlight = useSelector((state) => state.booking.selectedFlight);
  // const flightDetails = useSelector((state) => state.booking.flightDetails);
  // const isDrawerOpen = useSelector((state) => state.booking.isDrawerOpen);
  // const loading = useSelector((state) => state.booking.loading);


  // const handleCloseDrawer = () => {
  //   dispatch(resetSelectedFlight()); // Close the drawer
  // };

  const flightDetail = useSelector((state)=> state.booking.flightDetail);
  const SelectedFlightId = useSelector((state)=> state.booking?.selectedFlightId)
  const isDrawer = useSelector((state)=> state.booking.isDrawer);
  
  const HandleSelectFlight = () => {
    console.log("flightDetail");
  if (SelectedFlightId === offerData.id) {
  } else {
    dispatch(fetchflightDetail(offerData.id)); // Fetch details & open drawer
    console.log("Fetching Flight Details for:", offerData.id);
  }
};

  return (
    <>
      {/* Open drawer only for the selected flight */}
      {SelectedFlightId === offerData.id && (
        <BookingDrawer getFlightDetail={flightDetail} />
      )}

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
                  <Box mr={4}>
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
                    <Box textAlign="center" flex={1}>
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
                      className={searchResultStyles.separater}
                      flex={1}
                      textAlign="center"
                    >
                      <span></span>
                    </Box>

                    {/* Flight Duration */}
                    <Box textAlign="center" flex={1}>
                      <Typography className={searchResultStyles.flightDuration}>
                        {slice.segments?.length > 1 ? "Stopover" : "Direct"}
                      </Typography>
                      <Typography className={searchResultStyles.flightDuration}>
                        {slice.duration}
                      </Typography>
                    </Box>

                    {/* Separator */}
                    <Box
                      className={searchResultStyles.separater}
                      flex={1}
                      textAlign="center"
                    >
                      <span></span>
                    </Box>

                    {/* Arrival Time & Code */}
                    <Box textAlign="center" flex={1}>
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
              <Box className={searchResultStyles.flightPriceSection}>
                <h3 className={`mb-0 basecolor1 semibold`}>
                  €{offerData?.total_amount}
                </h3>
              </Box>
            </Grid>
          </Grid>

          {/* Extra Info bottom */}
          <Box className={searchResultStyles.rowExtraInfo}>
            <Box display={"flex"} alignItems={"center"}>
              <Typography
                className={`${searchResultStyles.normalOption}  ${searchResultStyles.fastestOption}`}
              >
                <img src="/images/clock-icon.svg" /> <span>Fastest option</span>
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Typography className={searchResultStyles.normalOption}>
                <img src="/images/handcarry-icon.svg" /> <span> pieces</span>
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Typography className={searchResultStyles.normalOption}>
                <img src="/images/handcarry-icon.svg" />{" "}
                <span> {offerData?.total_emissions_kg} kg CO₂e</span>
              </Typography>
            </Box>
            <Box>
              <button
                className={
                  "btn btn-primary btn-md " + searchResultStyles.selectFlightBtn
                }
                onClick={HandleSelectFlight}
              >
                <Box display={"flex"} gap={2}>
                  <i className="fa fa-arrow-right"></i>{" "}
                  <span> Select flight</span>
                </Box>
              </button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SearchCard;
