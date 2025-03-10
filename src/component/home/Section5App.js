import { Grid, Box, Card, Container, Typography, Avatar } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Footer from "../layout/Footer";


const Section5App = () => {
  return (
    <>
      <Box mb={10}
        id="fold2"
        className={`${styles.HomeBannerReview} basecolor1-sky-bg no-bg-img`}
        
      >
          <Container>
            <Box
              className={`${styles.HeroSection} ${styles.AppSection} + ""`}
              position={"relative"}
              
            >
              <Grid container spacing={3}>
                <Grid item xs>
                  <Box mb={3} display={"flex"}>
                    <Box>
                      <Typography className="basecolor1-dark2" variant="h1">
                        Travel with Mylz!
                      </Typography>
                    </Box>
                  </Box>
                  <Box display={"flex"} gap={3}>
                    <Box>
                      <img src="/images/app-google-play.svg" />
                    </Box>
                    <Box>
                      <img src="/images/app-app-store.svg" />
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs
                  className={styles.IdeaCard}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Box position={"absolute"} className={styles.MobileDevice}>
                    <img src="/images/phone-app-logo.svg" />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      <Footer forLight />
    </>
  );
};

export default Section5App;
