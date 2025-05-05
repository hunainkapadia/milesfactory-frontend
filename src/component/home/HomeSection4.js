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
                      sm: "59.7%", // Small screens
                      lg: "59.7%", // Large screens
                    },
                  }}
                >
                  <h2 className="white align-center">
                    Smarter with every trip.
                  </h2>
                  <Typography className="align-center white">
                    The more you use Mylz, the smarter it gets - learning your
                    preferences, saving your time, and tailoring each journey to
                    your style. An AI that adapts to you - not the other way
                    around.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Grid container columnSpacing={{ xs: 4, md: 4 }}>
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
                      Prefer late departures? Hate early flights? Love trains?
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
                      Repeat that Rome trip from last spring? Just ask - your
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
                      Mylz remembers your behaviour and gets you through to
                      booking in seconds.
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              {/*  */}
            </Grid>
            <Box mt={5}>
              <Link
                href={"#PoweredByglobal"}
                className={styles.footerBtn + " white text-decoration-none"}
              >
                <Typography className="align-center white">
                  🛡️ Built for travellers, not marketers. No tracking. Just
                  smarter travel every time.
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
