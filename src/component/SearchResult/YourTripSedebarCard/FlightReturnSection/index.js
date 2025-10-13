import { Box, Chip, Stack, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import BuilderHelpingCard from "../BuilderHelpingCard";
import OfferCardSidebar from "../OfferCardSidebar";

const FlightReturnSection = ({
  getBuilder,
  CartDetails,
  Carduuid,
  builderType,
}) => {
  const hasFlightOffer =
    CartDetails?.items?.some((item) => item.offer_type === "flight") || false;
  const hasHotel = Array.isArray(CartDetails?.items)
    ? CartDetails.items.some((item) => item?.offer_type === "hotel")
    : false;

  const flight = CartDetails?.items?.filter(item => item.offer_type === 'flight') || [];

  const isReturn = flight[0]?.raw_data?.slices.length > 1;
  console.log("isReturn", flight);

  const uuid = Carduuid;

  // Return journey text formatting
  // This function formats the return journey text based on the provided arguments.
  // It handles cases where either 'from' or 'to' is available, or both
  const formatJourneyTextReturn = (args) => {
    // Use optional chaining for safety
    const from = args?.from_destination;
    const to = args?.to_destination;

    // Case 1: Both are available
    if (from && to) {
      return `${to} - ${from}`;
    }

    // Case 2: Only 'from' is available
    if (to) {
      return `Leaving from ${to}`;
    }

    // Case 3: Only 'to' is available
    if (from) {
      return `Returning to ${from}`;
    }

    // Case 4: Neither is available (return null to render nothing)
    return null;
  };

  return (
    <>
      <Box mb={3}>
        {hasFlightOffer && isReturn && (
          <Box mb={3}>
            <Box mb={1}>
              <Box display={"flex"} alignItems={"center"} gap={"12px"}>
                <Typography
                  className={TripStyles.onewayReturn + " btn btn-xs btn-black"}
                >
                  Return
                  {getBuilder?.return_date && ( // This is the condition
                    <>
                      {" "}
                      |{" "}
                      {new Date(getBuilder.return_date).toLocaleDateString(
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
                  {formatJourneyTextReturn(getBuilder)}
                </Typography>
              </Box>
            </Box>
            <Typography className="f12">
              use mylz to search for flights
            </Typography>
          </Box>
        )}
      </Box>
      {console.log("getBuilder_flight_type", flight)}
      {hasFlightOffer && isReturn ? (
        <>
          <OfferCardSidebar
            index={0}
            slice={flight[0]?.raw_data?.slices[1]}
            getItems={flight[0]?.raw_data}
            uuid={uuid}
          />
        </>
      ) : null}

      {!hasFlightOffer && (
        <Box mb={3}>
          <Box mb={1}>
            <Box display={"flex"} alignItems={"center"} gap={"12px"}>
              <Typography
                className={TripStyles.onewayReturn + " btn btn-xs btn-black"}
              >
                Return
                {getBuilder?.return_date && ( // This is the condition
                  <>
                    {" "}
                    |{" "}
                    {new Date(getBuilder.return_date).toLocaleDateString(
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
                {formatJourneyTextReturn(getBuilder)}
              </Typography>
            </Box>
          </Box>
          {!hasHotel && (
            <BuilderHelpingCard getBuilder={getBuilder} forReturn />
          )}
        </Box>
      )}
    </>
  );
};

export default FlightReturnSection;
