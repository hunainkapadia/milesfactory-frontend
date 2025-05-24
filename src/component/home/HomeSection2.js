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
                  <Typography
                    className="align-center white"
                    sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                  >
                    No more endless tabs, hidden fees, or confusing options.
                    Just tell Mylz your trip idea and get the smartest routes
                    instantly, at direct prices.
                  </Typography>
                  <Typography
                    className="align-center white"
                    sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                  >
                    No more endless tabs, hidden fees, or{" "}
                    <Box
                      component="br"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    />
                    confusing options. Just tell Mylz your trip{" "}
                    <Box
                      component="br"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    />
                    idea and get the best routes at direct prices.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={{ xs: 2, md: 4 }}>
              <Grid item xs={12} md className={styles.IdeaCard}>
                <Card
                  className={`${styles.Card} br-12 bg-dark-box align-center`}
                  variant="outlined"
                >
                  <Box>
                    <h5 className="white mb-5" color="white" variant="h5">
                      Chat your trip
                    </h5>
                    <Typography className="f14" color="white" sx={{display:{lg:"block", md:"block", xs:"none"}}}>
                      Forget filters and forms. Type your plan like “weekend in
                      Porto under £200” and Mylz gets to work. Mylz understands
                      your goals.
                    </Typography>
                    <Typography className="f14" color="white" sx={{display:{lg:"none", md:"none", xs:"block"}}}>
                      Forget filters and forms. Type your plan like “weekend in Porto”  and Mylz gets to work.
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
                    <Typography className="f14" color="white" sx={{display:{lg:"block", md:"block", xs:"none"}}}>
                      Mylz checks every route across flights, trains, and more –
                      comparing time, price, and flexibility to plan your trip
                      in seconds.
                    </Typography>
                    <Typography className="f14" color="white" sx={{display:{lg:"none", md:"none", xs:"block"}}}>
                      Mylz compares flights, trains, and more  to build the best travel route in seconds. 
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
                    <Typography className="f14" color="white" sx={{display:{lg:"block", md:"block", xs:"none"}}}>
                      See something you like? Book instantly. Always at the real
                      price with no markups or redirects. No unnecessary
                      upsells.
                    </Typography>
                    <Typography className="f14" color="white" sx={{display:{lg:"none", md:"none", xs:"block"}}}>
                      See something you like? Book instantly at  real prices with no markups or redirects. 
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              {/*  */}
            </Grid>
            <Box
              sx={{ mb: { lg: 0, md: 0, xs: 7 }, mt: { lg: 5, md: 5, xs: 3 } }}
              spacing={{ xs: 2, md: 4 }}
            >
              <Link
                href={"#HomeSection3"}
                className={styles.footerBtn + " white text-decoration-none"}
              >
                <Typography
                  className="align-center white"
                  sx={{ display: { xs: "none", lg: "block", md: "block" } }}
                >
                  ✅ No markups. No redirects. Book at the real price in
                  seconds.
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
