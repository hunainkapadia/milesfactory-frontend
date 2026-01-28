import { TripDetailSlice } from "@/src/store/slices/Base/baseSlice";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import tripStyles from "@/src/styles/sass/components/MyTrips/Mytrips.module.scss";

import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  Divider,
  Grid,
  capitalize,
  Stack,
  Rating,
} from "@mui/material";
import Header from "../../layout/Header";
import FromAndToDetail from "../../Checkout/BookingDrawer/FromAndToDetail";
import { currencySymbols } from "@/src/utils/utils";
import dayjs from "dayjs";
import HotelDrawerGallery from "../../SearchResult/Hotel/hotelDrawer/HotelDrawerGallery";
import { useSelector } from "react-redux";

const HotelCard = ({ hotelOffer, tripDetail }) => {

  console.log("tripDetail_hotel", tripDetail?.hotel_order?.order_reference_no);
  
  const stars = hotelOffer?.categoryName
    ? parseInt(hotelOffer.categoryName)
    : 0;
  // Extract first rate for board/offer/price
  const firstRate = hotelOffer?.rooms?.[0]?.rates?.[0];
  const hotelOffer2 = useSelector((state)=> state);
  
  return (
    <>
      <Box sx={{ backgroundColor: "#e6f5ee" }} py={4}>
        {/* Hero section */}
        <Box
          component={"header"}
          pb={2}
          sx={{
            backgroundImage: "url('/plane-wing.jpg')", // put image in /public
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
        
          {/* <Typography variant="h6" textTransform={"capitalize"}>
            Hi, {hotelOffer?.passengers[0]?.given_name}{" "}
            {hotelOffer?.passengers[0]?.family_name}
          </Typography>
          <Typography variant="h3" sx={{ textTransform: "capitalize" }}>
            In {daysLeft} days,{" "}
            {hotelOffer?.slices[0]?.segments[0].destination?.city_name} is
            yours.
          </Typography> */}
        </Box>
        {/* Trip Detail Card */}
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Box className={styles.checkoutDrowerBody}>
              {/* Header Section */}
              <Grid
                container
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
                          textTransform={"capitalize"}
                          className={" chip sm basecolor1-light"}
                        >
                        
                          {hotelOffer?.categoryName.toLowerCase()}
                        </Typography>
                      </Stack>

                      <Stack
                        className="Row2"
                        mb={"12px"}
                        flexDirection={"column"}
                        gap={"3px"}
                      >
                        {/* Location */}
                        <Typography
                          component="span"
                          className="f12 black-50"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <img
                            src="/images/hotel/location-icon-border.svg"
                            alt="location"
                            style={{ width: 10, height: 10 }}
                          />
                          
                          
                          {hotelOffer?.content?.address &&
                          `${
                            hotelOffer?.content?.address?.content ||
                            hotelOffer?.content?.address?.street
                          }${hotelOffer?.zoneName ? `, ${hotelOffer.zoneName}` : ""}`}
                        </Typography>
                      </Stack>

                      <Stack
                        className="Row3"
                        mb={"26px"}
                        flexDirection={"column"}
                      >
                        <Typography
                          className="bold mb-1 f10 capitalize"
                          
                        >
                          {hotelOffer?.rooms?.[0]?.name.toLowerCase() || null} · {firstRate?.adults}{" "}
                          adults
                        </Typography>
                        <Typography component="span" className="f10 black-50">
                          {dayjs(
                            tripDetail?.hotel_order?.selected_hotel_offer
                              ?.hotel.checkIn,
                            "DD-MM-YYYY"
                          ).format("DD MMM")}{" "}
                          -{" "}
                          {dayjs(
                            tripDetail?.hotel_order?.selected_hotel_offer
                              ?.hotel.checkOut,
                            "DD-MM-YYYY"
                          ).format("DD MMM")}
                        </Typography>
                      </Stack>
                      {hotelOffer?.content?.description?.content && (
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
                            {hotelOffer?.content?.description?.content}
                          </Typography>
                        </Stack>
                      )}
                      {/* Amenities (dummy icons, still dynamic if mapped later) */}
                      
                      {hotelOffer?.content?.images && (
                        <Stack>
                          <Typography
                            classes={"f12"}
                            mb={"6px"}
                            className="bold "
                            textTransform={"capitalize"}
                          >
                            Photos
                          </Typography>
                          <HotelDrawerGallery hotel={hotelOffer} />
                        </Stack>
                      )}
                      <Box py={2}>
                        <Divider className={`${styles.Divider} Divider`} />
                      </Box>
                      <Stack
                        className={styles.fromAndToBodyBottom + " "}
                        gap={1}
                      >
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
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* Payment Info */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Payment info</Typography>
                <Typography variant="body2">
                  Total cost:{" "}
                  {currencySymbols[tripDetail?.duffel_order?.total_currency]}
                  <strong>
                    {
                      tripDetail?.amount_calculations
                        ?.total_amount_plus_markup_and_all_services
                    }
                  </strong>{" "}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Customer service</Typography>
                <Typography fontSize="14px">
                  Booking reference:{" "}
                  <strong>
                    {tripDetail?.hotel_order?.order_reference_no}
                  </strong>
                </Typography>
                <Typography fontSize="12px" color="primary" sx={{ mt: 0.5 }}>
                  <a href="mailto:hello@gomylz.com">
                    Send a message to customer service
                  </a>
                </Typography>
              </Grid>
            </Grid>
            {/* Cancellation section */}
            {/* <Box mt={3} p={2} bgcolor="#f4f4f4" borderRadius={2}>
                        <Typography fontWeight="bold">
                          Cancellation without reason
                        </Typography>
                        <Button
                          className="btn btn-primary btn-border btn-sm  btn-rounded"
                          sx={{ mt: 1 }}
                        >
                          Cancel my booking
                        </Button>
                      </Box> */}
            {/* Bottom buttons */}
            {/* <Box display="flex" justifyContent="space-between" mt={3}>
                        <Button size="small" variant="outlined">
                          Cancel
                        </Button>
                        <Button size="small" variant="outlined">
                          Manage bags
                        </Button>
                        <Button size="small" variant="contained" color="success">
                          Update
                        </Button>
                      </Box> */}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default HotelCard;
