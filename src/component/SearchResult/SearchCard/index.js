import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setBookingDrawer,
  setOfferkeyforDetail,
  setSingleFlightData,
} from "@/src/store/slices/BookingflightSlice";

import {
  setSeeDetailButton,
} from "@/src/store/slices/passengerDrawerSlice";

import FromAndTo from "../FromAndTo";
import RightTopSection from "../RightTopSection";
import {
  RefreshHandle,
  setRefreshSearch,
} from "@/src/store/slices/GestMessageSlice";

const SearchCard = ({ key, offerData, offerkey }) => {
  const { flightExpire, isLoading } = useSelector((state) => state.getMessages);

  const dispatch = useDispatch();

  const HandleSelectDrawer = () => {
    // Dispatch flight detail and open drawer
    //Push GA event

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "engagement",
        event_label: "See Flight Details",
      });
    }
    if (offerkey) {
      dispatch(setOfferkeyforDetail(offerkey)); //  Store selected flight key for detail
      dispatch(setSeeDetailButton("Chat"));

      dispatch(setSingleFlightData(offerData)); //for data
      dispatch(setBookingDrawer(true)); //for drawer
    }
  };

  // selected flight detail get for send data in select button click
  const selectOfferKey = useSelector((state) => state.booking.selectOfferKey);
  //

  const selectedFlightKey = useSelector(
    (state) => state.booking.selectedFlightKey
  );

  // non redux direct select for show selected button
  const CartDetails = useSelector((state) => state.booking.getCartDetail);



  const isInCart = CartDetails?.items?.some(
    (item) => item?.offer_id === offerData?.id // or compare with offerkey if that's what API uses
  );

  const refreshHandle = () => {
    dispatch(RefreshHandle());
    dispatch(setRefreshSearch());
  };

  console.log("selectedFlight", selectOfferKey);

  return (
    <>
      {/* Open drawer only for the selected flight */}

      <Box
        className={`${searchResultStyles.flightOfferCard} ${offerData?.slices.length > 1
            ? searchResultStyles.Return
            : searchResultStyles.Oneway
          }`}
      >
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
            <Box
              className={searchResultStyles.Box}
              display={"flex"}
              sx={{
                flexDirection: { xs: "column", lg: "column", md: "column" },
              }}
              justifyContent={"center"}
              height={"100%"}
            >
              {flightExpire?.status ? (
                <>
                  <Box
                    className=""
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
                    <Box width={"100%"} whiteSpace={"nowrap"}>
                      <Button
                        onClick={refreshHandle}
                        className={
                          " w-100 btn btn-border btn-round xs btn-md f12 sm " +
                          searchResultStyles.selectFlightBtn
                        }
                      // onClick={HandleSelectDrawer}
                      >
                        {isLoading ? (
                          <>
                            <CircularProgress
                              className="basecolor1"
                              size={15}
                            />
                          </>
                        ) : (
                          <>
                            <img src="/images/refresh-icon.svg" />
                            <span>Refresh results</span>
                          </>
                        )}
                      </Button>
                    </Box>
                  </Box>
                </>
              ) : (
                <>

                  <RightTopSection
                    offerkey={offerkey}
                    SelectDrawer={HandleSelectDrawer}
                    offerData={offerData}
                    selectedFlightKey={selectedFlightKey}
                    isInCart={isInCart} // only true for the flight in cart
                  />
                  {/*  */}

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
