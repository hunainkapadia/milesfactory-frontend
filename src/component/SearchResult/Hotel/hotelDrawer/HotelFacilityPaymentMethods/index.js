"use client";

import {
  Box,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";

const HotelFacilityPaymentMethods = ({ hotel }) => {
  // Filter facilities by facilityGroupCode 30 for payment methods
  const paymentMethodsFacilities = hotel?.content?.facilities?.filter(
    (facility) => facility?.facilityGroupCode === 30
  ) || [];

  // Only render if payment methods facilities are available
  if (paymentMethodsFacilities.length === 0) {
    return null;
  }

  // Mapping function to get the appropriate logo for each payment method
  const getPaymentMethodLogo = (description) => {
    const lowerDesc = description?.toLowerCase() || "";

    const logoMap = {
      "american express": "/images/hotel/payment-logos/amex-logo.svg",
      "amex": "/images/hotel/payment-logos/amex-logo.svg",
      "jcb": "/images/hotel/payment-logos/jcb-logo.svg",
      "diners club": "/images/hotel/payment-logos/diners-logo.svg",
      "diners": "/images/hotel/payment-logos/diners-logo.svg",
      "mastercard": "/images/hotel/payment-logos/mastercard-logo.svg",
      "visa": "/images/hotel/payment-logos/visa-logo.svg",
      "maestro": "/images/hotel/payment-logos/maestro-logo.svg",
      "visa electrón": "/images/hotel/payment-logos/visa-electron-logo.svg",
      "visa electron": "/images/hotel/payment-logos/visa-electron-logo.svg",
    };

    for (const [key, value] of Object.entries(logoMap)) {
      if (lowerDesc.includes(key)) {
        return value;
      }
    }

    // Default logo if no match found
    return "/images/hotel/hotel-pay-icon.svg";
  };

  return (
    <>
      <Box mb={2}>
        <Divider className={`${styles.Divider} Divider`} />
      </Box>
      <Stack className={styles.fromAndToBodyBottom + " "} gap={1}>
        <Box>
          <Typography className="exbold f12 mb-0 h4">
            Payment Methods
          </Typography>
        </Box>
        <Stack
          gap={"5px 18px"}
          flexWrap={"wrap"}
          flexDirection={"row"}
        >
          {/* Payment Methods List with Individual Logos */}
          {paymentMethodsFacilities.map((method) => (
            <Box
              key={method?.facility?.code}
              display="flex"
              gap={1}
              alignItems="center"
              className={styles.normalOption}
            >
              <Box
                className={styles.BaggageIcon + "  "}
                display={"flex"}
                alignItems={"center"}
              >
                <img
                  width={24}
                  src={getPaymentMethodLogo(method?.facility?.description?.content)}
                  alt={method?.facility?.description?.content || "payment method"}
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Typography className="f12 basecolor ">
                {method?.facility?.description?.content}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default HotelFacilityPaymentMethods;
