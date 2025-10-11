import React from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Drawer,
  Stack,
  Rating,
  Tooltip,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { currencySymbols, event } from "@/src/utils/utils";
import Link from "next/link";
import { setHotelDrawer } from "@/src/store/slices/BookingflightSlice";
import dayjs from "dayjs";
import HotelDrawerFooter from "./HotelDrawerFooter";
import { HOTEL_IMAGE_BASE_URL } from "@/src/hooks/Hooks";
import HotelDrawerGallery from "./HotelDrawerGallery";
const HotelDrawer = ({hotelOffer}) => {
  const dispatch = useDispatch();
  const HandlecloseDrawer = () => {
    dispatch(setHotelDrawer(false)); //setSelectFlightKey empty then close drawer
  };
  const isDrawer = useSelector((state) => state.booking.hotelDrawer);
  const hotel = useSelector((state) => state?.hotel?.singlehotel);  

  
  

  // Extract stars (e.g. "4 STARS" → 4.0 rating)
  const stars = hotel?.categoryName ? parseInt(hotel.categoryName) : 0;

  // Extract first rate for board/offer/price
  const firstRate = hotel?.rooms?.[0]?.rates?.[0];

  // Extract dates from rateKey if available
  const allHotel = useSelector((state) => state?.hotel?.allHotels);

  const images = [
    "/images/hotel-bedroom.jpg",
    "/images/hotel-bedroom.jpg",
    "/images/hotel-bedroom.jpg",
    "/images/hotel-bedroom.jpg",
    "/images/hotel-bedroom.jpg",
    "/images/hotel-bedroom.jpg",
  ];

  return (
    <Drawer
      anchor="right"
      open={isDrawer}
      onClose={HandlecloseDrawer}
      className={`${styles.checkoutDrower} aaaaa 2222`}
      transitionDuration={300}
      
    >
      <Box
        className={`${styles.checkoutDrower} ${styles.hotelDrawer}  white-bg`}
        width={463}
      >
        <Box className={styles.checkoutDrowerSection + " white-bg"}>
          <Box
            component={"header"}
            className={styles.checkoutDrowerHeder}
            py={3}
            px={{ md: 3, xs: 2 }}
            display="flex"
            justifyContent="space-between"
            flexDirection={"column"}
            gap={"12px"}
          >
            <Box
              component={"section"}
              gap={1}
              alignItems="center"
              display="flex"
              className={" bold basecolor1 btn-link cursor-pointer"}
              onClick={HandlecloseDrawer}
            >
              <i className={`fa fa-arrow-left fas`}></i>{" "}
              <Box component={"span"}>Back to Mylz Chat</Box>
            </Box>
            <Box
              component={"section"}
              display="flex"
              justifyContent="space-between"
              alignItems={"center"}
            >
              <h3 className="regular mb-0">Hotel details</h3>
            </Box>
            <Box>
              <Divider className={`${styles.Divider} Divider`} />
            </Box>
          </Box>
          <Box className={styles.checkoutDrowerBody}>
            {/* Header Section */}
            <Grid
              container
              px={{ md: 3, xs: 2 }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid xs={12}>
                <Box
                  mb={3}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box component={"section"}>
                    <Stack
                      className="Row1"
                      mb={"4px"}
                      flexDirection={"row"}
                      gap={"6px"}
                      alignItems={"center"}
                    >
                      <Typography
                        className="bold mb-1"
                        textTransform={"capitalize"}
                      >
                        {hotel?.name}
                      </Typography>
                      <Typography
                        textTransform={"capitalize"}
                        className={" chip sm basecolor1-light"}
                      >
                        {hotel?.categoryName.toLowerCase()}
                      </Typography>
                    </Stack>

                    <Stack
                      className="Row2"
                      mb={"12px"}
                      flexDirection={"column"}
                      gap={"3px"}
                    >
                      {/* Rating Stars */}
                      <Box display={"flex"} alignItems={"center"} gap={"2px"}>
                        {/* <Rating
                          name="feedback-rating"
                          value={stars} // dynamic stars
                          precision={0.5}
                          readOnly
                          sx={{
                            fontSize: "10px",
                            "& .MuiRating-iconFilled": { color: "#FFCC33" },
                            "& .MuiRating-iconEmpty": { color: "#E0E0E0" },
                          }}
                        /> */}

                        {/* Numeric Rating */}
                        <Typography className="f12 black" variant="body2">
                          {/* {stars?.toFixed(1)} */}
                        </Typography>

                        {/* Review Count */}
                        <Typography component="span" className="f12 black-50">
                          {/* ({firstRate?.allotment || 200}+ reviews) */}
                        </Typography>
                      </Box>
                      {/* Location */}
                      <Typography
                        component="span"
                        className="f12 black-50"
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
                      mb={{md: "24px", xs:"18px"}}
                      flexDirection={"column"}
                    >
                      <Typography
                        className="bold mb-1 f10"
                        textTransform={"capitalize"}
                      >
                        {hotel?.rooms?.[0]?.name} · {firstRate?.adults} adults
                      </Typography>
                      <Typography component="span" className="f10 black-50">
                        {dayjs(allHotel?.checkIn, "DD-MM-YYYY").format(
                          "DD MMM"
                        )}{" "}
                        -{" "}
                        {dayjs(allHotel?.checkOut, "DD-MM-YYYY").format(
                          "DD MMM"
                        )}
                      </Typography>
                    </Stack>
                    {hotel?.content?.description?.content && (
                      <Stack mb={"18px"}>
                        <Typography
                          mb={"6px"}
                          className="bold "
                          textTransform={"capitalize"}
                          classes={"f12"}
                        >
                          Description
                        </Typography>
                        <Typography
                          className="mb-1 black-50 f12"
                          textTransform={"capitalize"}
                        >
                          {hotel?.content?.description?.content}
                        </Typography>
                      </Stack>
                    )}
                    {/* Amenities (dummy icons, still dynamic if mapped later) */}
                    
                    {hotel?.content?.images && (
                      <Stack>
                        <Typography
                          classes={"f12"}
                          mb={"6px"}
                          className="bold "
                          textTransform={"capitalize"}
                        >
                          Photos
                        </Typography>
                        <HotelDrawerGallery hotel={hotel} />
                      </Stack>
                    )}
                    <Box mb={2}>
                      <Divider className={`${styles.Divider} Divider`} />
                    </Box>
                    <Stack className={styles.fromAndToBodyBottom + " "} gap={1}>
                      <Box>
                        <Typography className="exbold f12 mb-0 h4">
                          Included in this booking
                        </Typography>
                      </Box>
                      <Stack
                        gap={"5px 18px"}
                        flexWrap={"wrap"}
                        flexDirection={"row"}
                      >
                        <Box
                          display="flex"
                          gap={1}
                          alignItems="center"
                          className={styles.normalOption}
                        >
                          <Box
                            className={styles.BaggageIcon + "  "}
                            display={"flex"}
                            alignItems={"center"}
                          >
                            <img
                              width={14}
                              src={"/images/hotel/hotel-bed-icon.svg"}
                            />
                          </Box>
                          <Typography className="f12 basecolor ">
                            Double room
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          gap={1}
                          alignItems="center"
                          className={styles.normalOption}
                        >
                          <Box
                            className={styles.BaggageIcon + "  "}
                            display={"flex"}
                            alignItems={"center"}
                          >
                            <img
                              width={14}
                              src={"/images/hotel/breakfast-icon-icon.svg"}
                            />
                          </Box>
                          <Typography className="f12 basecolor ">
                            Breakfast included
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          gap={1}
                          alignItems="center"
                          className={styles.normalOption}
                        >
                          <Box
                            className={styles.BaggageIcon + "  "}
                            display={"flex"}
                            alignItems={"center"}
                          >
                            <img
                              width={14}
                              src={"/images/hotel/hotel-wifi-icon.svg"}
                            />
                          </Box>
                          <Typography className="f12 basecolor ">
                            Free wifi
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          gap={1}
                          alignItems="center"
                          className={styles.normalOption}
                        >
                          <Box
                            className={styles.BaggageIcon + "  "}
                            display={"flex"}
                            alignItems={"center"}
                          >
                            <img
                              width={14}
                              src={"/images/hotel/housekeeping-icon.svg"}
                            />
                          </Box>
                          <Typography className="f12 basecolor ">
                            Daily housekeeping
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          gap={1}
                          alignItems="center"
                          className={styles.normalOption}
                        >
                          <Box
                            className={styles.BaggageIcon + "  "}
                            display={"flex"}
                            alignItems={"center"}
                          >
                            <img
                              width={14}
                              src={"/images/hotel/clock-icon-gray.svg"}
                            />
                          </Box>
                          <Typography className="f12 basecolor ">
                            Checkin: from 15:00 · Check-out: by 11:00
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                    {/*  */}

                    {/*  */}
                    {/* <Box py={2}>
                      <Divider className={`${styles.Divider} Divider`} />
                    </Box> */}
                    {/* <Stack className={styles.fromAndToBodyBottom + " "} gap={1}>
                      <Box>
                        <Typography className="bold f12 mb-0 h4">
                          Room details
                        </Typography>
                      </Box>
                      <Stack gap={1}>
                        <Box
                          display="flex"
                          gap={1}
                          alignItems="center"
                          className={styles.normalOption}
                        >
                          <Box
                            className={styles.BaggageIcon + "  "}
                            display={"flex"}
                            alignItems={"center"}
                          >
                            <img
                              width={14}
                              src={"/images/hotel/hotel-cancelelation-icon.svg"}
                            />
                          </Box>
                          <Typography className="f12 basecolor ">
                            Free cancellation until 18 June
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          gap={1}
                          alignItems="center"
                          className={styles.normalOption}
                        >
                          <Box
                            className={styles.BaggageIcon + "  "}
                            display={"flex"}
                            alignItems={"center"}
                          >
                            <img
                              width={14}
                              src={"/images/hotel/hotel-pay-icon.svg"}
                            />
                          </Box>
                          <Typography className="f12 basecolor ">
                            Pay at hotel
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          gap={1}
                          alignItems="center"
                          className={styles.normalOption}
                        >
                          <Box
                            className={styles.BaggageIcon + "  "}
                            display={"flex"}
                            alignItems={"center"}
                          >
                            <img
                              width={14}
                              src={"/images/hotel/no-deposit-required.svg"}
                            />
                          </Box>
                          <Typography className="f12 basecolor ">
                            No deposit required
                          </Typography>
                        </Box>
                        
                      </Stack>
                    </Stack> */}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* Footer Section */}
        <HotelDrawerFooter hotel={hotel} />
      </Box>
    </Drawer>
  );
};

export default HotelDrawer;
