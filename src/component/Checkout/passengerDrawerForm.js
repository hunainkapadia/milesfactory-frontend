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
  PassengerFormFlight,
  setAddNewPassactive,
  setCaptainParams,
  setisPassengerDrawer,
  setPassengerFormError,
} from "@/src/store/slices/passengerDrawerSlice";
import dayjs from "dayjs";
import PhoneInput from "react-phone-input-2";
import ButtonLoading from "../LoadingArea/ButtonLoading";
import { event } from "@/src/utils/utils";
import {
  getPassPofileHotel,
  passengerCaptainHotel,
  PassengerFormHotel,
} from "@/src/store/slices/passengerDrawerHotelSlice";

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
  console.log("countries_00", countries);
  
  const GetViewPassengers = useSelector(
    (state) => state.passengerDrawer.ViewPassengers
  );

  // pass profile
  const selectedpassengerPofile = useSelector(
    (state) => state.passengerDrawer.selectedProfilePass
  );

  const passengerPofile = useSelector(
    (state) => state.passengerDrawer.passProfile
  );
  const PassengersUuID = useSelector(
    (state) => state.passengerDrawer.PassengerUUID
  );
  console.log("isFirstPassenger", PassengersUuID);
  console.log("GetViewPassengers", GetViewPassengers);
  

  const formError = useSelector(
    (state) => state.passengerDrawer.PassengerFormError
  );

  const isFormLoading = useSelector(
    (state) => state.passengerDrawer.isFormLoading
  );
  const isPassengerDrawer = useSelector(
    (state) => state.passengerDrawer.isPassengerDrawer
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
  console.log("PassengerType", PassengerType);
  

  const PassengerAge = useSelector(
    (state) => state.passengerDrawer.PassengerAge
  );

  // get select from whole pasenger detail card

  
  const uuid = useSelector((state) => state?.sendMessage?.threadUuid);
  useEffect(() => {
    if (uuid) {
      dispatch(NationalitData());
    }
  }, [dispatch, uuid]);

  //
  useEffect(() => {
    if (captainSuccess && formSuccess) {
      dispatch(setisPassengerDrawer(false));
    }
  }, [captainSuccess, formSuccess, dispatch]);

  // Load form data or reset on drawer open

  useEffect(() => {
  if (isPassengerDrawer) {
    setTimeout(() => {
      if (passengerPofile?.length && PassengersUuID) {
        const passengerData = passengerPofile.find(
          (getProfilepassenger) =>
            getProfilepassenger.uuid === selectedpassengerPofile?.uuid
        );

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

          // nationality will be re-checked whenever "countries" changes
          const matchedNationality = countries.find(
            (c) => c.id === passengerData.nationality?.id
          );
          if (countries?.length) {
            setNationality(matchedNationality || null);
          }
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
}, [
  isPassengerDrawer,
  GetViewPassengers,
  PassengersUuID,
  countries,   // add this
  dispatch,
]);


  const handleCloseDrawer = () => {
    dispatch(setisPassengerDrawer(false));
    dispatch(setAddNewPassactive(false));
  };

  // Define ranges
  const today = dayjs();
  // Ranges

  // Define static ranges
  // Defaults
  let minDate = dayjs("1930-01-01");
  let maxDate = dayjs();

  const validateChildDOB = (dob, PassengerAge) => {
    maxDate = today.subtract(PassengerAge, "year");
    minDate = today.subtract(PassengerAge + 2, "year").add(1, "day");
  };
  const validateInfantDOB = (dob, PassengerAge) => {
    maxDate = today.subtract(PassengerAge, "year");
    minDate = today.subtract(PassengerAge + 2, "year").add(1, "day");
  };
  // child dat
  // infant age

  if (PassengerType === "adult") {
    // Adults: must be at least 18 years old
    minDate = dayjs("1930-01-01");
    maxDate = today.subtract(18, "year");
  }
  if (PassengerType === "infant_without_seat") {
    validateInfantDOB(born_on, PassengerAge);
  }
  if (PassengerType === "child") {
    validateChildDOB(born_on, PassengerAge);
  } else {
    // fallback: adult
    // minDate = dayjs("1930-01-01");
    // maxDate = today.subtract(18, "year");
  }
  // ...previous imports remain the same
  const CartType = useSelector((state) => state.booking.cartType);

  const selectPassenger = useSelector(
    (state) => state?.passengerDrawer?.SelectPassenger
  );
  console.log("CartType", CartType);

      
      
  const SubmitPassenger = () => {
    const errors = {};

    const nameRegex = /^[A-Za-z\s'-]+$/;
    const passportNumberRegex = /^[A-Za-z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // clear previous errors (so UI updates correctly)
    dispatch(setPassengerFormError({}));

    // --- Gender ---
    if (!gender) errors.gender = "Gender is required.";

    // --- First Name ---
    if (!given_name?.trim()) {
      errors.given_name = "First name is required.";
    } else if (!nameRegex.test(given_name)) {
      errors.given_name = "First name must contain only letters.";
    }

    // --- Last Name ---
    if (!family_name?.trim()) {
      errors.family_name = "Last name is required.";
    } else if (!nameRegex.test(family_name)) {
      errors.family_name = "Last name must contain only letters.";
    }

    // --- DOB ---
    if (!born_on || !dayjs(born_on).isValid()) {
      // Uncomment if DOB required for hotel as well
      // errors.born_on = "Date of birth is required and must be valid.";
    }

    // --- Passport & Nationality: only required for flight bookings ---
    if (CartType === "flight" || CartType === "all") {
      if (!passport_number?.trim()) {
        errors.passport_number = "Passport number is required.";
      } else if (!passportNumberRegex.test(passport_number)) {
        errors.passport_number = "Passport number must be alphanumeric.";
      }

      if (!passport_expire_date) {
        errors.passport_expire_date = "Passport expiry date is required.";
      }

      if (!nationality) {
        errors.nationality = "Nationality is required.";
      }
    }

    // --- Email & Phone (adults only) ---
    if (PassengerType === "adult") {
      if (!email?.trim()) {
        errors.email = "Email is required.";
      } else if (!emailRegex.test(email)) {
        errors.email = "Invalid email format.";
      }

      if (!phone?.trim()) {
        errors.phone_number = "Phone number is required.";
      }
    }

    // --- Child/Infant DOB Validation ---
    if (PassengerType === "child") {
      validateChildDOB(born_on, PassengerAge);
    }
    if (PassengerType === "infant_without_seat") {
      validateInfantDOB(born_on, PassengerAge);
    }

    // --- Handle Errors ---
    if (Object.keys(errors).length > 0) {
      dispatch(setPassengerFormError(errors));
      return;
    }

    // --- Submit Form ---
    const params = {
      gender,
      given_name,
      family_name,
      born_on,
      phone_number: phone,
      email,
      nationality: nationality?.id || "",
      region,
    };

    // Only attach passport fields for flights
    if (CartType === "flight" || CartType === "all") {
      params.passport_number = passport_number;
      params.passport_expire_date = passport_expire_date;
    }

    // ga_event
    event({
      action: "click",
      category: "engagement",
      label: "Passenger Form Submit",
    });

    const isFirstPassenger = GetViewPassengers?.[0]?.uuid === PassengersUuID;
    
    
    if (isFirstPassenger) {
      dispatch(setCaptainParams(params));
    }

    if (CartType === "all" || CartType === "flight") {
      
      dispatch(getPassPofile());
      dispatch(PassengerFormFlight(params));
      dispatch(passengerCaptain(params));
    } else if (CartType === "hotel") {
      dispatch(PassengerFormHotel(params));
      dispatch(passengerCaptainHotel(params));
    }
  };

  const passportError = formError?.non_field_errors?.find(
    (error) => error?.passport_expire_date
  );
  const bornOnError = formError?.non_field_errors?.find(
    (error) => error?.born_on
  );

  // if all passenger file logic
  

  return (
    <Drawer
      anchor="right"
      open={isPassengerDrawer}
      onClose={handleCloseDrawer}
      className={`${styles.checkoutDrower} checkoutDrower00`}
      transitionDuration={300}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          SubmitPassenger();
        }}
      >
        <Box
          className={styles.checkoutDrowerSection + " aa white-bg"}
          width={483}
        >
          <Box
            px={3}
            component={"header"}
            className={"checkoutDrowerHeder"}
            pt={3}
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
            {(CartType === "all" ||
              CartType === "flight") && (
                <Box
                  component={"section"}
                  display="flex"
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <Box>
                    <h3 className="regular mb-0">
                      Traveller details -{" "}
                      <span className="capitalize">
                        {selectPassenger?.type === "infant_without_seat" ? (
                          <>
                            Infant {selectPassenger?.age > 1 ? "s" : ""}{" "}
                            {selectPassenger?.age}{" "}
                            {selectPassenger?.age > 1 ? "years" : "year"}
                          </>
                        ) : selectPassenger?.type === "child" ? (
                          <>
                            Child {selectPassenger?.age}{" "}
                            {selectPassenger?.age > 1 ? "years" : "year"}
                          </>
                        ) : (
                          <>{selectPassenger?.type} 18+ years</>
                        )}
                      </span>{" "}
                    </h3>
                  </Box>
                </Box>
              )}
            <Divider />
          </Box>
          <Box
            className={`${styles.checkoutDrowerBody} ${styles.PassengerFormDrowerBody}`}
          >
            <Box px={3}>
              <Box
                pt={3}
                pb={"36px"}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={"22px"}
              >
                {(CartType === "all" ||
                  CartType === "flight") && (
                    <>
                      <Box className="imggroup">
                        <img
                          height={"70px"}
                          src="/images/user-circle.svg"
                          alt="avatar"
                        />
                      </Box>
                      <Box>
                        {given_name || family_name ? (
                          <h4
                            className="mb-0"
                            style={{ textTransform: "capitalize" }}
                          >
                            {`${given_name ?? ""} ${family_name ?? ""}`.trim()}
                          </h4>
                        ) : (
                          <h4>New Traveller</h4>
                        )}
                      </Box>
                    </>
                  )}

                {CartType === "hotel" && (
                  <>
                    <Box className="imggroup">
                      <img
                        height={"70px"}
                        src="/images/user-circle.svg"
                        alt="hotel guest"
                      />
                    </Box>
                    <Box>
                      {given_name || family_name ? (
                        <h4
                          className="mb-0"
                          style={{ textTransform: "capitalize" }}
                        >
                          {`${given_name ?? ""} ${family_name ?? ""}`.trim()}
                        </h4>
                      ) : (
                        <h4>New Guest</h4>
                      )}
                    </Box>
                  </>
                )}
              </Box>

              {/* === Form Fields === */}
              <Box>
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
                  {console.log("dayjs_date", born_on)}
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
                {(CartType === "all" ||
                  CartType === "flight") && (
                    <>
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
                                newValue
                                  ? dayjs(newValue).format("YYYY-MM-DD")
                                  : ""
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
                    </>
                  )}

                {/* Email */}
                {PassengerType === "adult" && (
                  <>
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
                      {formError?.email && (
                        <Typography className="error" color="red">
                          {formError.email}
                        </Typography>
                      )}
                    </Box>

                    {/* Phone */}
                    <Box className="formGroup">
                      <FormLabel className="bold formLabel">
                        Phone number
                      </FormLabel>
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
                      {formError?.phone_number && (
                        <Typography className="error" color="red">
                          {formError.phone_number}
                        </Typography>
                      )}
                    </Box>
                  </>
                )}
                {(CartType === "all" ||
                  CartType === "flight") && (
                    <>
                      {/* Nationality */}
                      <Box className="formGroup">
                        <FormLabel className="bold formLabel">
                          Nationality
                        </FormLabel>
                        <Autocomplete
                          className="select-dropdown"
                          options={countries}
                          getOptionLabel={(option) => option.name}
                          value={nationality}
                          onChange={(event, newValue) =>
                            setNationality(newValue)
                          }
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
                    </>
                  )}
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
        </Box>
      </form>
    </Drawer>
  );
};

export default PassengerDrawerForm;
