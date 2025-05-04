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

  const personQuantity = flightDetail?.passengers.length;
  const Passengers =
    Number(flightDetail?.per_passenger_amount) * personQuantity;
  const WithtaxAmount = Number(flightDetail?.tax_amount) + Passengers;
  const totalAmount = Math.round(flightDetail?.base_amount) + Math.round(flightDetail?.tax_amount) + Math.round(flightDetail?.markup_amount);

  const paymentSuccess = useSelector((state)=> state.payment.PaymentFormSuccess);
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
            <h5 fontWeight={"regular"} className="regular mb-0">
              Price summary
            </h5>
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
                className={styles.PriceRow + " f12 "}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <Box>
                  {flightDetail.slices?.[0]?.origin.iata_code} -{" "}
                  {flightDetail.slices?.at(0)?.destination.iata_code}, Return /{" "}
                  {Object.entries(
                    flightDetail.passengers?.reduce((acc, passenger) => {
                      acc[passenger.type] = (acc[passenger.type] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([type, count]) => (
                    <span key={type}>
                      {count}x {type}
                    </span>
                  ))}
                </Box>
                <Box>
                  {console.log("getpassengertype", flightDetail)}
                  {currencySymbols[flightDetail?.tax_currency] ||
                    flightDetail?.tax_currency}
                  {Math.round(flightDetail?.base_amount)}
                </Box>
              </Box>

              {/* Taxes, fees & surcharges row */}
              <Box
                className={styles.PriceRow + " f12"}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <Box>Taxes, fees & surcharges</Box>
                <Box>
                  {flightDetail.tax_currency === "GBP"
                    ? "£"
                    : flightDetail.tax_currency}
                  {Math.round(flightDetail.tax_amount)}
                </Box>
              </Box>
              {/* <Box
                className={styles.PriceRow}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <Box>2x upgraded seats</Box>
                <Box>£46.00</Box>
              </Box> */}
              {/* <Box
                className={styles.PriceRow}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <Box>
                  {(() => {
                    const baggageMap = new Map();

                    flightDetail?.slices.forEach((slice, sliceIndex) => {
                      slice?.segments?.forEach((segment) => {
                        segment?.passengers?.forEach((passenger) => {
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
                      <span>
                        {flightDetail?.slices.map((slice, sliceIndex) => {
                          const sliceLabel =
                            sliceIndex === 0 ? "Outbound" : "Return";
                          const baggageSummary = uniqueBaggages
                            .filter((baggage) => baggage.quantity > 0) // Filter out baggage with quantity 0
                            .map(
                              (baggage) =>
                                `${baggage.quantity}x ${baggage.formatted_type}`
                            )
                            .join(", ");

                          return (
                            <span key={sliceIndex}>
                              <strong>{sliceLabel}:</strong>{" "}
                              {baggageSummary || "No baggage info"}
                              {sliceIndex === 0 &&
                              flightDetail?.slices.length > 1
                                ? " / "
                                : ""}
                            </span>
                          );
                        })}
                      </span>
                    );
                  })()}
                </Box>
              </Box> */}
              {/* Markup row */}
              <Box
                className={styles.PriceRow + " f12"}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <Box>Admin Fee</Box>
                <Box>
                  {flightDetail.tax_currency === "GBP"
                    ? "£"
                    : flightDetail.tax_currency}
                  {Math.round(flightDetail.markup_amount)}
                </Box>
              </Box>
              <Box
                className={styles.PriceRow + " black exbold f14m"}
                display={"flex"}
                justifyContent={"space-between"}
                gap={4}
              >
                <Box>Total price</Box>
                <Box className="mb-0 ">
                  {console.log("flightDetail111", flightDetail)}
                  {currencySymbols[flightDetail?.tax_currency] ||
                  flightDetail?.tax_currency}
                {totalAmount}
                </Box>
              </Box>
            </Box>
            {/* price row */}
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              className={`btn btn-primary btn-md btn-round sm `}
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
