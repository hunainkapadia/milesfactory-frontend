import { Box, Typography, Avatar, Stack } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { currencySymbols } from "@/src/utils/utils";
import { DeleteCart, setHotelDrawer } from "@/src/store/slices/BookingflightSlice";
import { useDispatch, useSelector } from "react-redux";

const HotelCardSidebar = ({ hotel, Carduuid }) => {
  // Static mock data

  console.log("Carduuidhotel_000", Carduuid);
  const threaduuid = useSelector((state) => state?.sendMessage?.threadUuid);
  const dispatch = useDispatch();

  const handleDeleteCart = () => {
    dispatch(DeleteCart(threaduuid, Carduuid));
  };
  if (!hotel?.rooms?.length) return null;

  // Always get the first room
  const firstRoom = hotel.rooms[0];

  if (!firstRoom?.rates?.length) return null;

  // Always get the first rate from that room
  const firstRate = firstRoom.rates[0];

  const roomCount = firstRate.rooms;
  const adults = firstRate.adults;
  const infants = firstRate.children; // assuming children = infants
  const price = parseFloat(firstRate.net).toFixed(2);
  const handleHotelDrawer = () => {
      dispatch(setHotelDrawer(true));
    };
  
  return (
    <Box
      className={TripStyles.flightOfferCard}
      mb={3}
      sx={{
        backgroundColor: "#FAFEFE !important",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2} alignItems="center">
          <Typography className="f12 semibold">Hotel</Typography>
          <FontAwesomeIcon
            onClick={handleDeleteCart}
            className="basecolor1-50"
            cursor="pointer"
            icon={faClose}
            fontSize={20}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={TripStyles.SelectedLabel + " chip chipGray sm"}
        >
          Selected
        </Box>
      </Box>

      {/* Airline Info */}
      <Box
        component="section"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          className={TripStyles.logoCol}
          display="flex"
          alignItems="center"
          gap={2}
        >
          {/* <Avatar
            src={slice.segments[0].marketing_carrier.logo_symbol_url}
            alt={slice.segments[0].marketing_carrier.name}
            className={TripStyles.airlineLogo}
          /> */}
          <Box>
            <Typography lineHeight={1} className="f14 mb-0 bold black">
              Check-in after{" "}
              {hotel?.checkIn
                ? new Date(hotel.checkIn)
                    .toLocaleTimeString([], {
                      hour: "numeric",
                      minute: undefined,
                      hour12: true,
                    })
                    .toLowerCase()
                : ""}
            </Typography>
          </Box>
        </Box>
        <Box style={{ cursor: "pointer" }}>
          <Box className="text-decoration-none cursor-pointer" onClick={handleHotelDrawer}>
            <Box
              gap="4px"
              alignItems="center"
              display="flex"
              className="basecolor1 semibold f12"
            >
              <span>See details</span>
              <i className="fa-angle-right fa fas"></i>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Flight Timings */}

      <Box>
        <Stack
          flexDirection="row"
          justifyContent={"space-between"}
          className="w-100"
          gap="10px"
        >
          {/* Image */}
          <Box
            className="imggroup"
            width="71px"
            height="50px"
            borderRadius="8px"
            overflow="hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={hotel.name}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Hotel Info */}
          <Box textAlign="right">
            <Typography mb={"6px"} className="f14 bold" textTransform={"capitalize"}>
              {hotel.name}
            </Typography>
            <Typography className="f12 bold">
              <Typography className="f12 bold">
                {[
                  roomCount > 0 && `${roomCount} ${firstRoom.name}`,
                  adults > 0 && `${adults} adult${adults > 1 ? "s" : ""}`,
                  infants > 0 && `${infants} infant${infants > 1 ? "s" : ""}`,
                ]
                  .filter(Boolean) // remove any false/empty entries
                  .join(", ")}{" "}
              </Typography>
            </Typography>
          </Box>
        </Stack>

        {/* Price Section */}
        <Stack
          textAlign="right"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          mt={2}
        >
          <Typography component="span" className="f11 bold black">
            {currencySymbols[hotel?.currency]} {Math.round(hotel?.totalNet)},{" "}
          </Typography>
          <Typography component="span" className="f11 black">
            suggested by Mylz ✨
          </Typography>
        </Stack>
      </Box>

      {/* Travellers */}
      {/* Baggage */}
    </Box>
  );
};

export default HotelCardSidebar;
