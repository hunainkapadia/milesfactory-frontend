import { Grid, Box, Card, Container, Typography, Avatar } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Footer from "../layout/Footer";

const Section5App = (props) => {
  return (
    <>
      <Box id={props?.id} className={`${styles.AppSection} `}>
        <Container>
          <Box
            className={`${styles.AppSectionContainer} + ""`}
            position={"relative"}
          >
            <Grid container >
              <Grid item xs={12} md>
              <Box className={styles.AppSectionRight}>
                <Box display={"flex"}
                  sx={{
                    paddingTop: {
                      xs: 0,
                      md: 0,
                      lg: 0,
                    },
                    textAlign: {
                      xs: "center",
                      sm: "center",
                      lg: "left",
                      md: "left",
                    },
                    justifyContent: {
                      xs: "center",
                      sm: "center",
                      lg: "flex-start",
                      md: "flex-start",
                    },
                  }}
                  
                >
                  <Box >
                    <h1 className="basecolor-dark h1-lg mb-0">
                      AI-powered. Traveller-owned. Travel with Mylz!
                    </h1>
                  </Box>
                </Box>
                <Box display={"none"}
                  className={styles.appLogos}
                  // display={"flex"}
                  sx={{
                    paddingTop: {
                      xs: 8,
                      md: 0,
                      lg: 0,
                    },
                    flexDirection: {
                      xs: "column",
                      sm: "column",
                      md: "row",
                      lg: "row",
                    },
                    alignItems: {
                      xs: "center",
                      sm: "center",
                      md: "flex-start",
                      lg: "flex-start",
                    },
                  }}
                  gap={3}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    className={styles.appLogo + " imggroup"}
                  >
                    <img height={63} src="/images/app-google-play.svg" />
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    className={styles.appLogo + " imggroup"}
                  >
                    <img height={63} src="/images/app-app-store.svg" />
                  </Box>
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
                  
                >
                  <img src="/images/mobile-device-v2.svg" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Section5App;
