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
  getPassPofile,
  NationalitData,
  passengerCaptain,
  PassengerFormSubmit,
  setCaptainParams,
  setClosePassengerDrawer,
  setPassengerFormError,
} from "@/src/store/slices/passengerDrawerSlice";
import dayjs from "dayjs";
import PhoneInput from "react-phone-input-2";
import ButtonLoading from "../LoadingArea/ButtonLoading";

const PassengerDrawerForm = () => {
  const dispatch = useDispatch();
  const [gender, setgender] = useState("");
  const [given_name, setgiven_name] = useState("");
  const [family_name, setfamily_name] = useState("");
  const [born_on, setborn_on] = useState("");
  const [passport_number, setpassport_number] = useState("");
  const [passport_expire_date, setpassport_expire_date] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [region, setRegion] = useState("");
  const [nationality, setNationality] = useState(null);


  const countries = useSelector((state) => state.passengerDrawer.countries);
  const GetViewPassengers = useSelector(
    (state) => state.passengerDrawer.ViewPassengers
  );

  // pass profile
  const selectedpassengerPofile =  useSelector(
    (state) => state.passengerDrawer.selectedProfilePass
  )
  console.log("selectedpassengerPofile", selectedpassengerPofile?.uuid);
  
  const passengerPofile = useSelector(
    (state) => state.passengerDrawer.passProfile
  );
  const PassengersUuID = useSelector(
    (state) => state.passengerDrawer.PassengerUUID
  );
  console.log("PassengersUuID", PassengersUuID);

  const formError = useSelector(
    (state) => state.passengerDrawer.PassengerFormError
  );

  const isFormLoading = useSelector(
    (state) => state.passengerDrawer.isFormLoading
  );
  const isPassengerDrawerOpen = useSelector(
    (state) => state.passengerDrawer.OpenPassengerDrawer
  );
  const captainSuccess = useSelector(
    (state) => state.passengerDrawer.captainSuccess
  );
  const formSuccess = useSelector(
    (state) => state.passengerDrawer.captainSuccess
  );
  const twelveYearsAgo = dayjs().subtract(12, "year");

  // get passenger type for validation
  const PassengerType = useSelector(
    (state) => state.passengerDrawer.PassengerType
  );
  console.log("get_PassengerType", PassengerType);

  // Define ranges
  const today = dayjs();

  // Ranges
  const maxAdultDate = today.subtract(12, "year"); // Adult: must be before this
  const minChildDate = today.subtract(12, "year").add(1, "day");
  const maxChildDate = today.subtract(2, "year");
  const minInfantDate = today.subtract(2, "year").add(1, "day");

  // Dynamic min/max based on passenger type
  let minDate = dayjs("1900-01-01");
  let maxDate = today;

  if (PassengerType === "adult") {
    maxDate = maxAdultDate;
  } else if (PassengerType === "child") {
    minDate = minChildDate;
    maxDate = maxChildDate;
  } else if (PassengerType === "infant_without_seat") {
    minDate = minInfantDate;
    maxDate = today;
  }

  // Validate age and dispatch error
  useEffect(() => {
    if (born_on && PassengerType) {
      const age = dayjs().diff(dayjs(born_on), "year");
      console.log("pass_age", age);

      if (PassengerType === "adult" && age < 12) {
        dispatch(
          setPassengerFormError({
            born_on: "Adult must be at least 12 years old",
          })
        );
      } else if (PassengerType === "child" && (age < 2 || age >= 12)) {
        dispatch(
          setPassengerFormError({
            born_on:
              "Child passenger must be less than 12 and at least 2 years old",
          })
        );
      } else if (PassengerType === "infant_without_seat" && age >= 2) {
        dispatch(
          setPassengerFormError({
            born_on: "Baby passenger must be less than 2 years old",
          })
        );
      } else {
        dispatch(setPassengerFormError({ born_on: "" })); // clear error
      }
    }
  }, [born_on, PassengerType, dispatch]);

  // Optional: Clear invalid date when switching type
  useEffect(() => {
    if (!born_on) return;

    const dob = dayjs(born_on);
    if (dob.isBefore(minDate) || dob.isAfter(maxDate)) {
      setborn_on(""); // reset if date is out of range
    }
  }, [PassengerType]);

  useEffect(() => {
    dispatch(NationalitData());
  }, [dispatch]);

  console.log("passengerPofile", passengerPofile);

  useEffect(() => {
    dispatch(getPassPofile()); // pasenger profile call api
  }, []); //
  useEffect(() => {
    if (captainSuccess && formSuccess) {
      dispatch(setClosePassengerDrawer());
    }
  }, [captainSuccess, formSuccess, dispatch]);

  // Load form data or reset on drawer open

  console.log("given_name", given_name);
  
  useEffect(() => {
  if (isPassengerDrawerOpen) {
    setTimeout(() => {
      console.log("passengerPofile:", passengerPofile);
      console.log("PassengersUuID:", PassengersUuID);

      if (passengerPofile?.length && PassengersUuID) {
        
        const passengerData = passengerPofile.find(
          (getProfilepassenger) => getProfilepassenger.uuid === selectedpassengerPofile?.uuid
        );


        console.log("passengerData_0:", passengerData);

        if (passengerData) {
          setgender(passengerData.gender || "");
          setgiven_name(passengerData.given_name || "");
          setfamily_name(passengerData.family_name || "");
          setborn_on(passengerData.born_on || "");
          setpassport_number(passengerData.passport_number || "");
          setpassport_expire_date(passengerData.passport_expire_date || "");
          setphone(passengerData.phone_number || "");
          setemail(passengerData.email || "");
          setRegion(passengerData.phone_number || "");

          // ✅ Nationality matched here
          const matchedNationality = countries.find(
            (c) => c.id === passengerData.nationality?.id
          );
          setNationality(matchedNationality || null);
        }
      }
    }, 500);
  } else {
    // Reset form when drawer is closed
    setgender("");
    setgiven_name("");
    setfamily_name("");
    setborn_on("");
    setpassport_number("");
    setpassport_expire_date("");
    setNationality(null);
    setphone("");
    setemail("");
    setRegion("");
  }

  dispatch(setPassengerFormError(null));
}, [
  isPassengerDrawerOpen,
  GetViewPassengers,
  PassengersUuID,
  countries,
  dispatch,
]);


  const handleCloseDrawer = () => {
    dispatch(setClosePassengerDrawer());
  };

  const SubmitPassenger = () => {
    const params = {
      gender,
      given_name,
      family_name,
      born_on,
      passport_number,
      passport_expire_date,
      phone_number: phone,
      email,
      nationality: nationality?.id || "",
      region,
    };
    dispatch(PassengerFormSubmit(params));
    console.log("params_age", params);

    // for captain 1st passenger data

    const isFirstPassenger = GetViewPassengers?.[0]?.uuid === PassengersUuID;
    console.log("Is first passenger:", isFirstPassenger);

    // If this is the first passenger, also submit as captain
    if (isFirstPassenger) {
      console.log("params_pass", params);
      dispatch(setCaptainParams(params));
      dispatch(passengerCaptain()); // for captain api passenger sending params
    }
    dispatch(passengerCaptain()); // for captain api passenger call from redux
  };

  const passportError = formError?.non_field_errors?.find(
    (error) => error?.passport_expire_date
  );
  const bornOnError = formError?.non_field_errors?.find(
    (error) => error?.born_on
  );

  // if all passenger file logic
  const AllPassengerFill = useSelector(
    (state) => state.passengerDrawer.allPassengerFill
  );
  console.log("AllPassengerFill", AllPassengerFill);

  return (
    <Drawer
      anchor="right"
      open={isPassengerDrawerOpen}
      onClose={handleCloseDrawer}
      className={`${styles.checkoutDrower} checkoutDrower00`}
      transitionDuration={300}
    >
      <Box
        className={`${styles.checkoutDrower} bbb white-bg ${styles.PassengerDrower}`}
        width={480}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            SubmitPassenger();
          }}
        >
          <Box className={styles.checkoutDrowerSection + " aa white-bg"}>
            <Box
              px={3}
              component={"header"}
              className={styles.checkoutDrowerHeder}
              py={3}
              display="flex"
              justifyContent="space-between"
              flexDirection={"column"}
              gap={3}
            >
              <Box
                component={"section"}
                gap={1}
                alignItems="center"
                display="flex"
                className={" bold basecolor1 btn-link cursor-pointer"}
                onClick={handleCloseDrawer}
              >
                <i className={`fa fa-arrow-left fas`}></i>{" "}
                <Box component={"span"}>Back to Mylz Chat</Box>
              </Box>
              <Box
                component={"section"}
                display="flex"
                justifyContent="space-between"
                alignItems={"center"}
              >
                <Box>
                  <h3 className="regular mb-0">Traveller details</h3>
                </Box>
              </Box>
              <Divider />
            </Box>
            <Box px={3}>
              <Box
                sx={{ pt: { lg: 2, md: 2 } }}
                pb={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <Box className="imggroup">
                  <img
                    height={"70px"}
                    src="/images/user-circle.svg"
                    alt="avatar"
                  />
                </Box>
                <Box>
                  <h4>New traveller</h4>
                </Box>
              </Box>

              {/* === Form Fields === */}
              <Box py={2}>
                {/* Gender */}
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

                {/* Name Fields */}
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

                {/* DOB */}
                <Box className="formGroup">
                  <FormLabel className="bold formLabel">
                    Date of Birth
                  </FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="formControl Calendar"
                      value={born_on ? dayjs(born_on) : null}
                      onChange={(newValue) =>
                        setborn_on(
                          newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                        )
                      }
                      minDate={minDate}
                      maxDate={maxDate}
                      format="DD/MM/YYYY"
                      openTo="year"
                      views={["year", "month", "day"]}
                    />
                  </LocalizationProvider>

                  <Typography className="error" color="red">
                    {formError?.born_on || bornOnError?.born_on}
                  </Typography>
                </Box>

                {/* Passport Info */}
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

                <Box className="formGroup">
                  <FormLabel className="bold formLabel">
                    Passport Expiry Date
                  </FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="formControl Calendar"
                      value={
                        passport_expire_date
                          ? dayjs(passport_expire_date)
                          : null
                      }
                      onChange={(newValue) =>
                        setpassport_expire_date(
                          newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                        )
                      }
                      minDate={dayjs().startOf("year")}
                      openTo="year"
                      views={["year", "month", "day"]}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                  <Typography className="error" color="red">
                    {formError?.passport_expire_date ||
                      passportError?.passport_expire_date}
                  </Typography>
                </Box>

                {/* Email */}
                <Box className="formGroup">
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

                {/* Phone */}
                <Box className="formGroup">
                  <FormLabel className="bold formLabel">Phone number</FormLabel>
                  <PhoneInput
                    country={"us"}
                    value={phone}
                    onChange={(value, country) => {
                      setphone(value);
                      setRegion(country.countryCode?.toUpperCase());
                    }}
                    inputStyle={{ width: "100%" }}
                    specialLabel=""
                    enableSearch
                  />
                  {formError?.phone_number?.[0] && (
                    <Typography className="error" color="red">
                      {formError.phone_number[0]}
                    </Typography>
                  )}
                </Box>

                {/* Nationality */}
                <Box className="formGroup">
                  <FormLabel className="bold formLabel">Nationality</FormLabel>
                  <Autocomplete
                    className="select-dropdown"
                    options={countries}
                    getOptionLabel={(option) => option.name}
                    value={nationality}
                    onChange={(event, newValue) => setNationality(newValue)}
                    popupIcon={<i className="fa f16 fa-angle-down"></i>}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        placeholder="Nationality"
                        autoComplete="new-country" // prevents Chrome autofill
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-country", // unique and non-standard
                        }}
                      />
                    )}
                  />

                  {formError?.nationality && (
                    <Typography className="error" color="red">
                      {formError.nationality}
                    </Typography>
                  )}
                  {formError?.error && (
                    <Typography className="error" color="red">
                      {formError.error}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Footer */}
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
                    <span>Cancel</span>
                  </Box>

                  <Button
                    type="submit" // Important!
                    className="btn btn-primary chat-btn btn-round"
                    onClick={SubmitPassenger}
                    disabled={isFormLoading} // Disable when loading
                    variant="contained"
                    color="success"
                  >
                    {isFormLoading ? <ButtonLoading /> : <span>Save</span>}
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
