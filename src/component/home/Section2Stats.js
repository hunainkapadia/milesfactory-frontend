import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const Section2Stats = (props) => {
  return (
    <section
      id={props.id}
      className={styles.HomeBanner}
      style={{ backgroundImage: "url('/images/section-2-bg.png')" }}
    >
      <section>
        <Container>
          <Box
            className={styles.HeroSection + " "}
            position={"relative"}
          >
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
                        Chat your plans
                      </Typography>
                      <Typography className="f14" color="white">
                        No forms. Just tell us where, when, and who’s going.
                        Mylz will ask you questions to fully understand your
                        travel requirements.
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
                        Get instant options
                      </Typography>
                      <Typography className="f14" color="white">
                        Mylz will present the best offers in terms of flights,
                        stays, and experiences. All tailored and personalised to
                        your context.
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
                        Book it all in one click
                      </Typography>
                      <Typography className="f14" color="white">
                        Pay in one click. Get your full itinerary. Done, you are
                        ready to go! Mylz will be here to assist during your
                        whole journey.
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
      <Footer forDark 
        LearnMore={"Learn more about Mylz"}
        id={"Section3Stats"}
      />
    </section>
  );
};

export default Section2Stats;
