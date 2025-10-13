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
  setDestination,
  setDestinationOptions,
  setDestinationList,
} from "@/src/store/slices/TravelSlice";

const DestinationField = ({ errors = {} }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const {origin,
      originOptions,
      loadingOrigin,
      originList} = useSelector((state) => state?.travel); // ✅ track origin
      
  const {
    destination,
    destinationOptions,
    destinationList,
    loadingDestination,
  } = useSelector((state) => state.travel);

  const filterOptions = createFilterOptions({
    stringify: (option) =>
      `${option.city_name} ${option.name} ${option.iata_code}`,
  });

  // Save selected airport in cookie
  useEffect(() => {
    if (destinationOptions) {
      // Cookies.set("destination", destinationOptions?.iata_code || "");
    }
  }, [destinationOptions]);

  // Load from cookie on mount
  useEffect(() => {
    const saved = Cookies.get("destination");
    if (saved) {
      dispatch(setDestination(saved));
      dispatch(
        setDestinationOptions({
          iata_code: saved,
          name: saved,
        })
      );
    }
  }, [dispatch]);

  const handleAirportSearch = (value) => {
    if (value && value.length > 2) {
      dispatch(fetchAirports(value, "destination"));
    }
  };

  const handleSelect = (value) => {
    dispatch(setDestinationOptions(value));
    dispatch(setDestination(value?.iata_code || ""));
  };

  useEffect(()=> {
    if (originOptions) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 300);
    }
  }, [])

  return (
    <Box className={`${styles.formGroup} ${styles.countryDropdown}`}>
      <Autocomplete
        freeSolo
        options={destinationList}
        loading={loadingDestination}
        filterOptions={filterOptions}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : option?.name
            ? `${option.name} - ${option.iata_code}`
            : ""
        }
        value={destinationOptions}
        inputValue={destination}
        onInputChange={(e, value, reason) => {
          if (reason === "input") {
            dispatch(setDestination(value));
            handleAirportSearch(value);
          }
        }}
        onChange={(e, value) => handleSelect(value)}
        ListboxProps={{
          className: styles.countryDropdown + " countryDropdown",
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
            variant="outlined"
            placeholder="Arriving at"
            size="small"
            className={`${styles.formControl} ${styles.from} formControl`}
            error={!!errors.destination}
            helperText={errors.destination}
          />
        )}
      />
    </Box>
  );
};

export default DestinationField;
