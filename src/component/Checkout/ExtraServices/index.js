import { Box, Card, Grid, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Link from "next/link";
import { currencySymbols } from "@/src/utils/utils";

const ExtraServices = ({ getServicesdata, isFilled, selectedFlight }) => {
  console.log("selectedFlightbaggag", selectedFlight);

  return (
    <Grid item xs={6}>
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
          <Box display={"flex"} justifyContent={"space-between"} gap={4} mb={3}>
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
          </Box>
          {/* seats row end */}
          {/*  */}

          {/*  */}
          <Box
            className={styles.BaggageRows}
            display={"flex"}
            flexDirection={"column"}
            gap={4}
          >
            {selectedFlight?.slices.map((slice, index) => {
              const isOutbound = index === 0;

              // Build baggage map (to remove duplicates)
              const baggageMap = new Map();

              slice?.segments.forEach((segment) => {
                segment?.passengers.forEach((passenger) => {
                  passenger?.baggages.forEach((baggage) => {
                    const key = `${baggage.type}-${baggage.formatted_type}`;
                    if (!baggageMap.has(key)) {
                      baggageMap.set(key, {
                        ...baggage,
                        totalQuantity: baggage.quantity || 0,
                      });
                    } else {
                      // Accumulate quantity if duplicate
                      const existing = baggageMap.get(key);
                      existing.totalQuantity += baggage.quantity || 0;
                    }
                  });
                });
              });

              const uniqueBaggages = Array.from(baggageMap.values());

              // Map type to image and label
              const getBaggageInfo = (type) => {
                switch (type) {
                  case "personal_item":
                    return {
                      label: "Handbag/laptop bag",
                      icon: "/images/checkout/personal-items.svg",
                    };
                  case "carry_on":
                    return {
                      label: "Carry-on bags",
                      icon: "/images/checkout/carryon-bagg.svg",
                    };
                  case "checked":
                    return {
                      label: "Checked bags",
                      icon: "/images/checkout/checked-bagg.svg",
                    };
                  default:
                    return {
                      label: type,
                      icon: "",
                    };
                }
              };

              return (
                <Box
                  className={styles.BaggageBox}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                  key={index}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    gap={4}
                  >
                    <Box>
                      <Typography
                        className="f12 basecolor-dark"
                        fontWeight={"bold"}
                      >
                        {isOutbound ? "Outbound baggage" : "Return baggage"}
                      </Typography>
                    </Box>
                    <Link className="btn-link" href={"/"}>
                      <Box textAlign={"right"} className="basecolor1" gap={2}>
                        <div>Add</div>
                      </Box>
                    </Link>
                  </Box>

                  {/* Baggage details row */}
                  <Box display={"flex"} className={styles.BaggageRow}>
                    {uniqueBaggages.map((baggage, bIndex) => {
                      const { icon, label } = getBaggageInfo(baggage.type);

                      return (
                        <Box
                          key={bIndex}
                          className={styles.BaggageCol}
                          width={"100%"}
                          display={"flex"}
                          gap={1}
                          flexDirection={"column"}
                        >
                          <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Box>
                              <img src={icon} alt={label} />
                            </Box>
                            <Typography
                              className={styles.baggageTotal + " f14"}
                            >
                              {baggage.totalQuantity} x
                            </Typography>
                          </Box>
                          <Typography
                            className={styles.baggageLabel + " f11 gray"}
                          >
                            {label}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
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
