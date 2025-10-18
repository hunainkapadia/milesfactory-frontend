"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  setDepartureDate,
  setReturnDate,
} from "@/src/store/slices/TravelSlice";

const TravelDateRange = ({ onClose, isDrawer }) => {
  const dispatch = useDispatch();
  const { tripType, departureDate, returnDate } = useSelector(
    (state) => state.travel
  );

  const isMobile = useMediaQuery("(max-width:768px)");

  const [tempRange, setTempRange] = useState({
    startDate: departureDate
      ? new Date(departureDate)
      : dayjs().add(1, "day").toDate(),
    endDate: returnDate ? new Date(returnDate) : dayjs().add(2, "day").toDate(),
    key: "selection",
  });

  useEffect(() => {
    setTempRange({
      startDate: departureDate
        ? new Date(departureDate)
        : dayjs().add(1, "day").toDate(),
      endDate: returnDate
        ? new Date(returnDate)
        : dayjs().add(2, "day").toDate(),
      key: "selection",
    });
  }, [departureDate, returnDate]);

  // ✅ Reusable date selection logic
  const handleDateChange = (item) => {
    let { startDate, endDate } = item.selection;

    // 👇 For oneway on mobile — force endDate = startDate
    if (tripType === "oneway") {
      endDate = startDate;
    }

    setTempRange({ ...item.selection, endDate });

    if (!isMobile) {
      dispatch(setDepartureDate(dayjs(startDate).format("YYYY-MM-DD")));

      if (tripType === "oneway") {
        // no return date
        dispatch(setReturnDate(null));
        if (onClose) onClose();
      } else {
        if (endDate && dayjs(endDate).isAfter(startDate)) {
          dispatch(setReturnDate(dayjs(endDate).format("YYYY-MM-DD")));
          if (onClose) onClose();
        }
      }
    }
  };

  // ✅ Auto sync for mobile
  useEffect(() => {
    if (isMobile) {
      handleDateChange({ selection: tempRange });
    }
  }, [isMobile]);

  // ✅ NEW: Auto adjust when tripType changes
  useEffect(() => {
    if (tripType === "oneway") {
      // when switching to oneway, collapse range to single date
      setTempRange((prev) => ({
        ...prev,
        endDate: prev.startDate,
      }));
      // also update redux so UI and data stay in sync
      dispatch(setReturnDate(null));
    }
  }, [tripType, dispatch]);

  const handleApply = () => {
    const { startDate, endDate } = tempRange;
    dispatch(setDepartureDate(dayjs(startDate).format("YYYY-MM-DD")));

    if (tripType !== "oneway") {
      dispatch(setReturnDate(dayjs(endDate).format("YYYY-MM-DD")));
    } else {
      dispatch(setReturnDate(null));
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
        months={1}
        direction="vertical"
        showDateDisplay={false}
      />

      {isMobile && (
        <Box display="flex" justifyContent="center" mt={2}>
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
