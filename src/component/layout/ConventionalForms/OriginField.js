"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  createFilterOptions,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faPlane } from "@fortawesome/free-solid-svg-icons";

import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import {
  fetchAirports,
  setOrigin,
  setOriginOptions,
  setOriginList,
  setDestination,
  setDestinationOptions,
  setDestinationList,
  setTravelFormDrawer,
} from "@/src/store/slices/TravelSlice";

const OriginField = ({ errors = {}, isDrawer }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { origin, originOptions, originList, loadingOrigin } = useSelector(
    (state) => state.travel
  );

  const IsDrawerOpen = useSelector(
    (state) => state.travel?.travelFormDrawer
  );

  const filterOptions = createFilterOptions({
    stringify: (option) =>
      `${option.city_name} ${option.name} ${option.iata_code}`,
  });

  // 🔹 Load saved origin from cookies
  useEffect(() => {
    const saved = Cookies.get("origin");
    if (saved) {
      dispatch(setOrigin(saved));
      dispatch(
        setOriginOptions({
          iata_code: saved,
          name: saved,
        })
      );
    }
  }, [dispatch]);

  // 🔹 Save selected origin to cookies
  // useEffect(() => {
  //   if (originOptions?.iata_code) {
  //     Cookies.set("origin", originOptions.iata_code);
  //   }
  // }, [originOptions]);

  // 🔹 Search when typing 3+ characters
  const handleAirportSearch = (value) => {
    if (value && value.length > 2) {
      dispatch(fetchAirports(value, "origin"));
    }
  };

  // 🔹 Select airport
  const handleSelect = (value) => {
    dispatch(setOriginOptions(value));
    dispatch(setOrigin(value?.iata_code || ""));
  };

  // 🔹 Open drawer & reset on open
  const handleOriginClick = (e) => {
    e.stopPropagation();
    if (!IsDrawerOpen) {
      dispatch(setTravelFormDrawer(true));
    }
  };

  // useEffect(() => {
  //   if (IsDrawerOpen && inputRef.current) {
  //     setTimeout(() => {
  //       // Reset both origin and destination
  //       dispatch(setOrigin(""));
  //       dispatch(setOriginOptions(null));
  //       dispatch(setOriginList([]));

  //       dispatch(setDestination(""));
  //       dispatch(setDestinationOptions(null));
  //       dispatch(setDestinationList([]));
  //     }, 300);
  //   }
  // }, [IsDrawerOpen]);

  return (
    <Box
      className={`${styles.formGroup} ${
        isDrawer ? `${styles.fromAndtoField} fromAndtoField` : ""
      }`}
    >
      <Autocomplete
        className={styles.formGroupIn}
        freeSolo
        disablePortal
        options={originList}
        loading={loadingOrigin}
        filterOptions={filterOptions}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : option?.name
            ? `${option.name} - ${option.iata_code}`
            : ""
        }
        value={originOptions}
        inputValue={origin}
        onInputChange={(e, value, reason) => {
          if (reason === "input") {
            dispatch(setOrigin(value));
            handleAirportSearch(value);
          }
        }}
        onChange={(e, value) => handleSelect(value)}
        ListboxProps={{
          className: `${styles.countryDropdown} countryDropdown`,
        }}
        renderOption={(props, option) => (
          <li
            {...props}
            className={`${option?.is_city ? styles.parent : styles.child}`}
          >
            <FontAwesomeIcon icon={option?.is_city ? faBuilding : faPlane} />
            <Typography>
              {option.name} - {option.iata_code}
            </Typography>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={inputRef}
            onClick={handleOriginClick}
            variant="outlined"
            placeholder="Departing from"
            size="small"
            className={`${styles.formControl} ${styles.from} formControl`}
            error={!!errors.origin}
            helperText={errors.origin}
          />
        )}
      />
    </Box>
  );
};

export default OriginField;
