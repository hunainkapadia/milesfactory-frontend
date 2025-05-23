import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const HomeSection4 = (props) => {
  return (
    <Box
      position={"relative"}
      id={props.id}
      className={styles.HomeBanner}
      style={{ backgroundImage: "url('/images/section-4-bg.png')" }}
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
                      sm: "59.7%", // Small screenss
                      lg: "59.7%", // Large screens
                    },
                  }}
                >
                  <h2 className="white align-center">
                    Smarter with every trip.
                  </h2>
                  <Typography
                    className="align-center white"
                    sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                  >
                    The more you use Mylz, the smarter it gets - learning your
                    preferences, saving your time, and tailoring each journey to
                    your style. An AI that adapts to you - not the other way
                    around.
                  </Typography>
                  <Typography
                    className="align-center white"
                    sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                  >
                    The more you use Mylz, the smarter it gets - learning your
                    preferences, saving your time, and tailoring each journey to
                    your style.
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
                      Travel style remembered
                    </h5>
                    <Typography className="f14" color="white">
                      Prefer late departures? Hate early flights? <Box component="br" sx={{ display: { xs: 'block', sm: 'none' } }} />Love trains?
                      Mylz learns your habits.
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
                      Prompt memory
                    </h5>
                    <Typography className="f14" color="white">
                      Repeat that Rome trip from last spring? <Box component="br" sx={{ display: { xs: 'block', sm: 'none' } }} />Just ask - your
                      past prompts are saved.
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
                      Faster booking every time
                    </h5>
                    <Typography className="f14" color="white">
                      Mylz remembers your behaviour and <Box component="br" sx={{ display: { xs: 'block', sm: 'none' } }} />gets you through to
                      booking in seconds.
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
                href={"#PoweredByglobal"}
                className={styles.footerBtn + " white text-decoration-none"}
              >
                <Typography
                  className="align-center white"
                  sx={{ display: { xs: "none", lg: "block", md: "block" } }}
                >
                  🛡️ Built for travellers, not marketers. No tracking. Just
                  smarter travel every time.
                </Typography>
                <Typography
                  className="align-center white"
                  sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                >
                  🛡️ Built for travellers. No tracking.
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

export default HomeSection4;
