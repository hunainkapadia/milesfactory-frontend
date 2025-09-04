import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const HomeSection3 = (props) => {
  return (
    <Box
      id={props.id}
      className={styles.HomeBanner}
      style={{ backgroundImage: "url('/images/section-2-bg.png')" }}
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
                      sm: "50%", // Small screens
                      lg: "50%", // Large screens
                    },
                  }}
                >
                  <h2 className="white align-center">Plan less. Go further.</h2>
                  <Typography
                    className="align-center white"
                    sx={{ display: { xs: "none", lg: "block", md: "block" } }}
                  >
                    No more endless tabs, hidden fees, or confusing options.
                    Just tell Mylz your trip idea and get the smartest routes
                    instantly, at direct prices.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} sm={4} md={4} lg={4} className={styles.IdeaCard}>
              <Card
                className={`${styles.Card} br-12 bg-dark-box align-center`}
                variant="outlined"
              >
                <Box>
                  <h5 className="white mb-5" color="white" variant="h5">
                    Chat your trip
                  </h5>
                  <Typography
                    sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                    className="f14"
                    color="white"
                  >
                    Forget filters and forms. Type your plan like “weekend in
                    Porto” and Mylz gets to work.
                  </Typography>
                  <Typography
                    className="f14"
                    color="white"
                    sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                  >
                    Forget filters and forms. Type your plan like
                    <Box
                      component="br"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    />
                    “weekend in Porto” and Mylz gets to work.
                  </Typography>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4} className={styles.IdeaCard}>
              <Card
                className={`${styles.Card} br-12 bg-dark-box align-center`}
                variant="outlined"
              >
                <Box>
                  <h5 className="white mb-5" color="white" variant="h5">
                    Get smart options
                  </h5>
                  <Typography
                    sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                    className="f14"
                    color="white"
                  >
                    Mylz compares flights, trains, and more to build the best travel routes in seconds.
                  </Typography>
                  <Typography
                    className="f14"
                    color="white"
                    sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                  >
                    Mylz compares flights, trains, and more
                    <Box
                      component="br"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    />
                    to build the best travel route in seconds.
                  </Typography>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4} className={styles.IdeaCard}>
              <Card
                className={`${styles.Card} br-12 bg-dark-box align-center`}
                variant="outlined"
              >
                <Box>
                  <h5 className="white mb-5" color="white" variant="h5">
                    Book it in one tap
                  </h5>
                  <Typography
                    sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                    className="f14"
                    color="white"
                  >
                    See something you like? Book instantly at real price with no
                    markups or redirects.
                  </Typography>
                  <Typography
                    className="f14"
                    color="white"
                    sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                  >
                    See something you like? Book instantly{" "}
                    <Box
                      component="br"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    />
                    at real prices with no markups or redirects.
                  </Typography>
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
                ✅ No markups. No redirects. Book at the real price in seconds.
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
