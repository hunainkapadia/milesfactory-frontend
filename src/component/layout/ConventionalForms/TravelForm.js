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

  // ===== Local States =====
  const [tripType, setTripType] = useState("oneway"); // oneway | roundtrip
  
  const [destination, setDestination] = useState("");
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
  
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // ===== Redux States =====
  
  // ===== Handle Search =====
  const handleSearch = () => {
    let newErrors = {};

    if (!origin) newErrors.origin = "This field is required.";
    if (!destination) newErrors.destination = "This field is required.";
    if (!tripClass) newErrors.tripClass = "This field is required.";
    if (tripType === "oneway" && !singleDate) {
      newErrors.date = "Please select a departure date.";
    }
    if (
      tripType === "roundtrip" &&
      (!dateRange?.[0]?.startDate || !dateRange?.[0]?.endDate)
    ) {
      newErrors.date = "Please select departure and return dates.";
    }
    if (!travellers.adults || travellers.adults < 1) {
      newErrors.travellers = "At least 1 adult required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
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

    setTripType(value);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only


  console.log("origin_test", origin);
  
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
            <Box className={styles.formGroup}>
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

            <OriginField
              errors={errors}
              
            />
            {!isMobile && (
              <>
                <DestinationField
                  errors={errors}
                />
              </>
            )}
            {!isMobile && (
              <>
                {/* Dates */}
                <DOBField errors={errors} />
              </>
            )}
            {!isMobile && (
              <>
                {/* Travellers */}
                <Travellers
                  errors={errors}
                />
                
              </>
            )}

            {/* Trip Class */}
            {!isMobile && (
              <>
                <TripTypeField errors={errors} />
              </>
            )}
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
      <TravelFormMobileDrawer errors={errors} />
      
      
    </>
  );
};

export default TravelForm;
