import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../Footer";

const HerosectionSm = ({heading}) => {
  return (
    <Box
      position={"relative"}
      className={styles.HomeBanner + " " + styles.HomeBannerSm}
      style={{ backgroundImage: "url('/images/section-2-bg.png')" }}
    >
        <Container maxWidth="md">
          <Box
            className={`${styles.HeroSection} ${styles.HowMylzWork}`}
            position={"relative"}
          >
            <Box
              className={styles.Box}
              display={"flex"}
            >
              <Box className={styles.Content2}>
                <Box
                  className={styles.Content2In}
                  sx={{
                    width: {
                      xs: "100%", // Extra small screens
                    },
                  }}
                >
                  <h2 className="white">{heading}</h2>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      {/* <Footer
        forDark
        LearnMore={"Real trips. Reals savings."}
        id={"HomeSection3"}
      /> */}
    </Box>
  );
};

export default HerosectionSm;
