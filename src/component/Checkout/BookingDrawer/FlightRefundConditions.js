// FlightRefundConditions.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss"

const FlightRefundConditions = ({ refundCondition, currencySymbols }) => {
  // If refundCondition is null/undefined, show no data message
  if (refundCondition === null || refundCondition === undefined) {
    return (
      <Box display="flex" gap={2} alignItems="center" mb={1}>
        <Box display="flex" alignItems="center">
          <img
            width={14}
            src="/images/refund-icon-drawer.svg"
            alt="No Data"
          />
        </Box>
        <Typography variant="body2" className="gray f12">
          Refund conditions - No data available
        </Typography>
      </Box>
    );
  }

  if (!refundCondition.allowed) {
    return (
      <Box className={styles.includeWraper} display="flex" gap={2} alignItems="center" mb={1}>
        <Box display="flex" alignItems="center">
          <img
            width={14}
            src="/images/refund-icon-drawer.svg"
            alt="No Refunds"
          />
        </Box>
        <Typography variant="body2" className="gray f12">
          Refunds allowed - No refunds allowed
        </Typography>
      </Box>
    );
  }

  const hasPenalty = refundCondition.penalty_amount > 0;
  const iconSrc = hasPenalty 
    ? "/images/refund-icon-drawer.svg"
    : "/images/refund-icon-drawer.svg";
  const altText = hasPenalty ? "Refund with Fee" : "Free Refund";
  
  const refundText = hasPenalty
    ? `Refunds allowed - ${currencySymbols[refundCondition.penalty_currency]}${refundCondition.penalty_amount} penalty applies`
    : "Refunds allowed - no fee";

  return (
    <Box display="flex" className={styles.includeWraper} alignItems="center" mb={1}>
      <Box display="flex" alignItems="center">
        <img width={14} src={iconSrc} alt={altText} />
      </Box>
      <Typography variant="body2" className="gray f12">
        {refundText}
      </Typography>
    </Box>
  );
};

export default FlightRefundConditions;