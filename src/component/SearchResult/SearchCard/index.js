import {
  Box,
  Card,
  Typography,
  Avatar,
  CardContent,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  bookFlight,
  closeDrawer,
  fetchflightDetail,
  setBookingDrawer,
  setflightDetail,
  setLoading,
  setOfferkey,
  setOfferkeyforDetail,
  setOpenDrawer,
  setSelectedFlightKey,
  setSelectFlightKey,
  setSingleFlightData,
} from "@/src/store/slices/BookingflightSlice";

import { useEffect, useState } from "react";
import BookingDrawer from "../../Checkout/BookingDrawer/BookingDrawer";
import { currencySymbols, event } from "@/src/utils/utils";
import {
  PassengerForm,
  setSeeDetailButton,
} from "@/src/store/slices/passengerDrawerSlice";
import { setMessage } from "@/src/store/slices/sendMessageSlice";
import FromAndTo from "../FromAndTo";
import RightTopSection from "../RightTopSection";
import {
  RefreshHandle,
  setRefreshSearch,
} from "@/src/store/slices/GestMessageSlice";
import { setChatscroll } from "@/src/store/slices/Base/baseSlice";

const SearchCard = ({ key, offerData, offerkey, FlightExpire }) => {
  const dispatch = useDispatch();

  const HandleSelectDrawer = () => {
    // Dispatch flight detail and open drawer
    //Push GA event

    event({
      action: "click",
      category: "engagement",
      label: "See Flight Details",
    });
    if (offerkey) {
      dispatch(setOfferkeyforDetail(offerkey)); //  Store selected flight key for detail
      dispatch(setSeeDetailButton("Chat"));


      dispatch(setSingleFlightData(offerData)) //for data
      dispatch(setBookingDrawer(true)); //for drawer
    }
  };
  const isPassenger = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );

  // selected flight detail get for send data in select button click
  const flightDetail = useSelector((state) => state.booking.flightDetail);

  // get offerid from getmessage
  const offeridGet = useSelector((state) => state.getMessages.topOfferUrl);
  const offeridSend = useSelector((state) => state);
  const [isselected, seIsSelected] = useState(false);
  const [hideSelectButton, setHideSelectButton] = useState(false);

  //
  const personQuantity = offerData?.passengers.length;
  const Passengers = Number(offerData?.per_passenger_amount) * personQuantity;
  const WithtaxAmount = Number(offerData?.tax_amount) + Passengers;
  const totalAmount = Math.round(WithtaxAmount);

  const selectedFlightKey = useSelector(
    (state) => state.booking.selectedFlightKey
  );
  const selected = selectedFlightKey === offerkey;

  const CartDetails = useSelector((state) => state.booking.getCartDetail);

  const pureOfferId = offerkey.split("-")[1]; // "off_0000AxOM4CSGrHK1tL9AF7"

  const isInCart = CartDetails?.items?.some(
    (item) => item?.offer_id === offerData?.id // or compare with offerkey if that's what API uses
  );
  
  const refreshHandle = () => {
    dispatch(RefreshHandle());
    dispatch(setRefreshSearch());
  };
  const uuid = useSelector((state) => state?.sendMessage?.threadUuid);
  const SelectOffer = useSelector((state) => state?.booking?.singleFlightData);
  const isLoadingSelect = useSelector((state) => state?.booking?.isLoadingSelect);
  
  const handleBookFlight = () => {
    const params = {
      chat_thread_uuid: uuid,
      offer_type: "flight",
      offer_id: offerData?.id,
      price: offerData?.total_amount_plus_markup,
      currency: offerData?.total_currency,
      raw_data: {},
    };
    dispatch(AddToCart(params, uuid));
    if (selected) {
      setHideSelectButton(true);
    }
    if (offerkey) {
      dispatch(setflightDetail(offerData)); // Store flight details
      dispatch(setSelectedFlightKey(offerkey)); //  Store selected flight key
    }
    
  };
  // const handleBookFlight = () => {
  //   dispatch(setChatscroll(true))
  //   dispatch(setLoading(true));
  //   if(selected) {
  //     setHideSelectButton(true);
  //   };
  //   if (offerkey) {
  //     dispatch(setflightDetail(offerData)); // Store flight details
  //     dispatch(setSelectedFlightKey(offerkey)); //  Store selected flight key
  //   }

  //   dispatch(setflightDetail(offerData)); //dispatch selected flight detail
  //   dispatch(PassengerForm());

  //   dispatch(bookFlight());
  //   if (flightDetail?.id) {
  //     dispatch(bookFlight(flightDetail.id)); // Pass flight ID to bookFlight
  //   } else {
  //     ("");
  //   }
  //   event({
  //     action: 'click',
  //     category: 'engagement',
  //     label: 'Select Flight',
  //     value: offerData?.total_amount_rounded,
  //   });
  //   console.log("Select Flight", offerData?.total_amount_rounded);
  // };
  return (
    <>
      {/* Open drawer only for the selected flight */}

      <Box
        className={`${searchResultStyles.flightOfferCard} ${
          offerData?.slices.length > 1
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
              {FlightExpire ? (
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
                      <button
                        onClick={refreshHandle}
                        className={
                          " w-100 btn btn-border btn-round xs btn-md f12 sm " +
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { md: "column", lg: "column", xs: "row" },
                    }}
                  >
                    <RightTopSection
                      SelectDrawer={HandleSelectDrawer}
                      offerData={offerData}
                      selected={selected}
                      selectedFlightKey={selectedFlightKey}
                    />
                  </Box>
                  {/*  */}
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    sx={{
                      flexDirection: { lg: "column", md: "column", xs: "row" },
                      width: { lg: "100%", md: "100%", xs: "100%" },
                      justifyContent: "space-between",
                      alignItems: {
                        lg: "flex-start",
                        md: "flex-start",
                        xs: "center",
                      },
                    }}
                    gap={1}
                    className={searchResultStyles.PriceBottom}
                  >
                    <Box>
                      <h4
                        className={
                          searchResultStyles.flightPriceSection +
                          " mb-0 black bold"
                        }
                      >
                        {currencySymbols[offerData?.tax_currency] ||
                          offerData?.tax_currency}
                        {Math.round(offerData?.per_passenger_amount_rounded)}
                      </h4>
                      {/* {console.log(offerData)} */}

                      {personQuantity > 1 && (
                        <Typography className="f12 gray">
                          {currencySymbols[offerData?.tax_currency] ||
                            offerData?.tax_currency}
                          {Math.round(offerData?.total_amount_rounded)} total
                        </Typography>
                      )}
                    </Box>
                    {/* main select handle */}
                    {/* {!isselected ? (
                      
                    ) : (
                      ""
                    )}{" "} */}

                    {isInCart ? (
                      // Show "Selected" for the offer that is in cart
                      <Box
                        sx={{ width: { lg: "100%", md: "100%", xs: "auto" } }}
                      >
                        <Button
                          disabled
                          className={
                            searchResultStyles.IsSelected +
                            " w-100 btn btn-primary btn-round btn-md "
                          }
                        >
                          <span>Selected</span>
                        </Button>
                      </Box>
                    ) : CartDetails?.items?.length > 0 ? (
                      // If cart already has another flight, hide the Select button
                      <></>
                    ) : (
                      // Show Select button only when cart is empty
                      <Box sx={{ width: { lg: "100%", md: "100%" } }}>
                        <Button
                          // disabled={isLoadingSelect} // disable while loading
                          className={
                            "w-100 btn btn-primary btn-round btn-md " +
                            searchResultStyles.selectFlightBtn
                          }
                          onClick={handleBookFlight}
                        >
                          
                          Select
                        </Button>
                      </Box>
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
