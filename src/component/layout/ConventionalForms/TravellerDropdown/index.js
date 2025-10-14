import { Box, Stack, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setTravellers } from "@/src/store/slices/TravelSlice";

const TravellerDropdown = () => {
   const travellers = useSelector((state) => state?.travel?.travellers);

  // Calculate total travellers
  const totalTravelers = travellers.adults + travellers.children;

  const dispatch = useDispatch()
  // Update count (plus/minus)
  const updateCount = (type, delta) => {
    const prev = travellers;

    const newValue =
      type === "adults"
        ? Math.max(1, prev[type] + delta)
        : Math.max(0, prev[type] + delta);

    const updatedTravellers = { ...prev, [type]: newValue };

    dispatch(setTravellers(updatedTravellers));
  };

   const PassRow = [
    { title: "Adult (18+ years)", type: "adults" },
    { title: "Child (2-11 years)", type: "children" },
  ];
  return (
    <>
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
                  <Box className={styles.CounterIcon + " cursor-pointer"}>
                    <img src="/images/user-sm-icon-dark.svg" />
                  </Box>
                  <Box className={styles.counter}>
                    <Typography className={styles.counterValue}>
                      {totalTravelers}
                    </Typography>
                  </Box>
                  <Box className={styles.CounterIcon + " cursor-pointer"}></Box>
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
                <Stack
                  flexDirection="row"
                  justifyContent="center"
                  className={styles.RightCol}
                >
                  <Typography
                    className="semibold basecolor"
                    onClick={"handleTravellerDone"}
                    style={{ cursor: "pointer" }}
                  >
                    Done
                  </Typography>
                </Stack>
              </Stack>
            </Box>
    </>
  );
};

export default TravellerDropdown;
