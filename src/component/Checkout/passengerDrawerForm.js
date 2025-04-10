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
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  bookFlight,
  NationalitData,
  PassengerForm,
  PassengerFormSubmit,
  setClosePassengerDrawer,
  setIsFormLoading,
} from "@/src/store/slices/passengerDrawerSlice";
import dayjs from "dayjs";
import AddPassengersStep from "./AddPassengersStep";
import Link from "next/link";
import ButtonLoading from "../LoadingArea/ButtonLoading";

const PassengerDrawerForm = () => {
  const dispatch = useDispatch();
  const [gender, setgender] = useState();
  const [given_name, setgiven_name] = useState();
  const [family_name, setfamily_name] = useState();
  const [born_on, setborn_on] = useState();
  const [passport_number, setpassport_number] = useState();
  const [passport_expire_date, setpassport_expire_date] = useState();
  const [nationality, setnationality] = useState();

  // getting error

  const countries = useSelector((state) => state.passengerDrawer.countries);
  const GetViewPassengers = useSelector(
    (state) => state?.passengerDrawer?.ViewPassengers
  );

  const params = {
    gender: gender,
    given_name: given_name,
    family_name: family_name,
    born_on: born_on,
    passport_number: passport_number,
    passport_expire_date: passport_expire_date,
    nationality: nationality?.id || "",
  };
  // Fetch nationality data when the component mounts
  useEffect(() => {
    dispatch(NationalitData());
  }, [dispatch]);

  const handleCloseDrawer = () => {
    dispatch(setClosePassengerDrawer());
  };

  const SubmitPassenger = () => {
    dispatch(setIsFormLoading(true));
    dispatch(PassengerFormSubmit(params));
  };
  const formError = useSelector(
    (state) => state.passengerDrawer.PassengerFormError
  );
  const isFormLoading = useSelector(
    (state) => state.passengerDrawer.isFormLoading
  );
  const twelveYearsAgo = dayjs().subtract(12, "year");

  const passportError = formError?.non_field_errors?.find(error => error?.passport_expire_date);
  const bornOnError = formError?.non_field_errors?.find(error => error?.born_on);
  
  
  
  
  
// {passportError?.passport_expire_date}
  
  return (
    <Box
      className={`${styles.checkoutDrower + " checkoutDrower"} white-bg ${
        styles.PassengerDrower
      }`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page reload
          SubmitPassenger(); // Call login
        }}
      >
        <Box className={styles.checkoutDrowerSection + " white-bg"}>
          <Box px={3}>
            <Box
              className={styles.checkoutDrowerHeder}
              py={3}
              display="flex"
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Box>
                <h4 className="regular mb-0">Add new traveller</h4>
                <Typography className="semibold">Adult</Typography>
              </Box>
              <Box className=" cursor-pointer" onClick={handleCloseDrawer}>
                <i className="fa fa-close fas"></i>
              </Box>
            </Box>
            <Box>
              <Divider />
            </Box>
            <Box
              pt={2}
              pb={4}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
            >
              <Box className="imggroup">
                <img height={"70px"} src="/images/user-circle.svg" />
              </Box>
              <Box>
                <h4>New traveller</h4>
              </Box>
            </Box>

            <Box py={2}>
              <Box className="formGroup">
                <FormLabel className="bold">Gender as per passport</FormLabel>
                <RadioGroup
                  row
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <FormControlLabel
                    value="m"
                    control={<Radio className="customRadio" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="f"
                    control={<Radio className="customRadio" />}
                    label="Female"
                  />
                </RadioGroup>
                {formError?.gender && (
                  <Typography className="error" color="red">
                    {formError.gender}
                  </Typography>
                )}
              </Box>

              <Box className="formGroup">
                <FormLabel className="bold">First Name</FormLabel>
                <TextField
                  className="formControl"
                  fullWidth
                  placeholder="Enter First Name"
                  value={given_name}
                  onChange={(e) => setgiven_name(e.target.value)}
                  margin="normal"
                />
                {formError?.given_name && (
                  <Typography className="error" color="red">
                    {formError.given_name}
                  </Typography>
                )}
              </Box>
              <Box className="formGroup">
                <FormLabel className="bold">Last Name</FormLabel>
                <TextField
                  className="formControl"
                  fullWidth
                  placeholder="Enter Last Name"
                  value={family_name}
                  onChange={(e) => setfamily_name(e.target.value)}
                  margin="normal"
                />
                {formError?.family_name && (
                  <Typography className="error" color="red">
                    {formError.family_name}
                  </Typography>
                )}
              </Box>
              <Box width="100%" className="formGroup">
                <FormLabel className="bold">Date of Birth</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="formControl"
                    value={born_on ? dayjs(born_on) : null}
                    onChange={(newValue) =>
                      setborn_on(
                        newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                      )
                    }
                    maxDate={twelveYearsAgo} // Disable dates after this
                    renderInput={(params) => (
                      <TextField {...params} fullWidth margin="normal" />
                    )}
                    openTo="year" // Start with year picker
                    views={["year", "month", "day"]} // Order of selection
                  />
                </LocalizationProvider>
                <Typography className="error" color="red">
                  {formError?.born_on || bornOnError?.born_on}
                </Typography>
              </Box>
              <Box className="formGroup">
                <FormLabel className="bold">Passport Number</FormLabel>
                <TextField
                  className="formControl"
                  fullWidth
                  placeholder="Enter Passport Number"
                  value={passport_number}
                  onChange={(e) => setpassport_number(e.target.value)}
                  margin="normal"
                />
                <Typography className="error" color="red">
                  {formError?.passport_number}
                </Typography>
              </Box>
              <Box width="100%" className="formGroup">
                <FormLabel className="bold">Passport Expiry Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="formControl"
                    value={
                      passport_expire_date ? dayjs(passport_expire_date) : null
                    }
                    onChange={(newValue) =>
                      setpassport_expire_date(
                        newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                      )
                    }
                    minDate={dayjs().startOf("year")} // Disables all years before current year
                    openTo="year"
                    views={["year", "month", "day"]}
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
                <Typography className="error" color="red">
                
                  {formError?.passport_expire_date || passportError?.passport_expire_date}
                </Typography>
              </Box>
              <Box className="formGroup">
                <FormLabel className="bold">Nationality</FormLabel>
                <Autocomplete
                  className="select-dropdown"
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  value={nationality} // Ensure this is a valid object from `countries`
                  onChange={(event, newValue) => setnationality(newValue)} // Use newValue directly
                  popupIcon={<i class="fa f16 fa-angle-down"></i>} // Custom FA icon
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder="Nationality"
                    />
                  )}
                />
              </Box>
              {formError?.nationality && (
                <Typography className="error" color="red">
                {formError?.nationality}
                </Typography>
              )}
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
                  disabled={isFormLoading} // Disable when loading
                >
                  <span>Close</span>
                </Box>

                <Button
                  type="submit" // Important!
                  className="btn btn-primary btn-md btn-round"
                  onClick={SubmitPassenger}
                  disabled={isFormLoading} // Disable when loading
                  variant="contained"
                  color="success"
                >
                  {isFormLoading ? <ButtonLoading /> : <span>Book flight</span>}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
      <Box className={styles.checkoutDrowerBackdrop}></Box>
    </Box>
  );
};

export default PassengerDrawerForm;
