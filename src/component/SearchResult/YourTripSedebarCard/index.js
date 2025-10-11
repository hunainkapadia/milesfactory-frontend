import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
// import TripStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { formatTextToHtmlList, sanitizeResponse } from "@/src/utils/utils";
import SidebarTripDetails from "./SidebarTripDetails";
import OfferCardSidebar from "./OfferCardSidebar";
import SidebarTabs from "./SidebarTabs";
import SidebarFooter from "./SidebarFooter";

const YourTripSedebarCard = ({
  getBuilder,
  isSidebar,
}) => {
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
        <Box
          id="overview"
          mb={2}
          className={TripStyles.Header2 + " aaa"}
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <Box>
            <Box>
              {BuilderArguments?.to_destination &&
              BuilderArguments?.trip_length ? (
                <Typography
                  component="h4"
                  sx={{ fontSize: { xs: "16px", md: "20px" } }}
                  className="bold black mb-0"
                >
                  My {BuilderArguments.trip_length} day
                  {BuilderArguments.trip_length > 1 ? "s" : ""} travel to{" "}
                  {BuilderArguments.to_destination}
                </Typography>
              ) : BuilderArguments?.to_destination &&
                BuilderArguments?.trip_length ? (
                <h4 className="bold black mb-0">
                  My {BuilderArguments.trip_length} day
                  {BuilderArguments.trip_length > 1 ? "s" : ""} travel to{" "}
                  {BuilderArguments.to_destination}
                </h4>
              ) : BuilderArguments?.to_destination &&
                BuilderArguments?.from_destination ? (
                <h4 className="bold black mb-0">
                  My travel to {BuilderArguments.to_destination}
                </h4>
              ) : BuilderArguments?.to_destination ? (
                <h4 className="bold black mb-0">
                  My travel to {BuilderArguments.to_destination}
                </h4>
              ) : null}
            </Box>
            <Box
              display="flex"
              flexWrap="wrap"
              className={TripStyles.tripDetails}
            >
              {BuilderArguments?.from_destination &&
                BuilderArguments?.to_destination && (
                  <Box
                    sx={{}}
                    className={TripStyles.tripDetailsCol + " f12 black bold"}
                  >
                    {BuilderArguments.from_destination} -{" "}
                    {BuilderArguments.to_destination}
                  </Box>
                )}

              {(BuilderArguments?.departure_date ||
                BuilderArguments?.return_date) && (
                <Box
                  sx={{}}
                  className={TripStyles.tripDetailsCol + " f12 black bold"}
                >
                  {BuilderArguments?.departure_date && (
                    <>
                      {new Date(
                        BuilderArguments.departure_date
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </>
                  )}
                  {BuilderArguments?.return_date && (
                    <>
                      {" - "}
                      {new Date(
                        BuilderArguments.return_date
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </>
                  )}
                </Box>
              )}

              {(BuilderArguments?.passengers?.adults ||
                BuilderArguments?.passengers?.children?.length > 0 ||
                BuilderArguments?.passengers?.infants?.length > 0) && (
                <Box className={TripStyles.tripDetailsCol + " f12 black bold"}>
                  {[
                    BuilderArguments?.passengers?.adults > 0 &&
                      `${BuilderArguments.passengers.adults} ${
                        BuilderArguments.passengers.adults === 1
                          ? "adult"
                          : "adults"
                      }`,
                    BuilderArguments?.passengers?.children?.length > 0 &&
                      `${BuilderArguments.passengers.children.length} ${
                        BuilderArguments.passengers.children.length === 1
                          ? "child"
                          : "children"
                      }`,
                    BuilderArguments?.passengers?.infants?.length > 0 &&
                      `${BuilderArguments.passengers.infants.length} ${
                        BuilderArguments.passengers.infants.length === 1
                          ? "infant"
                          : "infants"
                      }`,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        {/* filter row */}

        {/*   */}

        {(!CartDetails?.items?.length ||
          CartDetails?.items?.some((i) => i.raw_data?.hotel)) && (
          <SidebarTripDetails
            id="itinerary-section"
            CartDetails={CartDetails}
            Carduuid={Carduuid}
            builderType={builderType}
          />
        )}

        {/* {!getselectedFlight ? (
        ) : (
          ""
        )} */}
        {/*  */}
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
