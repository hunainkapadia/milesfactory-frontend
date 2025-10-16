"use client";

import React from "react";
import { Box } from "@mui/material";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { setDepartureDate, setReturnDate } from "@/src/store/slices/TravelSlice";

const TravelDateRange = ({ onClose }) => {
  const dispatch = useDispatch();
  const { tripType, departureDate, returnDate } = useSelector(
    (state) => state.travel
  );

  const handleDateChange = (item) => {
    const { startDate, endDate } = item.selection;

    dispatch(setDepartureDate(dayjs(startDate).format("YYYY-MM-DD")));

    if (tripType !== "oneway") {
      dispatch(setReturnDate(dayjs(endDate).format("YYYY-MM-DD")));
    }

    if (onClose && (tripType === "oneway" || (endDate && endDate > startDate))) {
      onClose();
    }
  };

  return (
    <Box
      boxShadow="0 0 10px rgba(0,0,0,0.1)"
      borderRadius="12px"
      bgcolor="white"
      p={1}
    >
      <DateRange
        editableDateInputs
        moveRangeOnFirstSelection={false}
        ranges={[
          {
            startDate: departureDate
              ? new Date(departureDate)
              : dayjs().add(1, "day").toDate(),
            endDate: returnDate
              ? new Date(returnDate)
              : dayjs().add(1, "day").toDate(),
            key: "selection",
          },
        ]}
        onChange={handleDateChange}
        rangeColors={["#1539CF"]}
        minDate={dayjs().add(1, "day").toDate()}
      />
    </Box>
  );
};

export default TravelDateRange;
