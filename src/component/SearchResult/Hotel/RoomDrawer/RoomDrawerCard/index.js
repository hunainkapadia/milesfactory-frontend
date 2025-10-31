import React from "react";
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import Profilestyles from "@/src/styles/sass/components/profileDrawer/ProfileDrawer.module.scss";
import { capitalizeFirstWord, currencySymbols } from "@/src/utils/utils";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const RoomDrawerCard = ({ getrates, selectedRateKey, onSelect, hotel }) => {
  const rates = getrates;
  const isSelected = selectedRateKey === rates?.rateKey;

  const { hotelSingleResult, isLoading } = useSelector((state) => state.hotel);
  const rateComents =
    hotelSingleResult?.hotel?.rooms[0]?.rates[0]?.rateComments || null;

  console.log("hotel_isLoading", isLoading);

  // Safe access
  const refundable = rates?.rateClass;
  const cancellation = rates?.cancellationPolicies?.[0] || {};
  const tax = rates?.taxes?.taxes?.[0] || {};
  const hotelCurrency = hotel?.currency;

  // Format cancellation policy
  let cancellationText = "";
  if (refundable == "NRF") {
    cancellationText = `Non-refundable`;
  } else if (cancellation.amount > 0) {
    cancellationText = `Cancellable till <span class="aaa">${dayjs(
      cancellation.from
    ).format(
      "DD MMM YYYY, hh:mm A [GMT]Z"
    )}</span> for a fee of <span class="aaa">${
      currencySymbols[hotelCurrency] || ""
    }${Math.round(cancellation.amount)}</span>`;
  }

  return (
    <Box
      onClick={() => onSelect(rates)}
      className={`${styles.passengersCard} ${styles.passengerProfileCard} ${
        isSelected ? styles.isFilled : ""
      } cursor-pointer`}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      py={2}
    >
      <Box
        className={styles.box}
        width="100%"
        display="flex"
        gap={1}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Left: Radio + Details */}
        <Box
          className={styles.LeftCol}
          display="flex"
          alignItems="center"
          sx={{ gap: { lg: 2, md: 2, xs: 1.5 } }}
        >
          <FormControlLabel
            value={rates?.rateKey}
            control={
              <Radio
                sx={{
                  p: 0,
                  m: 0,
                  transform: "scale(18px)", // increase size (1.0 = normal)
                }}
                checked={isSelected}
              />
            }
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
          <Typography fontWeight={700} fontSize={16} whiteSpace={"nowrap"}>
            {currencySymbols[hotelCurrency] || ""}
            {Math.round(rates?.total_netamount_with_markup)}
          </Typography>
          {/* <Typography fontSize={12} color="gray" whiteSpace={"nowrap"}>
              {currencySymbols[hotelCurrency]|| ""}{Math.round(tax?.clientAmount)} tax
            </Typography> */}
        </Box>
      </Box>
      {isSelected && (
        <Box pb={2}>
          {isLoading ? (
            <CircularProgress className="basecolor1" size={20} />
          ) : (
            rateComents && (
              <Typography
                fontSize={12}
                dangerouslySetInnerHTML={{ __html: rateComents }}
              />
            )
          )}
        </Box>
      )}
    </Box>
  );
};

export default RoomDrawerCard;
