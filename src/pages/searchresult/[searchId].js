import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchFlightResults } from '@/store/slices/flightSlice';
import { Container, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';

const SearchResult =()=> {
  const router = useRouter();
  const { searchId, flight_id } = router.query;
  const dispatch = useDispatch();
  const { flights, status, error } = useSelector((state) => state.flights);

  useEffect(() => {
    if (searchId && flight_id) {
      dispatch(fetchFlightResults({ searchId, flightId: flight_id }));
    }
  }, [searchId, flight_id, dispatch]);

  if (status === 'loading') return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Flight Search Results</Typography>
      <Grid container spacing={3}>
        {flights.map((flight) => (
          <Grid item xs={12} sm={6} md={4} key={flight.flight_number}>
            <Card>
              <CardContent>
                <Typography variant="h6">{flight.airline}</Typography>
                <Typography>Flight: {flight.flight_number}</Typography>
                <Typography>Departure: {flight.departure.city} ({flight.departure.airport})</Typography>
                <Typography>Arrival: {flight.arrival.city} ({flight.arrival.airport})</Typography>
                <Typography>Duration: {flight.duration}</Typography>
                <Typography>Price: {flight.price.currency} {flight.price.amount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default SearchResult;