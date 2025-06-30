import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import styles from "@/src/styles/sass/components/baseLayout.module.scss";
import Head from "next/head";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { setPowerAirlineDialog } from "@/src/store/slices/Base/baseSlice";
import PowerAirline from "../../PowerAirline";
import { useDispatch } from "react-redux";

const AiBookingFrontHeader = ({
  isMessage,
  IsActive,
  isHome,
  isChat,
  isUser,
}) => {

  const dispatch = useDispatch();
  const PowerAirlineDialog = () => {
    dispatch(setPowerAirlineDialog(true));
  };
  return (
    <>
      <Head></Head>
      <Box
        component={"header"}
        className={`
          ${styles.Header} ${styles.AiBookingFrontHeader}`}
      >
        <Container className={styles.Container} sx={{ position: "relative" }}>
          <Grid container width={"100%"} sx={{ margin: 0 }}>
            <Grid item md={12} lg={12} xs={12}>
              <Box
                className={styles.Box}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box
                  color="white"
                  className={styles.leftCol}
                  display={"flex"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Box
                    sx={{ display: { xs: "block", md: "none", lg: "none" } }}
                    fontSize={"24px"}
                  >
                    <i
                      //  onClick={toggleDrawer}
                      className={`fa fa-bars`}
                      aria-hidden="true"
                    ></i>
                  </Box>

                  <Box className={styles.Logo + " cursor-pointer"}>
                    <Box component="a" href="/">
                      <Box className="d-flex align-items-center">
                        <img src="/images/logo-color2.svg" />
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box
                  className={"aaaaa"}
                  sx={{
                    display: { xs: "none", md: "block" },
                    pl: { xs: 8, lg: 0, md: 0 },
                  }}
                >
                  <Typography textAlign={"center"} className="semibold">
                    Your own AI-powered bookings integrated into your digital
                    channels
                  </Typography>
                </Box>

                <Box
                  display={"flex"}
                  sx={{ gap: { lg: 3, md: 2, xs: 0 } }}
                  className={styles.HeaderRightCol}
                >
                  {/* Mobile Loader */}
                  <Box
                    sx={{ display: { md: "flex" } }}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Box
                      className="btn btn-primary btn-sm  btn-round btn-shadow"
                      alignItems="center"
                      justifyContent="center"
                      gap={1}
                      component="button"
                      onClick={PowerAirlineDialog}
                    >
                      <Box>Power your airline</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <PowerAirline />
    </>
  );
};

export default AiBookingFrontHeader;
