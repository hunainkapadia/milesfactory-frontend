import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { useSelector } from "react-redux";
import { formatTextToHtmlList, sanitizeResponse } from "@/src/utils/utils";
import HotelCardSidebar from "../HotelCardSidebar";
import BuilderHelpingCard from "../BuilderHelpingCard";

const SidebarTripDetails = ({ id, CartDetails, Carduuid, builderType }) => {
  const Addbuilder = useSelector((state) => state?.sendMessage?.AddBuilder);
  const getBuilder =
    Addbuilder?.silent_function_template?.[0]?.function?.arguments;

    

  function convertMarkdownToHtml(text) {
    if (!text) return "";
    // 1. Convert **bold** to span with class
    let result = text.replace(
      /\*\*(.*?)\*\*/g,
      "<span class='heading exbold'>$1</span>"
    );
    // 2. Remove leading "- " before text on each line
    result = result.replace(/^- /gm, "");

    return result;
  }

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
        <Typography className="f12">
          {/* Arrive in Bangkok and unwind – check-in opens at 4pm. */}
        </Typography>
      </Box>
      <BuilderHelpingCard getBuilder={getBuilder} forOneway />
      <Box mb={3}>
        <Box id={id} mb={1}>
          <Box display={"flex"} alignItems={"center"} gap={"12px"}>
            <Typography
              className={TripStyles.onewayReturn + " btn btn-xs btn-black"}
            >
              {getBuilder?.to_destination
                ? `Itinerary for ${getBuilder.to_destination}`
                : "Itinerary"}
            </Typography>
          </Box>
        </Box>

        {getBuilder?.itinerary_text ? (
          // IF the text exists (is "truthy"), show this:
          <Typography
            className="formateContent f12 mt-0"
            component="div"
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: formatTextToHtmlList(
                convertMarkdownToHtml(
                  sanitizeResponse(getBuilder.itinerary_text)
                )
              ),
            }}
          />
        ) : (
          // ELSE, show this sentence.
          // Using Typography for consistent styling is a good practice.
          <Typography className="f12" variant="body1">
            Ask Mylz to generate an itinerary for this trip in the chat.
          </Typography>
        )}
      </Box>
      {/* hotel cart */}
      {CartDetails?.items?.map((getItems, index) => (
        <>
          {/* get hotel */}

          {getItems?.raw_data?.hotel && (
            <Box id="hotel-section" key={index}>
              <Box id="itinerary-section" mb={2}>
                <Box display={"flex"} alignItems={"center"} gap={"12px"}>
                  <Typography
                    className={
                      TripStyles.onewayReturn + " btn btn-xs btn-black"
                    }
                  >
                    Hotel for {getBuilder?.to_destination}
                  </Typography>
                </Box>
                <Typography className="f12" sx={{ whiteSpace: "pre-line" }}>
                  <Typography
                    className="formateContent f12 mt-0"
                    component="div"
                    variant="body1"
                    dangerouslySetInnerHTML={{
                      __html: formatTextToHtmlList(
                        convertMarkdownToHtml(
                          sanitizeResponse(getBuilder?.itinerary_text)
                        )
                      ),
                    }}
                  />
                </Typography>
              </Box>
              <HotelCardSidebar
                hotel={getItems?.raw_data?.hotel}
                Carduuid={Carduuid}
              />
            </Box>
          )}
        </>
      ))}

      {/*  */}
      {getBuilder?.flight_type !== "one-way" && (
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
            {/* Departure. Check out and head to the airport for your flight. */}
          </Typography>
        </Box>
      )}
      {getBuilder?.flight_type !== "one-way" && (
        <>
          <BuilderHelpingCard getBuilder={getBuilder} forReturn />
        </>
      )}
      {builderType == "hotel" && (
        <>
          <BuilderHelpingCard getBuilder={getBuilder} forHotel />
        </>
      )}
    </>
  );
};

export default SidebarTripDetails;
