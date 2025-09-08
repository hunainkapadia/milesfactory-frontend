import { Box, Stack, TextField, MenuItem, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import dayjs from "dayjs";
import Travellers from "./Travellers"; // your existing component
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";

const TravelForm = ({
  origin,
  setOrigin,
  destination,
  setDestination,
  dateRange,
  setDateRange,
  showCalendar,
  setShowCalendar,
  tripClass,
  setTripClass,
  handleSearch,
  isLoading,
}) => {
  return (
    <Stack className={styles.travelForm} component="section" flexDirection="row" flex={1} mt="34px">
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
          {/* Trip Type */}
          <Box className={styles.formGroup}>
            <TextField
              select
              value=""
              className={`${styles.formControl} ${styles.TripType} formControl`}
              sx={{ width: "100px" }}
              SelectProps={{
                displayEmpty: true,
                IconComponent: (props) => (
                  <FontAwesomeIcon icon={faAngleDown} style={{ color: "#6C6F76" }} {...props} />
                ),
              }}
            >
              <MenuItem value="" disabled sx={{ color: "#0B172980" }}>
                Trip type
              </MenuItem>
              <MenuItem value="One way">One way</MenuItem>
              <MenuItem value="return">Round trip</MenuItem>
            </TextField>
          </Box>

          {/* Origin */}
          <Box className={styles.formGroup}>
            <TextField
              variant="outlined"
              placeholder="Departing from"
              size="small"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className={`${styles.formControl} ${styles.from} formControl`}
            />
          </Box>

          {/* Destination */}
          <Box className={styles.formGroup}>
            <TextField
              variant="outlined"
              placeholder="Arriving at"
              size="small"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={`${styles.formControl} ${styles.to} formControl`}
            />
          </Box>

          {/* Dates */}
          <Box className={styles.formGroup} position="relative">
            <TextField
              variant="outlined"
              placeholder="Travel dates"
              value={`${dayjs(dateRange[0].startDate).format("DD MMM")} - ${dayjs(
                dateRange[0].endDate
              ).format("DD MMM")}`}
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
                    style={{ width: "18px", height: "18px", cursor: "pointer", marginRight: "8px" }}
                    onClick={() => setShowCalendar(!showCalendar)}
                  />
                ),
              }}
            />

            {showCalendar && (
              <Box position="absolute" zIndex={10} top="55px" left={0} boxShadow="0 0 10px rgba(0,0,0,0.1)">
                <DateRange
                  editableDateInputs
                  onChange={(item) => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  rangeColors={["#1539CF"]}
                  minDate={new Date()}
                />
              </Box>
            )}
          </Box>

          {/* Travellers */}
          <Travellers />

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
                  <FontAwesomeIcon icon={faAngleDown} style={{ color: "#6C6F76" }} {...props} />
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

      <Box display="flex" alignItems="flex-end">
        <IconButton className={styles.SearchButton} onClick={handleSearch} disabled={isLoading}>
          <i className="fa fa-arrow-right"></i>
        </IconButton>
      </Box>
    </Stack>
  );
};

export default TravelForm;
