"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
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

  const isMobile = useMediaQuery("(max-width:768px)");

  // temporary local state (so we don’t dispatch on every click)
  const [tempRange, setTempRange] = useState({
    startDate: departureDate ? new Date(departureDate) : dayjs().add(1, "day").toDate(),
    endDate: returnDate ? new Date(returnDate) : dayjs().add(2, "day").toDate(),
    key: "selection",
  });

  useEffect(() => {
    // sync local state when redux updates externally
    setTempRange({
      startDate: departureDate ? new Date(departureDate) : dayjs().add(1, "day").toDate(),
      endDate: returnDate ? new Date(returnDate) : dayjs().add(2, "day").toDate(),
      key: "selection",
    });
  }, [departureDate, returnDate]);

  const handleDateChange = (item) => {
  const { startDate, endDate } = item.selection;
  setTempRange(item.selection);

  // Auto-close logic (desktop only)
  if (!isMobile) {
    // Always set departure date on selection
    dispatch(setDepartureDate(dayjs(startDate).format("YYYY-MM-DD")));

    if (tripType === "oneway") {
      // Oneway — close immediately after first click
      if (onClose) onClose();
    } else {
      // Roundtrip — wait until both dates are different
      if (endDate && dayjs(endDate).isAfter(startDate)) {
        dispatch(setReturnDate(dayjs(endDate).format("YYYY-MM-DD")));
        if (onClose) onClose();
      }
    }
  }
};


  const handleApply = () => {
    const { startDate, endDate } = tempRange;
    dispatch(setDepartureDate(dayjs(startDate).format("YYYY-MM-DD")));

    if (tripType !== "oneway") {
      dispatch(setReturnDate(dayjs(endDate).format("YYYY-MM-DD")));
    }

    if (onClose) onClose();
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
        ranges={[tempRange]}
        onChange={handleDateChange}
        rangeColors={["#1539CF"]}
        minDate={dayjs().add(1, "day").toDate()}
      />

      {/* Show Apply button only for mobile */}
      {isMobile && (
         
        <Box display={"flex"} justifyContent={"center"}  mt={2}>
          <Button
            variant="contained"
            onClick={handleApply}
            className="btn btn-primary btn-round btn-md-x"
          >
            Apply
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TravelDateRange;
