import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const HomeSection2 = (props) => {
  return (
    <Box
      position={"relative"}
      id={props.id}
      className={styles.HomeBanner}
      style={{ backgroundImage: "url('/images/section-2-bg.png')" }}
    >
      <section>
        <Container>
          <Box
            className={`${styles.HeroSection} ${styles.HowMylzWork}`}
            position={"relative"}
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
                      sm: "47%", // Small screens
                      lg: "47%", // Large screens
                    },
                  }}
                >
                  <h2 className="white align-center">Plan less. Go further.</h2>
                  <Typography className="align-center white">
                    No more endless tabs, hidden fees, or confusing options.
                    Just tell Mylz your trip idea and get the smartest routes
                    instantly, at direct prices.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={{ xs: 4, md: 4 }}>
              <Grid item xs={12} md className={styles.IdeaCard}>
                <Card
                  className={`${styles.Card} br-12 bg-dark-box align-center`}
                  variant="outlined"
                >
                  <Box>
                    <h5 className="white mb-5" color="white" variant="h5">
                      Chat your trip
                    </h5>
                    <Typography className="f14" color="white">
                      Forget filters and forms. Type your plan like “weekend in
                      Porto under £200” and Mylz gets to work. Mylz understands
                      your goals.
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md className={styles.IdeaCard}>
                <Card
                  className={`${styles.Card} br-12 bg-dark-box align-center`}
                  variant="outlined"
                >
                  <Box>
                    <h5 className="white mb-5" color="white" variant="h5">
                      Get smart options
                    </h5>
                    <Typography className="f14" color="white">
                      Mylz compares flights, trains, and hotels to build the
                      best route - in seconds. Always real prices with no
                      markups or redirects.
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md className={styles.IdeaCard}>
                <Card
                  className={`${styles.Card} br-12 bg-dark-box align-center`}
                  variant="outlined"
                >
                  <Box>
                    <h5 className="white mb-5" color="white" variant="h5">
                      Book it in one tap
                    </h5>
                    <Typography className="f14" color="white">
                      See something you like? Book instantly. No unnecessary
                      upsells. Mylz remembers your travel preferences for next
                      time.
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              {/*  */}
            </Grid>
            <Box mt={5}>
              <Link
                href={"#HomeSection3"}
                className={styles.footerBtn + " white text-decoration-none"}
              >
                <Typography className="align-center white">
                  ✅ No markups. No redirects. Book at the real price in
                  seconds.
                </Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </section>
      <Footer
        forDark
        LearnMore={"Real trips. Reals savings."}
        id={"HomeSection3"}
      />
    </Box>
  );
};

export default HomeSection2;
