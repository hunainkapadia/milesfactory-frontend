import { Box, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import YourTripSedebarCard from "../YourTripSedebarCard";
import YourtripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";

const YourTripSidebar = ({isMessage}) => {

   const getselectedFlight = useSelector((state) => state?.booking?.flightDetail);  
   console.log("getselectedFlight111", getselectedFlight);
  
  return (
    <>
      <Box
        className={YourtripStyles.YourTripSidebar}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box className={YourtripStyles.YourTripCard} p={0}>
          <Box className={YourtripStyles.CardHeader} px={3} py={3}>
            <h5 className="mb-0 regular">Your trip</h5>
          </Box>
          <Box px={3} pt={2} pb={5}>
            <YourTripSedebarCard offerData={getselectedFlight} />
            

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