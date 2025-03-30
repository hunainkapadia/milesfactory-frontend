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
  bookFlight,
  closeDrawer,
  fetchflightDetail,
  setflightDetail,
  setOpenDrawer,
  setSelectFlightKey,
} from "@/src/store/slices/BookingflightSlice";

import { useEffect, useState } from "react";
import BookingDrawer from "../../Checkout/BookingDrawer/BookingDrawer";
import { currencySymbols } from "@/src/utils/utils";
import SearchBaggages from "../SearchBaggages";
import { PassengerForm, setisLoading } from "@/src/store/slices/passengerDrawerSlice";
import { setMessage } from "@/src/store/slices/sendMessageSlice";
import FromAndTo from "../FromAndTo";

const SearchCard = ({ offerData, offerkey, FlightExpire }) => {
  const dispatch = useDispatch();

  
  const HandleSelectDrawer = () => {
    // Dispatch flight detail and open drawer
    if (offerkey) {
      console.log("offerkey000", offerkey);
      
      dispatch(setOpenDrawer(offerkey)); //setSelectFlightKey empty then close drawer
      dispatch(setflightDetail(offerData)); // Store flight details
    }
  };
  const isPassenger = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );
  console.log("isPassenger", offerData);
  
  // selected flight detail get for send data in select button click
  const flightDetail = useSelector((state) => state.booking.flightDetail);
  const handleBookFlight = () => {
    if (offerkey) {
      dispatch(setflightDetail(offerData)); // Store flight details
    }
    dispatch(setisLoading())
      dispatch(setflightDetail(offerData)); //dispatch selected flight detail
      dispatch(PassengerForm())
      if (flightDetail?.id) {
        dispatch(bookFlight(flightDetail.id)); // Pass flight ID to bookFlight
      } else {
        ""
      }
      dispatch(setMessage({ ai: { response: "passengerFlowActive" } })); //this si message trigger passenger flow active
  };

  return (
    <>
      {/* Open drawer only for the selected flight */}

      <Box className={`${searchResultStyles.flightOfferCard}`}>
        <Grid container>
          <Grid className={searchResultStyles.CardLeft} lg={9} md={9} xs={12}>
            {/* footer */}
            {/* FromAndTo with logo */}
              <FromAndTo offerData={offerData} />
          </Grid>

          {/* Price Section */}
          <Grid
            className={searchResultStyles.CardRight}
            width={"100%"}
            lg={3}
            md={3}
            gap={2}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <SearchBaggages offerData={offerData} />
            </Box>
            <Box
              display={"flex"}
              sx={{ flexDirection: { xs: "row", lg: "column", md: "column" } }}
              justifyContent={"space-between"}
              height={"100%"}
            >
              {FlightExpire ? (
                <>
                  <Box
                    className="aa"
                    display={"flex"}
                    height={"100%"}
                    width={"100%"}
                    sx={{
                      flexDirection: { xs: "row", md: "column", lg: "column" },
                    }}
                    justifyContent={"space-between"}
                    alignItems={"center"}
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
                          " w-100 btn btn-border btn-round btn-md f12 " +
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
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <SearchBaggages SelectDrawer={HandleSelectDrawer} offerData={offerData} />
                  </Box>
                  {/*  */}
                  <Box
                    width={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={3}
                  >
                    <Box>
                      <h3
                        className={
                          searchResultStyles.flightPriceSection +
                          " mb-0 black exbold"
                        }
                      >
                        {currencySymbols[offerData?.tax_currency] ||
                          offerData?.tax_currency}{" "}
                        {Math.round(offerData?.total_amount)}
                      </h3>
                      <Typography className=" f12 gray">
                        {currencySymbols[offerData?.tax_currency] ||
                          offerData?.tax_currency}{" "}
                        340 per person
                      </Typography>
                    </Box>
                    {!isPassenger ? (
                      <Box width={"100%"}>
                        <button
                          className={
                            "w-100 btn btn-primary btn-round btn-md " +
                            searchResultStyles.selectFlightBtn
                          }
                          onClick={handleBookFlight}
                        >
                          Select
                        </button>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
        {/* Extra Info bottom */}
      </Box>
    </>
  );
};

export default SearchCard;
