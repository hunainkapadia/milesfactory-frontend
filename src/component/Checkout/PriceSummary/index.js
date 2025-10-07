import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
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
import { currencySymbols, event } from "@/src/utils/utils";

const PriceSummary = ({ getdata }) => {
  const [isPrice, setIsPrice] = useState(false);
  const priceSummaryRef = useRef(null); // Step 1: Create ref for scroll

  const dispatch = useDispatch();

  // payment data dispatching and open payment drawer
  const handlePaymentDrawer = () => {
    dispatch(PaymentSessionStart()); /// starting payment session here
    dispatch(setPaymentDrawer(true)); ///open drawer
    dispatch(OrderSuccessPayment());
  };

  const priceSummaryHandle = () => {
    //ga_event
    event({
      action: "click",
      category: "engagement",
      label: "Price Summary Click",
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

  const OrderDetail = useSelector((state) => state?.payment?.OrderConfirm); //from order api
  const flightOrder = OrderDetail?.flight_order?.selected_offer;
  const hotelOrder = OrderDetail?.hotel_order?.selected_hotel_offer?.hotel;

  console.log("flightOrder_22", OrderDetail?.amount_calculations);
  // hotelOrder.hotel.rooms[0].rates[0].taxes.taxes[0].amount || {}

  // const flightOrder = useSelector((state) => state.booking.flightOrder); //from flight

  const passengers = flightOrder?.slices?.[0]?.segments?.[0]?.passengers || [];

  const personQuantity = flightOrder?.passengers.length;
  const Passengers = Number(flightOrder?.per_passenger_amount) * personQuantity;
  const WithtaxAmount = Number(flightOrder?.tax_amount) + Passengers;
  const totalAmount =
    Math.round(flightOrder?.base_amount) +
    Math.round(flightOrder?.tax_amount) +
    Math.round(flightOrder?.markup_amount);

  const paymentSuccess = useSelector(
    (state) => state.payment.PaymentFormSuccess
  );

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
        <Box
          mb={3}
          ref={priceSummaryRef}
          className={`${styles.Card} ${styles.SummaryCard} Card white-bg`}
        >
          <Box pb={2}>
            <Typography fontSize={{xs:"14px", md:"16px"}} className="bold mb-0">Trip price summary</Typography>
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
              {flightOrder && (
                <>
                  {flightOrder?.slices && (
                    <Box
                      className={styles.PriceRow + " f12 "}
                      display="flex"
                      justifyContent="space-between"
                      gap={4}
                    >
                      <Box className="bold darkgray f14">
                        Flight {flightOrder?.slices?.[0]?.origin.iata_code} -{" "}
                        {flightOrder?.slices?.at(0)?.destination.iata_code} |{" "}
                        {new Date(
                          flightOrder?.slices?.[0]?.departing_at
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })}{" "}
                        {flightOrder?.slices?.[0]?.arriving_at &&
                          new Date(
                            flightOrder?.slices?.[0]?.arriving_at
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                          })}
                        Return /{" "}
                        {Object.entries(
                          (flightOrder?.passengers || []).reduce(
                            (acc, passenger) => {
                              acc[passenger.type] =
                                (acc[passenger.type] || 0) + 1;
                              return acc;
                            },
                            {}
                          )
                        ).map(([type, count]) => (
                          <span key={type}>
                            {count}x {type}
                          </span>
                        ))}
                      </Box>
                      <Box className="bold darkgray f14" whiteSpace={"nowrap"}>
                        {currencySymbols[flightOrder?.tax_currency] ||
                          flightOrder?.tax_currency}
                        {flightOrder?.base_amount}
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
                    <Box>Airline fees</Box>
                    <Box whiteSpace={"nowrap"}>
                      {hotelOrder ? (
                        <>
                          {currencySymbols[flightOrder?.tax_currency]}
                          {hotelOrder?.rooms?.[0]?.rates?.[0]?.taxes?.taxes?.[0]
                            ?.amount || ""}
                        </>
                      ) : flightOrder ? (
                        <>
                          {currencySymbols[flightOrder?.tax_currency]}
                          {Math.round(flightOrder?.tax_amount)}
                        </>
                      ) : (
                        "-"
                      )}
                    </Box>
                  </Box>
                  <Box
                    className={styles.PriceRow + " f12"}
                    display="flex"
                    justifyContent="space-between"
                    gap={4}
                  >
                    <Box>Taxes, fees & surcharges</Box>
                    <Box whiteSpace={"nowrap"}>
                      {currencySymbols[flightOrder?.tax_currency]}
                      {Math.round(flightOrder?.tax_amount)}
                    </Box>
                  </Box>
                  {OrderDetail?.amount_calculations
                    ?.baggages_total_amount_plus_markup > 0 && (
                    <Box
                      className={styles.PriceRow + " f12"}
                      display="flex"
                      justifyContent="space-between"
                      gap={4}
                    >
                      <Box>Extra baggage</Box>
                      <Box whiteSpace={"nowrap"}>
                        {currencySymbols[flightOrder?.tax_currency] ||
                          flightOrder?.tax_currency}
                        {Math.round(
                          OrderDetail?.amount_calculations
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
                    <Box whiteSpace={"nowrap"}>
                      {flightOrder?.markup_amount != null ? (
                        <>
                          {flightOrder.tax_currency === "GBP"
                            ? "£"
                            : flightOrder.tax_currency}
                          {flightOrder.markup_amount}
                        </>
                      ) : (
                        "-"
                      )}
                    </Box>
                  </Box>
                  <Box py={{md:2, xs:"12px"}}>
                    <Divider />
                  </Box>
                </>
              )}

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

                    flightOrder?.slices.forEach((slice, sliceIndex) => {
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
                        {flightOrder?.slices.map((slice, sliceIndex) => {
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
                              flightOrder?.slices.length > 1
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

              {/* hotel */}
              {console.log("flightOrder_slices", flightOrder)}
              {hotelOrder && (
                <>
                  <Box className="bold darkgray f14">
                    Stay The {hotelOrder?.name} |{" "}
                    {new Date(hotelOrder?.checkIn).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}{" "}
                    -{" "}
                    {new Date(hotelOrder?.checkOut).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )}{" "}
                    |{" "}
                    {hotelOrder?.rooms[0]?.rates[0]?.adults &&
                      `${hotelOrder?.rooms[0]?.rates[0]?.adults} adults, `}
                    {hotelOrder?.rooms[0]?.rates[0]?.children &&
                      `${hotelOrder?.rooms[0]?.rates[0]?.children} children `}
                  </Box>
                  {hotelOrder && (
                    <Box
                      className={styles.PriceRow + " f12"}
                      display="flex"
                      justifyContent="space-between"
                      gap={4}
                    >
                      <Box>
                        {/* {
                          flightOrder?.hotel_order?.selected_hotel_offer?.hotel?.name
                        } */}
                        Hotel fees
                      </Box>
                      <Box whiteSpace={"nowrap"}>
                        {currencySymbols[flightOrder?.tax_currency] ||
                          flightOrder?.tax_currency}
                        {OrderDetail?.amount_calculations?.total_amount_plus_markup_and_all_services?.toFixed(
                          2
                        )}
                        {/* {perNight} / night */}
                      </Box>
                    </Box>
                  )}
                  <Box
                    className={styles.PriceRow + " f12"}
                    display="flex"
                    justifyContent="space-between"
                    gap={4}
                  >
                    <Box>City tax and service fees</Box>
                    <Box whiteSpace={"nowrap"}>
                      {currencySymbols[flightOrder?.tax_currency] ||
                        flightOrder?.tax_currency}
                      {hotelOrder?.rooms[0]?.rates[0]?.taxes?.taxes[0].amount
                        ? hotelOrder?.rooms[0]?.rates[0]?.taxes?.taxes[0].amount
                        : "-"}
                    </Box>
                  </Box>
                  <Box py={{md:2, xs:"12px"}}>
                    <Divider />
                  </Box>
                </>
              )}
              {/* hotel end */}

              <Box
                className={styles.PriceRow + " black exbold "}
                display={"flex"}
                justifyContent={"space-between"}
                gap={4}
              >
                <Box>Total trip price</Box>
                <Box className="mb-0 " whiteSpace={"nowrap"}>
                  {
                    currencySymbols[
                      OrderDetail?.hotel_order?.payment_currency ||
                        OrderDetail?.flight_order?.payment_currency
                    ]
                  }
                  {OrderDetail?.amount_calculations?.total_amount_plus_markup_and_all_services?.toFixed(
                    2
                  )}
                </Box>
              </Box>
              {/*  hotel */}
              {/* Hotel price per night row */}
            </Box>
            {/* price row */}
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              disabled={paymentSuccess}
              className={`${styles.priceBtn} btn btn-primary btn-md btn-round sm `}
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
