import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const HowMylzWork = (props) => {
  return (
    <section
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
                <Box className={styles.Content2In}>
                  <Typography variant="h2" className="white align-center">
                    Travel smarter
                  </Typography>
                  <Typography className="align-center white">
                      No more endless searches or juggling multiple bookings. With Mylz, just chat your plans and get personalized options instantly.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={{ xs: 4, md: 4 }}>
              <Grid item xs={12} md className={styles.IdeaCard}>
                <Card
                  className={`${styles.Card} br-12 bg-dark-box`}
                  variant="outlined"
                >
                  <Box>
                    <Typography color="white" variant="h5">
                      Chat your plans
                    </Typography>
                    <Typography className="f14" color="white">
                      No forms. Just tell us where, when, and who’s going. Mylz
                      will ask you questions to fully understand your travel
                      requirements.
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md className={styles.IdeaCard}>
                <Card
                  className={`${styles.Card} br-12 bg-dark-box`}
                  variant="outlined"
                >
                  <Box>
                    <Typography color="white" variant="h5">
                      Get instant options
                    </Typography>
                    <Typography className="f14" color="white">
                      Mylz presents the best offers in terms of  flights, stays, and experience. 
                      All tailored. Bundle together for even more savings.
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md className={styles.IdeaCard}>
                <Card
                  className={`${styles.Card} br-12 bg-dark-box`}
                  variant="outlined"
                >
                  <Box>
                    <Typography color="white" variant="h5">
                      Book it all in one click
                    </Typography>
                    <Typography className="f14" color="white">
                      Pay in one click. Get your full itinerary. Done, you are
                      ready to go! Mylz will be here to assist during your whole
                      journey.
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              {/*  */}
            </Grid>
            <Link
              href={"#"}
              className={styles.footerBtn + " white text-decoration-none"}
            >
              <Box py={6} gap={2} alignItems={"center"} display={"flex"}>
                <i className="fa-arrow-right fa fas"></i>{" "}
                <span>Start planning my trip</span>
              </Box>
            </Link>
          </Box>
        </Container>
      </section>
      <Footer
        forDark
        LearnMore={"AI-powered savings"}
        id={"MylzDifferent"}
      />
    </section>
  );
};

export default HowMylzWork;
