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
} from "@/src/store/slices/passengerDrawerSlice";

const PassengerDrawerForm = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.passengerDrawer.isOpen);
  const countries = useSelector((state) => state.passengerDrawer.countries);
  console.log("countries", countries);
  

  const [formData, setFormData] = useState({
    gender: "",
    given_name: "",
    family_name: "",
    born_on: null,
    passport_number: "",
    passport_expire_date: null,
    nationality: null,
    email: "",
    phone: "",
  });

  // Fetch nationality data when the component mounts
  useEffect(() => {
    dispatch(NationalitData());
  }, [dispatch]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCloseDrawer = () => {
    dispatch(closePassengerDrawer());
  };

  const handleBookFlight = () => {
    console.log("Booking flight with data:", formData);
    dispatch(bookFlight(formData));
    dispatch(closePassengerDrawer());
  };

  const nationalities = [
    { code: "US", label: "United States" },
    { code: "GB", label: "United Kingdom" },
    { code: "IN", label: "India" },
    { code: "PK", label: "Pakistan" },
    { code: "CA", label: "Canada" },
    { code: "AU", label: "Australia" },
  ];

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
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
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
                value={formData.given_name}
                onChange={(e) => handleChange("given_name", e.target.value)}
                margin="normal"
              />
            </Box>

            <Box>
              <FormLabel>Last Name</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter Last Name"
                value={formData.family_name}
                onChange={(e) => handleChange("family_name", e.target.value)}
                margin="normal"
              />
            </Box>

            <Box width="100%">
              <FormLabel>Date of Birth</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="formControl"
                  value={formData.born_on}
                  onChange={(date) => handleChange("born_on", date)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" />
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
                value={formData.countries}
                onChange={(event, newValue) =>
                  handleChange("nationality", newValue)
                }
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
                onClick={handleBookFlight}
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
