import { Box, Grid, Stack, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/input-box/TravelInputForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setTravellers } from "@/src/store/slices/TravelSlice";

const TravellerDropdown = (setAnchorEl) => {
  const dispatch = useDispatch();
  const travellers = useSelector((state) => state?.travel?.travellers);
  const { adults, children, childAges = [] } = travellers;

  
  
  // Total travellers count
  const totalTravelers = adults + children;

  // Update adults or children count
  

  
  // dropdown pasengers
  const PassRow = [
    { title: "Adult (18+ years)", type: "adults" },
    { title: "Child (0-18 years)", type: "children" },
  ];

  const updateCount = (type, delta) => {
    
    
    
    const prev = travellers;
    
    const newValue =
    type === "adults"
    ? Math.max(1, prev[type] + delta)
    : Math.max(0, prev[type] + delta);
    
    
    
    let updatedTravellers = { ...prev, [type]: newValue };
    
    

    // Adjust childAges array if children count changes
    if (type === "children") {
      if (newValue > childAges.length) {
        const diff = newValue - childAges.length;
        
        
        updatedTravellers.childAges = [
          ...childAges,
          ...Array(diff).fill(2), // Default each new child age = 2
        ];
      } else {
        updatedTravellers.childAges = childAges.slice(0, newValue);
      }
    }

    dispatch(setTravellers(updatedTravellers));
  };
  
  // Update specific child's age using dropdown
  const handleAgeChange = (index, newValue) => {
    const updatedAges = childAges.map((age, i) =>
      i === index ? newValue : age
    );

    dispatch(
      setTravellers({
        ...travellers,
        childAges: updatedAges,
      })
    );
  };
  
  // close dropdown popup 
  const handleDone =()=> {
    setAnchorEl?.setAnchorEl(null);
  }

  return (
    <Box className={styles.dropdownMenu}>
      {/* Header */}
      <Stack
        className={`${styles.Passrow} ${styles.header}`}
        flexDirection="row"
        mb="18px"
        justifyContent="space-between"
      >
        <Box className={styles.leftCol}>
          <Typography className={styles.label}>Passengers</Typography>
        </Box>
        <Stack flexDirection="row" className={styles.RightCol}>
          <Box className={`${styles.CounterIcon} cursor-pointer`}>
            <img src="/images/user-sm-icon-dark.svg" alt="user" />
          </Box>
          <Box className={styles.counter}>
            <Typography className={styles.counterValue}>
              {totalTravelers}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* Passenger Rows (Adults + Children) */}
      {PassRow.map((getpass) => (
        <Stack
          key={getpass.type}
          className={styles.Passrow}
          flexDirection="row"
          mb="12px"
          justifyContent="space-between"
        >
          <Box className={styles.leftCol}>
            <Typography className={styles.label}>{getpass.title}</Typography>
          </Box>

          <Stack flexDirection="row" className={styles.RightCol}>
            {/* Minus */}
            <Box
              className={`${styles.CounterIcon} cursor-pointer`}
              onClick={() => updateCount(getpass.type, -1)}
            >
              <img src="/images/minus-quantity-icon.svg" alt="minus" />
            </Box>

            {/* Value */}
            <Box className={styles.counter}>
              <Typography className={styles.counterValue}>
                {travellers[getpass.type]}
              </Typography>
            </Box>

            {/* Plus */}
            <Box
              className={`${styles.CounterIcon} cursor-pointer`}
              onClick={() => updateCount(getpass.type, 1)}
            >
              <img src="/images/plus-quantity-icon.svg" alt="plus" />
            </Box>
          </Stack>
        </Stack>
      ))}

      {/*  Child Age Dropdowns */}

      {children > 0 && (
        <Box mt={2}>
          {childAges.map((age, index) => (
            <>
              <Stack
                key={index}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mb="10px"
              >
                <Grid container spacing={2}>
                  {/* Label Column */}
                  <Grid item xs={7}>
                    <Typography className={styles.label}>
                      Child {index + 1} Age
                    </Typography>
                  </Grid>

                  {/* Dropdown Column */}
                  <Grid item xs={5}>
                  <Box className={styles.formGroup}>

                    <select
                      value={age}
                      onChange={(e) =>
                        handleAgeChange(index, parseInt(e.target.value))
                      }
                      className={`${styles.ageSelect} formControl select`}
                    >
                      {[...Array(19).keys()].map((num) => (
                        <option key={num} value={num}>
                          {num === 0 ? "Select age" : num}
                        </option>
                      ))}
                    </select>
                  </Box>
                  </Grid>
                </Grid>
              </Stack>
            </>
          ))}
        </Box>
      )}

      {/* Footer */}
      <Stack
        mt="26px"
        flexDirection="row"
        justifyContent="space-between"
        className={styles.Footer}
        sx={{ display: { md: "flex", xs: "none" } }}
      >
        <Box className={styles.leftCol}></Box>
        <Stack
          flexDirection="row"
          justifyContent="center"
          className={styles.RightCol}
        >
          <Typography
            className="semibold basecolor"
            style={{ cursor: "pointer" }}
            onClick={handleDone}
          >
            Done
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TravellerDropdown;
