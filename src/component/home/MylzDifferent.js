import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const MylzDifferent = (props) => {
  return (
    <section
      id={props.id}
      className={styles.HomeBanner}
      style={{ backgroundImage: "url('/images/mylz-diff-bg.png')" }}
    >
      <section>
        <Container>
          <Box className={styles.HeroSection + " "} position={"relative"}>
            <Box
              className={" mb-40 text-center"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Box sx={{ width: "50%" }}>
                <Typography variant="h2" className="white align-center">
                  What makes Mylz so different?
                </Typography>
                <Typography className="align-center white">
                  Our AI technology scans billions of data points to find you
                  the best deals on flights, accommodations, and travel
                  experiences.
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs className={styles.IdeaCard}>
                <Card
                  className={`${styles.Card} br-12 bg-dark-box`}
                  variant="outlined"
                >
                  <Box>
                    <Box
                      sx={{
                        display: {
                          xs: "none",
                          sm: "block",
                        },
                      }}
                    >
                      <Typography color="white" variant="h5">
                        Cheapest prices, no hidden fees:
                      </Typography>
                      <Typography className="f14" color="white">
                        Mylz AI searches all airlines, hotels and experiences
                        for the best deals. It also calculates any additional
                        fees matching your travel requirement to give you the
                        final price upfront. No surprise ever.
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs className={styles.IdeaCard}>
                <Card
                  className={`${styles.Card} br-12 bg-dark-box`}
                  variant="outlined"
                >
                  <Box>
                    <Box
                      sx={{
                        display: {
                          xs: "none",
                          sm: "block",
                        },
                      }}
                    >
                      <Typography color="white" variant="h5">
                        Disruption protection:
                      </Typography>
                      <Typography className="f14" color="white">
                        Mylz monitors your bookings and automatically handles
                        rebooking in case of changes and cancellations. Mylz
                        also ensures you get optimally compensated based on
                        partners terms and conditions.
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs className={styles.IdeaCard}>
                <Card
                  className={`${styles.Card} br-12 bg-dark-box`}
                  variant="outlined"
                >
                  <Box>
                    <Box
                      sx={{
                        display: {
                          xs: "none",
                          sm: "block",
                        },
                      }}
                    >
                      <Typography color="white" variant="h5">
                        All-in-one planning:
                      </Typography>
                      <Typography className="f14" color="white">
                        Flights, stays, experiences - all quickly booked in sync
                        for optimal convenience. Mylz ensures your travel
                        itinerary is optimised and interconnected. No need to
                        jungle between multiple apps and tabs.
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              {/*  */}
            </Grid>
            <Link
              href={"#"}
              className={styles.footerBtn + " white text-decoration-none"}
            >
              <Box pt={4} gap={2} alignItems={"center"} display={"flex"}>
                <i className="fa-arrow-right fa fas"></i>{" "}
                <span>Start planning my trip</span>
              </Box>
            </Link>
          </Box>
        </Container>
      </section>
      <Footer
        forDark
        LearnMore={"Learn more about Mylz"}
        id={"CheapestFlights"}
      />
    </section>
  );
};

export default MylzDifferent;
