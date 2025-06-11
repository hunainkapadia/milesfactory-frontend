import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

import styles from "@/src/styles/sass/components/baseLayout.module.scss";
const Footer = ({
  partnerLogos,
  forHomeHero,
  forReview,
  forLight,
  forDark,
  id,
  ...props
}) => {
  return (
    <>
      {forDark ? (
        <footer className={styles.FooterForDark} sx={{ pb: 4 }}>
          <Container>
            <Box
              className={styles.FooterBox}
              display={"flex"}
              sx={{
                justifyContent: {
                  lg: "center",
                  md: "center",
                  xs: "center",
                },
              }}
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
            {!partnerLogos ? (
              <>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  sx={{
                    justifyContent: { xs: "center", lg: "left", md: "left" },
                    pb: { lg: 7, md: 7, xs: 3 },
                    gap: { lg: 6, md: 6, xs: 2.3 },
                  }}
                >
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    className="imggroup"
                    sx={{ height: { lg: "100%", md: "100%", xs: "32px" } }}
                  >
                    <img src="/images/trust-pilot-v2.svg" />
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    className="imggroup"
                    sx={{ height: { lg: "100%", md: "100%", xs: "32px" } }}
                  >
                    <img src="/images/google-review-v2.svg" />
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    className="imggroup"
                    sx={{ height: { lg: "100%", md: "100%", xs: "32px" } }}
                  >
                    <img src="/images/iat_logo.svg" />
                  </Box>
                </Box>
              </>
            ) : (
              ""
            )}
            {/*  */}
            <Box
              className={styles.FooterBox + ""}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexWrap={"wrap"}
              sx={{
                flexDirection: { xs: "column-reverse", md: "row" }, // Reverse on mobile
                pt: { lg: 3, md: 3, xs: 4 },
                pb: { lg: 3, md: 3, xs: 0 },
              }}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                className=" no-list"
                sx={{
                  justifyContent: { xs: "center", md: "space-between" },
                  flexWrap: { xs: "wrap", md: "" },
                  columnGap: { lg: 4, md: 4, xs: 3 },
                  rowGap: { lg: 4, md: 4, xs: 2 },
                }}
              >
                <Box
                  display={"flex"}
                  sx={{ columnGap: { lg: 4, md: 4, xs: 3 } }}
                >
                  <Box>
                    <Link className="link" href={"/"}>
                      © 2025 Milesfactory
                    </Link>
                  </Box>
                  <Box>
                    <Link className="link" href={"/terms-and-conditions"}>
                      Terms & Conditions
                    </Link>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  sx={{ columnGap: { lg: 4, md: 4, xs: 3 } }}
                >
                  <Box>
                    <Link className="link" href={"/privacy"}>
                      Privacy
                    </Link>
                  </Box>
                  <Box>
                    <Link className="link" href={"/sanctions-compliance"}>
                      Sanctions Compliance
                    </Link>
                  </Box>
                </Box>
              </Box>
              <Box
                display={"flex"}
                gap={2}
                alignItems={"center"}
                sx={{ marginBottom: { xs: 4, md: 0 } }}
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
              <Typography mb={4} className="f12 basecolor1-dark2">
                Mylz uses AI to find the cheapest flights, trains, stays, and{" "}
                <Box
                  component="br"
                  sx={{ display: { xs: "block", sm: "none" } }}
                />
                local experiences. Bundle together for even more savings.
              </Typography>
              <Typography
                className="f12 basecolor"
                sx={{ display: { xs: "none", lg: "block", md: "block" } }}
              >
                🍪 We do not like cookies and take privacy compliance very
                seriously. That’s why we are not using any cookies that are not
                essential to the functioning of the website and we do not use
                any tracking scripts. Therefore we eliminated the need for
                cookie consent banners and do not track you in any way during
                your travel search.
              </Typography>
              <Typography
                className="f12 basecolor"
                sx={{ display: { lg: "none", md: "none", xs: "block" } }}
              >
                🍪 We do not like cookies and take privacy compliance very
                seriously. That’s why we are not using any cookies that are not
                essential to the functioning of the website. Therefore we
                eliminated the need for any cookies consent banner.
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
              sx={{
                justifyContent: {
                  lg: "center",
                  md: "center",
                  xs: "center",
                },
              }}
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
      ) : forHomeHero ? (
        <>
          <Box
            component="footer"
            className={`   ${styles.forHomeHero}`}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              pb: 4,
            }}
          >
            <Container>
              <Box
                className={styles.FooterBox + " "}
                display={"flex"}
                sx={{
                  justifyContent: {
                    lg: "center",
                    md: "center",
                    xs: "center",
                  },
                }}
              >
                <Link
                  href={`#${id}`} // Use template literals
                  className={styles.footerBtn + "  white text-decoration-none"}
                >
                  <Box
                    gap={2}
                    alignItems={"center"}
                    display={"flex"}
                    textAlign={"center"}
                  >
                    <Box
                      sx={{ display: { xs: "none", lg: "block", md: "block" } }}
                    >
                      <i className="fa-arrow-down fa fas"></i>{" "}
                    </Box>
                    <Typography
                      sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                    >
                      Plan less. Go further.
                    </Typography>
                    <Typography
                      sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                    >
                      Plan less. Go further.
                    </Typography>
                  </Box>
                </Link>
              </Box>
            </Container>
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Footer;
