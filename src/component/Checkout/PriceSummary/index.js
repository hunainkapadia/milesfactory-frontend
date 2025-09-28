import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import {
  OrderSuccessPayment,
  PaymentSessionStart,
  setPaymentDrawer,
  setpriceSummary,
} from "@/src/store/slices/PaymentSlice";
import { currencySymbols,event } from "@/src/utils/utils";

const PriceSummary = ({ getdata }) => {
  const [isPrice, setIsPrice] = useState(false);
  const priceSummaryRef = useRef(null); // Step 1: Create ref for scroll

  const dispatch = useDispatch();

  // payment data dispatching and open payment drawer
  const handlePaymentDrawer = () => {
    dispatch(PaymentSessionStart()); /// starting payment session here
    dispatch(setPaymentDrawer(true)); ///open drawer
    dispatch(OrderSuccessPayment())
  };

  const priceSummaryHandle = () => {
    //ga_event
    event({
      action: 'click',
      category: 'engagement',
      label: 'Price Summary Click',
    });
    // call captain api
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
  
  const flightOrder = useSelector((state) => state?.payment?.OrderConfirm); //from order api
  const orderDetail = flightOrder.flight_order.selected_offer;

  console.log("orderDetail_00", orderDetail);
  
  
  

  // const orderDetailOld = useSelector((state) => state.booking.orderDetail); //from flight
  
  

  const passengers = orderDetail?.slices?.[0]?.segments?.[0]?.passengers || [];

  const personQuantity = orderDetail?.passengers.length;
  const Passengers =
    Number(orderDetail?.per_passenger_amount) * personQuantity;
  const WithtaxAmount = Number(orderDetail?.tax_amount) + Passengers;
  const totalAmount = Math.round(orderDetail?.base_amount) + Math.round(orderDetail?.tax_amount) + Math.round(orderDetail?.markup_amount);

  const paymentSuccess = useSelector((state) => state.payment.PaymentFormSuccess);

  
  

  return (
    <>
      <Box
        sx={{
          pb: { lg: "24px", md: "24px", xs: "16px" },
          pt: { lg: "30px", md: "30px", xs: "16px" },
        }}
      >
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
        <Box mb={3} ref={priceSummaryRef} className={styles.Card + " Card white-bg"}>
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
              {orderDetail?.slices && (

              <Box
                className={styles.PriceRow + " f12 "}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <Box>
                  {orderDetail?.slices?.[0]?.origin.iata_code} -{" "}
                  {orderDetail?.slices?.at(0)?.destination.iata_code}, Return /{" "}
                  {Object.entries(
                    (orderDetail?.passengers || []).reduce((acc, passenger) => {
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
                  {currencySymbols[orderDetail?.tax_currency] ||
                    orderDetail?.tax_currency}
                  {Math.round(orderDetail?.base_amount)}
                </Box>
              </Box>
              )}

              {/* Taxes, fees & surcharges row */}
              <Box
                className={styles.PriceRow + " f12"}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <Box>Taxes, fees & surcharges</Box>
                <Box>
                  {orderDetail?.tax_currency === "GBP"
                    ? "£"
                    : orderDetail?.tax_currency}
                  {Math.round(orderDetail?.tax_amount)}
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

                    orderDetail?.slices.forEach((slice, sliceIndex) => {
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
                        {orderDetail?.slices.map((slice, sliceIndex) => {
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
                              orderDetail?.slices.length > 1
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
              {/* Additional baggage row */}
              {flightOrder?.amount_calculations
                ?.baggages_total_amount_plus_markup > 0 && (
                <Box
                  className={styles.PriceRow + " f12"}
                  display="flex"
                  justifyContent="space-between"
                  gap={4}
                >
                  <Box>Additional Baggage Fee</Box>
                  <Box>
                    {currencySymbols[orderDetail?.tax_currency] ||
                      orderDetail?.tax_currency}
                    {Math.round(
                      flightOrder?.amount_calculations
                        ?.baggages_total_amount_plus_markup
                    )}
                  </Box>
                </Box>
              )}

              {/* Markup row */}
              <Box
                className={styles.PriceRow + " f12"}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <Box>Admin Fee</Box>
                <Box>
                  {orderDetail?.markup_amount != null && (
                    <>
                      {orderDetail.tax_currency === "GBP"
                        ? "£"
                        : orderDetail.tax_currency}
                      {Math.round(orderDetail.markup_amount)}
                    </>
                  )}
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
                  {currencySymbols[orderDetail?.tax_currency] ||
                    orderDetail?.tax_currency}
                  {
                    flightOrder?.amount_calculations
                      ?.total_amount_plus_markup_and_all_services
                  }
                </Box>
              </Box>
            </Box>
            {/* price row */}
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              disabled={paymentSuccess}
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
