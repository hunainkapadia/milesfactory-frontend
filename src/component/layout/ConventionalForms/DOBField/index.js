"use client";

import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import TravelDateRange from "../TravelDateRange";


const DOBField = ({ errors, isDrawer, isHomeForm }) => {
  
  const [showCalendar, setShowCalendar] = useState(false);
  const { tripType, departureDate, returnDate } = useSelector(
    (state) => state.travel
  );
  
  
  return (
    <Box
      className={`${styles.formGroup} ${
        isHomeForm && styles.isHomeForm
      } ${isDrawer ? `${styles.DOBField} fromAndtoField` : ""}`}
      position="relative"
    >
      <TextField
        variant="outlined"
        placeholder="Travel dates"
        value={
          tripType === "oneway"
            ? departureDate
              ? dayjs(departureDate).format("DD MMM")
              : ""
            : `${dayjs(departureDate).format("DD MMM")} - ${dayjs(
                returnDate
              ).format("DD MMM")}`
        }
        onClick={() => {
          if (!isDrawer) setShowCalendar(!showCalendar);
        }}
        className={`${styles.formControl} ${styles.dates} formControl`}
        size="small"
        sx={{ width: "180px", cursor: "pointer" }}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <img
              src="/images/calendar-icon-light.svg"
              alt="Calendar"
              onClick={() => {
                if (!isDrawer) setShowCalendar(!showCalendar);
              }}
              style={{ cursor: "pointer" }}
            />
          ),
        }}
        error={!!errors?.date}
        helperText={errors?.date}
      />

      {/* Calendar only for non-drawer */}
      {!isDrawer && showCalendar && (
        <Box position="absolute" top="40px" left={0} zIndex={10}>
          <TravelDateRange onClose={() => setShowCalendar(false)} />
        </Box>
      )}
    </Box>
  );
};

export default DOBField;
