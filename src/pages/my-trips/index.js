import Header from "@/src/component/layout/Header";
import TripCard from "@/src/component/TripCard";
import { MyTripSlice } from "@/src/store/slices/Base/baseSlice";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Skeleton,
  Tabs,
  Tab,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/src/styles/sass/components/MyTrips/Mytrips.module.scss";
import { setisUserPopup } from "@/src/store/slices/Auth/SignupSlice";
import {
  createThread,
  deleteAndCreateThread,
} from "@/src/store/slices/sendMessageSlice";
import { useRouter } from "next/router";

const MyTrips = () => {
  
  const dispatch = useDispatch();
  const router = useRouter();

  const [tabValue, setTabValue] = useState(0); // 0 = Upcoming, 1 = Past

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    dispatch(MyTripSlice());
  }, [dispatch]);

  const isLoading = useSelector((state) => state?.base?.isloading);
  const TripData = useSelector((state) => state?.base?.TripData);
  const currentUser = useSelector((state) => state?.base?.currentUser?.user);

  const upcomingTrips = TripData?.upcoming_trips ?? [];
  const pastTrips = TripData?.past_trips ?? [];

  const selectedTrips = tabValue === 0 ? upcomingTrips : pastTrips;

  const HandlePopup = () => {
    dispatch(setisUserPopup(true));
  };

  const HandleBookThread = () => {
    dispatch(deleteAndCreateThread({ isMessage: "forBook" }));
  };

  console.log("currentUser", currentUser);
  
  useEffect(() => {
    if (!currentUser) {
      dispatch(setisUserPopup(true));
    } else if (currentUser) {
      dispatch(setisUserPopup(false));
      dispatch(MyTripSlice());
    } else {""}
    
  }, [currentUser]);

  return (
    <>
      <Header isMytrip={"isMytrip"} />
      <Box component={"main"} className={styles.TripBody + " main-body "}>
        <Box component={"section"} sx={{ py: { md: "32px", xs: "33px" } }}>
          <Container>
            {/* Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box display="flex" gap={2} alignItems="center">
                <Box className={"imggroup"} height={24}>
                  <img
                    width={24}
                    src={`/images/book-trip-icon.svg`}
                    alt="book trip"
                  />
                </Box>
                <h3 className="mb-0">My booked trips</h3>
              </Box>

              <Box sx={{ display: { lg: "block", md: "block", xs: "none" } }}>
                <Button
                  onClick={HandleBookThread}
                  className="btn btn-primary btn-round btn-sm"
                >
                  Book a new trip
                </Button>
              </Box>
            </Box>

            {/* Custom Tabs */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              TabIndicatorProps={{ style: { display: "none" } }}
              className={styles.customTabs}
              sx={{ mb: 2 }}
            >
              <Tab
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <img
                      src="/images/direct-plan-icon.svg"
                      alt="upcoming icon"
                      style={{ width: 16, height: 16 }}
                    />
                    <Typography className="basecolor-dark f12">
                      Upcoming Trips
                    </Typography>
                  </Box>
                }
                className={`${styles.inactiveTab} ${
                  tabValue === 0 ? styles.activeTab : ""
                }`}
              />
              <Tab
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <img
                      src="/images/direct-plan-icon.svg"
                      alt="past icon"
                      style={{ width: 16, height: 16 }}
                    />
                    <Typography className="basecolor-dark f12">
                      Past Trips
                    </Typography>
                  </Box>
                }
                className={`${styles.inactiveTab} ${
                  tabValue === 1 ? styles.activeTab : ""
                }`}
              />
            </Tabs>

            {/* Trip Cards */}
            <Grid container spacing={1}>
              {!isLoading ? (
                selectedTrips.length > 0 ? (
                  selectedTrips.map((trip, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <TripCard tripData={trip} />
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ p: 2 }}>
                    {tabValue === 0
                      ? "No upcoming trips found."
                      : "No past trips found."}
                  </Typography>
                )
              ) : (
                <Box width={"100%"}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    animation="wave"
                    sx={{ borderRadius: 2 }}
                  />
                  <Skeleton
                    width="60%"
                    height={20}
                    animation="wave"
                    sx={{ mt: 2 }}
                  />
                </Box>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default MyTrips;
