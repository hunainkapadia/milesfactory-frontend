import {
  Box,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import dayjs from "dayjs";
import Travellers from "./Travellers";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  fetchAirports,
  submitTravelForm,
} from "@/src/store/slices/TravelSlice";

const TravelForm = () => {
  const dispatch = useDispatch();

  // ===== Local States =====
  const [tripType, setTripType] = useState("oneway"); // oneway | roundtrip
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [singleDate, setSingleDate] = useState(new Date()); // for oneway
  const [showCalendar, setShowCalendar] = useState(false);
  const [tripClass, setTripClass] = useState("");
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // ===== Redux States =====
  const {
    originOptions,
    destinationOptions,
    loadingOrigin,
    loadingDestination,
  } = useSelector((state) => state.travel);

  // ===== Handle Search =====
  const handleSearch = () => {
    if (!origin || !destination) {
      alert("Please select both origin and destination airports.");
      return;
    }

    setIsLoading(true);

    const searchData = {
      tripType,
      origin,
      destination,
      departureDate: dayjs(
        tripType === "oneway" ? singleDate : dateRange?.[0]?.startDate
      ).format("YYYY-MM-DD"),
      returnDate:
        tripType === "roundtrip" && dateRange?.[0]?.endDate
          ? dayjs(dateRange[0].endDate).format("YYYY-MM-DD")
          : null,
      travellers,
      tripClass,
    };

    console.log("searchData:", searchData);

    // ✅ Pass data to Redux thunk
    dispatch(submitTravelForm(searchData));

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // ===== Handle Airport Search =====
  const handleAirportSearch = (value, field) => {
    if (value && value.length > 2) {
      dispatch(fetchAirports(value, field));
    }
  };

  return (
    <Stack
      className={styles.travelForm}
      component="section"
      flexDirection="row"
      flex={1}
      mt="34px"
    >
      <Box>
        <Stack
          className={styles.SearchBoxContainerLeft}
          display="flex"
          justifyContent="flex-start"
          flexDirection="row"
          flexWrap="wrap"
        >
          {/* Trip Type */}
          <Box className={styles.formGroup}>
            <TextField
              select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className={`${styles.formControl} ${styles.TripType} formControl`}
              sx={{ width: "120px" }}
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
              <MenuItem value="oneway">One way</MenuItem>
              <MenuItem value="roundtrip">Round trip</MenuItem>
            </TextField>
          </Box>

          {/* Origin */}
          <Box className={styles.formGroup}>
            <Autocomplete
              freeSolo
              options={originOptions}
              loading={loadingOrigin}
              getOptionLabel={(option) =>
                option?.name
                  ? `${option.city_name} (${option.name}) - ${option.name}`
                  : ""
              }
              onInputChange={(e, value) => handleAirportSearch(value, "origin")}
              onChange={(e, value) => setOrigin(value?.name || "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Departing from"
                  size="small"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className={`${styles.formControl} ${styles.from} formControl`}
                />
              )}
            />
          </Box>
          <Box className={styles.formGroup}>
            <Autocomplete
              freeSolo
              options={originOptions}
              loading={loadingOrigin}
              getOptionLabel={(option) =>
                option?.name
                  ? `${option.city_name} (${option.name}) - ${option.name}`
                  : ""
              }
              onInputChange={(e, value) => handleAirportSearch(value, "origin")}
              onChange={(e, value) => setDestination(value?.name || "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Arriving at"
                  size="small"
                  value={origin}
                  onChange={(e) => setDestination(e.target.value)}
                  className={`${styles.formControl} ${styles.from} formControl`}
                />
              )}
            />
          </Box>

          {/* Dates */}
          <Box className={styles.formGroup} position="relative">
            <TextField
              variant="outlined"
              placeholder="Travel dates"
              value={
                tripType === "oneway"
                  ? dayjs(singleDate).format("DD MMM")
                  : `${dayjs(dateRange[0].startDate).format(
                      "DD MMM"
                    )} - ${dayjs(dateRange[0].endDate).format("DD MMM")}`
              }
              onClick={() => setShowCalendar(!showCalendar)}
              className={`${styles.formControl} ${styles.dates} formControl`}
              size="small"
              sx={{ width: "180px", cursor: "pointer" }}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <img
                    src="/images/calendar-icon-light.svg"
                    alt="Calendar"
                    onClick={() => setShowCalendar(!showCalendar)}
                  />
                ),
              }}
            />

            {showCalendar && (
              <Box
                position="absolute"
                zIndex={10}
                top="55px"
                left={0}
                boxShadow="0 0 10px rgba(0,0,0,0.1)"
              >
                <DateRange
                  editableDateInputs
                  onChange={(item) => {
                    setDateRange([item.selection]);

                    if (tripType === "oneway") {
                      setSingleDate(item.selection.startDate);
                      setShowCalendar(false);
                    } else if (tripType === "roundtrip") {
                      const { startDate, endDate } = item.selection;
                      if (endDate && startDate && endDate > startDate) {
                        // Close only when user picked a valid return date
                        setShowCalendar(false);
                      }
                    }
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  rangeColors={["#1539CF"]}
                  minDate={new Date()}
                />
              </Box>
            )}
          </Box>

          {/* Travellers */}
          <Travellers travellers={travellers} setTravellers={setTravellers} />

          {/* Trip Class */}
          <Box className={styles.formGroup}>
            <TextField
              select
              value={tripClass}
              onChange={(e) => setTripClass(e.target.value)}
              className={`${styles.formControl} ${styles.TripClass} formControl`}
              sx={{ width: "160px" }}
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
              <MenuItem value="" disabled sx={{ color: "#0B172980" }}>
                Trip class
              </MenuItem>
              <MenuItem value="Economy">Economy</MenuItem>
              <MenuItem value="Premium Economy">Premium Economy</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="First">First Class</MenuItem>
            </TextField>
          </Box>
        </Stack>
      </Box>

      {/* Search Button */}
      <Box display="flex" alignItems="flex-end">
        <IconButton
          className={styles.SearchButton}
          onClick={handleSearch}
          disabled={isLoading}
        >
          <i className="fa fa-arrow-right"></i>
        </IconButton>
      </Box>
    </Stack>
  );
};

export default TravelForm;
