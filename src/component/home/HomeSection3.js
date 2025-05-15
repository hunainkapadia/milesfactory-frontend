import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const HomeSection3 = (props) => {
  return (
    <Box
      id={props.id}
      className={styles.HomeBanner}
      style={{ backgroundImage: "url('/images/mylz-diff-bg.png')" }}
      position={"relative"}
    >
      <Container>
        <Box className={styles.HeroSection + " "} position={"relative"}>
          <Box
            className={styles.Box}
            display={"flex"}
            justifyContent={"center"}
          >
            <Box
              className={styles.Box + " text-center"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Box className={styles.Content2}>
                <Box
                  className={styles.Content2In}
                  sx={{
                    width: {
                      xs: "100%", // Extra small screens
                      sm: "65%", // Small screens
                      lg: "65%", // Large screens
                    },
                  }}
                >
                  <h2 className="white align-center">
                    Real trips. Real savings.
                  </h2>
                  <Typography
                    className="align-center white"
                    sx={{ display: { xs: "none", lg: "block", md: "block" } }}
                  >
                    These aren’t mockups - they’re real bookings made by our
                    users. No hidden fees, no upsells, no bouncing between tabs.
                    Just fast, smart travel - flights, trains, and hotels - at
                    the price it should be.
                  </Typography>
                  <Typography
                    className="align-center white"
                    sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                  >
                    These aren’t mockups - they’re real bookings{" "}
                    <Box
                      component="br"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    />
                    made by our users. No hidden fees, no{" "}
                    <Box
                      component="br"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    />
                    upsells, no bouncing between many tabs.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} md className={styles.IdeaCard}>
              <Card
                className={`${styles.Card} br-12 bg-dark-box`}
                variant="outlined"
              >
                <Box
                  sx={{ textAlign: { lg: "left", md: "left", xs: "center" } }}
                  className={"aaaa"}
                >
                  <Box sx={{ mb: { xs: 1, lg: 3, md: 3 } }}>
                    <h6 className="white mb-0">
                      💬 “Weekend in Lisbon under £200”
                    </h6>
                    <Typography className="f14" color="white" mb={2}>
                      ✅ London → Lisbon, 2 nights guesthouse
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="f14" color="white" mb={2}>
                      <span className="bold">Mylz: £186</span>
                      <br />
                      Opodo + Booking.com: £232
                      <br />
                      <Typography sx={{display:{xs:"none", lg:"block", md:"block"}}}>Saved: £46</Typography>
                    </Typography>
                    <Typography className="f14 bold" color="white">
                      ⏱️ Booked in: 1 min and 24 seconds
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md className={styles.IdeaCard}>
              <Card
                className={`${styles.Card} br-12 bg-dark-box`}
                variant="outlined"
              >
                <Box
                  sx={{ textAlign: { lg: "left", md: "left", xs: "center" } }}
                  className={"aaaa"}
                >
                  <Box sx={{ mb: { xs: 1, lg: 3, md: 3 } }}>
                    <h6 className="white mb-0">
                      💬 “Paris to Amsterdam Wednesday”
                    </h6>
                    <Typography className="f14" color="white" mb={2}>
                      ✅ 11:00am train from Paris to Amsterdam
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="f14" color="white" mb={2}>
                      <span className="bold">Mylz: €149</span>
                      <br />
                      Booking.com (equivalent flight): €161
                      <br />
                      <Typography sx={{display:{xs:"none", lg:"block", md:"block"}}}>Saved: €12 (and quicker)</Typography>
                    </Typography>
                    <Typography className="f14 bold" color="white">
                      ⏱️ Booked in: 2 min and 49 seconds
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md className={styles.IdeaCard}>
              <Card
                className={`${styles.Card} br-12 bg-dark-box`}
                variant="outlined"
              >
                <Box
                  sx={{ textAlign: { lg: "left", md: "left", xs: "center" } }}
                  className={"aaaa"}
                >
                  <Box sx={{ mb: { xs: 1, lg: 3, md: 3 } }}>
                    <h6 className="white mb-0">
                      💬 “Sunny 3-day escape under £300”
                    </h6>
                    <Typography className="f14" color="white" mb={2}>
                      ✅ London → Palma + hotel by the beach
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="f14" color="white" mb={2}>
                      <span className="bold">Mylz: £274</span>
                      <br />
                      Easyjet + Airbnb: £319
                      <br />
                      <Typography sx={{display:{xs:"none", lg:"block", md:"block"}}}>Saved: £45</Typography>
                    </Typography>
                    <Typography className="f14 bold" color="white">
                      ⏱️ Booked in: 4 min and 27 seconds
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
            {/*  */}
          </Grid>
          <Box
            sx={{ mt: { lg: 5, md: 5, xs: 3 }, mb: { lg: 0, md: 0, xs: 7 } }}
            spacing={{ xs: 2, md: 4 }}
          >
            <Link
              href={"#HomeSection4"}
              className={styles.footerBtn + " white text-decoration-none"}
            >
              <Typography
                className="align-center white"
                sx={{ display: { xs: "none", lg: "block", md: "block" } }}
              >
                🔍 Prices pulled directly from other platforms on their live
                website. All bookings made on Mylz.
              </Typography>
              <Typography
                className="align-center white"
                sx={{ display: { lg: "none", md: "none", xs: "block" } }}
              >
                ✅ No markups. Real price in seconds.
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
      <Footer
        forDark
        LearnMore={"Smarter with every trip."}
        id={"HomeSection4"}
      />
    </Box>
  );
};

export default HomeSection3;
