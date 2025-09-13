import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { useSelector } from "react-redux";
import { formatTextToHtmlList, sanitizeResponse } from "@/src/utils/utils";
import HotelCardSidebar from "../HotelCardSidebar";

const SidebarTripDetails = ({ id, CartDetails, Carduuid }) => {
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
              Departure |{" "}
              {getBuilder?.departure_date &&
                new Date(getBuilder?.departure_date).toLocaleDateString(
                  "en-GB",
                  {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  }
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

      <Box
        className={`${TripStyles.PaddDetailCard} PaddDetailCard`}
        mb={3}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box>
          <Chip
            variant="outlined"
            label="Flights"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              borderColor: "#DEE1E6",
            }}
            size="small"
          />
        </Box>
        <Typography className="f12 bold">Need help finding flights?</Typography>

        <Stack
          direction="row"
          flexWrap="nowrap"
          alignItems="flex-start"
          gap={1}
          justifyContent={"space-between"}
        >
          <Stack whiteSpace={"nowrap"} alignItems="center" textAlign={"center"}>
            <Typography className="f12">Departing</Typography>
            <Typography whiteSpace={"nowrap"} className="f12 black bold">
              {getBuilder?.from_destination}
            </Typography>
          </Stack>
          <Stack alignItems="center" textAlign={"center"}>
            <Typography className="f12">Arriving</Typography>
            <Typography whiteSpace={"nowrap"} className="f12 black bold">
              {getBuilder?.to_destination}
            </Typography>
          </Stack>

          <Stack alignItems="center" textAlign={"center"}>
            <Typography className="f12">Class</Typography>
            <Typography whiteSpace={"nowrap"} className="f12 black bold">
              {getBuilder?.cabin_class}
            </Typography>
          </Stack>

          <Stack alignItems="center" textAlign={"center"}>
            <Typography className="f12">Travellers</Typography>
            <Typography className="f12 black bold">
              {(getBuilder?.passengers?.adults ||
                getBuilder?.passengers?.children?.length > 0 ||
                getBuilder?.passengers?.infants?.length > 0) && (
                <Box className={TripStyles.tripDetailsCol + " f12 black bold"}>
                  {[
                    getBuilder?.passengers?.adults > 0 &&
                      `${getBuilder.passengers.adults} ${
                        getBuilder.passengers.adults === 1 ? "adult" : "adults"
                      }`,
                    getBuilder?.passengers?.children?.length > 0 &&
                      `${getBuilder.passengers.children.length} ${
                        getBuilder.passengers.children.length === 1
                          ? "child"
                          : "children"
                      }`,
                    getBuilder?.passengers?.infants?.length > 0 &&
                      `${getBuilder.passengers.infants.length} ${
                        getBuilder.passengers.infants.length === 1
                          ? "infant"
                          : "infants"
                      }`,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </Box>
              )}
            </Typography>
          </Stack>
        </Stack>
        {/* <Box display={"flex"} justifyContent={"flex-end"}>
            <Button className="btn btn-white btn-sm btn-round">Search flights in Chat</Button>
          </Box> */}
      </Box>

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
                Return |{" "}
                {getBuilder?.return_date && // This is the condition
                  new Date(getBuilder.return_date).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  })}
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
        <Box
          className={`${TripStyles.PaddDetailCard} PaddDetailCard`}
          mb={3}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box>
            <Chip
              variant="outlined"
              label="Flights"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                borderColor: "#DEE1E6",
              }}
              size="small"
            />
          </Box>
          <Typography className="f12 bold">
            Need help finding flights?
          </Typography>

          <Stack
            direction="row"
            flexWrap="nowrap"
            alignItems="flex-start"
            justifyContent={"space-between"}
            gap={1}
          >
            <Stack alignItems="center" textAlign={"center"}>
              <Typography className="f12">Departing</Typography>
              <Typography whiteSpace={"nowrap"} className="f12 black bold">
                {getBuilder?.to_destination}
              </Typography>
            </Stack>
            <Stack alignItems="center" textAlign={"center"}>
              <Typography className="f12">Arriving</Typography>
              <Typography whiteSpace={"nowrap"} className="f12 black bold">
                {getBuilder?.from_destination}
              </Typography>
            </Stack>

            <Stack alignItems="center" textAlign={"center"}>
              <Typography className="f12">Class</Typography>
              <Typography whiteSpace={"nowrap"} className="f12 black bold">
                {getBuilder?.cabin_class}
              </Typography>
            </Stack>

            <Stack alignItems="center" textAlign={"center"}>
              <Typography className="f12">Travellers</Typography>
              <Typography className="f12 black bold">
                {(getBuilder?.passengers?.adults ||
                  getBuilder?.passengers?.children?.length > 0 ||
                  getBuilder?.passengers?.infants?.length > 0) && (
                  <Box
                    className={TripStyles.tripDetailsCol + " f12 black bold"}
                  >
                    {[
                      getBuilder?.passengers?.adults > 0 &&
                        `${getBuilder.passengers.adults} ${
                          getBuilder.passengers.adults === 1
                            ? "adult"
                            : "adults"
                        }`,
                      getBuilder?.passengers?.children?.length > 0 &&
                        `${getBuilder.passengers.children.length} ${
                          getBuilder.passengers.children.length === 1
                            ? "child"
                            : "children"
                        }`,
                      getBuilder?.passengers?.infants?.length > 0 &&
                        `${getBuilder.passengers.infants.length} ${
                          getBuilder.passengers.infants.length === 1
                            ? "infant"
                            : "infants"
                        }`,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </Box>
                )}
              </Typography>
            </Stack>
          </Stack>
          {/* <Box display={"flex"} justifyContent={"flex-end"}>
            <Button className="btn btn-white btn-sm btn-round">Search flights in Chat</Button>
          </Box> */}
        </Box>
      )}
    </>
  );
};

export default SidebarTripDetails;
