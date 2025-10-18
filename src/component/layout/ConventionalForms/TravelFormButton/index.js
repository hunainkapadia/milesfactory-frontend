import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { Box, IconButton } from "@mui/material";

const TravelFormButton = () => {
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
  return (
    <>
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
    </>
  );
};

export default TravelFormButton;