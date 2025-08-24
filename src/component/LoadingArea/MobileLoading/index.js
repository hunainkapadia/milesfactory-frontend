import { Box, Typography } from "@mui/material";
import style from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import LoadingArea from "..";
import { useSelector } from "react-redux";
import { currencySymbols } from "@/src/utils/utils";

const MobileLoading = () => {
  const Slectedflight = useSelector((state) => state.booking.flightDetail);
  const SlectedflightLoading = useSelector((state) => state.booking);
  
  
   const paymentSuccess = useSelector((state)=> state.payment.PaymentFormSuccess);
  
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
            gap={2}
            justifyContent={"center"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <img width={24} src="/images/success-check.svg" />
            </Box>
            <Typography className="exbold f14">
              {currencySymbols[Slectedflight?.tax_currency] ||
                Slectedflight?.tax_currency}
              {Math.round(Slectedflight?.total_amount)}
            </Typography>
          </Box>
        ) : Slectedflight ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            className={"basecolor1-light2-bg br-100"}
            p={"2px 6px"}
          >
            <Typography className="exbold f14">
              Checkout . {" "}
              {currencySymbols[Slectedflight?.tax_currency] ||
                Slectedflight?.tax_currency}
              {Math.round(Slectedflight?.total_amount)}
            </Typography>
          </Box>
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
