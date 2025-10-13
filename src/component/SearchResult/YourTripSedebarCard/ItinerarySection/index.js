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
  const hasItinerary = !!getBuilder?.itinerarySection;
  const hasDestination = !!getBuilder?.to_destination;

  console.log("getBuilder in ItinerarySection:", getBuilder);

  return (
    <Box mb={2}>
      {hasDestination ? (
        <>
          {/* Itinerary Header */}
          <Box mb={2} display="flex" alignItems="center" gap="12px">
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
        <Typography className="f12">Itinerary</Typography>
      )}

      {/* Itinerary Details */}
      {hasItinerary ? (
        <>
          <Box mt={2}>
            <Typography className="f12">
              {`Itinerary for ${getBuilder.to_destination}`}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box mt={2}>
            <SidebarItenarySection />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ItinerarySection;
