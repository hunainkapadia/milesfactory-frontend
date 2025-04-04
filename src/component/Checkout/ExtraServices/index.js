import { Box, Card, Grid, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Link from "next/link";
import { currencySymbols } from "@/src/utils/utils";

const ExtraServices = ({ getServicesdata, isFilled, selectedFlight }) => {
  console.log("selectedFlight", selectedFlight.total_amount);

  return (
    <Grid item xs={6}>
      <Box className={`${styles.passengersCard} ${styles.ExtraServices} `}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Box className="imggroup" width={40}>
            <img height={"100%"} src="/images/user-circle.svg" />
          </Box>
          <Box>
            <Typography textTransform={"capitalize"} mb={0} variant="h6">
              {getServicesdata.given_name} {getServicesdata.family_name}
            </Typography>
            <Typography textTransform={"capitalize"} className=" gray">
              {getServicesdata.type}
            </Typography>
          </Box>
          {/* <Typography className="mb-10" mb={1} variant="h6">
            + {currencySymbols[getServicesdata?.tax_currency] ||
                                getServicesdata?.tax_currency}{" "}
                                {Math.round(selectedFlight.total_amount)}
          </Typography> */}
        </Box>
        <Box gap={4} pt={3}>
          <Box display={"flex"} justifyContent={"space-between"} gap={4} mb={3}>
            <Box>
              <Typography className="basecolor-dark" fontWeight={"bold"}>
                Outbound seat
              </Typography>
              <Typography className="gray">40E</Typography>
            </Box>
            <Link className="btn-link" href={""}>
              <Box textAlign={"right"} className="basecolor1" gap={2}>
                <div>Change</div>
              </Box>
            </Link>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} gap={4} mb={3}>
            <Box>
              <Typography className="basecolor-dark" fontWeight={"bold"}>
                Return seat
              </Typography>
              <Typography className="gray">Not selected</Typography>
            </Box>
            <Link className="btn-link" href={""}>
              <Box textAlign={"right"} className="basecolor1" gap={2}>
                <div>Change</div>
              </Box>
            </Link>
          </Box>
          {/* seats row end */}
          {/*  */}
          <Box
            className={styles.BaggageRows}
            display={"flex"}
            flexDirection={"column"}
            gap={4}
          >
            <Box
              className={styles.BaggageBox}
              display={"flex"}
              flexDirection={"column"}
              gap={2}
            >
              <Box display={"flex"} justifyContent={"space-between"} gap={4}>
                <Box>
                  <Typography className="basecolor-dark" fontWeight={"bold"}>
                    Outbound baggage
                  </Typography>
                </Box>
                <Link className="btn-link" href={""}>
                  <Box textAlign={"right"} className="basecolor1" gap={2}>
                    <div>Add</div>
                  </Box>
                </Link>
              </Box>
              {/*  */}
              <Box display={"flex"} className={styles.BaggageRow}>
                <Box
                  className={styles.BaggageCol}
                  width={"100%"}
                  display={"flex"}
                  gap={1}
                  flexDirection={"column"}
                >
                  <Box display={"flex"} gap={1} alignItems={"center"}>
                    <Box>
                      <img src={"/images/checkout/personal-items.svg"} />
                    </Box>
                    <Typography>10 x</Typography>
                  </Box>
                  <Typography className="gray">Handbag/laptop bag</Typography>
                </Box>
                <Box
                  className={styles.BaggageCol}
                  width={"100%"}
                  display={"flex"}
                  gap={1}
                  flexDirection={"column"}
                >
                  <Box display={"flex"} gap={1} alignItems={"center"}>
                    <Box>
                      <img src={"/images/checkout/carryon-bagg.svg"} />
                    </Box>
                    <Typography>10 x</Typography>
                  </Box>
                  <Typography className="gray">Carry-on bags</Typography>
                </Box>
                <Box
                  className={styles.BaggageCol}
                  width={"100%"}
                  display={"flex"}
                  gap={1}
                  flexDirection={"column"}
                >
                  <Box display={"flex"} gap={1} alignItems={"center"}>
                    <Box>
                      <img src={"/images/checkout/checked-bagg.svg"} />
                    </Box>
                    <Typography>10 x</Typography>
                  </Box>
                  <Typography className="gray">Checked bags</Typography>
                </Box>
              </Box>
            </Box>
            {/* row end */}
            <Box
              className={styles.BaggageBox}
              display={"flex"}
              flexDirection={"column"}
              gap={2}
            >
              <Box display={"flex"} justifyContent={"space-between"} gap={4}>
                <Box>
                  <Typography className="basecolor-dark" fontWeight={"bold"}>
                    Return baggage
                  </Typography>
                </Box>
                <Link className="btn-link" href={""}>
                  <Box textAlign={"right"} className="basecolor1" gap={2}>
                    <div>Add</div>
                  </Box>
                </Link>
              </Box>
              {/*  */}
              <Box display={"flex"} className={styles.BaggageRow}>
                <Box
                  className={styles.BaggageCol}
                  width={"100%"}
                  display={"flex"}
                  gap={1}
                  flexDirection={"column"}
                >
                  <Box display={"flex"} gap={1} alignItems={"center"}>
                    <Box>
                      <img src={"/images/checkout/personal-items.svg"} />
                    </Box>
                    <Typography>10 x</Typography>
                  </Box>
                  <Typography className="gray">Handbag/laptop bag</Typography>
                </Box>
                <Box
                  className={styles.BaggageCol}
                  width={"100%"}
                  display={"flex"}
                  gap={1}
                  flexDirection={"column"}
                >
                  <Box display={"flex"} gap={1} alignItems={"center"}>
                    <Box>
                      <img src={"/images/checkout/carryon-bagg.svg"} />
                    </Box>
                    <Typography>10 x</Typography>
                  </Box>
                  <Typography className="gray">Carry-on bags</Typography>
                </Box>
                <Box
                  className={styles.BaggageCol}
                  width={"100%"}
                  display={"flex"}
                  gap={1}
                  flexDirection={"column"}
                >
                  <Box display={"flex"} gap={1} alignItems={"center"}>
                    <Box>
                      <img src={"/images/checkout/checked-bagg.svg"} />
                    </Box>
                    <Typography>10 x</Typography>
                  </Box>
                  <Typography className="gray">Checked bags</Typography>
                </Box>
              </Box>
            </Box>
            {/* row end */}
          </Box>
          {/* baggage rows end */}
        </Box>
      </Box>
      {/*  */}
    </Grid>
  );
};
export default ExtraServices;
