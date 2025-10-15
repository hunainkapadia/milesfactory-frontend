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
const TripTypeField = ({errors, isHomeForm}) => {
   const [tripClass, setTripClass] = useState("Economy");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only
  return (
    <>
      
          <Box className={`${styles.formGroup} ${isHomeForm && styles.isHomeForm}`}>
            <TextField
              select
              value={tripClass}
              onChange={(e) => setTripClass(e.target.value)}
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
