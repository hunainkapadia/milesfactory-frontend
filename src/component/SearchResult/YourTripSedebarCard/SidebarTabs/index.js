import { Box, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { setSidebarTab } from "@/src/store/slices/Base/baseSlice";
import { useDispatch, useSelector } from "react-redux";

const SidebarTabs = () => {
  const dispatch = useDispatch();
  const handleTabClick = (tabId, sectionId) => {
    dispatch(setSidebarTab(tabId));
    setTimeout(() => {
      const drawerContent = document.querySelector(".asasas"); // your scroll container
      const section = drawerContent?.querySelector(`#${sectionId}`);

      if (drawerContent && section) {
        const sectionTop = section.offsetTop;
        const scrollOffset = 60; // Adjust this to match your fixed header height

        drawerContent.scrollTo({
          top: sectionTop - scrollOffset,
          behavior: "smooth",
        });
      }
    }, 100); // small delay ensures DOM has rendered
  };
  const activeTab = useSelector((state) => state?.base?.sidebarTab);
  const getBuilder = useSelector(
    (state) =>
      state?.sendMessage?.AddBuilder?.silent_function_template?.[0]?.function
        ?.arguments
  );

  const getselectedFlight = useSelector(
    (state) => state?.booking?.addCart?.raw_data
  );
  const slices = getselectedFlight?.slices || [];
  const cartItems = useSelector((state) => state?.booking?.cartOffer?.items);
  const isHotel = cartItems?.some((item) => item.offer_type === "hotel");

  return (
    <Box
      width={"100%"}
      sx={{
        backgroundColor: "#F2F7F8",
        borderRadius: "8px",
        display: "flex",
        gap: "4px",
      }}
      className={`${TripStyles.customTabs} customTabs tap-none`}
    >
      {/* // Conditional rendering of tabs based on flight type. Assume return by default  */}

      {getBuilder?.flight_type === "one-way" ? (
        <a
          href="#offer-card"
          onClick={() => handleTabClick("overview", "offer-card")}
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
            <Typography className="f12">Departure</Typography>
          </Box>
        </a>
      ) : (
        <>
          <a
            href="#offer-card"
            onClick={() => handleTabClick("overview", "offer-card")}
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
              <Typography className="f12">Departure</Typography>
            </Box>
          </a>
          <a
            href="#offer-card-return"
            onClick={() => handleTabClick("flights", "offer-card-return")}
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

      {getBuilder?.itinerary_text && (
        <>
          <a
            href="#itinerary-section"
            onClick={() => handleTabClick("itinerary", "itinerary-section")}
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
      {(isHotel ||
        getBuilder?.trip_components?.some(
          (component) => component === "hotel"
        )) && (
        <a
          href="#hotel-section"
          onClick={() => handleTabClick("hotel", "hotel-section")}
          style={{ textDecoration: "none" }}
        >
          <Box
            className={`${TripStyles.inactiveTab} ${
              activeTab === "hotel" ? TripStyles.activeTab : ""
            }`}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Typography className="f12">Hotel</Typography>
          </Box>
        </a>
      )}
    </Box>
  );
};

export default SidebarTabs;
