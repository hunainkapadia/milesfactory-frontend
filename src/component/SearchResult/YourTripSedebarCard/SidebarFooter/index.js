import { Box, Button, Typography } from "@mui/material";
import YourtripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { currencySymbols } from "@/src/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatscroll,
  setIsBuilderDialog,
} from "@/src/store/slices/Base/baseSlice";
import {
  getPassPofile,
  PassengerForm,
  setAddFilledPassenger,
} from "@/src/store/slices/passengerDrawerSlice";
import { calculateHotelPricing } from "@/src/utils/hotelPriceUtils"; // import helper
import {
  getPassPofileHotel,
  PassengerSetupHotel,
} from "@/src/store/slices/passengerDrawerHotelSlice";
import { setCartTotalPrice } from "@/src/store/slices/BookingflightSlice";
import { useEffect } from "react";

const SidebarFooter = () => {
  
  const orderSuccess = useSelector((state) => state?.payment?.OrderConfirm);
  const {cartType, isCartSuccess, getCartDetail, cartTotalPrice} = useSelector((state) => state?.booking);
  const sendMessages = useSelector((state) => state.sendMessage?.messages);  
  
  
  
  const issystemmessage = useSelector(
    (state) => state?.sendMessage?.systemMessage
  );
  
  
  // if hotel, calculate pricing
  const allHotel = useSelector((state) => state?.hotel?.allHotels);
  
  // Get all flights from cart items
  const CartFlights =
    getCartDetail?.items?.filter((item) => item?.raw_data?.slices) || [];

  // Get all hotels from cart items
  const CartHotels =
    getCartDetail?.items?.filter((item) => item?.raw_data?.hotel) || [];

  // For displaying in footer, just take the first matching item
  
  const CartHotel = CartHotels[0];
  // Hotel price calculation
  let nights, totalPrice, perNightPrice;
  if (CartHotel) {
    ({ nights, totalPrice, perNightPrice } = calculateHotelPricing(
      CartHotel?.raw_data?.hotel,
      allHotel
    ));
  }

  const dispatch = useDispatch();
  const handleBookFlight = (getCart) => {
    // const offerId = getCart;
    dispatch(setChatscroll(true));
    if (cartType === "flight") {
      dispatch(setIsBuilderDialog(false));
      dispatch(PassengerForm());
      dispatch(getPassPofile());
    } else if (cartType === "hotel") {
      dispatch(PassengerSetupHotel());
      dispatch(getPassPofileHotel());
    } else if (cartType === "all") {
      dispatch(PassengerForm());
      dispatch(getPassPofile());
      dispatch(PassengerSetupHotel());
    } else {
      ("");
    }
  };

  return (
    <Box
      px={"18px"}
      py={"14px"}
      component={"footer"}
      className={YourtripStyles.Footer + " "}
      sx={{ borderTop: " solid 1px  #E6EEEE" }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          {/* for flight */}
          {(isCartSuccess &&
            issystemmessage &&
            getCartDetail?.items?.length < 2) ||
          (sendMessages?.length === 0 &&
            isCartSuccess &&
            getCartDetail?.items?.length < 2) ? (
            <>
              <h4 className="exbold mb-0">-</h4>
              <Typography className="f12 black-50">Add more plans</Typography>
            </>
          ) : getCartDetail?.total_price ? (
            <>
              <Typography className="gray f12">Total</Typography>
              <h4 className="exbold mb-0">
                {currencySymbols[getCartDetail?.items?.[0]?.currency] ||
                  getCartDetail?.items?.[0]?.currency}
                {Math.round(cartTotalPrice)}
              </h4>
            </>
          ) : (
            <>
              <h4 className="exbold mb-0">-</h4>
              <Typography className="f12 black-50">
                No product selected
              </Typography>
            </>
          )}
        </Box>
        {/* !orderSuccess?.hotel_order  && orderSuccess?.flight_order  && getCartDetail?.items?.length < 2
                ? true
                : !orderSuccess?.flight_order && orderSuccess?.hotel_order && getCartDetail?.items?.length < 2
                ? true
                : false */}

        {isCartSuccess && issystemmessage ? (
          <>
            <Button
              onClick={() => handleBookFlight(getCartDetail)}
              className="btn btn-primary btn-round btn-xs"
            >
              Checkout
            </Button>
          </>
        ) : sendMessages.length === 0 && isCartSuccess ? (
          <Button
            onClick={() => handleBookFlight(getCartDetail)}
            className="btn btn-primary btn-round btn-xs"
          >
            Checkout
          </Button>
        ) : (
          ""
        )}

        {/* Hotel footer */}
      </Box>
    </Box>
  );
};

export default SidebarFooter;
