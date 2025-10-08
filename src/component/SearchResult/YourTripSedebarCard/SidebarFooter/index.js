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
} from "@/src/store/slices/passengerDrawerSlice";
import { calculateHotelPricing } from "@/src/utils/hotelPriceUtils"; // import helper
import {
  getPassPofileHotel,
  PassengerSetupHotel,
} from "@/src/store/slices/passengerDrawerHotelSlice";
import { setCartTotalPrice } from "@/src/store/slices/BookingflightSlice";
import { useEffect } from "react";

const SidebarFooter = () => {
  const CartData = useSelector((state) => state.booking?.getCartDetail);
  const orderSuccess = useSelector((state) => state?.payment?.OrderConfirm);
  console.log("orderSuccess", orderSuccess?.flight_order);

  const CartTotalPrice = useSelector((state) => state?.booking?.cartTotalPrice);
  const allPassengerFill = useSelector(
    (state) => state.passengerDrawer.allPassengerFill
  );
  console.log("CartData_011", CartData?.items);
  // if hotel, calculate pricing
  const allHotel = useSelector((state) => state?.hotel?.allHotels);
  const functionType = useSelector((state) => state?.sendMessage?.functionType);
  const searchType = useSelector(
    (state) =>
      state?.sendMessage?.SearchHistorySend || state?.getMessages?.SearchHistory
  );
  const CartType = useSelector((state) => state.booking.cartType);
  console.log("CartType_0", CartType);

  // Get all flights from cart items
  const CartFlights =
    CartData?.items?.filter((item) => item?.raw_data?.slices) || [];

  // Get all hotels from cart items
  const CartHotels =
    CartData?.items?.filter((item) => item?.raw_data?.hotel) || [];

  console.log("CartData_00");

  // For displaying in footer, just take the first matching item
  const CartFlight = CartFlights[0];
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
    if (CartType === "flight") {
      dispatch(setIsBuilderDialog(false));
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
        {/* Flight footer */}
        {/* Flight footer */}
        <Box>
          {(orderSuccess?.flight_order && !orderSuccess?.hotel_order) ||
          (!orderSuccess?.flight_order && orderSuccess?.hotel_order) ? (
            <>
              <h4 className="exbold mb-0">-</h4>
              <Typography className="f12 black-50">Add more plans</Typography>
            </>
          ) : CartData?.total_price ? (
            <>
              <Typography className="gray f12">Total</Typography>
              <h4 className="exbold mb-0">
                {currencySymbols[CartData?.items?.[0]?.currency] ||
                  CartData?.items?.[0]?.currency}
                {Math.round(CartTotalPrice)}
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
        {CartData?.items?.length > 0 && (
          <Button
            disabled={orderSuccess && true}
            onClick={() => handleBookFlight(CartData)}
            className={`btn btn-primary btn-round btn-xs`}
          >
            Checkout
          </Button>
        )}

        {/* Hotel footer */}
      </Box>
    </Box>
  );
};

export default SidebarFooter;
