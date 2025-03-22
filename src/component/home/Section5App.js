import { Grid, Box, Card, Container, Typography, Avatar } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Footer from "../layout/Footer";


const Section5App = (props) => {
  console.log("props", props);
  
  return (
    <>
      <Box id={props?.id} className={`${styles.AppSection} `}>
        <Container>
          <Box
            className={`${styles.AppSectionContainer} + ""`}
            position={"relative"}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md>
                <Box pt={7} display={"flex"}>
                  <Box mb={3}>
                    <h1 className="basecolor-dark h1-lg mb-0">
                      Travel with Mylz!
                    </h1>
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
                xs={12}
                md
                className={styles.IdeaCard}
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-end" }, // Responsive syntax
                }}
              >
                <Box
                  className={styles.MobileDevice}
                  sx={{ mt: { xs: 6, md: 0, lg: 0 } }}
                >
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
