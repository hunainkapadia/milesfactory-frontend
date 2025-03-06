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
import {closeDrawer, fetchflightDetail, setOpenDrawer} from "@/src/store/slices/BookingflightSlice";

import { useEffect, useState } from "react";
import BookingDrawer from "../../Checkout/BookingDrawer/BookingDrawer";

const SearchCard = ({ offerData, keyindex }) => {
  
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
  
  const HandleSelectDrawer = () => {
    console.log("Opening Drawer for:", offerData.id, keyindex);
    if (SelectedFlightId === keyindex) {
      console.log("Drawer is already open for this flight.");
      return;
    }
  
    // Dispatch flight detail and open drawer
    dispatch(fetchflightDetail(offerData.id)); // Use offerData.id instead of keyindex
    dispatch(setOpenDrawer(true)); // Add a new action to open the drawer
  };

  return (
    <>
      {/* Open drawer only for the selected flight */}
      {SelectedFlightId && (
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
                onClick={HandleSelectDrawer}
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
