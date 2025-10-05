import React from "react";
import { Box, FormControlLabel, Radio, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Profilestyles from "@/src/styles/sass/components/profileDrawer/ProfileDrawer.module.scss";
import { capitalizeFirstWord, currencySymbols } from "@/src/utils/utils";
import dayjs from "dayjs";

const RoomDrawerCard = ({ getrates, selectedRateKey, onSelect }) => {
  const rates = getrates;
  const isSelected = selectedRateKey === rates?.rateKey;

  // Safe access
  const cancellation = rates?.cancellationPolicies?.[0] || {};
  const tax = rates?.taxes?.taxes?.[0] || {};

  // Format cancellation policy
  let cancellationText = "";
  if (cancellation.amount === 0) {
    cancellationText = `Free cancellation <span class="aaa">${dayjs(
      cancellation.from
    ).format("DD MMM")}</span>`;
  } else if (cancellation.amount > 0) {
    cancellationText = `Non-refundable after <span class="aaa">${dayjs(
      cancellation.from
    ).format("DD MMM")}</span>`;
  }

  return (

      <Box
        onClick={() => onSelect(rates?.rateKey)}
        className={`${styles.passengersCard} ${styles.passengerProfileCard} ${
          isSelected ? styles.isFilled : ""
        } cursor-pointer`}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        py={2}
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left: Radio + Details */}
          <Box display="flex" alignItems="center" sx={{ gap: { lg: 2, md: 2, xs: 1.5 } }}>
            <FormControlLabel
              value={rates?.rateKey}
              control={<Radio checked={isSelected} sx={{ p: 0, m: 0 }} />}
              sx={{ m: 0, p: 0 }}
            />
            <Box p={0} m={0} className={Profilestyles.detailCol}>
              <Typography fontWeight={600} fontSize={14}>
                {capitalizeFirstWord(rates?.boardName)}
              </Typography>
              <Typography
                fontSize={13}
                color="gray"
                dangerouslySetInnerHTML={{ __html: cancellationText }}
              />
            </Box>
          </Box>

          {/* Right: Price */}
          <Box textAlign="right">
            <Typography fontWeight={700} fontSize={16}>
            
              {currencySymbols[rates?.taxes?.taxes?.[0]?.currency] || "€"}
              {Number(rates?.total_netamount_with_markup).toFixed(2)}
            </Typography>
            <Typography fontSize={12} color="gray">
              +{tax?.clientAmount} {tax?.clientCurrency} tax
            </Typography>
          </Box>
        </Box>
      </Box>
  );
};

export default RoomDrawerCard;
