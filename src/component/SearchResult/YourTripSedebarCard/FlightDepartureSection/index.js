import { Box, Chip, Stack, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import BuilderHelpingCard from "../BuilderHelpingCard";
import FlightCard from "@/src/component/TripDetail/FlightCard";
import OfferCardSidebar from "../OfferCardSidebar";

const FlightDepartureSection = ({ getBuilder, CartDetails, Carduuid, builderType }) => {

const hasFlightOffer = CartDetails?.items?.some(item => item.offer_type === 'flight') || false;



const hasHotel = Array.isArray(CartDetails?.items)
  ? CartDetails.items.some((item) => item?.offer_type === "hotel")
  : false;



const flight = CartDetails?.items?.filter(item => item.offer_type === 'flight') || [];

const uuid = Carduuid;

// Outbound journey text formatting
// This function formats the outbound journey text based on the provided arguments.
// It handles cases where either 'from' or 'to' is available, or both
const formatJourneyTextOutbound = (args) => {
  // Use optional chaining for safety
  const from = args?.from_destination;
  const to = args?.to_destination;

  // Case 1: Both are available
  if (from && to) {
    return `${from} - ${to}`;
  }

  // Case 2: Only 'from' is available
  if (from) {
    return `Leaving from ${from}`;
  }

  // Case 3: Only 'to' is available
  if (to) {
    return `Going to ${to}`;
  }

  return null;
};
  
  
  return (
    <>
      <Box mb={3}>
        <Box mb={1}>
          <Box display={"flex"} alignItems={"center"} gap={"12px"}>
            <Typography
              className={TripStyles.onewayReturn + " btn btn-xs btn-black "}
            >
              Departure
              {getBuilder?.departure_date && (
                <>
                  {" "}
                  |{" "}
                  {new Date(getBuilder?.departure_date).toLocaleDateString(
                    "en-GB",
                    {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                    }
                  )}
                </>
              )}
            </Typography>
            <Typography className="f12 bold">
              {formatJourneyTextOutbound(getBuilder)}
            </Typography>
          </Box>
        </Box>
      </Box>
      {hasFlightOffer ? (
        <OfferCardSidebar
          index={0}
          slice={flight[0]?.raw_data?.slices?.[0]}
          getItems={flight[0]?.raw_data}
          uuid={uuid}
        />
      ) : (
        <>
            <BuilderHelpingCard getBuilder={getBuilder} forOneway />
        </>
      )}
    </>
  );
};

export default FlightDepartureSection;
