import { Box, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { sanitizeResponse } from "@/src/utils/utils";
import SidebarItenarySection from "../SidebarItenarySection";

const ItinerarySection = ({
  getBuilder,
  CartDetails,
  Carduuid,
  builderType,
}) => {
  const hasItinerary = !!getBuilder?.itinerary_text;
  const hasDestination = !!getBuilder?.to_destination;

  console.log("getBuilder in ItinerarySection:", getBuilder);
  console.log("hasItinerary:", hasItinerary);
  console.log("hasDestinationn:", hasDestination);

  return (
    <Box mb={2}>
      {hasDestination && !hasItinerary ? (
        <>
          {/* Itinerary Header */}
          <Box mb={1} display="flex" alignItems="center" gap="12px">
            <Typography
              className={`${TripStyles.onewayReturn} btn btn-xs btn-black`}
            >
              {`Itinerary for ${getBuilder.to_destination}`}
            </Typography>
          </Box>

          {/* Description */}
          <Typography className="f12" sx={{ whiteSpace: "pre-line" }}>
            Ask Mylz for an itinerary for your trip to{" "}
            {sanitizeResponse(getBuilder.to_destination)} including activities,
            dining options, and sightseeing recommendations.
          </Typography>
        </>
      ) : (
        null
      )}

      {/* Itinerary Details */}
      {hasItinerary ? (
        <>
          {/* Itinerary Header */}
          <Box mb={1} display="flex" alignItems="center" gap="12px">
            <Typography
              className={`${TripStyles.onewayReturn} btn btn-xs btn-black`}
            >
              {`Itinerary for ${getBuilder.to_destination}`}
            </Typography>
          </Box>

          {/* Description */}
          <Box mt={2}>
            <SidebarItenarySection />
          </Box>
        </>
      ) : (
        null
      )}
    </Box>
  );
};

export default ItinerarySection;
