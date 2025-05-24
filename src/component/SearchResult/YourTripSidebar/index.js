import { Box, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import YourTripSedebarCard from "../YourTripSedebarCard";
import YourtripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import Image from "next/image";

const YourTripSidebar = ({isMessage}) => {
   const getselectedFlight = useSelector((state) => state?.booking?.flightDetail);    
   console.log("getselectedFlight", getselectedFlight);
   
   
   const paymentSuccess = useSelector(
     (state) => state.payment.PaymentFormSuccess
   );
  return (
    <>
      <Box
        className={YourtripStyles.YourTripSidebar}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box className={YourtripStyles.YourTripCard} p={0}>
          <Box component={"header"}
            className={YourtripStyles.CardHeader}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            px={3}
            py={2}
          >
            <Box gap={2} display={"flex"} alignItems={"center"}>
              <Box className=" imggroup">
                <img src="/images/plane-icon-basecolor1.svg" />
              </Box>
              {paymentSuccess ? (
                <Typography textTransform={"uppercase"} className=" f12 basecolor1 mb-0 bold">YOU’RE BOOKED</Typography>
              ) : (
                <Typography textTransform={"uppercase"} className="f12 basecolor1 mb-0 bold">Your trip</Typography>
              )}
            </Box>
            {paymentSuccess ? (
              <Image width={24} height={24} src="/images/success-check.svg" />
            ) : (
              ""
            )}
          </Box>
          <Box px={3} component={"section"} pt={2.5} pb={3.5}>
            <YourTripSedebarCard offerData={getselectedFlight} />

            {/* <Box py={2}
              className=" Loading"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default YourTripSidebar;