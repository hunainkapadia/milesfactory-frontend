import { Box, Stack, TextField, MenuItem, IconButton } from "@mui/material";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Travellers from "./Travellers"; // optional

const HotelForm = ({
  location,
  setLocation,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  travellers,
  setTravellers,
  roomType,
  setRoomType,
  priceRange,
  setPriceRange,
  handleHotelSearch,
}) => {
  return (
    <Stack className="hotelForm" component="section" flexDirection="row" mt="34px">
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
          {/* Where */}
          <Box className={styles.formGroup}>
            <TextField
              variant="outlined"
              placeholder="Where"
              size="small"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`${styles.formControl} formControl`}
              sx={{ width: "180px" }}
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
            />
          </Box>

          {/* Travellers */}
          <Travellers travellers={travellers} setTravellers={setTravellers} />

          {/* Room type */}
          <Box className={styles.formGroup}>
            <TextField
              select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className={`${styles.formControl} formControl`}
              size="small"
              sx={{ width: "160px" }}
              SelectProps={{
                displayEmpty: true,
                IconComponent: (props) => (
                  <FontAwesomeIcon icon={faAngleDown} style={{ color: "#6C6F76" }} {...props} />
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
          <Box className={styles.formGroup}>
            <TextField
              select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className={`${styles.formControl} formControl`}
              size="small"
              sx={{ width: "160px" }}
              SelectProps={{
                displayEmpty: true,
                IconComponent: (props) => (
                  <FontAwesomeIcon icon={faAngleDown} style={{ color: "#6C6F76" }} {...props} />
                ),
              }}
            >
              <MenuItem value="" disabled>
                Price range
              </MenuItem>
              <MenuItem value="Budget">$50 - $100</MenuItem>
              <MenuItem value="Mid">$100 - $200</MenuItem>
              <MenuItem value="Luxury">$200+</MenuItem>
            </TextField>
          </Box>
        </Stack>
      </Box>

      <Box display="flex" alignItems="flex-end">
        <IconButton className={styles.SearchButton} onClick={handleHotelSearch}>
          <i className="fa fa-arrow-right"></i>
        </IconButton>
      </Box>
    </Stack>
  );
};

export default HotelForm;
