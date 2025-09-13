"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  createFilterOptions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { fetchAirports } from "@/src/store/slices/TravelSlice";

const FromAndTooFields = ({
  origin,
  setOrigin,
  destination,
  setDestination,
  originOption,
  setOriginOption,
  destinationOption,
  setDestinationOption,
  errors = {},
}) => {
  const dispatch = useDispatch();

  const [getOriginCookie, setGetOriginCookie] = useState();
  const [getDestinationCookie, setGetDestinationCookie] = useState();

  const filterOptions = createFilterOptions({
    stringify: (option) =>
      `${option.city_name} ${option.name} ${option.iata_code}`,
  });

  const {
    originOptions,
    destinationOptions,
    loadingOrigin,
    loadingDestination,
  } = useSelector((state) => state.travel);

  // Save selected airports in cookies
  useEffect(() => {
    if (originOption || destinationOption) {
      Cookies.set("origin", originOption?.iata_code || "");
      Cookies.set("destination", destinationOption?.iata_code || "");
    }
  }, [originOption, destinationOption]);

  // Load airports from cookies on first render
  useEffect(() => {
    const getOrigin = Cookies.get("origin");
    const getDestination = Cookies.get("destination");

    if (getOrigin) {
      setGetOriginCookie(getOrigin);
      setOrigin(getOrigin); // input text
      setOriginOption({
        iata_code: getOrigin,
        name: getOrigin, // fallback until API fetch replaces
      });
    }

    if (getDestination) {
      setGetDestinationCookie(getDestination);
      setDestination(getDestination); // input text
      setDestinationOption({
        iata_code: getDestination,
        name: getDestination, // fallback until API fetch replaces
      });
    }
  }, [dispatch]);

  const handleAirportSearch = (value, field) => {
    if (value && value.length > 2) {
      dispatch(fetchAirports(value, field));
    }
  };

  return (
    <>
      {/* Origin Field */}
      <Box className={styles.formGroup}>
        <Autocomplete
          freeSolo
          options={originOptions}
          loading={loadingOrigin}
          filterOptions={filterOptions}
          getOptionLabel={(option) =>
            typeof option === "string"
              ? option
              : option?.name
              ? `${option.name} - ${option.iata_code}`
              : ""
          }
          value={originOption} // selected object
          inputValue={origin} // input shows only IATA code
          onInputChange={(e, value, reason) => {
            if (reason === "input") {
              setOrigin(value); // input shows IATA code typed
              handleAirportSearch(value, "origin");
            }
          }}
          onChange={(e, value) => {
            setOriginOption(value); // store selected option object
            setOrigin(value?.iata_code || ""); // display only IATA code in input
          }}
          renderInput={(params) => (
            <TextField
              {...params}
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

      {/* Destination Field */}
      <Box className={styles.formGroup}>
        <Autocomplete
          freeSolo
          options={originOptions}
          loading={loadingDestination}
          filterOptions={filterOptions}
          getOptionLabel={(option) =>
            typeof option === "string"
              ? option
              : option?.name
              ? `${option.name} - ${option.iata_code}`
              : ""
          }
          value={destinationOption}
          inputValue={destination}
          onInputChange={(e, value, reason) => {
            if (reason === "input") {
              setDestination(value);
              handleAirportSearch(value, "destination");
            }
          }}
          onChange={(e, value) => {
            setDestinationOption(value);
            setDestination(value?.iata_code || "");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
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
    </>
  );
};

export default FromAndTooFields;
