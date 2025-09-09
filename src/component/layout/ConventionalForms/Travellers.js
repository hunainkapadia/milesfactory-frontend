import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, ClickAwayListener, IconButton, Popover, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { faAngleDown, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Travellers({ travellers, setTravellers }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const ref = useRef(null);

  const totalTravelers = travellers.adults + travellers.children + travellers.infants;

  
  
  const updateCount = (type, delta) => {
    console.log("totalTravelers", delta);
    setTravellers((prev) => {
      const newValue = Math.max(
        0,
        type === "adults" ? Math.max(1, prev[type] + delta) : prev[type] + delta
      );
      return { ...prev, [type]: newValue };
    });
  };

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <Box className={styles.formGroup}>
        <TextField
          inputRef={ref}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          variant="outlined"
          placeholder="Travellers"
          size="small"
          sx={{ width: "150px", cursor: "pointer" }}
          className={`${styles.formControl} ${styles.travellers} formControl`}
          value={
            totalTravelers === 1
              ? ""
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
          onClose={() => setAnchorEl(null)}
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
                        ? travellers[type] <= 1
                        : travellers[type] <= 0
                    }
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </IconButton>
                  <Typography className={styles.count}>
                    {travellers[type]}
                  </Typography>
                  <IconButton
                    onClick={() => updateCount(type, 1)}
                    size="small"
                  >
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
