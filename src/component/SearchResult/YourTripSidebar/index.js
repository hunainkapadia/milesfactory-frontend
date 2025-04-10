import { Box, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import YourTripSedebarCard from "../YourTripSedebarCard";
import YourtripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";

const YourTripSidebar = ({isMessage}) => {
   const getselectedFlight = useSelector((state) => state?.booking?.flightDetail);    
   
  return (
    <>
      <Box
        className={YourtripStyles.YourTripSidebar}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box className={YourtripStyles.YourTripCard} p={0}>
          <Box
            className={YourtripStyles.CardHeader}
            display={"flex"}
            alignItems={"center"}
            px={3}
            py={3}
            gap={2}
          >
            <Box className=" imggroup">
              <img src="/images/plane-icon-basecolor1.svg" />
            </Box>
            <h5 className=" basecolor1 mb-0 bold">Your trip</h5>
          </Box>
          <Box px={3} pt={2} pb={5}>
            <YourTripSedebarCard
              offerData={getselectedFlight}
            />

            <Box
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
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default YourTripSidebar;