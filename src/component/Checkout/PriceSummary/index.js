import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import {
  setIsDrawer,
  setpriceSummary,
  toggleDrawer,
} from "@/src/store/slices/PaymentSlice";
import { currencySymbols } from "@/src/utils/utils";

const PriceSummary = ({ getdata }) => {
  const [isPrice, setIsPrice] = useState(false);
  const priceSummaryRef = useRef(null); // Step 1: Create ref for scroll

  const dispatch = useDispatch();
  const handlePaymentDrawer = () => {
    dispatch(setIsDrawer(true));
  };

  const priceSummaryHandle = () => {
    dispatch(setpriceSummary(true));
  };
  const priceSummary = useSelector((state) => state.payment.priceSummary);

  // Step 2: useEffect to scroll when priceSummary becomes true
  useEffect(() => {
    if (priceSummary && priceSummaryRef.current) {
      priceSummaryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [priceSummary]);

  // get flight
  const flightDetail = useSelector((state) => state.booking.flightDetail);

  const passengers = flightDetail.slices?.[0]?.segments?.[0]?.passengers || [];

  return (
    <>
      <Box py={2}>
        <Typography>
          When ready, go to the flight{" "}
          <span
            onClick={() => priceSummaryHandle()}
            className="text-decuration-none bold cursor-pointer basecolor1"
          >
            price summary.
          </span>
        </Typography>
      </Box>
      {priceSummary ? (
        <Box ref={priceSummaryRef} className={styles.Card + " Card white-bg"}>
          <Box pb={2}>
            <h4 fontWeight={"regular"} className="regular mb-0">
              Price summary
            </h4>
          </Box>
          <Box
            className={styles.PriceSection + " basecolor"}
            pb={2}
            display={"flex"}
            flexDirection={"column"}
            gap={2}
          >
            <Box className={styles.BaggageBody}>
              {/* Total price row */}
              <Box
                className={styles.PriceRow}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <Box>
                  {flightDetail.slices?.[0]?.origin.iata_code} -{" "}
                  {flightDetail.slices?.at(0)?.destination.iata_code}, Return /{" "}
                  {passengers.length}x{" "}
                  {passengers.length > 1 ? "adults" : "adult"}
                </Box>
                <Box>
                  {flightDetail.total_currency === "GBP"
                    ? "£"
                    : flightDetail.total_currency}
                  {flightDetail.total_amount_plus_markup.toFixed(2)}
                </Box>
              </Box>

              {/* Taxes, fees & surcharges row */}
              <Box
                className={styles.PriceRow}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <Box>Taxes, fees & surcharges</Box>
                <Box>
                  {flightDetail.tax_currency === "GBP"
                    ? "£"
                    : flightDetail.tax_currency}
                  {Number(flightDetail.tax_amount).toFixed(2)}
                </Box>
              </Box>
              <Box
                className={styles.PriceRow}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <Box>2x upgraded seats</Box>
                <Box>£46.00</Box>
              </Box>
              <Box
                className={styles.PriceRow}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <Box>
                  {(() => {
                    const baggageMap = new Map();

                    flightDetail?.slices.forEach((slice) => {
                      slice?.segments?.forEach((segment) => {
                        segment?.passengers?.forEach((passenger) => {
                          {
                            console.log("getdata_summary2", passenger);
                          }
                          passenger?.baggages?.forEach((baggage) => {
                            const key = `${baggage.type}-${baggage.formatted_type}`;
                            if (!baggageMap.has(key)) {
                              baggageMap.set(key, { ...baggage });
                            }
                          });
                        });
                      });
                    });

                    const uniqueBaggages = Array.from(baggageMap.values());
                    return (
                      <Box>
                        {uniqueBaggages.map((baggage, index) => (
                          <span className="f12">
                            {/* <Box className={styles.BaggageIcon}>
                              <img
                                width={14}
                                src={
                                  baggage?.type === "checked"
                                    ? "/images/checkout/checked-bagg.svg"
                                    : "/images/checkout/carryon-bagg.svg"
                                }
                              />
                            </Box> */}
                            {baggage.quantity}x {baggage.formatted_type} {", "}
                          </span>
                        ))}
                      </Box>
                    );
                  })()}
                </Box>
                <Box>£60.00</Box>
              </Box>
            </Box>
            {/* price row */}
            <Box
              className={styles.PriceRow + " black exbold"}
              display={"flex"}
              justifyContent={"space-between"}
              gap={4}
            >
              <Box>Total price</Box>
              <h5 className="mb-0">
                {currencySymbols[flightDetail?.tax_currency] ||
                  flightDetail?.tax_currency}{" "}
                {Math.round(flightDetail?.total_amount)}
              </h5>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"} pt={2}>
            <Button
              className="btn btn-primary btn-md btn-round"
              onClick={handlePaymentDrawer}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <span>Proceed to payment</span>
              </Box>
            </Button>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default PriceSummary;
