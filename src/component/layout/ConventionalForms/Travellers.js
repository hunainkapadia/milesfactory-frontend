import {
  Box,
  ClickAwayListener,
  Popover,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";

export default function Travellers() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const totalTravelers =
    travelers.adults + travelers.children + travelers.infants;
  const ref = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateCount = (type, delta) => {
    setTravelers((prev) => {
      const newValue = Math.max(
        0,
        type === "adults" ? Math.max(1, prev[type] + delta) : prev[type] + delta
      );
      return { ...prev, [type]: newValue };
    });
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box className={styles.formGroup}>
        <TextField
          inputRef={ref}
          onClick={handleClick}
          variant="outlined"
          placeholder="All travellers"
          size="small"
          sx={{ width: "150px", cursor: "pointer" }}
          className={`${styles.formControl} ${styles.travellers} formControl`}
          InputLabelProps={{ shrink: true }}
          value={
            totalTravelers === 1
              ? "" // shows placeholder when only 1 adult
              : `Travellers: ${totalTravelers}`
          }
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

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={ref.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          className={styles.dropdownWrapper}
        >
          <Box className={styles.dropdownMenu}>
            {["adults", "children", "infants"].map((type) => (
              <Box key={type} className={styles.numberInput}>
                <Box>
                  <Typography className={styles.label}>{type}</Typography>
                  <Typography className={styles.sublabel}>
                    {type === "adults"
                      ? "12y+"
                      : type === "children"
                      ? "2-12y"
                      : "under 2y"}
                  </Typography>
                </Box>
                <Box className={styles.counter}>
                  <IconButton
                    onClick={() => updateCount(type, -1)}
                    size="small"
                    disabled={
                      type === "adults"
                        ? travelers[type] <= 1
                        : travelers[type] <= 0
                    }
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </IconButton>
                  <Typography className={styles.count}>
                    {travelers[type]}
                  </Typography>
                  <IconButton onClick={() => updateCount(type, 1)} size="small">
                    <FontAwesomeIcon icon={faPlus} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Popover>
      </Box>
    </ClickAwayListener>
  );
}
