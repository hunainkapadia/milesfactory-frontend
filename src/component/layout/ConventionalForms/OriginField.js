"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  createFilterOptions,
  Typography,
  Fade,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { fetchAirports, setDestination, setDestinationList, setDestinationOptions, setOrigin, setOriginList, setOriginOptions, setTravelFormDrawer } from "@/src/store/slices/TravelSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faPlane } from "@fortawesome/free-solid-svg-icons";
import { capitalizeFirstWord } from "@/src/utils/utils";

const OriginField = ({
  errors = {},
}) => {
   const dispatch = useDispatch();
   const [getOriginCookie, setGetOriginCookie] = useState();
   
   const inputRef = React.useRef(null);

  const filterOptions = createFilterOptions({
    stringify: (option) =>
      `${option.city_name} ${option.name} ${option.iata_code}`,
  });

  
  const {
   origin,
    originOptions,
    loadingOrigin,
    originList
  } = useSelector((state) => state.travel);
  console.log("originOptions", originOptions);
  

  // Save selected airports in cookies
  useEffect(() => {
    if (originList) {
      Cookies.set("origin", originOptions?.iata_code || "");
    }
  }, [originList]);

  // Load airports from cookies on first render
  useEffect(() => {
    const getOrigin = Cookies.get("origin");
    
    if (getOrigin) {
      setGetOriginCookie(getOrigin);
      dispatch(setOrigin(getOrigin)); // input text
      dispatch(
        setOriginOptions({
          iata_code: getOrigin,
          name: getOrigin, // fallback until API fetch replaces
        })
      );
    }
  }, [dispatch]);

  const handleAirportSearch = (value, field) => {
    if (value && value.length > 2) {
      dispatch(fetchAirports(value, field));
    }
  };

  const [alwaysOpen, setAlwaysOpen] = useState(true);

  const handleOrigin =(value)=> {
     dispatch(setOriginOptions(value)); // store selected option object
    dispatch(setOrigin(value?.iata_code || "")); // display only IATA code in input
    
  }
  const IsDrawerOpen = useSelector((state) => state?.travel?.travelFormDrawer);
  const handleOriginCLick = (e) => {
  e.stopPropagation(); // stop bubbling to prevent closing
  if (!IsDrawerOpen) {
    dispatch(setTravelFormDrawer(true));
  }
};
useEffect(() => {
  if (IsDrawerOpen && inputRef.current) {
    setTimeout(() => {
      dispatch(setOrigin(""));              // clear input
      dispatch(setOriginOptions(null));     // clear selection
      dispatch(setOriginList([]));          // clear old dropdown list too
      // destination reset
      dispatch(setDestination(""));              // clear input
      dispatch(setDestinationOptions(null));     // clear selection
      dispatch(setDestinationList([]));          // clear old dropdown list too
      inputRef.current.focus();             // focus input
    }, 300);
  }
}, [IsDrawerOpen]);


  return (
    <>
      {/* Origin Field */}
      <Box className={`${styles.formGroup} ${styles.countryDropdown}`}>
        <Autocomplete
          freeSolo
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
          value={originOptions} // selected object
          inputValue={origin} // input shows only IATA code
          onInputChange={(e, value, reason) => {
            if (reason === "input") {
              dispatch(setOrigin(value));
              handleAirportSearch(value, "origin");
            }
          }}
          onChange={(e, value) => {
            handleOrigin(value)
            
            
          }}
          ListboxProps={{
            className: styles.countryDropdown + " countryDropdown",
          }}
          renderOption={(props, option) => (
            //   console.log("props_000", option)
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
              inputRef={inputRef} // ✅ add this line

               onClick={handleOriginCLick} // ✅ Correct place for click

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
      
    </>
  );
};

export default OriginField;
