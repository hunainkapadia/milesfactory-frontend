import { Grid, Box, Card, Container, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import Link from "next/link";
import Footer from "../layout/Footer";

const CheapestFlights = (props) => {
  return (
    <section
      id={props.id}
      className={styles.HomeBanner}
      style={{ backgroundImage: "url('/images/cheapest-bg.png')" }}
    >
      <Container>
        <Box className={styles.HeroSection + " "} position={"relative"}>
          <Box
            className={styles.Box}
            display={"flex"}
            justifyContent={"center"}
          >
            <Box className={styles.Content}>
              <Box>
                <Box mb={3}>
                  <Typography variant="h2" className="white">
                    Cheapest flights, guaranteed
                  </Typography>
                </Box>
                <Typography className="white">
                  Mylz AI searches all airlines for the best deals. We unmatch
                  direct airline prices, and if you find it cheaper, we refund
                  you the difference*
                </Typography>
              </Box>
              <Link
                href={"#"}
                className={styles.footerBtn + " white text-decoration-none"}
              >
                <Box pt={5} gap={2} alignItems={"center"} display={"flex"}>
                  <i className="fa-arrow-right fa fas"></i>{" "}
                  <span>Discover more</span>
                </Box>
              </Link>
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

export default CheapestFlights;