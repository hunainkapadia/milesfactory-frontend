import React, { useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { openDrawer, setisDrawer, toggleDrawer } from "@/src/store/slices/PaymentSlice";

const PaymentInfo = ({ getdata }) => {
   const [isPrice, setIsPrice] = useState(false)
   const dispatch = useDispatch();
   const handlePaymentDrawer = () => {
      dispatch(openDrawer()); // Open drawer
    };
    
    const priceSummaryHandle =()=> {
      setIsPrice(true)
    }
   
  return (
    <>
      <Box py={2}>
        <Typography>
          When ready, go to the flight{" "}
          <Link
            href={""}
            onClick={()=>priceSummaryHandle()}
            className="text-decuration-none bold"
          >
            price summary.
          </Link>
        </Typography>
      </Box>
      {isPrice ? 
      <Box className={styles.Card + " Card white-bg"}>
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
            <h5 className="mb-0">£1,448.00</h5>
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
      : ""}
    </>
  );
};

export default PaymentInfo;
