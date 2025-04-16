import React from "react";
import { Box, Typography, Radio, FormControlLabel } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/Payment.module.scss";

const PaymentCard = ({ getdata, selected, onSelect, agreeTerms }) => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      {/* Payment Card */}
      <Box
        className={`${styles.paymentCard} ${selected ? styles.selected : ""}`}
        onClick={onSelect}
      >
        <FormControlLabel
                            value={`${getdata.name}`}
                            control={<Radio checked={selected} className="customRadio" />}
                          />
        <Box className="imggroup">
          <img src={getdata.image} alt={getdata.name} width={40} />
        </Box>
        <Box>
          <Typography variant="body1" className={styles.cardTitle}>
            {getdata.title}
          </Typography>
          <Typography variant="body2" className={styles.cardDescription}>
            {getdata.desc}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentCard;
