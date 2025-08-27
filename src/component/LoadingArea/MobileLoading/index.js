import { Box, Button, Typography } from "@mui/material";
import style from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import LoadingArea from "..";
import { useDispatch, useSelector } from "react-redux";
import { currencySymbols } from "@/src/utils/utils";
import {
  setChatscroll,
  setIsBuilderDialog,
} from "@/src/store/slices/Base/baseSlice";
import { PassengerForm } from "@/src/store/slices/passengerDrawerSlice";
import { calculateHotelPricing } from "@/src/utils/hotelPriceUtils";

const MobileLoading = () => {
  const Slectedflight = useSelector(
    (state) => state.booking?.cartOffer?.raw_data
  );
  const SlectedflightLoading = useSelector((state) => state.booking);

  console.log("Slectedflight", Slectedflight);

  const paymentSuccess = useSelector(
    (state) => state.payment.PaymentFormSuccess
  );
  const CartOfferDetail = useSelector(
    (state) => state.booking?.getCartDetail?.items
  );
  const CartDetails = CartOfferDetail?.[0];
  const dispatch = useDispatch();
  const handleBookFlight = () => {
    dispatch(setIsBuilderDialog(false));
    dispatch(setChatscroll(true)); // scrol lon click book
    dispatch(PassengerForm());
  };

  const allHotel = useSelector((state) => state?.hotel?.allHotels);
  const { nights, totalPrice, perNightPrice } =
    CartDetails?.offer_type === "hotel"
      ? calculateHotelPricing(CartDetails?.raw_data?.hotel, allHotel)
      : {};

  return (
    <Box
      className={style.MobileLoadingRow}
      display={"flex"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        borderRadius={"100px"}
        className={style.MobileLoading + "  white-bg basecolor1"}
        display={"flex"}
        gap={4}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {/* <Typography className="f14">YOUR TRIP</Typography> */}

        {paymentSuccess ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            className={"basecolor1-light2-bg br-100"}
            p={"2px 6px"}
          >
            <Typography className="exbold">
              Paid{" . "}
              {currencySymbols[Slectedflight?.tax_currency] ||
                Slectedflight?.tax_currency}
              {Math.round(Slectedflight?.total_amount)}
            </Typography>
          </Box>
        ) : Slectedflight ? (
          <Button
            onClick={handleBookFlight}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            className={"basecolor1-light2-bg br-100 basecolor1"}
            p={"2px 6px"}
          >
            <Typography className="exbold f12" textTransform={"capitalize"}>
              Checkout .{" "}
              {Slectedflight?.total_amount && (
                <>
                  {currencySymbols[Slectedflight?.tax_currency] ||
                    Slectedflight?.tax_currency}
                  {Math.round(Slectedflight?.total_amount)}
                </>
              )}
              {/* for hotel price pernight */}
              {perNightPrice && (
                <>
                  {currencySymbols[CartDetails.currency]}
                  {Math.round(perNightPrice)} / night
                </>
              )}
            </Typography>
          </Button>
        ) : (
          <>
            {/* <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <img src="/images/plane-icon-basecolor1.svg" />{" "}
            </Box>
            <Typography className="exbold f14">YOUR TRIP</Typography>
            
         </Box> */}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MobileLoading;
