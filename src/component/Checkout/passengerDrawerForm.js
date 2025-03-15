import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  TextField,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  closePassengerDrawer,
  bookFlight,
  NationalitData,
  PassengerForm,
  PassengerFormSubmit,
} from "@/src/store/slices/passengerDrawerSlice";
import dayjs from "dayjs";

const PassengerDrawerForm = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.passengerDrawer.isOpen);
  const countries = useSelector((state) => state.passengerDrawer.countries);
  const [gender, setgender] = useState();
  const [given_name, setgiven_name] = useState();
  const [family_name, setfamily_name] = useState();
  const [born_on, setborn_on] = useState();
  const [passport_number, setpassport_number] = useState();
  const [passport_expire_date, setpassport_expire_date] = useState();
  const [nationality, setnationality] = useState();
  
  
  const params = {
    gender: gender,
    given_name: given_name,
    family_name: family_name,
    born_on: born_on,
    passport_number: passport_number,
    passport_expire_date: passport_expire_date,
    nationality:  nationality?.id || "",
  };
  // Fetch nationality data when the component mounts
  useEffect(() => {
    dispatch(NationalitData());
  }, [dispatch]);

  if (!isOpen) return null;

  const handleCloseDrawer = () => {
    dispatch(closePassengerDrawer());
  };

  const SubmitPassenger = () => {
    dispatch(closePassengerDrawer())
    dispatch(PassengerFormSubmit(params));
  };

  return (
    <Box
      className={`${styles.checkoutDrower} white-bg ${styles.PassengerDrower}`}
    >
      <Box className={styles.checkoutDrowerSection + " white-bg"}>
        <Box>
          <Box
            className={styles.checkoutDrowerHeder}
            py={2}
            px={3}
            display="flex"
            justifyContent="space-between"
          >
            <div>Main passenger</div>
            <div>Adult</div>
          </Box>
          <Divider />

          <Box py={2} px={3}>
            <Box>
              <FormLabel>Gender as per passport</FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setgender(e.target.value)}
              >
                <FormControlLabel value="m" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="f"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </Box>
            <Box>
              <FormLabel>First Name</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter First Name"
                value={given_name}
                onChange={(e) => setgiven_name(e.target.value)}
                margin="normal"
              />
            </Box>
            <Box>
              <FormLabel>Last Name</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter Last Name"
                value={family_name}
                onChange={(e) => setfamily_name(e.target.value)}
                margin="normal"
              />
            </Box>
            <Box width="100%">
              <FormLabel>Date of Birth</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="formControl"
                  value={born_on ? dayjs(born_on) : null} // Convert string to dayjs
                  onChange={(newValue) =>
                    setborn_on(
                      newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                    )
                  } // Format date as string
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" />
                  )}
                />
              </LocalizationProvider>
            </Box>

            <Box>
              <FormLabel>Passport Number</FormLabel>
              <TextField
                className="formControl"
                fullWidth
                placeholder="Enter Passport Number"
                value={passport_number}
                onChange={(e) => setpassport_number(e.target.value)}
                margin="normal"
              />
            </Box>
            <Box width="100%">
              <FormLabel>Passport Expiry Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="formControl"
                  value={
                    passport_expire_date ? dayjs(passport_expire_date) : null
                  } // Ensure it's a dayjs object
                  onChange={(newValue) =>
                    setpassport_expire_date(
                      newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      className="formControl"
                      {...params}
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box>
              <FormLabel>Nationality</FormLabel>
              <Autocomplete
                className="select-dropdown"
                options={countries}
                getOptionLabel={(option) => option.name}
                value={nationality} // Ensure this is a valid object from `countries`
                onChange={(event, newValue) => setnationality(newValue)} // Use newValue directly
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Box>
          </Box>
        </Box>

        <Box className={styles.passengerDrawerFooter}>
          <Divider />
          <Box py={1} px={3} display="flex" flexDirection="column">
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={3}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                className="basecolor1 f14"
                style={{ cursor: "pointer" }}
                onClick={handleCloseDrawer}
              >
                <i className="fa fa-close fas"></i>
                <span>Close</span>
              </Box>
              <Button
                className="btn btn-green btn-sm"
                onClick={SubmitPassenger}
                variant="contained"
                color="success"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <i className="fa fa-arrow-right"></i>
                  <span>Book flight</span>
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.checkoutDrowerBackdrop}></Box>
    </Box>
  );
};

export default PassengerDrawerForm;
