import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const PoweredByglobal = (props) => {
  return (
    <Box
      id={props.id}
      className={styles.PoweredByglobal + " "}
      sx={{ pt: { lg: 20, md: 20, xs: 8 }, backgroundColor: "#69707B" }}
      pb={8}
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
              <h2 className=" semibold white align-center mb-0">
                Trusted by our global travel partners
              </h2>
            </Box>
          </Box>
          <Grid width={"100%"} item xs={12} md={12} container columnSpacing={3}>
            <Grid item xs={12} lg={4} md={4}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Box mb={4} className="white">
                  <h1 className="h1-lg mb-0 white">200 +</h1>
                  <Typography className="f12">Global airlines</Typography>
                </Box>
                <Box>
                  <img src="/images/global-airline.svg" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Box mb={4} className="white">
                  <h1 className="h1-lg mb-0 white">800 +</h1>
                  <Typography className="f12">
                    Trains, coaches, and buses
                  </Typography>
                </Box>
                <Box>
                  <img src="/images/train-coatches.bussesn.svg" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Box mb={4} className="white">
                  <h1 className="h1-lg mb-0 white">600k +</h1>
                  <Typography className="f12">Hotels and stays</Typography>
                </Box>
                <Box>
                  <img src="/images/hotel-stays.png" />
                </Box>
              </Box>
            </Grid>
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
    </Box>
  );
};

export default PoweredByglobal;
