import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const MylzDifferent = (props) => {
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
                <Box className={styles.Content2In}>
                  <h2 className="white align-center">Real trips. Real savings.</h2>
                  <Typography className="align-center white">
                  These aren’t mockups - they’re real bookings made by our users. No hidden fees, no upsells, no bouncing between tabs. Just fast, smart travel - flights, trains, and hotels - at the price it should be.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md className={styles.IdeaCard}>
              <Card
                className={`${styles.Card} br-12 bg-dark-box`}
                variant="outlined"
              >
                <Box>
                  <Box mb={3}>
                    <h6 className="white mb-0">
                    💬 “Weekend in Lisbon under £200”
                    </h6>
                    <Typography className="f14" color="white" mb={2}>
                    ✅ London → Lisbon, 2 nights guesthouse
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="f14" color="white" mb={2}>
                      <span className="bold">Mylz: £186</span><br />Opodo + Booking.com: £232
                      <br />Saved: £46
                    </Typography>
                    <Typography className="f14 bold" color="white" >
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
                <Box>
                  <Box mb={3}>
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
                      <br />Booking.com (equivalent flight): €161
                      <br />Saved: €12 (and quicker)
                    </Typography>
                    <Typography className="f14 bold" color="white" >
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
                <Box>
                  <Box mb={3}>
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
                      <br />Easyjet + Airbnb: £319
                      <br />Saved: £45
                    </Typography>
                    <Typography className="f14 bold" color="white" >
                      ⏱️ Booked in: 4 min and 27 seconds
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
            {/*  */}
          </Grid>
          <Link
            href={"#PoweredByglobal"}
            className={styles.footerBtn + " white text-decoration-none"}
          >
          </Link>
        </Box>
      </Container>
      <Footer
        forDark
        LearnMore={"Smarter with every trip."}
        id={"Section4Reviews"}
      />
    </Box>
  );
};

export default MylzDifferent;
