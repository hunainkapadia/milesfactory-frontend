import { Box, Chip, Stack, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import {
  convertMarkdownToHtml,
  formatTextToHtmlList,
  sanitizeResponse,
} from "@/src/utils/utils";

const ItinerarySection = ({ getBuilder, CartDetails, Carduuid, builderType }) => {

const hasitiniary = getBuilder.itinerarySection? true : false;
const hasdestination = getBuilder?.to_destination? true : false;

console.log("getBuilder a in itiniary", getBuilder);
  
  return (
    <>
      <Box mb={3}>
          <Box display="flex" alignItems="center" gap="12px">
            <Typography
              className={`${TripStyles.onewayReturn} btn btn-xs btn-black`}
            >
            {hasdestination 
                ? `Itinerary for ${getBuilder?.to_destination}` 
                : 'Itinerary'
            }
              
            </Typography>
          </Box>
            <Box display="flex" alignItems="center" gap="12px">
            {hasitiniary 
                ? `Itinerary for ${getBuilder?.to_destination}` 
                : 'Itinerary'
            }
            {/* <Typography className="f12" sx={{ whiteSpace: "pre-line" }}>
              Ask Mylz for an itinerary for your trip to{" "}
              {sanitizeResponse(getBuilder?.to_destination)} including
              activities, dining options, and sightseeing recommendations.
            </Typography> */}
          </Box>
        </Box>

    </>
  );
};

export default ItinerarySection;
