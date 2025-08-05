import {
  Box,
  Card,
  Typography,
  Avatar,
  CardContent,
  Grid,
  Divider,
  Tabs,
  Tab,
  Button,
  Stack,
  Chip,
} from "@mui/material";
// import TripStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDrawer,
  fetchflightDetail,
  setflightDetail,
  setOpenDrawer,
  setSelectFlightKey,
} from "@/src/store/slices/BookingflightSlice";

import { useEffect, useState } from "react";
import BookingDrawer from "../../Checkout/BookingDrawer/BookingDrawer";
import {
  currencySymbols,
  formatTextToHtmlList,
  sanitizeResponse,
} from "@/src/utils/utils";
import Link from "next/link";
import FilterParams from "../YourTripSidebar/FilterParams";
import SidebarTripDetails from "./SidebarTripDetails";
import OfferCardSidebar from "./OfferCardSidebar";
import SidebarTabs from "./SidebarTabs";

const YourTripSedebarCard = ({
  FlightExpire,
  filterParams,
  getBuilder,
  isSidebar
}) => {
  const [tabValue, setTabValue] = useState(0);
  const BuilderArguments =
    getBuilder?.silent_function_template?.[0]?.function?.arguments;

  const getselectedFlight = useSelector(
    (state) => state?.booking?.singleFlightData
  );
  
  console.log("getselectedFlight", getselectedFlight);

  const dispatch = useDispatch();
  const offerkey = getselectedFlight?.id;
  const isPassenger = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );

  // const SearchHistoryGet = useSelector(
  //   (state) => state.getMessages.SearchHistory
  // );
  // const SearchHistorySend = useSelector(
  //   (state) => state.sendMessage?.SearchHistorySend
  // );
  // const SearchHistory = SearchHistorySend || SearchHistoryGet;

  //console.log("SearchHistorySend", SearchHistory);
  
  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );

  const personQuantity = getselectedFlight?.passengers.length;
  const Passengers = Number(getselectedFlight?.per_passenger_amount) * personQuantity;
  const WithtaxAmount = Number(getselectedFlight?.tax_amount) + Passengers;
  const totalAmount = Math.round(WithtaxAmount);

  const validPassengers = GetViewPassengers?.filter(
    (p) => p.given_name && p.family_name
  );
  // const totalTravelers =
  //   (SearchHistory.adults || 0) +
  //   (SearchHistory.children || 0) +
  //   (SearchHistory.infants || 0);

  const TripTags = [
    "city lover",
    "family friendly",
    "street food",
    "direct flight",
    "temples",
    "urban adventure",
    "local experience",
  ];

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

  

  return (
    <>
      {/* Open drawer only for the selected flight */}
      <Box component={"section"} className="Tabs" px={"18px"} pb={1}>
        {isSidebar ? <SidebarTabs /> : ""}
      </Box>

      <Box
        className={TripStyles.TripBody}
        sx={{ pt: { md: "18px", xs: 0 } }}
        px={"18px"}
        component={"section"}
        pb={3}
      >
        <Box
          id="overview"
          mb={3}
          className={TripStyles.Header2 + " aaa"}
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <Box>
            <Box>
              {BuilderArguments?.to_destination &&
              BuilderArguments?.trip_length &&
              BuilderArguments?.from_destination ? (
                <Typography
                  component="h4"
                  sx={{ fontSize: { xs: "16px", md: "20px" } }}
                  className="font-semibold text-black mb-0"
                >
                  My {BuilderArguments.trip_length} day(s) travel to{" "}
                  {BuilderArguments.to_destination}
                </Typography>
              ) : BuilderArguments?.to_destination &&
                BuilderArguments?.trip_length ? (
                <h4 className="semibold black mb-0">
                  My {BuilderArguments.trip_length} day(s) travel to{" "}
                  {BuilderArguments.to_destination}
                </h4>
              ) : BuilderArguments?.to_destination &&
                BuilderArguments?.from_destination ? (
                <h4 className="semibold black mb-0">
                  My travel to {BuilderArguments.to_destination}
                </h4>
              ) : BuilderArguments?.to_destination ? (
                <h4 className="semibold black mb-0">
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
                    className={
                      TripStyles.tripDetailsCol + " f12 black semibold"
                    }
                  >
                    {BuilderArguments.from_destination} -{" "}
                    {BuilderArguments.to_destination}
                  </Box>
                )}

              {(BuilderArguments?.departure_date ||
                BuilderArguments?.return_date) && (
                <Box
                  sx={{}}
                  className={TripStyles.tripDetailsCol + " f12 black semibold"}
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
                <Box
                  className={TripStyles.tripDetailsCol + " f12 black semibold"}
                >
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
        {/*  */}
        {!getselectedFlight ? (
          <SidebarTripDetails id="itinerary-section" />
        ) : (
          ""
        )}

        <Box>
          {/*  */}

          {getselectedFlight ? (
            <>
              <Box>
                {/* footer */}
                {getselectedFlight?.slices.map((slice, index) => (
                  <>
                    <Box mb={3}>
                      {index === 0 ? (
                        <>
                          <Box mb={1}>
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              gap={"12px"}
                            >
                              <Typography
                                className={
                                  TripStyles.onewayReturn +
                                  " btn btn-xs btn-black "
                                }
                              >
                                Departing |{" "}
                                {new Date(
                                  BuilderArguments?.departure_date
                                ).toLocaleDateString("en-GB", {
                                  weekday: "short",
                                  day: "2-digit",
                                  month: "short",
                                })}
                              </Typography>
                              <Typography className="f12 semibold">
                                {BuilderArguments?.from_destination} - {BuilderArguments?.to_destination}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography className="f12">
                            {/* Arrive in Bangkok and unwind – check-in opens at
                            4pm. */}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Box mb={1}>
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              gap={"12px"}
                            >
                              <Typography 
                                className={
                                  TripStyles.onewayReturn +
                                  " btn btn-xs btn-black"
                                }
                              >
                                Return |{" "}
                                {new Date(
                                  BuilderArguments?.return_date
                                ).toLocaleDateString("en-GB", {
                                  weekday: "short",
                                  day: "2-digit",
                                  month: "short",
                                })}
                              </Typography>
                              <Typography className="f12 semibold">
                                {BuilderArguments?.to_destination} - {BuilderArguments?.from_destination}
                              </Typography>
                            </Box>
                          </Box>
                          {/* <Typography className="f12">
                            Add airport name and flight number here.
                          </Typography> */}
                        </>
                      )}
                    </Box>
                    {/* offer card  */}
                    <Box id={index === 1 ? "offer-card-return" : "offer-card"}>
                      <OfferCardSidebar
                        index={index}
                        slice={slice}
                      />
                    </Box>
                    {/*  */}
                    {BuilderArguments?.itinerary_text && (
                      <Box id="itinerary-section" mb={3}>
                        <Box mb={1}>
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={"12px"}
                          >
                            <Typography
                              className={
                                TripStyles.onewayReturn +
                                " btn btn-xs btn-black"
                              }
                            >
                              Itinerary for {BuilderArguments?.to_destination}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography
                          className="f12"
                          sx={{ whiteSpace: "pre-line" }}
                        >
                          <Typography
                            className="formateContent f12 mt-0"
                            component="div"
                            variant="body1"
                            dangerouslySetInnerHTML={{
                              __html: formatTextToHtmlList(
                                convertMarkdownToHtml(
                                  sanitizeResponse(
                                    BuilderArguments?.itinerary_text
                                  )
                                )
                              ),
                            }}
                          />
                        </Typography>
                      </Box>
                    )}
                  </>
                ))}
              </Box>
            </>
          ) : (
            ""
          )}

          {/* {BuilderArguments.from_destination &&
                BuilderArguments.to_destination && (
                  <Box
                    className="imggroup"
                    borderRadius={"16px"}
                    overflow={"hidden"}
                    mb={3}
                  >
                    <img src="/images/trip-map-png.png" />
                  </Box>
                )} */}
          {/* <Box mb={3}>
                <Typography className="f12">
                  You’ve booked a return flight from London to Bangkok with
                  Qatar Airways, arriving on 20 June and returning on 26 June.
                  You’ll spend 6 nights in the city — perfect for urban
                  exploration, street food and temples. Ready to add your hotel,
                  transfers, or activities? Everything stays synced right here.
                </Typography>
              </Box> */}
          {/*  */}

          {/* <Box
                mb={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
                className="border-dashed"
                borderRadius={"8px"}
                p={"12px"}
              >
                <Box>
                  <Typography className="f12">
                    Want to visit the floating markets on Day 2. Also, consider
                    booking a cooking class in the city centre.
                  </Typography>
                </Box>
                <Box className="imggroup">
                  <Avatar
                    src="/images/edit-pen-icon.svg"
                    alt="edit"
                    sx={{
                      width: 10,
                      height: 10,
                      bgcolor: "transparent", // optional, keeps background clear
                      opacity: 0.2,
                    }}
                    variant="square" // optional if you don’t want it rounded
                  />
                </Box>
              </Box> */}
          {/*  */}
          {/* <Box display={"flex"} alignItems={"center"} mb={3} gap={"12px"}>
                <Typography
                  className={TripStyles.onewayReturn + " btn btn-xs btn-black "}
                >
                  Day 1 | Fri, 20 Jun
                </Typography>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Typography>Bangkok</Typography>
                  <Box className="imggroup">
                    <Avatar
                      src="/images/edit-pen-icon.svg"
                      alt="edit"
                      sx={{
                        width: 10,
                        height: 10,
                        bgcolor: "transparent", // optional, keeps background clear
                        opacity: 0.2,
                      }}
                      variant="square" // optional if you don’t want it rounded
                    />
                  </Box>
                </Box>
              </Box> */}
          {/*  */}
          {/* <Box display="flex" alignItems="center" gap={2}>
                <Box>🌤️</Box>
                <Box>
                  <Typography className="f12 semibold black">
                    32° 27° Partly Cloudy
                  </Typography>
                  <Typography className="f12 black">
                    Arrive in Bangkok and unwind - check-in at 4pm.
                  </Typography>
                </Box>
              </Box> */}

          {/*  */}
        </Box>
        {/*  */}
      </Box>
      {/* Extra Info bottom */}

      <Divider />
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
