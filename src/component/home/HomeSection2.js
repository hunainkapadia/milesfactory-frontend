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
      style={{ backgroundImage: "url('/images/mylz-diff-bg.png')" }}
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
                      sm: "68.7%", // Small screenss
                      lg: "68.7%", // Large screens
                    },
                  }}
                >
                  <h2 className="white align-center">
                    Plan, remix, and share.
                  </h2>
                  <Typography
                    className="align-center white"
                    sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                  >
                    Mylz trips aren’t static — they grow as they’re shared,
                    evolving with every remix. What starts as one traveller’s
                    journey quickly becomes inspiration for the next, creating a
                    living loop of discovery and action.
                  </Typography>
                  {/* <Typography
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
                  </Typography> */}
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
                      Explore real trips
                    </h5>
                    <Typography
                      className="f14"
                      color="white"
                      sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                    >
                      See what others are booking – from weekend escapes to
                      multi-city travels.
                    </Typography>
                    <Typography
                      className="f14"
                      color="white"
                      sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                    >
                      See what others are booking – from<Box
                      component="br"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    />weekend escapes to
                      multi-city travels.
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
                      Remix with one tap
                    </h5>
                    <Typography
                      className="f14"
                      color="white"
                      sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                    >
                      Found a trip you like? Tweak the dates, change the city –
                      and it's now yours.
                    </Typography>
                    <Typography
                      className="f14"
                      color="white"
                      sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                    >
                      Found a trip you like? Tweak the dates,<Box
                      component="br"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    />change the city –
                      and it's now yours.
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
                      Share anywhere
                    </h5>
                    <Typography
                      className="f14"
                      color="white"
                      sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                    >
                      Instantly and easily share your trip page with friends,
                      group chats, or social media.
                    </Typography>
                    <Typography
                      className="f14"
                      color="white"
                      sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                    >
                      Instantly and easily share your trip page<Box
                      component="br"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    />with friends, group chats, or social media. 
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
                href={"#PoweredByglobal"}
                className={styles.footerBtn + " white text-decoration-none"}
              >
                <Typography
                  className="align-center white"
                  sx={{ display: { xs: "none", lg: "block", md: "block" } }}
                >
                  🌍 Get inspired by real trips. Remix what you like, skip the planning.
                </Typography>
                <Typography
                  className="align-center white"
                  sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                >
                  🌍 Get inspired. Skip the planning.
                </Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </section>
      <Footer
        forDark
        LearnMore={"Trusted by our global travel partners"}
        id={"PoweredByglobal"}
      />
    </Box>
  );
};

export default HomeSection2;
