import { Box, Button, Typography } from "@mui/material";
import style from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { currencySymbols } from "@/src/utils/utils";
import {
  setChatscroll,
  setIsBuilderDialog,
} from "@/src/store/slices/Base/baseSlice";
import {
  getPassPofile,
  PassengerForm,
} from "@/src/store/slices/passengerDrawerSlice";
import { calculateHotelPricing } from "@/src/utils/hotelPriceUtils";
import {
  getPassPofileHotel,
  PassengerSetupHotel,
} from "@/src/store/slices/passengerDrawerHotelSlice";

const MobileLoading = () => {
  const dispatch = useDispatch();

  // Cart Data
  const CartData = useSelector((state) => state.booking?.getCartDetail);
  const CartOfferDetail = CartData?.items || [];
  const CartDetails = CartOfferDetail[0];

  const CartHotels =
    CartData?.items?.filter((item) => item?.raw_data?.hotel) || [];

  const CartFlights =
    CartData?.items?.filter((item) => item?.raw_data?.slices) || [];
  const functionType = useSelector((state) => state?.sendMessage?.functionType);

  // For displaying in footer, just take the first matching item
  const CartFlight = CartFlights[0];
  const CartHotel = CartHotels[0];

  // Hotel pricing if the cart contains hotel
  const allHotel = useSelector((state) => state?.hotel?.allHotels);
  let nights, totalPrice, perNightPrice;
  if (CartDetails?.offer_type === "hotel") {
    ({ nights, totalPrice, perNightPrice } = calculateHotelPricing(
      CartDetails?.raw_data?.hotel,
      allHotel
    ));
  }

  // Payment status
  const paymentSuccess = useSelector(
    (state) => state.payment?.PaymentFormSuccess
  );
  const orderSuccess = useSelector((state) => state?.payment?.OrderConfirm);

  const CartType = useSelector((state) => state.booking.cartType);
  const CartTotalPrice = useSelector((state) => state?.booking?.cartTotalPrice);


  const handleBookFlight = () => {
    dispatch(setIsBuilderDialog(false));
    dispatch(setChatscroll(true));

    if (CartType === "flight") {
      dispatch(PassengerForm());
      dispatch(getPassPofile());
    } else if (CartType === "hotel") {
      dispatch(PassengerSetupHotel());
      dispatch(getPassPofileHotel());
    } else if (CartType === "all") {
      dispatch(PassengerForm());
      dispatch(getPassPofile());
      dispatch(PassengerSetupHotel());
    } else {
      ("");
    }
  };

  return (
    <Box
      className={style.MobileLoadingRow}
      display="flex"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        borderRadius="100px"
        className={`${style.MobileLoading} white-bg basecolor1`}
        display="flex"
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        {(!orderSuccess?.flight_order &&
            orderSuccess?.hotel_order &&
            CartData?.items?.length < 2) ||
            
          (orderSuccess?.flight_order &&
            !orderSuccess?.hotel_order &&
            CartData?.items?.length < 2) ? (
          <>
            <Button
              onClick={handleBookFlight}
              display="flex"
              alignItems="center"
              justifyContent="center"
              className={
                style.CheckoutBtn + " btn btn-primary disabled btn-xs btn-round"
              }
              p="2px 6px"
            >
              <Typography className="exbold" textTransform="capitalize">
                Add more plans
              </Typography>
            </Button>
          </>
        ) : (orderSuccess?.flight_order && orderSuccess?.hotel_order) ||
          (orderSuccess?.flight_order && orderSuccess?.hotel_order) ? (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              className="basecolor1-light2-bg br-100"
              p="2px 6px"
            >
              <Typography className="exbold">
                Paid{" . "}
                
                {currencySymbols[CartData?.tax_currency] ||
                  CartData?.tax_currency}
                {Math.round(CartData?.total_price)}
              </Typography>
            </Box>
          </>
        ) : CartData?.total_price ? (
          <>
            <Button
              onClick={handleBookFlight}
              display="flex"
              alignItems="center"
              justifyContent="center"
              className={
                style.CheckoutBtn + " btn btn-primary btn-xs btn-round"
              }
              p="2px 6px"
            >
              <Typography className="exbold" textTransform="capitalize">
                Checkout .{" "}
                {CartData?.total_price && (
                  <>
                    {currencySymbols[CartFlight?.currency] ||
                      currencySymbols[CartHotel?.currency] ||
                      CartFlight?.currency ||
                      CartHotel?.currency}

                    {Math.round(CartTotalPrice)}
                  </>
                )}
                {/*  Show per-night price only for hotels */}
                {/* {perNightPrice && (
                <>
                  {" / "}
                  currencySymbols[CartFlight?.currency] || CartFlight?.currency}
                  {Math.round(perNightPrice)}/night
                </>
              )} */}
              </Typography>
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleBookFlight}
              display="flex"
              alignItems="center"
              justifyContent="center"
              className={
                style.CheckoutBtn + " btn btn-primary disabled btn-xs btn-round"
              }
              p="2px 6px"
            >
              <Typography className="exbold" textTransform="capitalize">
                No selection
              </Typography>
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MobileLoading;
