"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  createFilterOptions,
  Typography,
  Popper,
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
  setDepartureDate,
  setReturnDate,
} from "@/src/store/slices/TravelSlice";

//  Custom Popper with higher z-index
const CustomPopper = (props) => (
  <Popper
    {...props}
    modifiers={[
      {
        name: "offset",
        options: { offset: [0, 6] },
      },
    ]}
    style={{
      zIndex: 1302,
      marginTop: "6px",
    }}
  />
);

const DestinationField = ({ errors = {}, isDrawer, isHomeForm }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [alwaysOpen, setAlwaysOpen] = useState(true); // keep open

  const { originOptions } = useSelector((state) => state.travel);
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

  // 🔹 Load from cookies
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

  // 🔹 Search airports
  const handleAirportSearch = (value) => {
    if (value && value.length > 2) {
      dispatch(fetchAirports(value, "destination"));
    }
  };

  // 🔹 Handle select
  const handleSelect = (value) => {
    dispatch(setDestinationOptions(value));
    dispatch(setDestination(value?.iata_code || ""));
    dispatch(setDepartureDate(null));
    dispatch(setReturnDate(null));  
    Cookies.set("destination", value?.iata_code || "");
  
  };

  // 🔹 Auto-focus when origin selected
  useEffect(() => {
    if (originOptions) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [originOptions]);
  // cookie save
  

  return (
    <Box
      className={`${styles.formGroup} ${isHomeForm && styles.isHomeForm} ${
        isDrawer ? `${styles.fromAndtoField} fromAndtoField` : ""
      }`}
    >
      <Autocomplete
        className={styles.formGroupIn}
        disableClearable
        // open={alwaysOpen} //  always open dropdown
        freeSolo
        disablePortal
        PopperComponent={CustomPopper}
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
          className: `${styles.countryDropdown} destinationDropdown`,
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
            className={`${styles.formControl} ${styles.to} formControl`}
            error={!!errors.destination}
            helperText={errors.destination}
          />
        )}
      />
    </Box>
  );
};

export default DestinationField;
