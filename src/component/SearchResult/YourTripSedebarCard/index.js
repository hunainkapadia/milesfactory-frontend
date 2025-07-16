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

const YourTripSedebarCard = ({
  offerData,
  FlightExpire,
  filterParams,
  getBuilder,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const BuilderArguments =
    getBuilder?.silent_function_template?.[0]?.function?.arguments;

  console.log(
    "getBuilder",
    getBuilder?.silent_function_template?.[0]?.function?.arguments
  );

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
        pt={"18px"}
        px={3}
        component={"section"}
        pb={3}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { display: "none" } }}
          className={TripStyles.customTabs + " customTabs"}
          sx={{
            backgroundColor: "#F2F7F8",
            borderRadius: "8px",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            mb: "18px",
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
                <Typography className="f12">Days 1</Typography>
              </Box>
            }
            className={`${TripStyles.inactiveTab} ${
              tabValue === 1 ? TripStyles.activeTab : ""
            }`}
          />
          <Tab
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <Typography className="f12">Days 2-6</Typography>
              </Box>
            }
            className={`${TripStyles.inactiveTab} ${
              tabValue === 1 ? TripStyles.activeTab : ""
            }`}
          />
        </Tabs>
        <Box
          mb={2}
          className={TripStyles.Header2 + " aaa"}
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <Box>
            <Box>
              <h4 className="semibold black mb-0">
                {tripDays
                  ? `My ${tripDays}-day travel in ${BuilderArguments?.to_destination}`
                  : `My travel in ${BuilderArguments?.to_destination}`}
              </h4>
            </Box>
            <Box display="flex" flexWrap="wrap" className={TripStyles.tripDetails}>
              {BuilderArguments?.from_destination &&
                BuilderArguments?.to_destination && (
                  <Box
                    
                    
                    sx={{  }}
                    className={TripStyles.tripDetailsCol + " f12 black semibold"}
                  >
                    {BuilderArguments.from_destination} -{" "}
                    {BuilderArguments.to_destination}
                  </Box>
                )}

              {(BuilderArguments?.departure_date ||
                BuilderArguments?.return_date) && (
                <Box
                  
                  
                  sx={{  }}
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
                <Box className={TripStyles.tripDetailsCol + " f12 black semibold"}>
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
        <Box
          className={TripStyles.TripTags}
          display="flex"
          flexWrap="wrap"
          gap={1}
          sx={{ mb: 3 }}
        >
          {TripTags.map((tag, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "#F6F8FA",
                color: "rgba(0, 0, 0, 0.7)",
                borderRadius: "999px",
                px: 2,
                py: 0.5,
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {tag}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* filter row */}
        <Box className={`${TripStyles.flightOfferCard}`} mt={2}>
          <Box className={TripStyles.CardLeft} lg={12} md={12}>
            {/* footer */}
            {/*  */}
            <Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={3}
              >
                <Box display={"flex"}>
                  <Typography
                    className={
                      TripStyles.onewayReturn + " btn btn-xs btn-black "
                    }
                  >
                    Overview
                  </Typography>
                </Box>
              </Box>
              {/*  */}
              <Box
                className="imggroup"
                borderRadius={"16px"}
                overflow={"hidden"}
                mb={3}
              >
                <img src="/images/trip-map-png.png" />
              </Box>

              <Box mb={3}>
                <Typography className="f12">
                  You’ve booked a return flight from London to Bangkok with
                  Qatar Airways, arriving on 20 June and returning on 26 June.
                  You’ll spend 6 nights in the city — perfect for urban
                  exploration, street food and temples. Ready to add your hotel,
                  transfers, or activities? Everything stays synced right here.
                </Typography>
              </Box>
              {/*  */}

              <Box
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
              </Box>
              {/*  */}
              <Box display={"flex"} alignItems={"center"} mb={3} gap={"12px"}>
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
              </Box>
              {/*  */}
              <Box display="flex" alignItems="center" gap={2}>
                <Box>🌤️</Box>
                <Box>
                  <Typography className="f12 semibold black">
                    32° 27° Partly Cloudy
                  </Typography>
                  <Typography className="f12 black">
                    Arrive in Bangkok and unwind - check-in at 4pm.
                  </Typography>
                </Box>
              </Box>

              {/*  */}
            </Box>
            {/*  */}
          </Box>
          {/* Extra Info bottom */}
        </Box>
      </Box>
      <Divider />
      <Box
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
      </Box>
    </>
  );
};

export default YourTripSedebarCard;
