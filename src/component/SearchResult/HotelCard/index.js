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
} from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/HotelCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  setHotelDrawer,
} from "@/src/store/slices/BookingflightSlice";
import dayjs from "dayjs";
import { currencySymbols } from "@/src/utils/utils";
import {
  setSelectedhotelKey,
  setSinglehotel,
} from "@/src/store/slices/HotelSlice";

const HotelCard = ({ hotel, allHotels }) => {
  const uuid = useSelector((state) => state?.sendMessage?.threadUuid);
  const selectedFlightKey = useSelector(
    (state) => state.booking.selectedFlightKey
  );
  const selectedhotelkey = useSelector(
    (state) => state.hotel?.selectedhotelKey
  );
  console.log("selectedhotelkey", selectedhotelkey);

  const isCartItems = useSelector(
    (state) => state?.booking?.getCartDetail?.items
  );

  const dispatch = useDispatch();

  const handleBookHotel = (gethotel) => {
    const rateKey = gethotel?.rooms?.[0]?.rates?.[0]?.rateKey;
    dispatch(setSelectedhotelKey(rateKey));
    console.log("gethotel_cart", rateKey);
    const price = hotel?.minRate;

    const params = {
      chat_thread_uuid: uuid,
      offer_type: "hotel",
      offer_id: rateKey,
      price: price,
      currency: hotel?.currency,
      raw_data: {},
    };
    dispatch(AddToCart(params, uuid));
  };

  // Extract stars (e.g. "4 STARS" → 4.0 rating)
  const stars = hotel?.categoryName ? parseInt(hotel.categoryName) : 0;

  // Extract first rate for board/offer/price
  const firstRate = hotel?.rooms?.[0]?.rates?.[0];

  // Extract dates from rateKey if available
  let checkIn = "";
  let checkOut = "";
  if (firstRate?.rateKey) {
    const parts = firstRate.rateKey.split("|");
    if (parts.length > 2) {
      const inDate = parts[0];
      const outDate = parts[1];
      checkIn = `${inDate.slice(6, 8)}-${inDate.slice(4, 6)}-${inDate.slice(
        0,
        4
      )}`;
      checkOut = `${outDate.slice(6, 8)}-${outDate.slice(4, 6)}-${outDate.slice(
        0,
        4
      )}`;
    }
  }

  const handleHotelDrawer = (gethotel) => {
    dispatch(setSinglehotel(gethotel));

    dispatch(setHotelDrawer(true));
  };

  // Calculate number of nights properly
  const checkInDate = allHotels?.checkIn ? new Date(allHotels.checkIn) : null;
  const checkOutDate = allHotels?.checkOut
    ? new Date(allHotels.checkOut)
    : null;
  const nights =
    checkInDate && checkOutDate
      ? Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
      : 1;

  // Prices
  const totalPrice = Number(firstRate?.net) || 0;
  const perNightPrice = nights > 0 ? totalPrice / nights : totalPrice;

  return (
    <Box className={`${searchResultStyles.HotelCard}`}>
      <Grid container>
        {/* Left Section */}
        <Grid
          className={searchResultStyles.CardLeft}
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
              backgroundImage: `url("https://cf.bstatic.com/xdata/images/hotel/max1024x768/108437040.jpg?k=8b7d88be5a0a7ea5a7bb24425ae6472f392a1f641eee26f392c7528b959c76b1&o=&hp=1")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />

          <Box component={"section"}>
            <Stack
              className="Row1"
              mb={"4px"}
              flexDirection={"row"}
              gap={"6px"}
              alignItems={"center"}
            >
              <Typography
                className="bold mb-1 f12"
                textTransform={"capitalize"}
              >
                {hotel?.name}
              </Typography>
              {firstRate?.offers?.[0] && (
                <Typography className={" chip sm chipGray"}>
                  {firstRate.offers[0].name}
                </Typography>
              )}
              <Typography
                textTransform={"capitalize"}
                className={" chip sm basecolor1-light"}
              >
                {hotel?.categoryName.toLowerCase()}
              </Typography>
            </Stack>

            <Stack
              className="Row2"
              mb={"10px"}
              flexDirection={"row"}
              alignItems="center"
              gap={"3px"}
            >
              {/* Rating Stars */}

              <Rating
                name="feedback-rating"
                value={stars} // dynamic stars
                precision={0.5}
                readOnly
                sx={{
                  fontSize: "10px",
                  "& .MuiRating-iconFilled": { color: "#FFCC33" },
                  "& .MuiRating-iconEmpty": { color: "#E0E0E0" },
                }}
              />

              {/* Numeric Rating */}
              <Typography className="f8 black" variant="body2">
                {stars?.toFixed(1)}
              </Typography>

              {/* Review Count */}
              <Typography component="span" className="f8 black-50">
                ({firstRate?.allotment || 200}+ reviews)
              </Typography>

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
                {hotel?.destinationName || "Unknown Location"}
              </Typography>
            </Stack>

            <Stack
              className="Row3"
              mb={"4px"}
              flexDirection={"row"}
              gap={"6px"}
              alignItems={"center"}
            >
              <Typography
                className="bold mb-1 f10"
                textTransform={"capitalize"}
              >
                {hotel?.rooms?.[0]?.name} · {firstRate?.adults} adults
              </Typography>
              <Typography component="span" className="f10 black-50">
                {dayjs(checkIn, "DD-MM-YYYY").format("DD MMM")} -{" "}
                {dayjs(checkOut, "DD-MM-YYYY").format("DD MMM")}
              </Typography>
            </Stack>
            <Stack>
              <Typography
                className="black-50 f10"
                variant="body2"
                textTransform={"capitalize"}
              >
                {firstRate?.boardName?.toLowerCase()} · Free cancellation until{" "}
                {firstRate?.cancellationPolicies?.[0]?.from &&
                  new Date(
                    firstRate.cancellationPolicies[0].from
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}{" "}
                Pay at hotel
              </Typography>
            </Stack>

            {/* Amenities (dummy icons, still dynamic if mapped later) */}
            <Stack
              mt={"12px"}
              flexDirection={"row"}
              alignItems={"center"}
              gap={"13px"}
            >
              <Tooltip title="Double room" placement="top" arrow>
                <Box className="imggroup">
                  <img
                    width={14}
                    src="/images/hotel/hotel-bed-icon.svg"
                    alt="Double room"
                  />
                </Box>
              </Tooltip>

              <Tooltip title="Breakfast included" placement="top" arrow>
                <Box className="imggroup">
                  <img
                    width={14}
                    src="/images/hotel/breakfast-icon-icon.svg"
                    alt="Breakfast"
                  />
                </Box>
              </Tooltip>

              <Tooltip title="Free wifi" placement="top" arrow>
                <Box className="imggroup">
                  <img
                    width={14}
                    src="/images/hotel/hotel-wifi-icon.svg"
                    alt="Wifi"
                  />
                </Box>
              </Tooltip>

              <Tooltip title="Daily housekeeping" placement="top" arrow>
                <Box className="imggroup">
                  <img
                    width={14}
                    src="/images/hotel/hotel-leav-icon.svg"
                    alt="Housekeeping"
                  />
                </Box>
              </Tooltip>

              <Tooltip
                title="Check-in: from 15:00 · Check-out: by 11:00"
                placement="top"
                arrow
              >
                <Box className="imggroup">
                  <img
                    width={14}
                    src="/images/hotel/hotel-pay-icon.svg"
                    alt="Checkin Checkout"
                  />
                </Box>
              </Tooltip>
            </Stack>
          </Box>
        </Grid>

        {/* Right Section (Price + Button) */}
        <Grid
          className={searchResultStyles.CardRight}
          width={"100%"}
          lg={3}
          md={3}
          xs={12}
          gap={2}
          display={"flex"}
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
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { md: "column", lg: "column", xs: "row" },
              }}
            >
              {/* See Details */}
              <Box
                style={{ cursor: "pointer" }}
                onClick={() => handleHotelDrawer(hotel)}
              >
                <Box className="text-decoration-none basecolor1">
                  <Box
                    gap={"4px"}
                    alignItems={"center"}
                    display={"flex"}
                    className="bold f12"
                    sx={{ fontSize: { xs: "12px", md: "16px" } }}
                  >
                    <span>See details</span>
                    <i className="fa-angle-right fa fas"></i>
                  </Box>
                </Box>
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
                  {currencySymbols[hotel?.currency]} {Math.round(perNightPrice)}{" "}
                  / night
                </Typography>
                <Typography className="f12 black-50">
                  {currencySymbols[hotel?.currency]} {Math.round(totalPrice)}{" "}
                  total ({nights} nights)
                </Typography>
              </Box>

              <Box sx={{ width: { lg: "100%", md: "100%", xs: "auto" } }}>
                {selectedhotelkey === firstRate?.rateKey ? (
                  <Button
                    disabled
                    className={
                      searchResultStyles.IsSelected +
                      " w-100 btn btn-primary btn-round btn-md "
                    }
                  >
                    <span>Selected</span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleBookHotel(hotel)}
                    className={
                      "w-100 btn btn-primary btn-round btn-md " +
                      searchResultStyles.selectFlightBtn
                    }
                  >
                    Select
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HotelCard;
