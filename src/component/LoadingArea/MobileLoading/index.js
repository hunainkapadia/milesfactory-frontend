import { Box, Typography } from "@mui/material";
import style from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import LoadingArea from "..";
import { useSelector } from "react-redux";
import { currencySymbols } from "@/src/utils/utils";

const MobileLoading = () => {
  const Slectedflight = useSelector((state) => state.booking.flightDetail);
  const SlectedflightLoading = useSelector((state) => state.booking);
  console.log("SlectedflightLoading", SlectedflightLoading);
  
   const paymentSuccess = useSelector((state)=> state.payment.PaymentFormSuccess);
  
  return (
    <Box
      className={style.MobileLoadingRow}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      position={"fixed"}
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
        {console.log("paymentSuccess", paymentSuccess)}

        {paymentSuccess ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <img width={24} src="/images/success-check.svg" />
            </Box>
            <Typography className="bold f14">YOU’RE BOOKED</Typography>
          </Box>
        ) : Slectedflight ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <img src="/images/plane-icon-basecolor1.svg" />{" "}
            </Box>
            <Typography className="bold f14">
              {currencySymbols[Slectedflight?.tax_currency] ||
                Slectedflight?.tax_currency}{" "}
              {Slectedflight?.total_amount_plus_markup}
            </Typography>
          </Box>
        ) : (
          <>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <img src="/images/plane-icon-basecolor1.svg" />{" "}
            </Box>
            <Typography className="bold f14">YOUR TRIP</Typography>
            {/* <LoadingArea /> */}
         </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MobileLoading;
