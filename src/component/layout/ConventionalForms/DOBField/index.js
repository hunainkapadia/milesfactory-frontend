"use client";

import React, { useState, useRef } from "react";
import { Box, TextField } from "@mui/material";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import {
  setDepartureDate,
  setReturnDate,
} from "@/src/store/slices/TravelSlice";

const DOBField = ({ errors, isDrawer, isHomeForm }) => {
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const { tripType, departureDate, returnDate } = useSelector(
    (state) => state.travel
  );

  const [dateRange, setDateRange] = useState([
    {
      startDate: departureDate ? new Date(departureDate) : dayjs().add(1, "day").toDate(),
      endDate: returnDate ? new Date(returnDate) : dayjs().add(1, "day").toDate(),
      key: "selection",
    },
  ]);

  const handleDateChange = (item) => {
    setDateRange([item.selection]);

    const { startDate, endDate } = item.selection;

    if (tripType === "oneway") {
      dispatch(setDepartureDate(dayjs(startDate).format("YYYY-MM-DD")));
      setShowCalendar(false);
    } else {
      dispatch(setDepartureDate(dayjs(startDate).format("YYYY-MM-DD")));
      dispatch(setReturnDate(dayjs(endDate).format("YYYY-MM-DD")));
      if (endDate && endDate > startDate) setShowCalendar(false);
    }
  };

  return (
    <Box
      className={`${styles.formGroup} ${isHomeForm && styles.isHomeForm} ${
        isDrawer
          ? `${styles.DOBField} fromAndtoField `
          : ""
      }`}
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
        onClick={() => setShowCalendar(!showCalendar)}
        className={`${styles.formControl} ${styles.dates} formControl`}
        size="small"
        sx={{ width: "180px", cursor: "pointer" }}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <img
              src="/images/calendar-icon-light.svg"
              alt="Calendar"
              onClick={() => setShowCalendar(!showCalendar)}
              style={{ cursor: "pointer" }}
            />
          ),
        }}
        error={!!errors?.date}
        helperText={errors?.date}
      />

      {showCalendar && (
        <Box
          ref={calendarRef}
          position="absolute"
          zIndex={10}
          top="40px"
          left={0}
          boxShadow="0 0 10px rgba(0,0,0,0.1)"
        >
          <DateRange
            editableDateInputs
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={["#1539CF"]}
            minDate={dayjs().add(1, "day").toDate()}
          />
          
        </Box>
      )}
    </Box>
  );
};

export default DOBField;
