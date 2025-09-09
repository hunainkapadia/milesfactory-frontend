import {
  Box,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  Typography,
  Autocomplete,
} from "@mui/material";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import HotelTravellers from "./HotelTravellers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { submitHotelForm } from "@/src/store/slices/HotelSlice";
import { fetchAirports } from "@/src/store/slices/TravelSlice";

const HotelForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.hotel);

  // ===== Redux Travel Slice States =====
  const { originOptions, loadingOrigin } = useSelector((state) => state.travel);

  // ===== Local States =====
  const [location, setLocation] = useState(null); // store full option object
  const [checkIn, setCheckIn] = useState(dayjs().format("YYYY-MM-DD"));
  const [checkOut, setCheckOut] = useState(dayjs().add(1, "day").format("YYYY-MM-DD"));
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [roomType, setRoomType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [errors, setErrors] = useState({});

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
      location: location?.city_name || "", // ✅ only send city name
      checkIn,
      checkOut,
      travellers,
      roomType,
      priceRange,
    };

    console.log("hotel searchData:", searchData);
    dispatch(submitHotelForm(searchData));
  };

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
              options={
                originOptions
                  ? Array.from(
                      new Map(originOptions.map((o) => [o.city_name, o])).values()
                    ) // ✅ deduplicate by city
                  : []
              }
              loading={loadingOrigin}
              value={location}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option?.city_name || ""
              }
              onInputChange={(e, value) => handleAirportSearch(value)}
              onChange={(e, value) => setLocation(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Where"
                  size="small"
                  className={`${styles.formControl} ${styles.where} formControl`}
                  error={!!errors.location}
                  helperText={errors.location}
                />
              )}
            />
          </Box>

          {/* Check-in */}
          <Box className={styles.formGroup}>
            <TextField
              variant="outlined"
              type="date"
              label="Check-in"
              size="small"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className={`${styles.formControl} formControl`}
              InputLabelProps={{ shrink: true }}
              error={!!errors.checkIn}
              helperText={errors.checkIn}
            />
          </Box>

          {/* Check-out */}
          <Box className={styles.formGroup}>
            <TextField
              variant="outlined"
              type="date"
              label="Check-out"
              size="small"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className={`${styles.formControl} formControl`}
              InputLabelProps={{ shrink: true }}
              error={!!errors.checkOut}
              helperText={errors.checkOut}
            />
          </Box>

          {/* Travellers */}
          <HotelTravellers travellers={travellers} setTravellers={setTravellers} />
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
                  <FontAwesomeIcon icon={faAngleDown} style={{ color: "#6C6F76" }} {...props} />
                ),
              }}
            >
              <MenuItem value="" disabled>Room type</MenuItem>
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="Deluxe">Deluxe</MenuItem>
              <MenuItem value="Suite">Suite</MenuItem>
            </TextField>
          </Box>

          {/* Price range */}
          <Box className={styles.formGroup}>
            <TextField
              select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className={`${styles.formControl} ${styles.priceRange} formControl`}
              size="small"
              sx={{ width: "160px" }}
              error={!!errors.priceRange}
              helperText={errors.priceRange}
              SelectProps={{
                displayEmpty: true,
                IconComponent: (props) => (
                  <FontAwesomeIcon icon={faAngleDown} style={{ color: "#6C6F76" }} {...props} />
                ),
              }}
            >
              <MenuItem value="" disabled>Price range</MenuItem>
              <MenuItem value="Budget">$50 - $100</MenuItem>
              <MenuItem value="Mid">$100 - $200</MenuItem>
              <MenuItem value="Luxury">$200+</MenuItem>
            </TextField>
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
