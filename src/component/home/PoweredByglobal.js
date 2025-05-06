import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const PoweredByglobal = (props) => {
  return (
    <Box
      id={props.id}
      className={styles.PoweredByglobal + " section-padding-xl gray-bg"}
      position={"relative"}
    >
      <Container>
        <Box position={"relative"}>
          <Box
            className={styles.Box}
            display={"flex"}
            justifyContent={"center"}
          >
            <Box className={``} mb={6}>
              <h2 className=" semibold white align-center">
                Trusted by our global travel partners
              </h2>
            </Box>
          </Box>
          <Grid width={"100%"} item xs={12} md={12} container columnSpacing={3}>
            <Grid item xs={4}>asas</Grid>
            <Grid item xs={4}>asas</Grid>
            <Grid item xs={4}>asas</Grid>
          </Grid>
          {/* <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            gap={5}
            className={styles.poweredBysection}
          >
            <Box
              className={styles.Items + " imggroup"}
              
              
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img src="/images/poweredby-airfrance.svg" alt="Air France" />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              
              
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/images/poweredby-airfranceKLM_logo.svg"
                alt="Air France KLM"
              />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              
              
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img src="/images/poweredby-transavia.svg" alt="Transavia" />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              
              
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img src="/images/poweredby-Expedia_Logo_20.svg" alt="Expedia" />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              
              
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/images/poweredby-Expedia_Logo_20Booking.svg"
                alt="Booking"
              />
            </Box>

            <Box
              className={styles.Items + " imggroup"}
              
              
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img src="/images/poweredby-Agoda_logo.svg" alt="Agoda" />
            </Box>
          </Box> */}
        </Box>
      </Container>
      <Footer
        forDark
        LearnMore={"Learn more about Mylz"}
        id={"Section4Reviews"}
      />
    </Box>
  );
};

export default PoweredByglobal;
