import { Box, Typography } from "@mui/material";
import style from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import LoadingArea from "..";
import { useSelector } from "react-redux";
import { currencySymbols } from "@/src/utils/utils";

const MobileLoading = () => {
  const Slectedflight = useSelector((state) => state.booking.flightDetail);
  const SlectedflightLoading = useSelector((state) => state.booking);
  console.log("SlectedflightLoading", SlectedflightLoading);
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
        <Box display={"flex"} alignItems={"center"}>
          <img src="/images/plane-icon-basecolor1.svg" />{" "}
        </Box>
        {/* <Typography className="f14">YOUR TRIP</Typography> */}
        {Slectedflight ? (
          <Typography className="bold f14">
          {currencySymbols[Slectedflight?.tax_currency] ||
                              Slectedflight?.tax_currency}{" "}
            {Slectedflight?.total_amount_plus_markup}
          </Typography>
        ) : (
          <LoadingArea />
        )}
      </Box>
    </Box>
  );
};

export default MobileLoading;
