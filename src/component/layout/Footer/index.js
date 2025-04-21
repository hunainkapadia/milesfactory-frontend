import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

import styles from "@/src/styles/sass/components/baseLayout.module.scss";
const Footer = ({ forReview, forLight, forDark, id, ...props }) => {
  return (
    <>
      {forDark ? (
        <footer className={styles.FooterForDark} sx={{ pb: 4 }}>
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
      ) : forLight ? (
        <footer className={styles.FooterForLight}>
          <Container>
            <Box
              className={styles.FooterBox + ""}
              py={3}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexWrap={"wrap"}
              sx={{
                flexDirection: { xs: "column-reverse", md: "row" }, // Reverse on mobile
              }}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={4}
                className=" no-list"
                sx={{
                  justifyContent: { xs: "center", md: "space-between" },
                  flexWrap: { xs: "wrap", md: "" },
                }}
              >
                <Box>
                  <Link className="basecolor" href={"/"}>
                    © 2025 Milesfactory
                  </Link>
                </Box>
                <Box>
                  <Link className="basecolor" href={"/"}>
                    Terms of Service
                  </Link>
                </Box>
                <Box>
                  <Link className="basecolor" href={"/"}>
                    Privacy Policy
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
                sx={{ marginBottom: { xs: 3, md: 0 } }}
                className={styles.FooterBoxRight}
              >
                <Link
                  target="_blank"
                  href={"https://www.tiktok.com/@gomylz"}
                  className="basecolor-dark"
                >
                  <i className="fab fa-tiktok"></i>
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.facebook.com/gomylz"}
                  className="basecolor-dark"
                >
                  <i className=" fab fa-facebook-square"></i>
                </Link>
                <Link
                  target="_blank"
                  href={"https://x.com/gomylz"}
                  className="basecolor-dark"
                >
                  <i className="fab fa-x-twitter"></i>
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.instagram.com/go.mylz"}
                  className="basecolor-dark"
                >
                  <i className="fab fa-square-instagram"></i>
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.youtube.com/@gomylz"}
                  className="basecolor-dark"
                >
                  <i className="fab fa-square-youtube"></i>
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.linkedin.com/company/gomylz"}
                  className="basecolor-dark"
                >
                  <i className="fab fa-linkedin"></i>
                </Link>
              </Box>
            </Box>
            {/*  */}
            <Box
              className={styles.Box}
              sx={{
                textAlign: { xs: "center", md: "left", lg: "left" },
                paddingY: { xs: 4, md: 2, lg: 2 },
              }}
            >
              <Box className={styles.Logo} mb={2}>
                <Link href={"/"}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    sx={{
                      justifyContent: {
                        xs: "center",
                        md: "flex-start",
                        lg: "flex-start",
                      },
                    }}
                  >
                    <img src="/images/logo-color2.svg" />
                  </Box>
                </Link>
              </Box>
              <Typography mb={4} className="f12 basecolor">
                Mylz uses AI to find you the cheapest flights, accommodations,
                and experiences. Bundle together for even more savings.
              </Typography>
              <Typography className="f12 basecolor">
                🍪 We do not like cookie banners (they’re simpy annoying) and we
                take privacy compliance very seriously. That’s why we are not
                using any cookies that are not essential to the functioning of
                the website and we do not use any tracking scripts or analytics.
                Therefore we eliminated the need for cookie consent banners and
                do not track you in any way.
              </Typography>
            </Box>
          </Container>
        </footer>
      ) : forReview ? (
        <footer className={styles.FooterForReview} sx={{ pb: 4 }}>
          <Container>
            <Box
              className={styles.FooterBox}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Link
                href={`#${id}`} // Use template literals
                className={
                  styles.footerBtn + " basecolor1 text-decoration-none"
                }
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
        ""
      )}
    </>
  );
};

export default Footer;
