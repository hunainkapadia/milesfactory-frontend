// FlightChangeConditions.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const FlightChangeConditions = ({ changeCondition, currencySymbols }) => {
  // If changeCondition is null/undefined, show no data message
  if (changeCondition === null || changeCondition === undefined) {
    return (
      <Box display="flex" gap={2} alignItems="center" mb={1}>
        <Box display="flex" alignItems="center">
          <img
            width={14}
            src="/images/flexible-change-with-fee-drawer.svg"
            alt="No Data"
          />
        </Box>
        <Typography variant="body2" className="gray f12">
          Changes allowed - No data available
        </Typography>
      </Box>
    );
  }

  if (!changeCondition.allowed) {
    return (
      <Box display="flex" gap={2} alignItems="center" mb={1}>
        <Box display="flex" alignItems="center">
          <img
            width={14}
            src="/images/flexible-change-with-fee-drawer.svg"
            alt="No Changes"
          />
        </Box>
        <Typography variant="body2" className="gray f12">
          Changes allowed - No changes allowed
        </Typography>
      </Box>
    );
  }

  const hasPenalty = changeCondition.penalty_amount > 0;
  const iconSrc = hasPenalty 
    ? "/images/flexible-change-with-fee-drawer.svg"
    : "/images/flexible-change-icon-drawer.svg";
  const altText = hasPenalty ? "Change with Fee" : "Free Change";
  
  const changeText = hasPenalty
    ? `Changes allowed - ${currencySymbols[changeCondition.penalty_currency]}${changeCondition.penalty_amount} penalty applies`
    : "Changes allowed - no fee";

  return (
    <Box display="flex" gap={2} alignItems="center" mb={1}>
      <Box display="flex" alignItems="center">
        <img width={14} src={iconSrc} alt={altText} />
      </Box>
      <Typography variant="body2" className="gray f12">
        {changeText}
      </Typography>
    </Box>
  );
};

export default FlightChangeConditions;