import { Box, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { setSidebarTab } from "@/src/store/slices/Base/baseSlice";
import { useDispatch, useSelector } from "react-redux";

const SidebarTabs = () => {
   const dispatch=useDispatch();
   const handleTabClick = (tabId) => {
     dispatch(setSidebarTab(tabId));
   };
   const activeTab = useSelector((state) => state?.base?.sidebarTab);
   console.log("activeTab", activeTab);
  
  return (
    
      <Box width={"100%"}
        sx={{
          backgroundColor: "#F2F7F8",
          borderRadius: "8px",
          padding: "4px",
          display: "flex",
          gap: 2,
        }}
        className={`${TripStyles.customTabs} customTabs`}
      >
      
        <a
          href="#overview"
          onClick={() => handleTabClick("overview")}
          style={{ textDecoration: "none" }}
        >
          <Box
            className={`${TripStyles.inactiveTab} ${
              activeTab === "overview" ? TripStyles.activeTab : ""
            }`}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Typography className="f12">Overview</Typography>
          </Box>
        </a>

        <a
          href="#offer-card"
          onClick={() => handleTabClick("flights")}
          style={{ textDecoration: "none" }}
        >
          <Box
            className={`${TripStyles.inactiveTab} ${
              activeTab === "flights" ? TripStyles.activeTab : ""
            }`}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Typography className="f12">Flights</Typography>
          </Box>
        </a>

        <a
          href="#itinerary-section"
          onClick={() => handleTabClick("itinerary")}
          style={{ textDecoration: "none" }}
        >
          <Box
            className={`${TripStyles.inactiveTab} ${
              activeTab === "itinerary" ? TripStyles.activeTab : ""
            }`}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Typography className="f12">Itinerary</Typography>
          </Box>
        </a>
      </Box>
  );
};

export default SidebarTabs;
