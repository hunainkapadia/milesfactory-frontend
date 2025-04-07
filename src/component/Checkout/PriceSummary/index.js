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
    dispatch(setIsDrawer(true))
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

  console.log("flightDetailprice", flightDetail);
  


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
          <Box className={styles.PriceSection + " basecolor"} pb={2}>
            <Box
              className={styles.PriceRow}
              display={"flex"}
              justifyContent={"space-between"}
              gap={4}
            >
              <Box>LDN - BGK, Return / 2x adults</Box>
              <Box>£1,304.70</Box>
            </Box>
            <Box
              className={styles.PriceRow}
              display={"flex"}
              justifyContent={"space-between"}
              gap={4}
            >
              <Box>LDN - BGK, Return / 2x adults</Box>
              <Box>£1,304.70</Box>
            </Box>
            <Box
              className={styles.PriceRow}
              display={"flex"}
              justifyContent={"space-between"}
              gap={4}
            >
              <Box>LDN - BGK, Return / 2x adults</Box>
              <Box>£1,304.70</Box>
            </Box>
            <Box
              className={styles.PriceRow}
              display={"flex"}
              justifyContent={"space-between"}
              gap={4}
            >
              <Box>LDN - BGK, Return / 2x adults</Box>
              <Box>£1,304.70</Box>
            </Box>
            <Box
              className={styles.PriceRow}
              display={"flex"}
              justifyContent={"space-between"}
              gap={4}
            >
              <Box>LDN - BGK, Return / 2x adults</Box>
              <Box>£1,304.70</Box>
            </Box>
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
