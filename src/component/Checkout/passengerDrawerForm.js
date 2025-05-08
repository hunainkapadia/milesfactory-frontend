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
  Drawer,
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
  setPassengerFormError,
} from "@/src/store/slices/passengerDrawerSlice";
import dayjs from "dayjs";
import AddPassengersStep from "./AddPassengersStep";
import Link from "next/link";
import ButtonLoading from "../LoadingArea/ButtonLoading";
import PhoneInput from "react-phone-input-2";

const PassengerDrawerForm = () => {
  const dispatch = useDispatch();
  const [gender, setgender] = useState();
  const [given_name, setgiven_name] = useState();
  const [family_name, setfamily_name] = useState();
  const [born_on, setborn_on] = useState();
  const [passport_number, setpassport_number] = useState();
  const [passport_expire_date, setpassport_expire_date] = useState();
  const [nationality, setnationality] = useState();
  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const [region, setRegion] = useState();
  // const isValidPhone = phone.length > 8 && phone.match(/^\d+$/); // example

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
    phone_number: phone,
    email: email,
    nationality: nationality?.id || "",
    region: region,
  };
  console.log("params__0", params);
  
  // Fetch nationality data when the component mounts
  useEffect(() => {
    dispatch(NationalitData());
  }, [dispatch]);

  const handleCloseDrawer = () => {
    dispatch(setClosePassengerDrawer());
  };

  const SubmitPassenger = () => {
    // dispatch(setIsFormLoading(true));
    dispatch(PassengerFormSubmit(params));
  };
  const formError = useSelector(
    (state) => state.passengerDrawer.PassengerFormError
  );
  const isFormLoading = useSelector(
    (state) => state.passengerDrawer.isFormLoading
  );
  const twelveYearsAgo = dayjs().subtract(12, "year");

  const passportError = formError?.non_field_errors?.find(
    (error) => error?.passport_expire_date
  );
  const bornOnError = formError?.non_field_errors?.find(
    (error) => error?.born_on
  );

  console.log("formError__", formError);

  console.log("isFormLoading", isFormLoading);
  const captainSuccess = useSelector(
    (state) => state?.passengerDrawer?.captainSuccess
  );
  const formSuccess = useSelector(
    (state) => state?.passengerDrawer?.captainSuccess
  );
  if (captainSuccess && formSuccess) {
    dispatch(setClosePassengerDrawer());
  }

  console.log("captain000", captainSuccess, formSuccess);
  
  // {passportError?.passport_expire_date}
  const isPassengerDrawerOpen = useSelector(
    (state) => state.passengerDrawer?.OpenPassengerDrawer
  );
  useEffect(() => {
    if (isPassengerDrawerOpen) {
      setgender("");
      setgiven_name("");
      setfamily_name("");
      setborn_on("");
      setpassport_number("");
      setpassport_expire_date("");
      setnationality(null);
      setphone("");
      setemail("");
      setRegion("");
      dispatch(setPassengerFormError(null)); // clear any previous errors
    }
  }, [isPassengerDrawerOpen, dispatch]);
  return (
    <Drawer
        anchor="right"
        open={isPassengerDrawerOpen}
        onClose={handleCloseDrawer}
        className={`${styles.BaggageDrawer} BaggageDrawer`}
        transitionDuration={300}
      >
        <Box
          className={`${styles.checkoutDrower + " checkoutDrower"} white-bg ${
            styles.PassengerDrower
          }`}
          width={480}
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
                    <h3 className="regular mb-0">Add new traveller</h3>
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
                    <FormLabel className="bold formLabel">
                      Gender as per passport
                    </FormLabel>
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
                    <FormLabel className="bold formLabel">First Name</FormLabel>
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
                    <FormLabel className="bold formLabel">Last Name</FormLabel>
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
                    <FormLabel className="bold formLabel">Date of Birth</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className="formControl Calendar"
                        value={born_on ? dayjs(born_on) : null}
                        onChange={(newValue) =>
                          setborn_on(
                            newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                          )
                        }
                        maxDate={twelveYearsAgo}
                        format="DD/MM/YYYY" // <-- This sets the display format
                        renderInput={(params) => (
                          <TextField {...params} fullWidth margin="normal" />
                        )}
                        openTo="year"
                        views={["year", "month", "day"]}
                      />
                    </LocalizationProvider>

                    <Typography className="error" color="red">
                      {formError?.born_on || bornOnError?.born_on}
                    </Typography>
                  </Box>
                  <Box className="formGroup">
                    <FormLabel className="bold formLabel">
                      Passport Number
                    </FormLabel>
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
                    <FormLabel className="bold formLabel">
                      Passport Expiry Date
                    </FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className="formControl Calendar"
                        value={
                          passport_expire_date ? dayjs(passport_expire_date) : null
                        }
                        onChange={(newValue) =>
                          setpassport_expire_date(
                            newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                          )
                        }
                        minDate={dayjs().startOf("year")}
                        openTo="year"
                        views={["year", "month", "day"]}
                        format="DD/MM/YYYY" // <-- Display format updated
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
                      {formError?.passport_expire_date ||
                        passportError?.passport_expire_date}
                    </Typography>
                  </Box>
                  <Box className=" formGroup">
                    <FormLabel className="bold formLabel">Email</FormLabel>
                    <TextField
                      className="formControl"
                      fullWidth
                      placeholder="Enter Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      margin="normal"
                    />
                    {formError?.email?.[0] && (
                      <Typography className="error" color="red">
                        {formError.email[0]}
                      </Typography>
                    )}
                  </Box>

                  <Box className="formGroup">
                    <FormLabel className="bold formLabel">Phone number</FormLabel>
                    <PhoneInput
                      country={"us"} // Default to Netherlands
                      value={phone}
                      onChange={(value, country) => {
                        setphone(value);
                        setRegion(country.countryCode?.toUpperCase()); // "us" -> "US"
                      }}
                      inputStyle={{ width: "100%" }}
                      specialLabel="" // Removes duplicate label
                      enableSearch
                    />
                    {formError?.phone_number?.[0] && (
                      <Typography className="error" color="red">
                        {formError.phone_number[0]}
                      </Typography>
                    )}
                  </Box>
                  <Box className="formGroup">
                    <FormLabel className="bold formLabel">Nationality</FormLabel>
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
                  {formError?.error && (
                    <Typography className="error" color="red">
                      {formError?.error}
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
                      {isFormLoading ? <ButtonLoading /> : <span>Continue</span>}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
    </Drawer>
  );
};

export default PassengerDrawerForm;
