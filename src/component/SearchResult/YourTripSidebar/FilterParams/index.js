import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const FilterParams = () => {
   const getSearchUrl = useSelector((state) => state?.sendMessage?.AllOfferUrl);
  
  const url = new URL(getSearchUrl, "https://dummy.com");
  const airlineName = url.searchParams.get("airlines");
  const isDirectFlight = url.searchParams.get("direct"); //
  const filterParams = {
    isDirectFlight: isDirectFlight,
    airlineName: airlineName,
  };

  //console.log("getselectedFlight", filterParams);
   return (
     <>
       <Box
         className=" filterBox"
         display={"flex"}
         sx={{ flexDirection: { xs: "row", md: "row" } }}
       >
         <Typography
           className=" black-50 mb-0"
           sx={{ fontSize: { xs: "8px", lg: "12px", md: "12px" } }}
         >
           Filters:{" "}
           {filterParams?.airlineName ||
           filterParams?.isDirectFlight === "True" ? (
             <>
               {filterParams?.airlineName
                 ? filterParams.airlineName + ", "
                 : ""}
               {filterParams?.isDirectFlight === "True" ? "Direct, " : ""}
             </>
           ) : (
             "none"
           )}
         </Typography>
         <Typography
           sx={{ fontSize: { xs: "8px", lg: "12px", md: "12px" } }}
           className=" black-50 mb-0"
         >
           Sorting: best match
         </Typography>
       </Box>
     </>
   );
}

export default FilterParams;