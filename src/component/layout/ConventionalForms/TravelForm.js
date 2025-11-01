import {
  Box,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery,
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
import { useEffect, useRef, useState } from "react";
import {
  fetchAirports,
  setTripType,
  submitTravelForm,
} from "@/src/store/slices/TravelSlice";
import Cookies from "js-cookie";
import FromAndTooFields from "./FromAndTooFields";
import { capitalizeFirstWord } from "@/src/utils/utils";
import OriginField from "./OriginField";
import DestinationField from "./DestinationField";
import TravelFormMobileDrawer from "./TravelFormMobileDrawer";
import DOBField from "./DOBField";
import TripTypeField from "./TripTypeField";

const TravelForm = () => {
  const dispatch = useDispatch();
  const { origin, destination, travellers, tripClass, tripType, departureDate, returnDate } = useSelector(
    (state) => state.travel
  );

  // ===== Local States =====
  
  
  const [destinationOption, setDestinationOption] = useState(null); // store selected option object
  const [singleDate, setSingleDate] = useState(dayjs().add(1, "day").toDate()); // for oneway
  const [dateRange, setDateRange] = useState([
    {
      startDate: singleDate, // use tomorrow
      endDate: singleDate, // same as startDate for one-way
      key: "selection",
    },
  ]);
  const [errors, setErrors] = useState({});

  const [showCalendar, setShowCalendar] = useState(false);
  
  
  const [isLoading, setIsLoading] = useState(false);

  // ===== Redux States =====
  
  // ===== Handle Search =====
  const handleSearch = () => {
  let newErrors = {};

  //  Basic validation
  if (!origin) newErrors.origin = "This field is required.";
  if (!destination) newErrors.destination = "This field is required.";
  if (!tripClass) newErrors.tripClass = "This field is required.";

  if (tripType === "oneway" && !departureDate) {
    newErrors.date = "Please select a departure date.";
  }

  if (tripType === "roundtrip" && (!departureDate || !returnDate)) {
    newErrors.date = "Please select departure and return dates.";
  }

  if (!travellers?.adults || travellers.adults < 1) {
    newErrors.travellers = "At least 1 adult required.";
  }

  //  Stop on validation error
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  //  No validation error — proceed
  setErrors({});
  setIsLoading(true);

  //  Build search data using Redux state
  const searchData = {
    tripType,
    origin,
    destination,
    departureDate: departureDate
      ? dayjs(departureDate).format("YYYY-MM-DD")
      : null,
    returnDate:
      tripType === "roundtrip" && returnDate
        ? dayjs(returnDate).format("YYYY-MM-DD")
        : null,
    travellers,
    tripClass,
  };

  

  dispatch(submitTravelForm(searchData));

  setTimeout(() => setIsLoading(false), 1000);
};



  const calendarRef = useRef(null);
  const tripTypeLabels = {
    oneway: "one way",
    roundtrip: "Round trip",
  };

  const handleTripType = (e) => {
    const value = e.target.value;

    dispatch(setTripType(value));
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only


  
  
  return (
    <>
      <Stack
        className={styles.travelForm}
        component="section"
        flexDirection="row"
        flex={1}
        mt="34px"
      >
        <Box className={styles.Left}>
          <Stack
            className={styles.SearchBoxContainerLeft}
            display="flex"
            justifyContent="flex-start"
            flexDirection="row"
            flexWrap="wrap"
          >
            {/* Trip Type */}
            <Box className={`${styles.formGroup} ${styles.isHomeForm}`}>
              <TextField
                select
                value={tripType}
                onChange={handleTripType}
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
                  renderValue: (selected) =>
                    selected
                      ? capitalizeFirstWord(tripTypeLabels[selected])
                      : "Select trip type",
                }}
              >
                <MenuItem value="oneway">One way</MenuItem>
                <MenuItem value="roundtrip">Round trip</MenuItem>
              </TextField>
            </Box>

            <OriginField isHomeForm errors={errors} />
            {!isMobile && (
              <>
                <DestinationField isHomeForm errors={errors} />
              </>
            )}
            {!isMobile && (
              <>
                {/* Dates */}
                <DOBField errors={errors} isHomeForm tripType={tripType} />
              </>
            )}
            {!isMobile && (
              <>
                {/* Travellers */}
                <Travellers isHomeForm errors={errors} />
              </>
            )}

            {/* Trip Class */}
            {!isMobile && (
              <>
                <TripTypeField errors={errors} isHomeForm />
              </>
            )}
          </Stack>
        </Box>

        {/* Search Button */}
        <Box
          display={{ xs: "none", sm: "flex", md: "flex", lg: "flex" }}
          alignItems="flex-end"
        >
          <IconButton
            className={styles.SearchButton}
            onClick={handleSearch}
            disabled={isLoading}
          >
            <i className="fa fa-arrow-right"></i>
          </IconButton>
        </Box>
      </Stack>
      <TravelFormMobileDrawer
        handleSearch={handleSearch}
        isDrawer
        errors={errors}
      />
    </>
  );
};

export default TravelForm;
