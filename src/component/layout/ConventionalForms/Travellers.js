import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  ClickAwayListener,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function Travellers({ travellers, setTravellers }) {
  const [anchorEl, setAnchorEl] = useState(null);
  console.log("anchorEl", travellers);
  
  const ref = useRef(null);

  // Total travellers calculation
  const totalTravelers =
    travellers.adults + travellers.children;

  // Update function for increment/decrement
  const updateCount = (type, delta) => {
    setTravellers((prev) => {
      const newValue =
        type === "adults"
          ? Math.max(1, prev[type] + delta) // at least 1 adult
          : Math.max(0, prev[type] + delta); // others can be 0
      return { ...prev, [type]: newValue };
    });
  };

  // Passenger rows config
  const PassRow = [
    { title: "Adult (18+ years)", type: "adults" },
    { title: "Child (2-11 years)", type: "children" },
  ];
  

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
            totalTravelers === 1 ? "1 Adult" : `Travellers: ${totalTravelers}`
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

        {/* Popover Dropdown */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={ref.current}
          onClose={() => setAnchorEl(null)}
        >
          <Box className={styles.dropdownMenu}>
            <Stack
              className={`${styles.Passrow} ${styles.header}`}
              flexDirection={"row"}
              mb={"18px"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box className={styles.leftCol}>
                <Typography className={`${styles.label}`}>
                  Passengers
                </Typography>
              </Box>
              <Stack flexDirection={"row"} className={styles.RightCol}>
                <Box
                  className={styles.CounterIcon + " cursor-pointer"}
                >
                  <img src="/images/user-sm-icon-dark.svg" />
                </Box>
                <Box className={styles.counter}>
                  <Typography className={styles.counterValue}>
                    {totalTravelers}
                  </Typography>
                </Box>
                <Box
                  className={styles.CounterIcon + " cursor-pointer"}
                  
                ></Box>
              </Stack>
              {/*  */}
            </Stack>

            {/* Passenger Rows */}
            {PassRow.map((getpass) => (
              <Stack
                key={getpass.type}
                className={styles.Passrow}
                flexDirection="row"
                mb="12px"
                justifyContent="space-between"
              >
                <Box className={styles.leftCol}>
                  <Typography className={styles.label}>
                    {getpass.title}
                  </Typography>
                </Box>
                <Stack flexDirection="row" className={styles.RightCol}>
                  {/* Minus */}
                  <Box
                    className={styles.CounterIcon + " cursor-pointer"}
                    onClick={() => updateCount(getpass.type, -1)}
                  >
                    <img src="/images/minus-quantity-icon.svg" />
                  </Box>
                  {/* Value */}
                  <Box className={styles.counter}>
                    <Typography className={styles.counterValue}>
                      {travellers[getpass.type]}
                    </Typography>
                  </Box>
                  {/* Plus */}
                  <Box
                    className={styles.CounterIcon + " cursor-pointer"}
                    onClick={() => updateCount(getpass.type, 1)}
                  >
                    <img src="/images/plus-quantity-icon.svg" />
                  </Box>
                </Stack>
              </Stack>
            ))}

            {/* Footer */}
            <Stack
              mt="26px"
              flexDirection="row"
              justifyContent="space-between"
              className={styles.Footer}
            >
              <Box className={styles.leftCol}></Box>
              <Stack flexDirection="row" justifyContent="center" className={styles.RightCol}>
                <Typography
                  className="semibold basecolor"
                  onClick={() => setAnchorEl(null)}
                  style={{ cursor: "pointer" }}
                >
                  Done
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Popover>
      </Box>
    </ClickAwayListener>
  );
}
