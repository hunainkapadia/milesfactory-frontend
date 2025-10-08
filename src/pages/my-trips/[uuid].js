import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TripDetailSlice } from "@/src/store/slices/Base/baseSlice";
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
} from "@mui/material";
// import styles from "@/src/styles/sass/components/MyTrips/Mytrips.module.scss";
import Header from "@/src/component/layout/Header";
import FromAndToDetail from "@/src/component/Checkout/BookingDrawer/FromAndToDetail";
// import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import tripStyles from "@/src/styles/sass/components/MyTrips/Mytrips.module.scss";
import { currencySymbols } from "@/src/utils/utils";
import FlightCard from "@/src/component/TripDetail/FlightCard";
import HotelCard from "@/src/component/TripDetail/HotelCard";
const TripDetailPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { uuid } = router.query;

  
  
  const tripDetail = useSelector((state) => state?.base?.TripDetailData);
  
  const flightOffer = tripDetail?.flight_order?.selected_offer;
  const hotelOffer = tripDetail?.hotel_order.selected_hotel_offer.hotel
  
  const loading = useSelector((state) => state?.base?.isLoading);

  useEffect(() => {
    if (uuid) dispatch(TripDetailSlice(uuid));
  }, [uuid]);

  //   if (loading || !tripDetail.order.selected_offer) {
  //     return (
  //       <Container sx={{ mt: 10, textAlign: "center" }}>
  //         <CircularProgress />
  //         <Typography mt={2}>Loading trip details...</Typography>
  //       </Container>
  //     );
  //   }

  // Extract useful data
  
  

  
  return (
    <>
      {flightOffer ? (
        <FlightCard flightOffer={flightOffer} tripDetail={tripDetail} />
      ) : hotelOffer ? (
        <HotelCard hotelOffer={hotelOffer} tripDetail={tripDetail} />
      ) : ""}
    </>
  );
};
export default TripDetailPage;
