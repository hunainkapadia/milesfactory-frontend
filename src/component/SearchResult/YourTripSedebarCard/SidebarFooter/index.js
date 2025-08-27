import { Box, Button, Typography } from "@mui/material";
import YourtripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { currencySymbols } from "@/src/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatscroll,
  setIsBuilderDialog,
} from "@/src/store/slices/Base/baseSlice";
import { PassengerForm } from "@/src/store/slices/passengerDrawerSlice";
import { calculateHotelPricing } from "@/src/utils/hotelPriceUtils"; // 👈 import helper

const SidebarFooter = () => {
  const CartOfferDetail = useSelector(
    (state) => state.booking?.getCartDetail?.items
  );
  const CartDetails = CartOfferDetail?.[0];
  const offerDetail = useSelector((state) => state.booking?.cartOffer);
  const orderSuccess = useSelector((state) => state?.payment?.OrderConfirm);

  // if hotel, calculate pricing
  const allHotel = useSelector((state) => state?.hotel?.allHotels);
  const functionType = useSelector((state) => state?.sendMessage?.functionType);

  console.log("functionType_22", functionType);

  const { nights, totalPrice, perNightPrice } =
    CartDetails?.offer_type === "hotel"
      ? calculateHotelPricing(CartDetails?.raw_data?.hotel, allHotel)
      : {};

  const dispatch = useDispatch();
  const handleBookFlight = () => {
    dispatch(setIsBuilderDialog(false));
    dispatch(setChatscroll(true));
    dispatch(PassengerForm());
  };

  return (
    <>
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
          {/* functionType?.search_hotel_result_func functionType?.search_flight_result_func */}
          {functionType == "search_flight_result_func" ? (
            <>
              <Box>
                <h4 className="exbold mb-0">
                  {CartDetails ? (
                    <>
                      {currencySymbols[CartDetails?.currency] ||
                        CartDetails?.currency}
                      {Math.round(CartDetails?.price)}
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
                  orderSuccess || !offerDetail ? " disabled " : ""
                }`}
              >
                Book now
              </Button>
            </>
          ) : functionType == "search_hotel_result_func" ? (
            <>
              <Box>
                <h4 className="exbold mb-0">
                  {CartDetails ? (
                    <>
                      {currencySymbols[CartDetails?.currency]}{" "}
                      {Math.round(perNightPrice)} / night
                    </>
                  ) : (
                    "-"
                  )}
                </h4>
                <Typography className="gray f12">
                  {CartDetails ? (
                    <>
                      {currencySymbols[CartDetails?.currency]}{" "}
                      {Math.round(totalPrice)} total ({nights} nights)
                    </>
                  ) : (
                    "-"
                  )}
                </Typography>
              </Box>

              <Button
                onClick={handleBookFlight}
                className={`btn btn-primary btn-round btn-xs ${
                  orderSuccess || !offerDetail ? " disabled " : ""
                }`}
              >
                Book now
              </Button>
            </>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

export default SidebarFooter;
