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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faPlane } from "@fortawesome/free-solid-svg-icons";

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

  // ✅ Convert airports → [city option + airport options]
  const prepareOptions = (airports) => {
    const grouped = {};
    airports.forEach((a) => {
      if (!grouped[a.city_name]) grouped[a.city_name] = [];
      grouped[a.city_name].push(a);
    });

    const finalOptions = [];
    Object.entries(grouped).forEach(([city, airports]) => {
      finalOptions.push({
        type: "city",
        city_name: city,
        iata_code: null,
        name: city,
      });
      airports.forEach((a) => {
        finalOptions.push({ ...a, type: "airport" });
      });
    });

    return finalOptions;
  };

  // Save selected airports in cookies
  useEffect(() => {
    if (originOption || destinationOption) {
      Cookies.set("origin", originOption?.iata_code || originOption?.city_name || "");
      Cookies.set("destination", destinationOption?.iata_code || destinationOption?.city_name || "");
    }
  }, [originOption, destinationOption]);

  // Load airports from cookies on first render
  useEffect(() => {
    const getOrigin = Cookies.get("origin");
    const getDestination = Cookies.get("destination");

    if (getOrigin) {
      setGetOriginCookie(getOrigin);
      setOrigin(getOrigin);
      setOriginOption({
        iata_code: getOrigin,
        name: getOrigin,
        city_name: getOrigin,
        type: "city",
      });
    }

    if (getDestination) {
      setGetDestinationCookie(getDestination);
      setDestination(getDestination);
      setDestinationOption({
        iata_code: getDestination,
        name: getDestination,
        city_name: getDestination,
        type: "city",
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
          options={prepareOptions(originOptions)}
          loading={loadingOrigin}
          filterOptions={filterOptions}
          getOptionLabel={(option) =>
            option.type === "city"
              ? option.city_name
              : `${option.name} - ${option.iata_code}`
          }
          value={originOption}
          inputValue={origin}
          onInputChange={(e, value, reason) => {
            if (reason === "input") {
              setOrigin(value);
              handleAirportSearch(value, "origin");
            }
          }}
          onChange={(e, value) => {
            setOriginOption(value);
            setOrigin(value?.iata_code || value?.city_name || "");
          }}
          renderOption={(props, option) => (
            <li {...props} style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon
                icon={option.type === "city" ? faBuilding : faPlane}
                style={{
                  marginRight: 8,
                  color: option.type === "city" ? "#0B1729" : "#69707B",
                }}
              />
              <span>
                {option.type === "city"
                  ? option.city_name
                  : `${option.name} - ${option.iata_code}`}
              </span>
            </li>
          )}
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
          options={prepareOptions(originOptions)}
          loading={loadingDestination}
          filterOptions={filterOptions}
          getOptionLabel={(option) =>
            option.type === "city"
              ? option.city_name
              : `${option.name} - ${option.iata_code}`
          }
          value={originOption}
          inputValue={destination}
          onInputChange={(e, value, reason) => {
            if (reason === "input") {
              setDestination(value);
              handleAirportSearch(value, "destination");
            }
          }}
          onChange={(e, value) => {
            setDestinationOption(value);
            setDestination(value?.iata_code || value?.city_name || "");
          }}
          renderOption={(props, option) => (
            <li {...props} style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon
                icon={option.type === "city" ? faBuilding : faPlane}
                style={{
                  marginRight: 8,
                  color: option.type === "city" ? "#0B1729" : "#69707B",
                }}
              />
              <span>
                {option.type === "city"
                  ? option.city_name
                  : `${option.name} - ${option.iata_code}`}
              </span>
            </li>
          )}
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
