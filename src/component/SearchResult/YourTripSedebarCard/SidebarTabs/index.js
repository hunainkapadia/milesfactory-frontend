import { Box, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { setSidebarTab } from "@/src/store/slices/Base/baseSlice";
import { useDispatch, useSelector } from "react-redux";

const SidebarTabs = () => {
  const dispatch = useDispatch();
  const handleTabClick = (tabId) => {
    dispatch(setSidebarTab(tabId));
  };
  const activeTab = useSelector((state) => state?.base?.sidebarTab);
  console.log("activeTab", activeTab);

  const getBuilder = useSelector(
    (state) =>
      state?.sendMessage?.AddBuilder?.silent_function_template?.[0]?.function
        ?.arguments
  );
  const getselectedFlight = useSelector(
    (state) => state?.booking?.singleFlightData
  );

  return (
    <Box
      width={"100%"}
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
          <Typography className="f12">Outbound</Typography>
        </Box>
      </a>
      {getBuilder?.itinerary_text && (
        <>
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
        </>
      )}
      {getselectedFlight && (
        <>
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
            <Typography className="f12">Return</Typography>
          </Box>
        </a>
        </>
      )}
    </Box>
  );
};

export default SidebarTabs;
