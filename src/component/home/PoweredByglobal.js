import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const PoweredByglobal = (props) => {
  return (
    <section id={props.id} className={"section-padding-xl gray-bg"}>
      <Container>
        <Box position={"relative"}>
          <Box
            className={styles.Box}
            display={"flex"}
            justifyContent={"center"}
          >
            <Box className={``} mb={6}>
              <Typography variant="h3"  className=" semibold white align-center">
                Powered by global airlines and hotels
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={5}
            className={styles.poweredBysection}
          >
            <Box
              className={styles.Items + " imggroup"}
              component={Link}
              href="#"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/images/poweredby-Expedia_Logo_20.svg"
                alt="Expedia"
                style={{ height: 40, objectFit: "contain" }}
              />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              component={Link}
              href="#"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/images/poweredby-Expedia_Logo_20Booking.svg"
                alt="Booking"
                style={{ height: 40, objectFit: "contain" }}
              />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              component={Link}
              href="#"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/images/poweredby-transavia.svg"
                alt="Transavia"
                style={{ height: 40, objectFit: "contain" }}
              />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              component={Link}
              href="#"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/images/poweredby-Agoda_logo.svg"
                alt="Agoda"
                style={{ height: 40, objectFit: "contain" }}
              />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              component={Link}
              href="#"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/images/poweredby-airfrance.svg"
                alt="Air France"
                style={{ height: 40, objectFit: "contain" }}
              />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              component={Link}
              href="#"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/images/poweredby-airfranceKLM_logo.svg"
                alt="Air France KLM"
                style={{ height: 40, objectFit: "contain" }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer
        forDark
        LearnMore={"Learn more about Mylz"}
        id={"CheapestFlights"}
      />
    </section>
  );
};

export default PoweredByglobal;
