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
              <h3 className=" semibold white align-center">
                Powered by global airlines and hotels
              </h3>
            </Box>
          </Box>

          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            gap={5}
            className={styles.poweredBysection}
          >
            <Box
              className={styles.Items + " imggroup"}
              component={Link}
              
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img src="/images/poweredby-airfrance.svg" alt="Air France" />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              component={Link}
              
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/images/poweredby-airfranceKLM_logo.svg"
                alt="Air France KLM"
              />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              component={Link}
              
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img src="/images/poweredby-transavia.svg" alt="Transavia" />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              component={Link}
              
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img src="/images/poweredby-Expedia_Logo_20.svg" alt="Expedia" />
            </Box>
            <Box
              className={styles.Items + " imggroup"}
              component={Link}
              
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/images/poweredby-Expedia_Logo_20Booking.svg"
                alt="Booking"
              />
            </Box>

            <Box
              className={styles.Items + " imggroup"}
              component={Link}
              
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img src="/images/poweredby-Agoda_logo.svg" alt="Agoda" />
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer
        forDark
        LearnMore={"Learn more about Mylz"}
        id={"Section4Reviews"}
      />
    </section>
  );
};

export default PoweredByglobal;
