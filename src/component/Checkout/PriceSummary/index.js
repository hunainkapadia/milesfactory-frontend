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


  const personQuantity = flightOrder?.passengers.length;

  const slices = flightOrder?.slices || [];
  const firstSeg = slices[0]?.segments?.[0];
  const isRoundTrip = slices.length > 1;

  const route = `${firstSeg?.origin?.city_name} - ${firstSeg?.destination?.city_name}`;

  const departureDate = new Date(firstSeg?.departing_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      });
  const returnArrival = isRoundTrip
    ? new Date(slices[1]?.segments?.at(-1)?.arriving_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })
    : null;

  const date = isRoundTrip
    ? `${departureDate} - ${returnArrival}`
    : departureDate;

  // --- Logic to determine the number of adults and children---

  // 1. Try to get the count from the hotel order first.
  const hotelAdults = hotelOrder?.rooms[0]?.rates[0]?.adults;
  const hotelChildren = hotelOrder?.rooms[0]?.rates[0]?.children;

  // 2. If not found, get the count from the flight order.
  // We safely filter the passengers array and get its length.
  const flightAdults = flightOrder?.passengers?.filter(
    (passenger) => passenger.type === 'adult'
  ).length;

  const flightChildren = flightOrder?.passengers?.filter(
    (passenger) => passenger.type === 'child'
  ).length;

  const flightInfant = flightOrder?.passengers?.filter(
    (passenger) => passenger.type === 'infant_without_seat'
  ).length;
  // 3. Determine the final count. This uses the first "truthy" value.
  // It prioritizes hotelAdults, falls back to flightAdults, and defaults to 0.
  const numAdults = hotelAdults || flightAdults || 0;
  const numChildren = hotelChildren || flightChildren + flightInfant || 0;

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
          When ready, go to the trip{" "}
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
                        {date} | {" "}
                        {isRoundTrip ? "Return" : "One-way"} | {" "}
                         {numAdults > 0 &&
                    `${numAdults} ${numAdults === 1 ? 'adult' : 'adults'} `} {" "}
                      {numChildren > 0 &&
                    `${numChildren} ${numChildren === 1 ? 'child' : 'children'} `}
                      </Box>
                      <Box className="bold darkgray f14" whiteSpace={"nowrap"}>
                        {currencySymbols[flightOrder?.tax_currency] ||
                          flightOrder?.tax_currency}
                        {OrderDetail?.amount_calculations?.flight_total_amount_plus_markup_and_all_services}
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
                      {currencySymbols[flightOrder?.tax_currency] ||
                          flightOrder?.tax_currency}
                      {Math.round(flightOrder?.base_amount)}
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
                          {flightOrder.markup_amount_rounded}
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

              {/* hotel */}
              
              {hotelOrder && (
                <>
                  <Box className="bold darkgray f14">
                    Stay at {hotelOrder?.name} |{" "}
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
                    {/* refactor later */}
                    {numAdults > 0 &&
                    `${numAdults} ${numAdults === 1 ? 'adult' : 'adults'} `} {" "}
                     {numChildren > 0 &&
                    `${numChildren} ${numChildren === 1 ? 'child' : 'children'} `}
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
                        {Math.round(OrderDetail?.amount_calculations?.hotel_total_amount_plus_markup_and_all_services)}
                        {/* {perNight} / night */}
                      </Box>
                    </Box>
                  )}
                  {/* <Box
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
                  </Box> */}
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
                  {Math.round(OrderDetail?.amount_calculations?.total_amount_plus_markup_and_all_services)}
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
