// components/TripCard.js
import { Card, Typography, Button, Box, Stack } from "@mui/material";
import Image from "next/image";
import styles from "@/src/styles/sass/components/MyTrips/Mytrips.module.scss";
import { useDispatch } from "react-redux";
import { TripDetailSlice } from "@/src/store/slices/Base/baseSlice";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useState } from "react";

const TripCard = ({ tripData }) => {
  const [expanded, setExpanded] = useState(false);
  
  const forHotel = tripData?.details?.hotel?.selected_hotel_offer;
  const forFlight = tripData?.details?.flight?.selected_offer;

  
  
  console.log("tripData_00", tripData);
  const slices = forFlight?.slices || [];
  const firstSeg = slices[0]?.segments?.[0];
  const isRoundTrip = slices.length > 1;

  const route = `${firstSeg?.origin?.city_name} - ${firstSeg?.destination?.city_name}`;
  const passengers = `${forFlight?.passengers?.length || 0} passenger${
    forFlight?.passengers?.length > 1 ? "s" : ""
  }`;
  const flightLogo = forFlight?.owner?.logo_symbol_url || "/default-airline-logo.png";
  const hotelLogo =  forHotel?.hotel.content?.images[0]?.url || "/images/hotel-nothumb.png";
  console.log("hotelLogo", hotelLogo);
  

  const departureDate = new Date(firstSeg?.departing_at).toDateString();
  const returnArrival = isRoundTrip
    ? new Date(slices[1]?.segments?.at(-1)?.arriving_at).toDateString()
    : null;

  const date = isRoundTrip
    ? `${departureDate} - ${returnArrival}`
    : departureDate;
  const description = `You're all set to fly with ${forFlight?.owner?.name}. Departure from ${firstSeg?.origin?.name} to ${firstSeg?.destination?.name}.`;

  const hotelDescription = forHotel?.hotel?.content?.description?.content || "";
  const text = forFlight ? description : hotelDescription;
  const maxLength = 80; // characters before truncation
  const shouldTruncate = text.length > maxLength;
  const displayText = expanded ? text : text.slice(0, maxLength)

  const dispatch = useDispatch();
  const router = useRouter();

  const handleTripDetail = (uuid) => {
    dispatch(TripDetailSlice(uuid));
    router.push(`/my-trips/${uuid}`);
  };

  return (
    <Card className={styles.tripCard} sx={{ p: 0 }} variant="outlined">
      <Box display="flex" flexDirection="column" gap={1.5}>
        {/* Trip status */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            px={2}
            py={0.5}
            sx={{
              backgroundColor: "#D9F1E9",
              color: "#005742",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "12px",
            }}
          >
            {tripData?.detail?.flight?.order_status === "confirmed"
              ? "Confirmed"
              : "Pending"}
          </Box>
        </Box>

        {/* Route and Dates */}
        <Box>
          <Typography className="bold">
            {forFlight && (
              <>
                {route} {isRoundTrip ? "Round-trip" : "One-way"}
              </>
            )}
            {forHotel?.hotel && <>{forHotel?.hotel?.content?.name?.content}</>}
          </Typography>
          <Typography className="f12 bold">
            {forHotel?.hotel && (
              <>
                {dayjs(forHotel?.hotel?.checkIn, "DD-MM-YYYY").format("DD MMM")}
                {" - "}
                {dayjs(forHotel?.hotel?.checkOut, "DD-MM-YYYY").format(
                  "DD MMM"
                )}
              </>
            )}
            {forFlight && (
              <>
                {date} | {passengers}
              </>
            )}
          </Typography>
        </Box>

        {/* Airline Logo */}
        <Box display="flex" justifyContent="center">
          {forFlight ? (
            <img
              src={flightLogo}
              alt="Airline"
              width={100}
              height={25}
              style={{ objectFit: "contain" }}
            />
          ) : (
            <>
              <Stack
                className="aaa"
                flexDirection={"row"}
                display={"flex"}
                gap={"10px"}
              >
                {forHotel?.hotel?.content?.images
                  ?.slice(0, 3)
                  ?.map((img, index) => (
                    <Box flex={1}>
                      <img
                        key={index}
                        src={img?.url || "/default-hotel.jpg"}
                        alt={forHotel?.hotel?.content?.name?.content || "Hotel"}
                        height="63"
                        style={{
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    </Box>
                  ))}
              </Stack>
            </>
          )}
        </Box>

        {/* Description */}
        <Box>
          <Typography className="f10" variant="body2" sx={{ color: "#555" }}>
            {displayText}
            {shouldTruncate && !expanded && "..."}
          </Typography>

          {shouldTruncate && (
            <Box
              className="basecolor1 cursor-pointer f10"
              sx={{ textTransform: "none", fontWeight: 500 }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read less" : "Read more"}
            </Box>
          )}
        </Box>

        {/* View Trip Button */}
        
        <Button
          onClick={() => handleTripDetail(tripData?.uuid)}
          className="btn btn-primary btn-round btn-sm btn-border f11"
          sx={{ width: "100%" }}
        >
          View trip
        </Button>
      </Box>
    </Card>
  );
};

export default TripCard;
