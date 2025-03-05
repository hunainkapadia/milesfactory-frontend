import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Button,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { closePassengerDrawer, bookFlight } from "@/src/store/slices/passengerDrawerSlice";

const nationalities = ["Pakistan", "India", "USA", "Canada", "UK", "Germany"]; // Example

const BookingDrawerPassenger = () => {
  const isOpen = useSelector((state) => state.passengerDrawer.isOpen);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    dob: null,
    passportNumber: "",
    passportExpiry: null,
    nationality: "",
    email: "",
    phone: "",
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCloseDrawer = () => {
    dispatch(closePassengerDrawer());
  };

  const handleBookFlight = () => {
    console.log("Booking flight with data:", formData);
    dispatch(bookFlight(formData)); // Store passenger details in Redux
    dispatch(closePassengerDrawer()); // Close drawer after booking
  };

  return (
    <Box className={`${styles.checkoutDrower} white-bg ${styles.PassengerDrower}`}>
      <Box className={styles.checkoutDrowerSection + " white-bg"}>
        <Box className={styles.checkoutDrowerBody}>
          {/* Header */}
          <Box className={styles.checkoutDrowerHeder} py={2} px={3} display="flex" justifyContent="space-between">
            <div>Main passenger</div>
            <div>Adult</div>
          </Box>
          <Divider />

          {/* Form */}
          <Box py={2} px={3}>
            <Box>
              <FormLabel>Gender as per passport</FormLabel>
              <RadioGroup row value={formData.gender} onChange={(e) => handleChange("gender", e.target.value)}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </Box>

            <Box>
              <FormLabel>First Name</FormLabel>
              <TextField
                className="formControl"
                fullWidth
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                margin="normal"
              />
            </Box>

            <Box>
              <FormLabel>Last Name</FormLabel>
              <TextField
                className="formControl"
                fullWidth
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                margin="normal"
              />
            </Box>

            <Box width="100%">
              <FormLabel>Date of Birth</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="formControl"
                  value={formData.dob}
                  onChange={(date) => handleChange("dob", date)}
                  renderInput={(params) => <TextField className="formControl" {...params} fullWidth margin="normal" />}
                />
              </LocalizationProvider>
            </Box>

            <Box>
              <FormLabel>Passport Number</FormLabel>
              <TextField
                className="formControl"
                fullWidth
                placeholder="Enter Passport Number"
                value={formData.passportNumber}
                onChange={(e) => handleChange("passportNumber", e.target.value)}
                margin="normal"
              />
            </Box>

            <Box width="100%">
              <FormLabel>Passport Expiry Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="formControl"
                  value={formData.passportExpiry}
                  onChange={(date) => handleChange("passportExpiry", date)}
                  renderInput={(params) => <TextField className="formControl" {...params} fullWidth margin="normal" />}
                />
              </LocalizationProvider>
            </Box>

            <Box>
              <FormLabel>Email</FormLabel>
              <TextField
                className="formControl"
                fullWidth
                placeholder="Enter Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                margin="normal"
              />
            </Box>

            <Box>
              <FormLabel>Phone Number</FormLabel>
              <TextField
                className="formControl"
                fullWidth
                placeholder="Enter Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                margin="normal"
              />
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box className={styles.passengerDrawerFooter}>
          <Divider />

          <Box className={styles.checkoutDrowerHeder} py={1} px={3} display="flex" flexDirection="column">
            {/* Actions Section */}
            <Box display="flex" justifyContent="flex-end" alignItems="center" gap={3}>
              {/* Close Button */}
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

              {/* Select Flight Button */}
              <Button className="btn btn-green btn-sm" onClick={handleBookFlight} variant="contained" color="success">
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

export default BookingDrawerPassenger;
