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
} from "@mui/material";

const TripDetailPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { uuid } = router.query;

  const trip = useSelector((state) => state?.base?.TripDetailData?.order);
  const loading = useSelector((state) => state?.base?.isLoading);

  useEffect(() => {
    if (uuid) dispatch(TripDetailSlice(uuid));
  }, [uuid]);

  if (loading || !trip) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading trip details...</Typography>
      </Container>
    );
  }

  // Extract useful data
  const offer = trip.selected_offer;
  const slice = offer?.slices[0];
  const segment = slice?.segments[0];
  const origin = segment.origin;
  const destination = segment.destination;
  const departureTime = new Date(segment.departing_at);
  const arrivalTime = new Date(segment.arriving_at);
  const duration = slice.duration;
  const pnr = "EDCMUY"; // Hardcoded for demo — replace if exists in data
  const price = trip.payment_amount;
  const currency = trip.payment_currency;
  const passenger = offer.passengers?.[0];
  const checkedBag = segment.passengers?.[0]?.baggages?.find(
    (b) => b.type === "checked"
  );

  const daysLeft = Math.ceil(
    (new Date(segment.departing_at) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Box sx={{ backgroundColor: "#e6f5ee", minHeight: "100vh" }}>
      {/* Hero section */}
      <Box
        sx={{
          height: "280px",
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
        <Typography variant="h6">Hi {trip?.user_name || "Uzair"},</Typography>
        <Typography variant="h4" fontWeight="bold">
          In {daysLeft} days, {destination.city_name || destination.name} is
          yours.
        </Typography>
      </Box>

      {/* Trip Detail Card */}
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ mt: -10, p: 3, borderRadius: 3 }}>
          <Typography fontWeight={600} gutterBottom>
            Everything is in order
          </Typography>
          <Typography variant="body2" gutterBottom>
            There's nothing to do except waiting {daysLeft} days before takeoff.
            Booking reference (PNR): <strong>{pnr}</strong>
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Flights */}
          <Box mb={2}>
            <Typography variant="subtitle2" gutterBottom>
              FLIGHTS
            </Typography>
            <Typography fontWeight="bold">
              {origin.city_name || origin.name} ➜{" "}
              {destination.city_name || destination.name}
            </Typography>
            <Typography color="text.secondary" fontSize="14px">
              Depart
            </Typography>
            <Typography mt={1}>
              {departureTime.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Box>
                <Typography fontWeight="bold">
                  {departureTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Typography fontSize="12px">{origin.name}</Typography>
              </Box>
              <Box>
                <Typography fontWeight="bold">
                  {arrivalTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Typography fontSize="12px">{destination.name}</Typography>
              </Box>
            </Box>
            <Typography variant="caption" mt={1} display="block">
              Included in the flight:
            </Typography>
            <Typography fontSize="13px">
              🧳 1x Carry-on bag, {checkedBag?.quantity || 0}x Checked bag
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Traveler */}
          <Box mb={2}>
            <Typography variant="subtitle2">TRAVELERS</Typography>
            <Typography>
              {trip?.passenger_name || "Muhammad Uzair"} - 1997-06-01
            </Typography>
          </Box>

          {/* Payment Info */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Payment info</Typography>
              <Typography variant="body2">
                Total cost:{" "}
                <strong>
                  {currency} {price}
                </strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Customer service</Typography>
              <Typography fontSize="14px">Booking reference: {pnr}</Typography>
              <Typography fontSize="12px" color="primary" sx={{ mt: 0.5 }}>
                <a href="mailto:info@milesfactory.com">
                  Send a message to customer service
                </a>
              </Typography>
            </Grid>
          </Grid>

          {/* Cancellation section */}
          <Box mt={3} p={2} bgcolor="#f4f4f4" borderRadius={2}>
            <Typography fontWeight="bold">
              Cancellation without reason
            </Typography>
            <Typography fontSize="13px" mt={1}>
              Cancel this flight up until departure (penalty of{" "}
              {offer?.conditions?.refund_before_departure?.penalty_amount}{" "}
              {currency}).
            </Typography>
            <Button
              variant="outlined"
              color="success"
              size="small"
              sx={{ mt: 1 }}
            >
              Cancel my booking
            </Button>
          </Box>

          {/* Bottom buttons */}
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button size="small" variant="outlined">
              Cancel
            </Button>
            <Button size="small" variant="outlined">
              Manage bags
            </Button>
            <Button size="small" variant="contained" color="success">
              Update
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
export default TripDetailPage;
