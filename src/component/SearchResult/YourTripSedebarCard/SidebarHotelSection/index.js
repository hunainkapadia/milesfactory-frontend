import { Box, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { useSelector } from "react-redux";
import HotelCardSidebar from "../HotelCardSidebar";
import BuilderHelpingCard from "../BuilderHelpingCard";

const SidebarHotelSection = ({ id, CartDetails, Carduuid }) => {
  const Addbuilder = useSelector((state) => state?.sendMessage?.AddBuilder);
  const getBuilder =
    Addbuilder?.silent_function_template?.[0]?.function?.arguments || {};

  // Helper function to format text safely
  const formatJourneyTextOutbound = (args) => {
    const from = args?.from_destination;
    const to = args?.to_destination;

    if (from && to) return `${from} - ${to}`;
    if (from) return `Leaving from ${from}`;
    if (to) return `Going to ${to}`;
    return null;
  };

  //  Check if any hotel exists in cart
  const hasHotel = CartDetails?.items?.some((item) => item?.raw_data?.hotel);

  return (
    <Box id="hotel-section" mb={3}>
      <Box mb={1}>
        <Box display="flex" alignItems="center" gap="12px">
          <Typography
            className={`${TripStyles.onewayReturn} btn btn-xs btn-black`}
          >
            Hotel for {getBuilder?.to_destination || "your trip"}
          </Typography>
        </Box>
      </Box>

      {/* If hotel exists, show HotelCardSidebar */}
          {CartDetails?.items?.map((getItems, index) =>
            getItems?.raw_data?.hotel ? (
              <HotelCardSidebar
                key={index}
                hotel={getItems?.raw_data?.hotel}
                Carduuid={Carduuid}
              />
            ) : null
          )}
    </Box>
  );
};

export default SidebarHotelSection;
