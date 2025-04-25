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
                  <h2 className="white align-center">AI-powered savings</h2>
                  <Typography className="align-center white">
                    Mylz AI technology scans billions of data points to find you
                    the best deals on flights, accommodations, and travel
                    experiences.
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
                  <Box>
                    <h5 className="white mb-5">
                      AI-powered price comparison:
                    </h5>
                    <Typography className="f14" color="white">
                      Mylz scans multiple travel platforms to guarantee you the
                      lowest price, making sure you're always getting the best
                      deal.
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
                  <Box>
                    <h5 className="white mb-5">
                      Disruption protection:
                    </h5>
                    <Typography className="f14" color="white">
                      Mylz anticipates disruptions and handles rebookings or
                      compensation claims automatically, saving you time and
                      efforts.
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
                  <Box>
                    <h5 className="white mb-5">
                      Smart booking optimisation:
                    </h5>
                    <Typography className="f14" color="white">
                      Mylz finds the most cost-effective options, optimizing
                      your itinerary to maximise savings on every part of your
                      journey.
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
        LearnMore={"Powered by airlines and hotels"}
        id={"Section4Reviews"}
      />
    </Box>
  );
};

export default MylzDifferent;
