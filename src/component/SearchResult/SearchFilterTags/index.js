import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const SearchFilterTags = ({ offerUrl, hotelCount, filters }) => {
  const SearchHistoryGet = useSelector(
    (state) => state.getMessages.SearchHistory
  );
  const SearchHistorySend = useSelector(
    (state) => state.sendMessage?.SearchHistorySend
  );

  const SearchHistory = SearchHistorySend || SearchHistoryGet;

  let isHotel = false;
  let flightFilters = {};
  let hasQueryParams = false;
  console.log("hasQueryParams", offerUrl);
  try {
    const parsedUrl = new URL(
      offerUrl,
      typeof window !== "undefined"
        ? window.location.origin
        : "https://demo.milesfactory.com"
    );

    isHotel = parsedUrl.pathname.includes("/hotel/");
    hasQueryParams = parsedUrl.searchParams.toString().length > 0;

    parsedUrl.searchParams.forEach((value, key) => {
      flightFilters[key] = value;
    });
  } catch {
    console.warn("Invalid offerUrl:", offerUrl);
  }

  /* ---------------- HOTEL FILTER TEXT ---------------- */

  let hotelFilterText = "";

  if (filters?.filterurl) {
    const parsedHotelUrl = new URL(filters.filterurl, window.location.origin);

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
      else if (key === "name") parts.push(`Hotel: ${value}`);
    });

    hotelFilterText = parts.join(", ");
  }

  /* ---------------- FLIGHT FILTER TEXT ---------------- */

  /* ---------------- FLIGHT FILTER TEXT ---------------- */

let flightFilterText = "";

if (!isHotel && hasQueryParams) {
  const parts = [];

  // Helper to convert 24h string to 12h AM/PM format dynamically
  const formatTime = (hourStr) => {
    const hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12} ${ampm}`;
  };

  Object.entries(flightFilters).forEach(([key, value]) => {
    if (key === "max_price") {
      parts.push(`Max price: ${value}`);
    } else if (key === "airlines") {
      parts.push(`Airline: ${value}`);
    } else if (key === "direct" && value.toLowerCase() === "true") {
      parts.push("Direct flights");
    } else if (key === "outbound_start_hour") {
      // Get the end hour from the flightFilters object
      const endHour = flightFilters["outbound_end_hour"];
      if (endHour) {
        parts.push(`Departure: ${formatTime(value)} - ${formatTime(endHour)}`);
      } else {
        parts.push(`Starts at: ${formatTime(value)}`);
      }
    } 
    // Skip outbound_end_hour in the loop because we process it with start_hour
    else if (key === "outbound_end_hour") {
      return; 
    }
    else if (key === "stops") {
      parts.push(value === "0" ? "Non-stop" : `${value} stops`);
    }
  });

  flightFilterText = parts.join(", ");
}

  /* ---------------- UI ---------------- */

  return (
    <Box mb={2}>
      {flightFilterText || hotelFilterText ? (
        <Typography variant="body2">
          Filter applied: {hotelFilterText || flightFilterText}
        </Typography>
      ) : hotelCount ? (
        <Typography>
          We found ({hotelCount}) hotels for your stay.
        </Typography>
      ) : SearchHistory?.flight?.offer_count ? (
        <Typography>
          We found ({SearchHistory.flight.offer_count}) flights for your trip.
        </Typography>
      ) : null}
    </Box>
  );
};

export default SearchFilterTags;