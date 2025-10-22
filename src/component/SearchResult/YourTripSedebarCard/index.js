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
import TopArgumentSection from "./TopArgumentSection";
import FlightDepartureSection from "./FlightDepartureSection";
import FlightReturnSection from "./FlightReturnSection";
import HotelSection from "./HotelSection";
import ItinerarySection from "./ItinerarySection";

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

  const flightItems = CartDetails?.items?.filter(
    (item) => item?.raw_data?.offer_type === "flight"
  );
  return (
    <>
      {/* Open drawer only for the selected flight */}
      {isSidebar ? (
        <Box component={"section"} className="Tabs" px={"18px"} >
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
        <FlightDepartureSection
          getBuilder={BuilderArguments}
          CartDetails={CartDetails}
          Carduuid={Carduuid}
          builderType={builderType}
        />
        <HotelSection
          getBuilder={BuilderArguments}
          CartDetails={CartDetails}
          Carduuid={Carduuid}
          builderType={builderType}
        />
        <ItinerarySection
          getBuilder={BuilderArguments}
          CartDetails={CartDetails}
          Carduuid={Carduuid}
          builderType={builderType}
        />
        <FlightReturnSection
          getBuilder={BuilderArguments}
          CartDetails={CartDetails}
          Carduuid={Carduuid}
          builderType={builderType}
        />
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
