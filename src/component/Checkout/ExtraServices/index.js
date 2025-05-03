import { Box, Card, Grid, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";

import Link from "next/link";
import { currencySymbols } from "@/src/utils/utils";
import { bookFlight } from "@/src/store/slices/BookingflightSlice";
import { useDispatch } from "react-redux";
import {
  baggage,
  BaggageDrawer,
  setBaggageDrawer,
} from "@/src/store/slices/BaggageSlice";

const ExtraServices = ({ getServicesdata, isFilled, selectedFlight }) => {
  console.log("selectedFlight", selectedFlight);

  const dispatch = useDispatch();
  const handleBaggageDrawer = () => {
    dispatch(baggage());
    dispatch(setBaggageDrawer(true)); // opens the drawer
  };
  return (
    <Grid
      item
      xs={6}
      lg={6}
      md={6}
      className={searchResultStyles.ExtraServicesCol}
    >
      <Box className={`${styles.passengersCard} ${styles.ExtraServices} `}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Box className="imggroup" width={40}>
            <img height={"100%"} src="/images/user-circle.svg" />
          </Box>
          <Box>
            <Typography
              className="f14 bold"
              textTransform={"capitalize"}
              mb={0}
            >
              {getServicesdata.given_name} {getServicesdata.family_name}
            </Typography>
            <Typography textTransform={"capitalize"} className=" f12 gray">
              {getServicesdata.type}
            </Typography>
          </Box>
          {/* <Typography className="mb-10" mb={1} variant="h6">
            + {currencySymbols[getServicesdata?.tax_currency] ||
                                getServicesdata?.tax_currency}{" "}
                                {Math.round(selectedFlight.total_amount)}
          </Typography> */}
        </Box>
        <Box gap={4} pt={3} width={"100%"}>
          {/* <Box display={"flex"} justifyContent={"space-between"} gap={4} mb={3}>
            <Box>
              <Typography className="f12 basecolor-dark" fontWeight={"bold"}>
                Outbound seat
              </Typography>
              <Typography className="f12 gray">40E</Typography>
            </Box>
            <Link className="btn-link" href={"/"}>
              <Box textAlign={"right"} className="basecolor1" gap={2}>
                <div>Change</div>
              </Box>
            </Link>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} gap={4} mb={3}>
            <Box>
              <Typography className="f12 basecolor-dark" fontWeight={"bold"}>
                Return seat
              </Typography>
              <Typography className="f12 gray">Not selected</Typography>
            </Box>
            <Link className="btn-link" href={"/"}>
              <Box textAlign={"right"} className="basecolor1" gap={2}>
                Change
              </Box>
            </Link>
          </Box> */}
          {/* seats row end */}
          {/*  */}

          {/*  */}
          <Box
            className={styles.BaggageRows}
            display={"flex"}
            flexDirection={"column"}
            gap={4}
          >
            {(() => {
              const baggageMap = new Map();
              

              // Group baggage into outbound and return
              selectedFlight?.slices?.forEach((slice, index) => {
                const isOutbound = index === 0;

                slice.segments?.forEach((segment) => {
                  segment?.passengers?.forEach((passenger) => {
                    passenger?.baggages?.forEach((baggage) => {
                      const direction = isOutbound
                        ? "Outbound baggage"
                        : "Return baggage";
                      const key = `${baggage.type}-${baggage.formatted_type}-${direction}`;
                      if (!baggageMap.has(key)) {
                        baggageMap.set(key, { ...baggage, direction });
                      }
                    });
                  });
                });
              });

              const uniqueBaggages = Array.from(baggageMap.values());

              const outboundBaggages = uniqueBaggages.filter(
                (baggage) => baggage.direction === "Outbound baggage"
              );
              const returnBaggages = uniqueBaggages.filter(
                (baggage) => baggage.direction === "Return baggage"
              );

              const renderBaggageSection = (title, baggages) => (
                <Box
                  className={styles.BaggageBox}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Box display="flex" justifyContent="space-between" gap={4}>
                    <Typography
                      className="f12 basecolor-dark"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                    <Box
                      className="btn-link basecolor1"
                      onClick={handleBaggageDrawer}
                    >
                      <Box textAlign="right" className="basecolor1" gap={2}>
                        <div>Add</div>
                      </Box>
                    </Box>
                  </Box>

                  <Box display="flex" className={styles.BaggageRow}>
                    <Box
                      className={styles.BaggageCol}
                      width="100%"
                      display="flex"
                      gap={1}
                      flexDirection="column"
                    >
                      <Box display="flex" gap={1} alignItems="center">
                        <Box>
                          <img
                            src="/images/checkout/personal-items.svg"
                            alt="Handbag"
                          />
                        </Box>
                        <Typography className={styles.baggageTotal + " f14"}>
                          1 x
                        </Typography>
                      </Box>
                      <Typography className={styles.baggageLabel + " f11 gray"}>
                        Handbag/laptop bag
                      </Typography>
                    </Box>

                      {console.log("baggageMap", baggages)}
                    {baggages.map((baggage, index) => (
                      <Box
                        key={index}
                        className={styles.BaggageCol}
                        width="100%"
                        display="flex"
                        gap={1}
                        flexDirection="column"
                      >
                        <Box display="flex" gap={1} alignItems="center">
                          <Box>
                            <img
                              src={
                                baggage.type === "personal"
                                  ? "/images/checkout/personal-items.svg"
                                  : baggage.type === "carry_on"
                                  ? "/images/checkout/carryon-bagg.svg"
                                  : baggage.type === "checked"
                                  ? "/images/checkout/checked-bagg.svg"
                                  : "/images/checkout/default-bagg.svg"
                              }
                              alt={baggage.type}
                            />
                          </Box>
                          <Typography
                            className={styles.baggageTotal + " f14 gray"}
                          >
                            {baggage.quantity} x
                          </Typography>
                        </Box>
                        <Typography
                          className={styles.baggageLabel + " f11 gray"}
                        >
                          {baggage.type === "personal"
                            ? "Handbag/laptop bag"
                            : baggage.type === "carry_on"
                            ? "Carry-on bags"
                            : baggage.type === "checked"
                            ? "Checked bags"
                            : "Checked bags"}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              );

              return (
                <Box>
                  {outboundBaggages.length > 0 &&
                    renderBaggageSection("Outbound baggage", outboundBaggages)}
                  {returnBaggages.length > 0 &&
                    renderBaggageSection("Return baggage", returnBaggages)}
                </Box>
              );
            })()}
          </Box>
          {/* Unique Baggage Items */}

          {/* baggage rows end */}
        </Box>
      </Box>
      {/*  */}
    </Grid>
  );
};
export default ExtraServices;
