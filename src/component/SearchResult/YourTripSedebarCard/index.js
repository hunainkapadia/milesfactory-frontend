import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
// import TripStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { formatTextToHtmlList, sanitizeResponse } from "@/src/utils/utils";
import SidebarTripDetails from "./SidebarTripDetails";
import OfferCardSidebar from "./OfferCardSidebar";
import SidebarTabs from "./SidebarTabs";
import SidebarFooter from "./SidebarFooter";
import SidebarFlightSection from "./SidebarFlightSection";
import React from "react";
import SidebarItenarySection from "./SidebarItenarySection";
import SidebarHotelSection from "./SidebarHotelSection";
import TopArgumentSection from "./TopArgumentSection";

const YourTripSedebarCard = ({ getBuilder, isSidebar }) => {
  const BuilderArguments =
    getBuilder?.silent_function_template[0]?.function.arguments || {};
  const builderType = BuilderArguments?.trip_components?.[0] || null;

  const CartDetails = useSelector((state) => state.booking?.getCartDetail);
  const Carduuid = CartDetails?.items?.at(0)?.uuid || null;

  const getselectedFlight = useSelector(
    (state) => state?.booking?.addCart?.raw_data
  );

  const dispatch = useDispatch();

  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );

  const personQuantity = getselectedFlight?.passengers?.length;
  const Passengers =
    Number(getselectedFlight?.per_passenger_amount) * personQuantity;
  const WithtaxAmount = Number(getselectedFlight?.tax_amount) + Passengers;

  const departureDate = BuilderArguments?.departure_date
    ? new Date(BuilderArguments.departure_date)
    : null;

  const returnDate = BuilderArguments?.return_date
    ? new Date(BuilderArguments.return_date)
    : null;

  const tripDays =
    departureDate && returnDate
      ? Math.round(
          (returnDate.getTime() - departureDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : null;

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only

  
  const hasHotel = CartDetails?.items?.some((i) => i.raw_data?.hotel);
const flightItems = CartDetails?.items?.filter(
  (i) => i?.offer_type === "flight" || i?.raw_data?.slices
);
const hasFlight = flightItems?.length > 0;

  return (
    <>
      {/* Open drawer only for the selected flight */}
      {isSidebar ? (
        <Box component={"section"} className="Tabs" px={"18px"} pb={1}>
          <SidebarTabs />
        </Box>
      ) : (
        ""
      )}

      <Box
        className={TripStyles.TripBody}
        sx={{ pt: { md: "18px", xs: 0 }, px: { md: "18px", xs: "0" } }}
        component={"section"}
        pb={3}
      >
        <TopArgumentSection />

        {/* filter row */}
        {/* for hotel render */}

        {(!CartDetails?.items || CartDetails?.items?.length === 0) &&
          !BuilderArguments?.itinerary_text && (
            <SidebarTripDetails
              CartDetails={CartDetails}
              Carduuid={Carduuid}
              builderType={builderType}
            />
          )}

{/* Hotel Section */}
{hasHotel && (
  <SidebarHotelSection
    CartDetails={CartDetails}
    Carduuid={Carduuid}
    builderType={builderType}
  />
)}

{/* Itinerary: show in middle if both exist */}
{BuilderArguments?.itinerary_text && hasHotel && hasFlight && (
  <SidebarItenarySection />
)}

{/* Flight Section */}
{hasFlight &&
  flightItems.map((flightItem, index) => (
    <React.Fragment key={index}>
      <SidebarFlightSection
        flight={flightItem?.raw_data}
        getBuilder={getBuilder}
        index={index}
        uuid={flightItem?.uuid}
      />
    </React.Fragment>
  ))}

{/* Itinerary: show last if only one (hotel or flight) */}
{BuilderArguments?.itinerary_text &&
  ((hasHotel && !hasFlight) || (!hasHotel && hasFlight)) && (
    <SidebarItenarySection />
  )}

      </Box>

      {!isMobile && <SidebarFooter />}

      {/* Extra Info bottom */}

      {/* <Box
        component={"footer"}
        className={TripStyles.TripFooter}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={3}
        py={"12px"}
      >
        <Box>
          <h4 className="exbold mb-0">£457</h4>
          <Typography className="gray f12">£457 total</Typography>
        </Box>

        <Box>
          <Button
            className={
              "btn btn-primary btn-lg-x btn-round btn-md f12 " +
              TripStyles.selectFlightBtn
            }
          >
            Book now
          </Button>
        </Box>
      </Box> */}
    </>
  );
};

export default YourTripSedebarCard;
