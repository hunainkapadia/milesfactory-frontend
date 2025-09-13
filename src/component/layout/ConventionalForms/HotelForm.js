import {
  Box,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  Typography,
  Autocomplete,
  createFilterOptions,
} from "@mui/material";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faDollar } from "@fortawesome/free-solid-svg-icons";
import HotelTravellers from "./HotelTravellers";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { fetchAirports, submitHotelForm } from "@/src/store/slices/TravelSlice";

//  calendar imports
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const HotelForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.hotel);

  // ===== Redux Travel Slice States =====
  const { originOptions, loadingOrigin } = useSelector((state) => state.travel);

  // ===== Local States =====
  const [location, setLocation] = useState(null);

  const [checkIn, setCheckIn] = useState(dayjs().add(1, "day").toDate()); // default tomorrow
  const [checkOut, setCheckOut] = useState(dayjs().add(1, "day").toDate());

  const [showCalendar, setShowCalendar] = useState(null); // "checkIn" | "checkOut" | null
  const calendarRef = useRef(null);

  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
  });
  const [roomType, setRoomType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [errors, setErrors] = useState({});

  // ===== Close calendar when clicking outside =====
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !(event.target.closest(".checkIn") || event.target.closest(".checkOut"))
      ) {
        setShowCalendar(null);
      }
    }

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  // ===== Handle City Search (reuse airports API) =====
  const handleAirportSearch = (value) => {
    if (value && value.length > 2) {
      dispatch(fetchAirports(value, "origin"));
    }
  };

  // ===== Handle Submit =====
  const handleHotelSearch = () => {
    let newErrors = {};

    if (!location) newErrors.location = "This field is required.";
    if (!checkIn) newErrors.checkIn = "Check-in date is required.";
    if (!checkOut) newErrors.checkOut = "Check-out date is required.";
    if (dayjs(checkOut).isBefore(dayjs(checkIn))) {
      newErrors.checkOut = "Check-out must be after check-in.";
    }
    if (!travellers.adults || travellers.adults < 1) {
      newErrors.travellers = "At least 1 adult required.";
    }
    if (!roomType) newErrors.roomType = "Please select a room type.";
    if (!priceRange) newErrors.priceRange = "Please select a price range.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const searchData = {
      location: location || "",
      checkIn: dayjs(checkIn).format("YYYY-MM-DD"),
      checkOut: dayjs(checkOut).format("YYYY-MM-DD"),
      travellers,
      roomType,
      priceRange,
    };

    console.log("hotel_searchData:", searchData);
    dispatch(submitHotelForm(searchData));
  };

  const handlePrice = (e) => {
    let value = e.target.value.replace(/,/g, ""); // remove commas
    if (!isNaN(value) && value !== "") {
      setPriceRange(Number(value).toLocaleString()); // add commas
    } else {
      setPriceRange("");
    }
  };
  const filterOptions = createFilterOptions({
      stringify: (option) =>
        `${option.city_name} ${option.name} ${option.iata_code}`,
    });

  return (
    <Stack className={styles.travelForm} component="section">
      <Box>
        <Stack
          className={styles.SearchBoxContainerLeft}
          display="flex"
          justifyContent="flex-start"
          flexDirection="row"
          columnGap="12px"
          rowGap="16px"
          flexWrap="wrap"
        >
          {/* Where (City Dropdown) */}
          <Box className={styles.formGroup}>
            <Autocomplete
              freeSolo
              options={originOptions}
              filterOptions={filterOptions}
              loading={loadingOrigin}
              getOptionLabel={(option) =>
                option?.name
                  ? `${option.city_name}`
                  : ""
              }
              onInputChange={(e, value) =>
                handleAirportSearch(value, "location")
              }
              onChange={(e, value) => setLocation(value?.city_name || "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Where"
                  size="small"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`${styles.formControl} ${styles.where} formControl`}
                  error={!!errors.location}
                  helperText={errors.location}
                />
              )}
            />
          </Box>

          {/* Check-in */}
          <Box className={styles.formGroup} position="relative">
            <TextField
              variant="outlined"
              placeholder="Check-in"
              value={dayjs(checkIn).format("DD MMM YYYY")}
              onClick={() => setShowCalendar("checkIn")}
              className={`${styles.formControl} ${styles.checkIn} formControl`}
              size="small"
              sx={{ width: "160px", cursor: "pointer" }}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <img
                    src="/images/calendar-icon-light.svg"
                    alt="Calendar"
                    onClick={() => setShowCalendar("checkIn")}
                  />
                ),
              }}
              error={!!errors.checkIn}
              helperText={errors.checkIn}
            />

            {showCalendar === "checkIn" && (
              <Box
                ref={calendarRef}
                position="absolute"
                zIndex={10}
                top="40px"
                boxShadow="0 0 10px rgba(0,0,0,0.1)"
                sx={{
                  left: { xs: "-180px", md: 0 }, //responsive syntax
                }}
              >
                <DateRange
                  editableDateInputs
                  onChange={(item) => {
                    setCheckIn(item.selection.startDate);
                    if (item.selection.startDate) setShowCalendar(null);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={[
                    {
                      startDate: checkIn,
                      endDate: checkIn,
                      key: "selection",
                    },
                  ]}
                  rangeColors={["#1539CF"]}
                  minDate={dayjs().add(1, "day").toDate()} // today disabled, earliest = tomorrow
                />
              </Box>
            )}
          </Box>

          {/* Check-out */}
          <Box className={styles.formGroup} position="relative">
            <TextField
              variant="outlined"
              placeholder="Check-out"
              value={dayjs(checkOut).format("DD MMM YYYY")}
              onClick={() => setShowCalendar("checkOut")}
              className={`${styles.formControl} ${styles.checkOut} formControl`}
              size="small"
              sx={{ width: "160px", cursor: "pointer" }}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <img
                    src="/images/calendar-icon-light.svg"
                    alt="Calendar"
                    onClick={() => setShowCalendar("checkOut")}
                  />
                ),
              }}
              error={!!errors.checkOut}
              helperText={errors.checkOut}
            />

            {showCalendar === "checkOut" && (
              <Box
                ref={calendarRef}
                position="absolute"
                zIndex={10}
                top="40px"
                boxShadow="0 0 10px rgba(0,0,0,0.1)"
                sx={{
                  left: { xs: "-10px", md: 0 }, //responsive syntax
                }}
              >
                <DateRange
                  editableDateInputs
                  onChange={(item) => {
                    setCheckOut(item.selection.startDate);
                    if (item.selection.startDate) setShowCalendar(null);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={[
                    {
                      startDate: checkOut,
                      endDate: checkOut,
                      key: "selection",
                    },
                  ]}
                  rangeColors={["#1539CF"]}
                  minDate={dayjs(checkIn).add(1, "day").toDate()}
                />
              </Box>
            )}
          </Box>

          {/* Travellers */}
          <HotelTravellers
            travellers={travellers}
            setTravellers={setTravellers}
          />
          {errors.travellers && (
            <Typography color="error" variant="caption">
              {errors.travellers}
            </Typography>
          )}

          {/* Room type */}
          <Box className={styles.formGroup}>
            <TextField
              select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className={`${styles.formControl} ${styles.roomType} formControl`}
              size="small"
              sx={{ width: "160px" }}
              error={!!errors.roomType}
              helperText={errors.roomType}
              SelectProps={{
                displayEmpty: true,
                IconComponent: (props) => (
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{ color: "#6C6F76" }}
                    {...props}
                  />
                ),
              }}
            >
              <MenuItem value="" disabled>
                Room type
              </MenuItem>
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="Deluxe">Deluxe</MenuItem>
              <MenuItem value="Suite">Suite</MenuItem>
            </TextField>
          </Box>

          {/* Price range */}
          <Box>
            <TextField
              value={priceRange}
              className={`${styles.formControl} ${styles.priceRange} formControl`}
              placeholder="Price range"
              onChange={handlePrice}
              size="small"
              sx={{ width: "160px" }}
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <FontAwesomeIcon
                    icon={faDollar}
                    style={{ color: "#6C6F76", marginRight: "5px" }}
                  />
                ),
              }}
            />
          </Box>
        </Stack>
      </Box>

      <Box display="flex" alignItems="flex-end">
        <IconButton
          className={styles.SearchButton}
          onClick={handleHotelSearch}
          disabled={loading}
        >
          <i className="fa fa-arrow-right"></i>
        </IconButton>
      </Box>
    </Stack>
  );
};

export default HotelForm;
