import { Box, Button, Typography } from "@mui/material";
import YourtripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { currencySymbols } from "@/src/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatscroll,
  setIsBuilderDialog,
} from "@/src/store/slices/Base/baseSlice";
import { PassengerForm } from "@/src/store/slices/passengerDrawerSlice";
import { calculateHotelPricing } from "@/src/utils/hotelPriceUtils"; // import helper

const SidebarFooter = () => {
  const CartData = useSelector((state) => state.booking?.getCartDetail);
  const orderSuccess = useSelector((state) => state?.payment?.OrderConfirm);

  // if hotel, calculate pricing
  const allHotel = useSelector((state) => state?.hotel?.allHotels);
  const functionType = useSelector((state) => state?.sendMessage?.functionType);

  // Get all flights from cart items
  const CartFlights =
    CartData?.items?.filter((item) => item?.raw_data?.slices) || [];

  // Get all hotels from cart items
  const CartHotels =
    CartData?.items?.filter((item) => item?.raw_data?.hotel) || [];

  console.log("CartDetails_00", CartData);
  console.log("CartHotels", CartHotels);
  
  // For displaying in footer, just take the first matching item
  const CartFlight = CartFlights[0];
  const CartHotel = CartHotels[0];
  
  console.log("CartFlights_000", CartData?.total_price);
  // Hotel price calculation
  let nights, totalPrice, perNightPrice;
  if (CartHotel) {
    ({ nights, totalPrice, perNightPrice } = calculateHotelPricing(
      CartHotel?.raw_data?.hotel,
      allHotel
    ));
  }

  const dispatch = useDispatch();
  const handleBookFlight = () => {
    dispatch(setIsBuilderDialog(false));
    dispatch(setChatscroll(true));
    dispatch(PassengerForm());
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
{functionType === "search_flight_result_func" ? (
  <>
    <Box>
      <h4 className="exbold mb-0">
        {CartFlight ? (
          <>
            {currencySymbols[CartFlight?.currency] || CartFlight?.currency}
            {Math.round(CartData?.total_price)}
          </>
        ) : (
          "-"
        )}
      </h4>
      <Typography className="gray f12">total</Typography>
    </Box>

    <Button
      onClick={handleBookFlight}
      className={`btn btn-primary btn-round btn-xs ${
        orderSuccess || !CartData ? " disabled " : ""
      }`}
    >
      Book now
    </Button>
  </>
) : null}

{/* Hotel footer */}
{functionType === "search_hotel_result_func" ? (
  <>
    <Box>
      <h4 className="exbold mb-0">
        {CartHotel ? (
          <>
            {currencySymbols[CartHotel?.currency]}{Math.round(perNightPrice)} / night
          </>
        ) : (
          "-"
        )}
      </h4>
      <Typography className="gray f12">
        {CartHotel ? (
          <>
            {currencySymbols[CartHotel?.currency]}
            {Math.round(CartData?.total_price)} total ({nights} nights)
          </>
        ) : (
          "-"
        )}
      </Typography>
    </Box>

    <Button
      onClick={handleBookFlight}
      className={`btn btn-primary btn-round btn-xs ${
        orderSuccess || !CartData ? " disabled " : ""
      }`}
    >
      Book now
    </Button>
  </>
) : null}

      </Box>
    </Box>
  );
};

export default SidebarFooter;
