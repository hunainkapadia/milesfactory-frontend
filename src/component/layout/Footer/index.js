import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

import styles from "@/src/styles/sass/components/baseLayout.module.scss";
const Footer = ({ forLight, forDark, id, ...props }) => {
  return (
    <>
      {forDark ? (
        <footer className={styles.FooterFforDark} sx={{ pb: 4 }}>
          <Container>
            <Box
              className={styles.FooterBox}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Link
                  href={`#${id}`} // Use template literals
                className={styles.footerBtn + " white text-decoration-none"}
              >
                <Box gap={2} alignItems={"center"} display={"flex"}>
                  <i className="fa-arrow-down fa fas"></i>{" "}
                  <span>{props.LearnMore}</span>
                </Box>
              </Link>
            </Box>
          </Container>
        </footer>
      ) : (
        <footer className={styles.FooterFforLight}>
          <Container>
            <Box
              className={styles.FooterBox + " d-flex justify-content-between"}
              py={3}
              marginTop={15}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={4}
                className=" no-list"
              >
                <Box>
                  <Link className="basecolor" href={"/"}>
                    © 2025 Milesfactory
                  </Link>
                </Box>
                <Box>
                  <Link className="basecolor" href={"/"}>
                    Privacy
                  </Link>
                </Box>
                <Box>
                  <Link className="basecolor" href={"/"}>
                    Cookies
                  </Link>
                </Box>
                <Box>
                  <Link className="basecolor" href={"/"}>
                    Accessibility
                  </Link>
                </Box>
              </Box>
              <Box
                display={"flex"}
                gap={2}
                alignItems={"center"}
                className={styles.FooterBoxRight}
              >
                <i class="fab fa-facebook-square"></i>
                <i class="fab fa-x-twitter"></i>
                <i class="fab fa-square-instagram"></i>
                <i class="fab fa-square-youtube"></i>
              </Box>
            </Box>
            {/*  */}
            <Box className={styles.Box}>
              <Box className={styles.Logo} mb={2}>
                <Link href={"/"}>
                  <Box className="d-flex align-items-center">
                    <img src="/images/logo-color2.svg" />
                  </Box>
                </Link>
              </Box>
              <Typography mb={4} className="f12" color="#69707B">
                Mylz uses AI to find you the cheapest flights, accommodations,
                and experiences. Bundle together for even more savings.
              </Typography>
              <Typography className="f12" color="#69707B">
                🍪 We do not like cookie banners (they’re simpy annoying) and we
                take privacy compliance very seriously. That’s we are not using
                any cookies that are not essential to functioning of the website
                and we do not use any tracking scripts or analytics. Therefore
                we eliminated the need for cookie consent banners and do not
                track you in any way.
              </Typography>
            </Box>
          </Container>
        </footer>
      )}
    </>
  );
};

export default Footer;
