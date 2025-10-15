import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Stack,
  Tooltip,
  Rating,
  capitalize,
  Divider,
} from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/HotelCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  setCartType,
  setHotelDrawer,
} from "@/src/store/slices/BookingflightSlice";
import dayjs from "dayjs";
import { currencySymbols } from "@/src/utils/utils";
import {
  setAllHotels,
  setRoomDrawer,
  setSelectedhotelKey,
  setSelectedRateKey,
  setSinglehotel,
} from "@/src/store/slices/HotelSlice";
import { calculateHotelPricing } from "@/src/utils/hotelPriceUtils";
import IncludedTooltips from "./IncludedTooltips";
import { setAddFilledPassenger } from "@/src/store/slices/passengerDrawerSlice";
import { setOrderConfirm } from "@/src/store/slices/PaymentSlice";

const HotelCard = ({ hotel, allHotels }) => {
  const imageBaseUrl = "https://photos.hotelbeds.com/giata/";
  const images = hotel?.content?.images || [];
  
  
  const uuid = useSelector((state) => state?.sendMessage?.threadUuid);
  const selectedFlightKey = useSelector(
    (state) => state.booking.selectedFlightKey
  );
  const selectedhotelkey = useSelector(
    (state) => state.hotel?.selectedhotelKey
  );
  const selectedhotelCode = useSelector(
    (state) => state.hotel.selectedhotelCode
  );
  
  
  
  
  

  
  

  const isCartItems = useSelector(
    (state) => state?.booking?.getCartDetail?.items
  );

  const dispatch = useDispatch();

  // const handleBookHotel = (gethotel) => {
  //   const rateKey = gethotel?.rooms?.[0]?.rates?.[0]?.rateKey;
  //   dispatch(setAllHotels(allHotels));

  //   dispatch(setSelectedhotelKey(rateKey));
  //   const price = hotel?.minRate;

  //   const params = {
  //     chat_thread_uuid: uuid,
  //     offer_type: "hotel",
  //     offer_id: rateKey,
  //     price: price,
  //     currency: hotel?.currency,
  //     raw_data: {},
  //   };
  //   dispatch(AddToCart(params, uuid));
  // };
  const orderSuccess = useSelector((state) => state?.payment?.OrderConfirm);
  const handleSelectRoom = (gethotel) => {
    // for reset next order if in cart 1 
    if (orderSuccess) {
      dispatch(setAddFilledPassenger(null));
      dispatch(setOrderConfirm(null))
      dispatch(setCartType(null));
    }
    // 
    dispatch(setAllHotels(allHotels));
    dispatch(setSinglehotel(gethotel));

    dispatch(setRoomDrawer(true));
    dispatch(setSelectedRateKey(null));
  };

  // Extract stars (e.g. "4 STARS" → 4.0 rating)
  const stars = hotel?.categoryName ? parseInt(hotel.categoryName) : 0;

  // Extract first rate for board/offer/price
  const firstRate = hotel?.rooms?.[0]?.rates?.find(
  rate => rate.packaging === false && rate.rateType === "BOOKABLE"
);

  

  // Extract dates from rateKey if available

  const handleHotelDrawer = (gethotel) => {
    dispatch(setAllHotels(allHotels));
    dispatch(setSinglehotel(gethotel));

    dispatch(setHotelDrawer(true));
  };

  // Calculate number of nights properly
  const { nights, totalPrice, perNightPrice } = calculateHotelPricing(
    hotel,
    allHotels
  );
  
  
  
  const firstimage = images.filter((img) => img?.imageTypeCode === "GEN" && img?.order === 1);

  console.log("images_url_1", firstimage)
  
  return (
    <>
      <Box className={`${searchResultStyles.HotelCard}`}>
        <Grid container p={{ xs: "10px", md: "0" }}>
          {/* Left Section */}
          <Grid
            className={searchResultStyles.CardLeft}
            p={{ md: "18px", xs: "8px 0" }}
            lg={9}
            md={9}
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
          
            <Box
              className={searchResultStyles.HotelThumb}
              sx={{
                backgroundImage: `url(${firstimage[0]?.url_800 || "/images/hotel-nothumb.png"})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />

            <Box component={"section"} flex={1}>
              <Stack
                className="Row1"
                mb={"4px"}
                flexDirection={"row"}
                gap={"6px"}
                alignItems={"center"}
                justifyContent={{ md: "flex-start", xs: "space-between" }}
              >
                <Typography
                  className="bold mb-1 f12"
                  textTransform={"capitalize"}
                >
                  {hotel?.name}
                </Typography>
                {/* {firstRate?.offers?.[0] && (
                  <Box display={{ xs: "none", md: "flex" }}>
                    <Typography className={" chip sm chipGray"}>
                      {firstRate.offers[0].name}
                    </Typography>
                  </Box>
                )} */}
                <Box>
                  <Typography
                    textTransform={"capitalize"}
                    className={" chip sm basecolor1-light"}
                  >
                    {hotel?.categoryName.toLowerCase()}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                mb={{ md: "10px", xs: "6px" }}
                flexDirection={{ md: "row", xs: "column" }}
                alignItems={{ md: "center", xs: "flex-start" }}
                gap={"2px"}
              >
                {/* <Stack
                  className="Row2"
                  mb={{ md: "0px", xs: "0" }}
                  flexDirection={"row"}
                  alignItems="center"
                  gap={"3px"}
                > */}
                  {/* Rating Stars */}

                  {/* <Rating
                    name="feedback-rating"
                    value={5} // dynamic stars
                    precision={0.5}
                    readOnly
                    sx={{
                      fontSize: "10px",
                      "& .MuiRating-iconFilled": { color: "#FFCC33" },
                      "& .MuiRating-iconEmpty": { color: "#E0E0E0" },
                    }}
                  /> */}

                  {/* Numeric Rating */}
                  {/* <Typography className="f8 black" variant="body2">
                    {5}
                  </Typography> */}

                  {/* Review Count */}
                  {/* <Typography component="span" className="f8 black-50">
                    (200+ reviews)
                  </Typography>
                </Stack> */}
                {/* Location */}
                <Typography
                  component="span"
                  className="f8 black-50"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <img
                    src="/images/hotel/location-icon-border.svg"
                    alt="location"
                    style={{ width: 10, height: 10 }}
                  />
                  {hotel?.zoneName} /{hotel?.destinationName}
                </Typography>
              </Stack>

              <Stack
                className="Row3"
                mb={{ md: "4px", xs: "6px" }}
                flexDirection={{ md: "row", xs: "column" }}
                gap={{ md: "6px", xs: 0 }}
                alignItems={{ md: "center", xs: "flex-start" }}
              >
                <Typography
                  className="bold mb-1 f10"
                  textTransform={"capitalize"}
                >
                  {hotel?.rooms?.[0]?.name?.split(" ").slice(0, 3).join(" ")} ·{" "}
                  {firstRate?.adults} adults
                </Typography>
                <Typography component="span" className="f10 black-50">
                  {dayjs(allHotels?.checkIn, "DD-MM-YYYY").format("DD MMM")} -{" "}
                  {dayjs(allHotels?.checkOut, "DD-MM-YYYY").format("DD MMM")}
                </Typography>
              </Stack>
              <Stack display={{ md: "flex", xs: "none" }}>
                <Typography
                  className="black-50 f10"
                  variant="body2"
                  textTransform={"capitalize"}
                >
                  {firstRate?.boardName?.toLowerCase()}
                  {/* Pay at hotel */}
                </Typography>
              </Stack>

              {/* Amenities (dummy icons, still dynamic if mapped later) */}
              <Stack
                mt={"12px"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={{ md: "flex-start", xs: "space-between" }}
              >
                <IncludedTooltips />
                <Box
                  onClick={() => handleHotelDrawer(hotel)}
                  className={
                    " bold f12 cursor-pointer text-decoration-none basecolor1 "
                  }
                  gap={"4px"}
                  alignItems={"center"}
                  display={{ md: "none", xs: "flex" }}
                  sx={{ fontSize: { xs: "12px", md: "16px" } }}
                >
                  <span>See details</span>
                  <i className="fa-angle-right fa fas"></i>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Box className={" w-100 "} display={{ md: "none", xs: "block" }}>
            <Divider className={` Divider w-100 `} />
          </Box>
          {/* Right Section (Price + Button) */}
          <Grid
            className={searchResultStyles.CardRight}
            width={"100%"}
            lg={3}
            md={3}
            xs={12}
            gap={2}
            display={"flex"}
            p={{ md: "18px", xs: "6px 0" }}
            flexDirection={"column"}
          >
            <Box
              className={searchResultStyles.Box}
              display={"flex"}
              sx={{
                flexDirection: { xs: "column", lg: "column", md: "column" },
              }}
              justifyContent={"center"}
              height={"100%"}
              ali
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { md: "column", lg: "column", xs: "row" },
                }}
              >
                {/* See Details */}
                <Box
                  onClick={() => handleHotelDrawer(hotel)}
                  className={
                    " bold f12 cursor-pointer text-decoration-none basecolor1 "
                  }
                  gap={"4px"}
                  alignItems={"center"}
                  display={{ md: "flex", xs: "none" }}
                  sx={{ fontSize: { xs: "12px", md: "16px" } }}
                >
                  <span>See details</span>
                  <i className="fa-angle-right fa fas"></i>
                </Box>
              </Box>

              {/* Price + Select Button */}
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{
                  flexDirection: { lg: "column", md: "column", xs: "row" },
                  width: { lg: "100%", md: "100%", xs: "100%" },
                  justifyContent: "space-between",
                  alignItems: {
                    lg: "flex-start",
                    md: "flex-start",
                    xs: "center",
                  },
                }}
                gap={1}
                className={searchResultStyles.PriceBottom}
              >
                <Box>
                  <Typography
                    className={
                      searchResultStyles.flightPriceSection + " mb-0 black bold"
                    }
                  >
                    {currencySymbols[hotel?.currency]}
                    {Math.round(perNightPrice)} / night
                  </Typography>
                  <Typography className="f12 black-50">
                    {currencySymbols[hotel?.currency]}
                    {Math.round(totalPrice)} total ({nights} nights)
                  </Typography>
                </Box>
                <Box sx={{ width: { lg: "100%", md: "100%", xs: "auto" } }}>
                  {selectedhotelCode === hotel?.code ? (
                    <Button
                      className={
                        searchResultStyles.IsSelected +
                        " w-100 btn btn-primary btn-round btn-md "
                      }
                    >
                      <span>Selected</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSelectRoom(hotel)}
                      className={
                        " w-100 btn btn-primary btn-round btn-md " +
                        searchResultStyles.selectFlightBtn
                      }
                    >
                      Select room
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HotelCard;
