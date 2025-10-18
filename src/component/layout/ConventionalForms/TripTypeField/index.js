import { setTripClass } from "@/src/store/slices/TravelSlice";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const TripTypeField = ({ errors, isHomeForm, isDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only
  const dispatch = useDispatch();
  const { tripClass } = useSelector((state) => state.travel);
  return (
    <>
      <Box
        className={`${styles.formGroup} " isDrawerField " ${
          isDrawer && styles.isDrawerField
        } ${isHomeForm && styles.isHomeForm}`}
      >
        <TextField
          select
          value={tripClass}
          onChange={(e) => dispatch(setTripClass(e.target.value))}
          className={`${styles.formControl} ${styles.TripClass} formControl`}
          error={!!errors.tripClass}
          helperText={errors.tripClass}
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
          <MenuItem value="Economy">Economy</MenuItem>
          <MenuItem value="Premium Economy">Premium Economy</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="First">First Class</MenuItem>
        </TextField>
      </Box>
    </>
  );
};

export default TripTypeField;
