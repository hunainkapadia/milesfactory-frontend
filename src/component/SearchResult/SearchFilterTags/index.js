import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const SearchFilterTags = ({ offerUrl, hotelCount, filters }) => {
  //  Redux (for fallback flight/hotel counts)
  const SearchHistoryGet = useSelector(
    (state) => state.getMessages.SearchHistory
  );
  const SearchHistorySend = useSelector(
    (state) => state.sendMessage?.SearchHistorySend
  );
  const SearchHistory = SearchHistorySend || SearchHistoryGet;

  //  Variables
  let hotelFilters = {};
  let flightFilters = {};
  let isHotel = false;
  let hasQueryParams = false;

  try {
    const parsedUrl = new URL(
      offerUrl,
      typeof window !== "undefined"
        ? window.location.origin
        : "https://demo.milesfactory.com"
    );

    //  Check if URL has ?query=params
    hasQueryParams = [...parsedUrl.searchParams.keys()].length > 0;

    //  Detect hotel vs flight
    isHotel = parsedUrl.pathname.includes("/hotel/");

    //  Convert query params into readable object
    parsedUrl.searchParams.forEach((value, key) => {
      if (isHotel) hotelFilters[key] = value;
      else flightFilters[key] = value;
    });
  } catch (error) {
    console.warn("Invalid offerUrl:", offerUrl);
  }

  //  Hotel filters from Redux
  const hasHotelFilter = filters && Object.keys(filters).length > 0;

  //  Create readable hotel filter text
  let hotelFilterText = "";
  if (hasHotelFilter && filters.filterurl) {
    const parsedHotelUrl = new URL(
      filters.filterurl,
      typeof window !== "undefined"
        ? window.location.origin
        : "https://demo.milesfactory.com"
    );

    const parts = [];
    parsedHotelUrl.searchParams.forEach((value, key) => {
      if (key === "category") parts.push(`${value}-star hotel`);
      else if (key === "breakfast" && value === "true")
        parts.push("Breakfast included");
      else if (key === "pool" && value === "true") parts.push("Pool available");
      else if (key === "wifi" && value === "true") parts.push("Free Wi-Fi");
      else if (key === "parking" && value === "true")
        parts.push("Free parking");
      else if (key === "cancellable" && value === "false")
        parts.push("Non-refundable");
      else if (key === "name") parts.push(`Hotel name: ${value}`);
      else parts.push(`${key}: ${value}`);
    });

    hotelFilterText = parts.join(", ");
  }

  //  Create readable flight filter text (from offerUrl)
  let flightFilterText = "";
  if (!isHotel && hasQueryParams) {
    const parts = [];
    Object.entries(flightFilters).forEach(([key, value]) => {
      console.log(
        "key_value",
        (key === "direct" && value === "true") || "True"
      );

      if (key === "max_price") parts.push(`Max price: ${value}`);
      else if (key === "airlines") parts.push(`Airline: ${value}`);
      else if (key === "airlines") parts.push(`Airline: ${value}`);
      else if ((key === "direct" && value === "true") || "True")
        parts.push("Type: Direct");
      else if (key === "direct" && value === "false")
        parts.push("Type: Connecting");
      else if (key === "stops" && value === "0")
        parts.push("Direct flights only");
      else if (key === "stops" && value !== "0") parts.push(`${value} stops`);
      else parts.push(`${key}: ${value}`);
    });
    flightFilterText = parts.join(", ");
  }

  //  Log to check
  console.log("offerUrl_000", offerUrl);
  console.log("flightFilters", flightFilters);
  console.log("hotelFilters", hotelFilters);

  console.log("flightFilterText", flightFilterText);

  return (
    <Box mb={2}>
      {/*  If filters applied */}
      {flightFilterText || hotelFilterText ? (
        <Typography variant="body2">
          Filter applied: {hotelFilterText || flightFilterText}
        </Typography>
      ) : hotelCount ? (
        <Typography>
          We found ({hotelCount}) hotels for your stay. You can filter down
          options by typing in chat.
        </Typography>
      ) : SearchHistory?.flight?.offer_count ? (
        <Typography>
          We found ({SearchHistory?.flight?.offer_count}) flights for your trip.
          You can filter down options by typing in chat.
        </Typography>
      ) : null}
    </Box>
  );
};

export default SearchFilterTags;
