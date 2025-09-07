import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import dayjs from "dayjs";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import AiTravellers from "./AiTravellers";

const TravelInputForm = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const HandleSeperator = () => {
    setOrigin((prev) => destination);
    setDestination((prev) => origin);
  };

  return (
    <Box className={inputStyles.SearchBoxContainer}>
      <Box
        className={styles.bookingFormWrapper + " bookingFormWrapper"}
        alignItems={"center"}
      >
        <Box
          className={styles.SearchBoxContainer}
          display={"flex"}
          columnGap={"18px"}
          justifyContent={"flex-start"}
        >
          {/* Return Dropdown */}
          <Box className={styles.formGroup}>
            <TextField
              select
              value=""
              className={`${styles.formControl} ${styles.Return} formControl`}
              sx={{ width: "100px" }}
              InputLabelProps={{ shrink: false }}
              SelectProps={{
                displayEmpty: true,
              }}
            >
              <MenuItem value="" disabled sx={{ color: "#0B172980" }}>
                Type
              </MenuItem>
              <MenuItem value="One way">One way</MenuItem>
              <MenuItem value="return">Return</MenuItem>
            </TextField>
          </Box>

          {/* Origin / Destination */}
          <Box
            component={"section"}
            position={"relative"}
            display={"flex"}
            alignItems={"center"}
            columnGap={"12px"}
          >
            <TextField
              variant="outlined"
              label="Origin"
              placeholder="from"
              size="small"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className={`${styles.formControl} ${styles.origin}  formControl`}
              InputLabelProps={{ shrink: true }}
            />

            <Box
              className={styles.Seperator + " cursor-pointer"}
              position={"absolute"}
              onClick={HandleSeperator}
            >
              <img src="/images/form-seperator-icon.svg" />
            </Box>

            <TextField
              variant="outlined"
              label="Destination"
              placeholder="to"
              size="small"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={`${styles.formControl} ${styles.destination}  formControl`}
              sx={{ width: "100px" }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Dates */}
          <Box className={styles.formGroup} position={"relative"}>
            <TextField
              variant="outlined"
              label="Dates"
              value={`${dayjs(dateRange[0].startDate).format(
                "DD MMM"
              )} - ${dayjs(dateRange[0].endDate).format("DD MMM")}`}
              onClick={() => setShowCalendar(!showCalendar)}
              className={`${styles.formControl} ${styles.dates} formControl`}
              size="small"
              sx={{ width: "180px" }}
              InputLabelProps={{ shrink: true }}
              readOnly
            />
            {showCalendar && (
              <Box
                position="absolute"
                zIndex={10}
                top="55px"
                left={0}
                boxShadow={"0 0 10px rgba(0,0,0,0.1)"}
              >
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  rangeColors={["#1539CF"]}
                  minDate={new Date()} // Prevent past dates
                />
              </Box>
            )}
          </Box>

          {/* Travellers */}

          <AiTravellers />
        </Box>

        <Box
          whiteSpace={"nowrap"}
          display={"flex"}
          sx={{
            justifyContent: { lg: "center", md: "center", xs: "flex-end" },
          }}
        >
          <Button className={`btn btn-primary btn-round btn-xs`}>
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TravelInputForm;
