import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const PoweredByglobal = (props) => {
  return (
    <Box
      id={props.id}
      className={styles.PoweredByglobal + " "}
      sx={{ pt: { lg: 20, md: 20, xs: "167px" }, backgroundColor: "#69707B", height:{xs:"840px"} }}
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
            <Box className={``} sx={{ mb: { lg: 6, md: 6, xs: 0 } }}>
              <h2 className=" semibold white align-center mb-0">
                Trusted by our <Box
                      component="br"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    />global travel partners
              </h2>
            </Box>
          </Box>
          <Grid
            width={"100%"}
            item
            xs={12}
            md={12}
            container
            sx={{
              gap: { lg: 0, md: 0, xs: 5 },
              marginBottom: { lg: 0, md: 0, xs: 5 },
            }}
          >
            <Grid item xs={12} lg={4} md={4}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                textAlign={"center"}
              >
                <Box sx={{mb:{lg: 4, md:4, xs: 0}}} className="white">
                  <Typography
                    className="mb-0 white bold"
                    variant="h2"
                    fontSize={56}
                  >
                    200+
                  </Typography>

                  <Typography className="f12">Global airlines</Typography>
                </Box>
                <Box sx={{width: {xs:50}}}>
                  <img src="/images/global-airline-v3.svg" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                textAlign={"center"}
              >
                <Box sx={{mb:{lg: 4, md:4, xs: 0}}} className="white">
                  <Typography
                    className="mb-0 white bold"
                    variant="h2"
                    fontSize={56}
                  >
                    800+
                  </Typography>
                  <Typography className="f12">
                    Trains, coaches, and buses
                  </Typography>
                </Box>
                <Box sx={{width: {xs:50}}}>
                  <img src="/images/train-coatches.bussesn-v3.svg" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                textAlign={"center"}
              >
                <Box sx={{mb:{lg: 4, md:4, xs: 0}}} className="white">
                  <Typography
                    className="mb-0 white bold"
                    variant="h2"
                    fontSize={56}
                  >
                    700k+
                  </Typography>
                  <Typography className="f12">Hotels and stays</Typography>
                </Box>
                <Box sx={{width: {xs:50}}}>
                  <img src="/images/hotel-stays-v3.svg" />
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
      <Box sx={{ display: { xs: "block", lg: "none", md: "none" } }}>
        <Footer
          forDark
          LearnMore={"What travellers say"}
          id={"Section4Reviews"}
        />
      </Box>
    </Box>
  );
};

export default PoweredByglobal;
