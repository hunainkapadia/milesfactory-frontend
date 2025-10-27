import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  ClickAwayListener,
  Popover,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRef, useState } from "react";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setTravellers } from "@/src/store/slices/TravelSlice";

import TravellerDropdown from "./TravellerDropdown";

export default function Travellers({ errors, isHomeForm, isDrawer }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const ref = useRef(null);

  const dispatch = useDispatch();
  const travellers = useSelector((state) => state?.travel?.travellers);

  // Calculate total travellers
  const totalTravelers = travellers.adults + travellers.children;

  //  Update count (plus/minus)
  const updateCount = (type, delta) => {
    const prev = travellers;

    const newValue =
      type === "adults"
        ? Math.max(1, prev[type] + delta)
        : Math.max(0, prev[type] + delta);

    const updatedTravellers = { ...prev, [type]: newValue };

    dispatch(setTravellers(updatedTravellers));
  };

  //  When Done clicked
  

  //  Format display text
  const getDisplayText = () => {
    const { adults, children } = travellers;
    if (adults === 1 && children === 0) return "1 Adult";
    if (children === 0) return `${adults} Adults`;
    return `${adults} Adults, ${children} Child${children > 1 ? "ren" : ""}`;
  };

  const PassRow = [
    { title: "Adult (18+ years)", type: "adults" },
    { title: "Child (2-11 years)", type: "children" },
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only

  return (
    <>
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <Box
          className={`${styles.formGroup} ${isHomeForm && styles.isHomeForm}`}
        >
          {!isDrawer && (
            <TextField
              inputRef={ref}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              variant="outlined"
              placeholder="Travellers"
              size="small"
              sx={{ width: "180px", cursor: "pointer" }}
              className={`${styles.formControl} ${styles.travellers} formControl`}
              value={getDisplayText()} //  dynamic display
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{ color: "#6C6F76", pointerEvents: "none" }}
                  />
                ),
              }}
            />
          )}

          {/* Popover Dropdown */}
          {isMobile ? (
            <>
              <TravellerDropdown />
            </>
          ) : (
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={ref.current}
              onClose={() => setAnchorEl(null)}
            >
              <TravellerDropdown setAnchorEl={setAnchorEl} />
            </Popover>
          )}
        </Box>
      </ClickAwayListener>

      {/* Validation error */}
      {errors.travellers && (
        <Typography color="error" variant="caption">
          {errors.travellers}
        </Typography>
      )}
    </>
  );
}
