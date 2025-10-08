import { Box, Typography, Avatar, Stack, CircularProgress } from "@mui/material";
import TripStyles from "@/src/styles/sass/components/search-result/YourTripSidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { currencySymbols } from "@/src/utils/utils";
import { DeleteCart, setHotelDrawer } from "@/src/store/slices/BookingflightSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSinglehotel } from "@/src/store/slices/HotelSlice";
import IncludedTooltips from "../../HotelCard/IncludedTooltips";

const HotelCardSidebar = ({ hotel, Carduuid }) => {
  // Static mock data

  
  const threaduuid = useSelector((state) => state?.sendMessage?.threadUuid);
  const isloading = useSelector((state) => state?.booking?.isLoading);
  const orderSuccess = useSelector((state) => state?.payment?.OrderConfirm); //from order api
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
  const handleHotelDrawer = (gethotel) => {
      dispatch(setSinglehotel(gethotel));
      dispatch(setHotelDrawer(true));
    };

    
    
    
  
  return (
    <Box
      className={`${TripStyles.flightOfferCard} ${TripStyles.hotelOfferCard}`}
      mb={3}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2} alignItems="center">
          <Typography className="f12 semibold">Stay</Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={TripStyles.SelectedLabel + " chip chipGray sm"}
          >
            Selected
          </Box>
        </Box>
        {!orderSuccess && (
          <>
            {isloading ? (
              <>
                <CircularProgress size={18} sx={{ color: "#00C4CC" }} />
              </>
            ) : (
              <Box className="cursor-pointer" onClick={handleDeleteCart}>
                <img alt="delete" src="/images/delete-icon.svg" />
              </Box>
            )}
          </>
        )}
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
          <Typography className="f14 bold" textTransform={"capitalize"}>
            {hotel.name}
          </Typography>
        </Box>
        <Box style={{ cursor: "pointer" }}>
          <Box
            className="text-decoration-none cursor-pointer"
            onClick={() => handleHotelDrawer(hotel)}
          >
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

      <Stack flexDirection="row" className="w-100" gap="10px">
        {/* Image */}
        <Box
          className="imggroup"
          width="81px"
          height="60px"
          borderRadius="12px"
          overflow="hidden"
        >
          <img
            src={`${
              hotel?.content?.images[0]?.url || "/images/hotel-nothumb.png"
            }`}
            alt={hotel.name}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Hotel Info */}
        <Stack justifyContent={"center"} gap={"3px"}>
          
          <Typography className="f12 bold">
            {hotel?.rooms[0]?.rates[0]?.adults &&
              `${hotel?.rooms[0]?.rates[0]?.adults} adults, `}
            {hotel?.rooms[0]?.rates[0]?.children &&
              `${hotel?.rooms[0]?.rates[0]?.children} children `}
          </Typography>
          <Typography mb={"5px"} className="f12 bold black-50">
            {new Date(hotel?.checkIn).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}{" "}
            -{" "}
            {new Date(hotel?.checkOut).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}{" "}
          </Typography>
          <IncludedTooltips />
        </Stack>
      </Stack>
      <Stack alignItems={"center"} flexDirection={"row"} gap={"12px"}>
        
        <Box>
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 9.5V5.45C0 5.125 0.0759549 4.81875 0.227865 4.53125C0.379774 4.24375 0.595486 4.03125 0.875 3.89375V2.3C0.875 1.8 1.04514 1.375 1.38542 1.025C1.72569 0.675 2.13889 0.5 2.625 0.5H5.90625C6.11479 0.5 6.30972 0.534375 6.49104 0.603125C6.67236 0.671875 6.84201 0.775 7 0.9125C7.15799 0.775 7.32764 0.671875 7.50896 0.603125C7.69028 0.534375 7.88521 0.5 8.09375 0.5H11.375C11.8611 0.5 12.2743 0.675 12.6146 1.025C12.9549 1.375 13.125 1.8 13.125 2.3V3.89375C13.4045 4.03125 13.6202 4.24375 13.7721 4.53125C13.924 4.81875 14 5.125 14 5.45V9.5H12.6875V8.15H1.3125V9.5H0ZM7.65625 3.65H11.8125V2.3C11.8125 2.1725 11.7706 2.06563 11.6867 1.97938C11.6029 1.89313 11.499 1.85 11.375 1.85H8.09375C7.96979 1.85 7.86589 1.89313 7.78203 1.97938C7.69818 2.06563 7.65625 2.1725 7.65625 2.3V3.65ZM2.1875 3.65H6.34375V2.3C6.34375 2.1725 6.30182 2.06563 6.21797 1.97938C6.13411 1.89313 6.03021 1.85 5.90625 1.85H2.625C2.50104 1.85 2.39714 1.89313 2.31328 1.97938C2.22943 2.06563 2.1875 2.1725 2.1875 2.3V3.65ZM1.3125 6.8H12.6875V5.45C12.6875 5.3225 12.6456 5.21563 12.5617 5.12937C12.4779 5.04313 12.374 5 12.25 5H1.75C1.62604 5 1.52214 5.04313 1.43828 5.12937C1.35443 5.21563 1.3125 5.3225 1.3125 5.45V6.8Z"
              fill="black"
            />
          </svg>
        </Box>
        <Stack>
          <Typography className="f12 bold">Superior Room Room only,</Typography>
          <Typography className="f12 black-50">
            cancellation before 18 June
          </Typography>
        </Stack>
      </Stack>
      {/* Price Section */}
      <Stack
        textAlign="right"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        gap={"2px"}
      >
        <Typography component="span" className="f11 bold black">
          {currencySymbols[hotel?.currency]}
          {Math.round(hotel?.totalNet)},{" "}
        </Typography>
        <Typography component="span" className="f11 black">
          suggested by Mylz
        </Typography>
        <img src="/images/hotel/sugested-stars-icon.svg" />
      </Stack>
      {/* Travellers */}
      {/* Baggage */}
    </Box>
  );
};

export default HotelCardSidebar;
