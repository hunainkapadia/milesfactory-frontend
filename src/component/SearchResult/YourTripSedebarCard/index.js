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
import { currencySymbols } from "@/src/utils/utils";
import Link from "next/link";
import FilterParams from "../YourTripSidebar/FilterParams";
import SidebarTripDetails from "./SidebarTripDetails";

const YourTripSedebarCard = ({
  offerData,
  FlightExpire,
  filterParams,
  getBuilder,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const BuilderArguments =
    getBuilder?.silent_function_template?.[0]?.function?.arguments;

    const getselectedFlight = useSelector(
    (state) => state?.booking?.flightDetail
  );
  console.log("getBuilder", BuilderArguments);

  const dispatch = useDispatch();
  const offerkey = offerData?.id;
  const HandleSelectDrawer = () => {
    // Dispatch flight detail and open drawer
    if (offerkey) {
      dispatch(setOpenDrawer(offerkey)); //setSelectFlightKey empty then close drawer
      dispatch(setflightDetail(offerData)); // Store flight details
    }
  };
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

  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );

  const personQuantity = offerData?.passengers.length;
  const Passengers = Number(offerData?.per_passenger_amount) * personQuantity;
  const WithtaxAmount = Number(offerData?.tax_amount) + Passengers;
  const totalAmount = Math.round(WithtaxAmount);

  const validPassengers = GetViewPassengers?.filter(
    (p) => p.given_name && p.family_name
  );
  // const totalTravelers =
  //   (SearchHistory.adults || 0) +
  //   (SearchHistory.children || 0) +
  //   (SearchHistory.infants || 0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    if (newValue === 0) {
      dispatch(setInputLabelTexts(messageBookFlight));
    } else if (newValue === 1) {
      dispatch(setInputLabelTexts(messageExploreExperience));
    }
  };

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

  return (
    <>
      {/* Open drawer only for the selected flight */}
      <Box
        className={TripStyles.TripBody}
        sx={{ pt: { md: "18px", xs: 0 } }}
        px={"18px"}
        component={"section"}
        pb={3}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { display: "none" } }}
          className={TripStyles.customTabs + "  customTabs"}
          sx={{
            backgroundColor: "#F2F7F8",
            borderRadius: "8px",
            padding: "4px",

            alignItems: "center",
            mb: "18px",
            display: { md: "flex", xs: "none" },
          }}
        >
          <Tab
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <Typography className="f12">Overview</Typography>
              </Box>
            }
            className={`${TripStyles.inactiveTab} ${
              tabValue === 0 ? TripStyles.activeTab : ""
            }`}
          />        
          <Tab
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <Typography className="f12">Flights</Typography>
              </Box>
            }
            className={`${TripStyles.inactiveTab} ${
              tabValue === 1 ? TripStyles.activeTab : ""
            }`}
          />
          <Tab
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <Typography className="f12">Itinerary</Typography>
              </Box>
            }
            className={`${TripStyles.inactiveTab} ${
              tabValue === 1 ? TripStyles.activeTab : ""
            }`}
          />
        </Tabs>
        <Box
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
                  {BuilderArguments.to_destination} from{" "}
                  {BuilderArguments.from_destination}
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
                  My travel to {BuilderArguments.to_destination} from{" "}
                  {BuilderArguments.from_destination}
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
        {!getselectedFlight ? <SidebarTripDetails /> : ""}

        <Box>
          {/*  */}
          {offerData ? (
            <>
              <Box>
                {/* footer */}
                {offerData?.slices.map((slice, index) => (
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
                                Outbound |{" "}
                                {new Date(
                                  BuilderArguments?.departure_date
                                ).toLocaleDateString("en-GB", {
                                  weekday: "short",
                                  day: "2-digit",
                                  month: "short",
                                })}
                              </Typography>
                              <Typography className="f12 semibold">
                                {BuilderArguments?.from_destination}
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
                                {BuilderArguments?.to_destination}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography className="f12">
                            Departure. Check out and head to the airport for
                            your flight.
                          </Typography>
                        </>
                      )}
                    </Box>
                    <Box className={`${TripStyles.flightOfferCard}`} mb={3}>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        {index === 0 ? (
                          <Box display={"flex"}>
                            <Typography className="f12 semibold">
                              Outbound flight
                            </Typography>
                          </Box>
                        ) : (
                          <Box display={"flex"}>
                            <Typography className="f12 semibold">
                              Return flight
                            </Typography>
                          </Box>
                        )}
                        <Box>
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            className={TripStyles.SelectedLabel + " br-100 f12"}
                          >
                            Selected
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        component={"section"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Box
                          key={index}
                          className={`${TripStyles.logoCol}`}
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <Avatar
                            src={
                              slice?.segments[0]?.marketing_carrier
                                ?.logo_symbol_url
                            }
                            alt={slice?.segments[0]?.marketing_carrier?.name}
                            className={TripStyles.airlineLogo}
                          />
                          <Box>
                            <Typography className="f14 mb-0 bold black ">
                              {slice?.segments[0]?.marketing_carrier?.name}
                            </Typography>
                            <Typography
                              textTransform={"capitalize"}
                              className="f12 mb-0 bold gray "
                            >
                              {slice?.segments[0]?.passengers[0]?.cabin_class}
                            </Typography>
                          </Box>
                        </Box>
                        <Box style={{ cursor: "pointer" }}>
                          <Box
                            onClick={HandleSelectDrawer}
                            className="text-decoration-none cursor-pointer"
                          >
                            <Box
                              gap={1}
                              alignItems={"center"}
                              display={"flex"}
                              className=" basecolor1 semibold f12"
                            >
                              <span>See details</span>
                              <i className="fa-angle-right fa fas"></i>{" "}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      {/*  */}

                      {/*  */}
                      <Box
                        className={TripStyles.fromAndToRow}
                        key={index}
                        display="flex"
                        alignItems="center"
                        gap={2}
                      >
                        {/* Airline Logo */}

                        {/* Flight Details */}
                        <Box className={`${TripStyles.FlightTimingsCol} w-100`}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={2} // Optional spacing
                          >
                            {/* Departure Time & Code */}
                            <Box className={TripStyles.Timings}>
                              <Typography className={TripStyles.flightTime}>
                                {new Date(
                                  slice.departing_at
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </Typography>
                              <Typography
                                className={TripStyles.flightRoute + " f12"}
                              >
                                {slice.origin.iata_code}
                              </Typography>
                            </Box>

                            {/* Flight Duration with Dotted Line */}
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="center"
                              flex={1}
                              className={TripStyles.flightDurationBox}
                            >
                              <Box className={TripStyles.divider}>
                                <img
                                  src={
                                    slice.segments?.length === 1
                                      ? "/images/direct-plan-icon.svg"
                                      : "/images/stop-plan-icon.svg"
                                  }
                                />
                              </Box>
                              <Typography className={" gray f12"}>
                                {slice.duration}
                              </Typography>
                              {/* Dotted Line */}
                            </Box>

                            {/* Arrival Time & Code */}
                            <Box
                              textAlign={"right"}
                              className={TripStyles.Timings}
                            >
                              <Typography className={TripStyles.flightTime}>
                                {new Date(slice.arriving_at).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  }
                                )}
                              </Typography>
                              <Typography
                                className={TripStyles.flightRoute + " f12"}
                              >
                                {slice.destination.iata_code}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      {/* traveller and baggage */}
                      {validPassengers?.length ? (
                        <Box
                          component={"section"}
                          display={"flex"}
                          flexDirection={"column"}
                          gap={2}
                        >
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                          >
                            <Box>
                              <Typography className="f12 bold">
                                Travellers
                              </Typography>
                              <Typography className="f12 gray">
                                {validPassengers?.map((p, i) => {
                                  const isLast =
                                    i === validPassengers.length - 1;
                                  return (
                                    <span key={i}>
                                      {p.given_name} {p.family_name}
                                      {!isLast && ", "}
                                    </span>
                                  );
                                })}
                              </Typography>
                            </Box>
                            <Box>
                              <i className="fa f20 fa-angle-right basecolor1"></i>
                            </Box>
                          </Box>
                        </Box>
                      ) : null}

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        component="section"
                        justifyContent={"space-between"}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems={"flex-start"}
                        >
                          <Box pt={0}>
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.75 2.75V1.5H5.25V2.75H7.75ZM1.5 4V10.875H11.5V4H1.5ZM11.5 2.75C12.1937 2.75 12.75 3.30625 12.75 4V10.875C12.75 11.5688 12.1937 12.125 11.5 12.125H1.5C0.80625 12.125 0.25 11.5688 0.25 10.875L0.25625 4C0.25625 3.30625 0.80625 2.75 1.5 2.75H4V1.5C4 0.80625 4.55625 0.25 5.25 0.25H7.75C8.44375 0.25 9 0.80625 9 1.5V2.75H11.5Z"
                                fill="black"
                                fillOpacity="0.3"
                              />
                            </svg>
                          </Box>

                          <Stack width={"100%"}>
                            <Typography className="f12 basecolor">
                              <Typography
                                component={"span"}
                                className="f12 bold basecolor"
                              >
                                Extra baggage:{" "}
                              </Typography>
                              {(() => {
                                const baggageMap = new Map();

                                offerData?.slices.forEach((slice) => {
                                  slice?.segments?.forEach((segment) => {
                                    segment?.passengers?.forEach(
                                      (passenger) => {
                                        passenger?.baggages?.forEach(
                                          (baggage) => {
                                            const key = `${baggage.type}-${baggage.formatted_type}`;
                                            if (!baggageMap.has(key)) {
                                              baggageMap.set(key, {
                                                ...baggage,
                                              });
                                            }
                                          }
                                        );
                                      }
                                    );
                                  });
                                });

                                const uniqueBaggages = Array.from(
                                  baggageMap.values()
                                );

                                return offerData?.slices.map(
                                  (slice, sliceIndex) => {
                                    const baggageSummary = uniqueBaggages
                                      .filter((baggage) => baggage.quantity > 0)
                                      .map(
                                        (baggage) =>
                                          `${baggage.quantity}x ${baggage.formatted_type}`
                                      )
                                      .join(", ");

                                    return (
                                      <span key={sliceIndex}>
                                        {baggageSummary || "No baggage info"}
                                        {sliceIndex === 0 &&
                                        offerData?.slices.length > 1
                                          ? " / "
                                          : ""}
                                      </span>
                                    );
                                  }
                                );
                              })()}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          className="f12 basecolor1"
                          whiteSpace={"nowrap"}
                        >
                          {/* <Typography className="f12" component="span">
                            Change
                          </Typography> */}
                          {/* <i className="fa f12 fa-angle-right basecolor1" /> */}
                        </Stack>
                      </Stack>

                      <Box
                        component={"section"}
                        display={"flex"}
                        justifyContent={"flex-end"}
                      >
                        <Box
                          border={1}
                          borderColor="rgba(197, 218, 222, 0.5)"
                          component={"section"}
                          display={"flex"}
                          alignItems={"center"}
                          gap={1}
                          className="white-bg br-100 "
                          px={"14px"}
                          py={"10px"}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 11.75C8.2125 11.75 8.39063 11.6781 8.53438 11.5344C8.67813 11.3906 8.75 11.2125 8.75 11C8.75 10.7875 8.67813 10.6094 8.53438 10.4656C8.39063 10.3219 8.2125 10.25 8 10.25C7.7875 10.25 7.60938 10.3219 7.46563 10.4656C7.32188 10.6094 7.25 10.7875 7.25 11C7.25 11.2125 7.32188 11.3906 7.46563 11.5344C7.60938 11.6781 7.7875 11.75 8 11.75ZM7.25 8.75H8.75V4.25H7.25V8.75ZM8 15.5C6.9625 15.5 5.9875 15.3031 5.075 14.9094C4.1625 14.5156 3.36875 13.9813 2.69375 13.3063C2.01875 12.6313 1.48438 11.8375 1.09063 10.925C0.696875 10.0125 0.5 9.0375 0.5 8C0.5 6.9625 0.696875 5.9875 1.09063 5.075C1.48438 4.1625 2.01875 3.36875 2.69375 2.69375C3.36875 2.01875 4.1625 1.48438 5.075 1.09063C5.9875 0.696875 6.9625 0.5 8 0.5C9.0375 0.5 10.0125 0.696875 10.925 1.09063C11.8375 1.48438 12.6313 2.01875 13.3063 2.69375C13.9813 3.36875 14.5156 4.1625 14.9094 5.075C15.3031 5.9875 15.5 6.9625 15.5 8C15.5 9.0375 15.3031 10.0125 14.9094 10.925C14.5156 11.8375 13.9813 12.6313 13.3063 13.3063C12.6313 13.9813 11.8375 14.5156 10.925 14.9094C10.0125 15.3031 9.0375 15.5 8 15.5Z"
                              fill="#DEB135"
                              fill-opacity="0.7"
                            />
                          </svg>
                          <Typography component={"span"} className="f11 bold">
                            Add missing travellers
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        className="f11"
                        display={"flex"}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        gap={0.5}
                      >
                        {/* <Typography component={"span"} className="bold f12">
                          {currencySymbols[offerData?.tax_currency] ||
                            offerData?.tax_currency}
                          {Math.round(offerData?.per_passenger_amount)},{" "}
                        </Typography>
                        <Typography component={"span"} className="f12">
                          selected by you
                        </Typography> */}
                      </Box>

                      {/*  */}
                    </Box>
                    {/*  */}
                    {BuilderArguments?.itinerary_text &&
                      <Box mb={3}>
                        <Box mb={1}>
                          <Box display={"flex"} alignItems={"center"} gap={"12px"}>
                            <Typography
                              className={TripStyles.onewayReturn + " btn btn-xs btn-black"}
                            >
                              Itinerary for {BuilderArguments?.to_destination}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography className="f12" sx={{ whiteSpace: "pre-line" }}>
                          {BuilderArguments?.itinerary_text}
                        </Typography>
                      </Box>
                    }
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
