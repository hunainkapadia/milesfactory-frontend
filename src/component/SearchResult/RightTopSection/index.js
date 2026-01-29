import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { currencySymbols } from "@/src/utils/utils";
import { setAddFilledPassenger } from "@/src/store/slices/passengerDrawerSlice";
import { AddToCart, setCartType, setSelectedFlight, setSelectOfferKey } from "@/src/store/slices/BookingflightSlice";
import { LoadingButton } from "@mui/lab";

const RightTopSection = ({
  offerData,
  SelectDrawer,
  selected,
  selectedFlightKey,
  isInCart,
  offerkey
}) => {
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only
  const CartDetails = useSelector((state) => state.booking.getCartDetail?.items);
  const selectOfferKey = useSelector((state) => state.booking.selectOfferKey);
  const CartItems = useSelector((state) => state?.booking?.getCartDetail?.items);
  const orderSuccess = useSelector((state) => state?.payment?.OrderConfirm);
  const uuid = useSelector((state) => state?.sendMessage?.threadUuid);

  const dispatch = useDispatch();
  const isRoundTrip = offerData?.slices.length > 1;
  const selectedFlight = CartItems?.find(
    (item) => item?.offer_type === "flight"
  );


  const handleBookFlight = (getflight, offerkey) => {
    // for reset next order if in cart 1
    if (orderSuccess) {
      dispatch(setAddFilledPassenger(null));
      dispatch(setCartType(null));
    }
    if (offerkey) {
      dispatch(setSelectOfferKey(offerkey));
      const params = {
        chat_thread_uuid: uuid,
        offer_type: "flight",
        offer_id: offerData?.id,
        price: offerData?.total_amount_plus_markup,
        currency: offerData?.total_currency,
        raw_data: {},
      };
      dispatch(AddToCart(params, offerkey));
      dispatch(setSelectedFlight(getflight));
    }

  };
  const personQuantity = offerData?.passengers.length;

  
  const isAnyFlightSelected = Boolean(selectedFlightKey);
  const isThisFlightSelected = 
  selectedFlightKey === offerkey && 
  selectedFlight?.raw_data?.total_amount_plus_markup ===
    offerData?.total_amount_plus_markup;

  

  console.log( "CartItems2", isAnyFlightSelected || isThisFlightSelected);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { md: "column", lg: "column", xs: "row" },
        }}
      >

        <Box
          display="flex"
          sx={{
            flexDirection: { md: "column", lg: "column", xs: "row-reverse" },
            justifyContent: { xs: "space-between" },
            alignItems: { xs: "center", lg: "flex-start", md: "flex-start" },
            gap: { md: 3, lg: 3, xs: 2 },
            mb: "6px",
          }}
          width={"100%"}
          className={searchResultStyles.RightTopSection + " RightTopSection"}
        >
          {(!isAnyFlightSelected || isThisFlightSelected) && (
              <Box style={{ cursor: "pointer" }}>
                <Box onClick={SelectDrawer} className="text-decoration-none basecolor1">
                  <Box
                    gap={"4px"}
                    alignItems={"center"}
                    display={"flex"}
                    className="bold f12"
                    sx={{ fontSize: { xs: "12px", md: "16px" } }}
                  >
                    <span>See details</span>
                    <i className="fa-angle-right fa fas"></i>
                  </Box>
                </Box>
              </Box>
            )}
          
          {/* {isInCart ? (
    )
  : ""} */}
          
          
          {/*  */}
          {/* for mobile baggage start */}
          {isMobile ? ( // Only show for round trips
            <Box
              className={searchResultStyles.BaggageCol}
              display={"flex"}
              gap={1}
              sx={{
                flexDirection: { md: "column", lg: "column", xs: "row" },
                gap: { md: 1, lg: 1, xs: 2 },
              }}
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
                  <Box
                    display={"flex"}
                    sx={{
                      flexDirection: { md: "column", lg: "column", xs: "row" },
                      gap: { md: 1, lg: 1, xs: 2 },
                    }}
                  >
                    {uniqueBaggages.map((baggage, index) => (
                      <Tooltip
                        key={index}
                        title={`${baggage.formatted_type} x${baggage.quantity}`}
                        placement="top"
                        arrow
                        enterTouchDelay={0}
                        leaveTouchDelay={3000}
                      >
                        <Box
                          display="flex"
                          gap={1}
                          alignItems="center"
                          sx={{ cursor: "default" }}
                        >
                          <Box
                            className={searchResultStyles.BaggageIcon}
                            style={{ opacity: 0.7 }}
                          >
                            <img
                              width={13}
                              height={13}
                              src={
                                baggage?.type === "checked"
                                  ? "/images/checkout/checked-bagg.svg"
                                  : "/images/checkout/carryon-bagg.svg"
                              }
                              alt={`${baggage?.formatted_type} icon`}
                            />
                          </Box>
                          <Typography className="basecolor f11">
                            {baggage.quantity}x{" "}
                            <Box
                              component="span"
                              sx={{
                                display: { lg: "inline", md: "inline", xs: "none" },
                              }}
                            >
                              {baggage.formatted_type}
                            </Box>
                          </Typography>
                        </Box>
                      </Tooltip>
                    ))}
                  </Box>
                );
              })()}
              {/* <Box display={"flex"} alignItems={"center"} gap={1}>
            <img width={11} src="/images/leave-icon.svg" />
            <Typography className="f12 gray">
              <span>
                {" "}
                {offerData?.total_emissions_kg}
                <Box
                  component="span"
                  sx={{
                    display: { lg: "inline", md: "inline", xs: "none" },
                  }}
                >
                  {" "}
                  kg CO₂e
                </Box>
              </span>
            </Typography>
          </Box> */}
            </Box>
          ) : (
            ""
          )}
          {/* for mobile baggage */}
        </Box>
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
          <Typography
            className={
              searchResultStyles.flightPriceSection +
              " mb-0 black bold"
            }
          >
            {currencySymbols[offerData?.tax_currency] ||
              offerData?.tax_currency}
            {Math.round(
              offerData?.total_amount_plus_markup_rounded
            )}
          </Typography>

          {personQuantity > 1 && (
            <Typography className="f12 gray">
              {currencySymbols[offerData?.tax_currency] ||
                offerData?.tax_currency}
              {Math.round(
                offerData?.per_passenger_amount_plus_markup_rounded
              )}{" "}
              each
            </Typography>
          )}
        </Box>
        {/* main select handle */}
        {/* {!isselected ? (
                      
                    ) : (
                      ""
                    )}{" "} */}

        <Box sx={{ width: { lg: "100%", md: "100%", xs: "auto" } }}>
          {selectedFlightKey === offerkey &&
            selectedFlight?.raw_data?.total_amount_plus_markup ===
            offerData?.total_amount_plus_markup ? (
            <Button
              disabled
              className={`${searchResultStyles.selectFlightBtn} ${searchResultStyles.IsSelected} w-100 btn btn-primary btn-round btn-md `}
            >
              <span>Selected</span>
            </Button>
          ) : selectedFlight?.id === offerData.id &&
            isFlightAvailable ? (
            <Button
              disabled
              className={`${searchResultStyles.selectFlightBtn} ${searchResultStyles.IsSelected}
                            w-100 btn btn-primary btn-round btn-md `}
            >
              <span>Not Available</span>
            </Button>
          ) : (
            <>
              <LoadingButton
                className={
                  "w-100 btn btn-primary btn-round btn-md " +
                  searchResultStyles.selectFlightBtn
                }
                onClick={() =>
                  handleBookFlight(offerData, offerkey)
                }
                loading={selectOfferKey === offerkey}
                loadingIndicator={
                  <CircularProgress
                    size={18}
                    sx={{ color: "#fff" }}
                  />
                }
              >
                Select
              </LoadingButton>
            </>
          )}
          
        </Box>
      </Box>
    </>
  );
};

export default RightTopSection;
