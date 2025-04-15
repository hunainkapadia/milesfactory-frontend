import { Box, Divider, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { closeDrawer, setIsDrawer, setPaymentFormSuccess } from "@/src/store/slices/PaymentSlice";
import { useDispatch, useSelector } from "react-redux";
import { triggerScroll } from "@/src/utils/scrollManager";
import { currencySymbols } from "@/src/utils/utils";

const PaymentFooter = ({selectedCard, agreeTerms}) => {
  const dispatch = useDispatch();
  const handlePay =()=> {
    if (agreeTerms) {
      console.log("agreeTermsaaa", agreeTerms);
      
    }
    triggerScroll();
    setTimeout(() => {
      dispatch(setPaymentFormSuccess(true));
      dispatch(setIsDrawer(false));
    }, 300); // Optional: tweak delay
  }
  const handleCloseDrawer =()=> {
    dispatch(setIsDrawer(false))
  }
  const flightDetail = useSelector((state) => state.booking.flightDetail);

  return (
    <>
      <Box
        className={styles.checkoutDrowerFooter + " test11"}
        position="absolute"
      >
        <Divider />

        {/* Footer Content */}

        {/* Price Row */}
        <Box px={3} py={2} display={"flex"} justifyContent={"space-between"}>
          {/* Price Section */}
          <Box flexDirection="column">
            <Box className={styles.priceSection} gap={1}>
              <Typography
                variant="subtitle2"
                className={styles.priceLabel + " mb-0 gray"}
              >
                Total amount
              </Typography>
              <Typography
                variant="h3"
                className={styles.price + " h3 mb-0 basecolor-dark"}
              >
                {console.log("flightDetail000", flightDetail)}
                {currencySymbols[flightDetail?.tax_currency] ||
                  flightDetail?.tax_currency}{" "}
                {Math.round(flightDetail?.per_passenger_amount_plus_markup)}
              </Typography>
            </Box>
          </Box>

          {/* Actions Section */}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={3}
          >
            {/* Close Button */}
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              className="gray f14"
              style={{ cursor: "pointer" }}
              onClick={handleCloseDrawer}
            >
              <span>Cancel</span>
            </Box>

            {/* Select Flight Button */}
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              className="basecolor1"
            >
              {console.log("agreeTerms11", agreeTerms, selectedCard)}
              <button
                className={`${styles.selectFlightBtn} btn ${
                  selectedCard && agreeTerms ? "btn-primary" : "btn-disabled"
                } btn-md btn-round`}
                onClick={handlePay}
              >
                <Box display="flex" gap={1}>
                  <Box>Pay</Box>
                </Box>
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PaymentFooter;
