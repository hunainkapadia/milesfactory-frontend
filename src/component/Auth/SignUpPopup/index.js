import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  FormLabel,
  CircularProgress,
  Drawer,
  FormControlLabel,
  Checkbox,
  Dialog,
  IconButton,
  DialogContent,
  InputAdornment,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignupPopup,
  SignUpUser,
} from "@/src/store/slices/Auth/SignupSlice";
import Link from "next/link";
import { setLoginPopup } from "@/src/store/slices/Auth/LoginSlice";
import { LoadingButton } from "@mui/lab";
import ButtonLoading from "../../LoadingArea/ButtonLoading";
import { useRouter } from "next/router";
const SignUpPopup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [emailUpdate, setEmailUpdate] = useState(false);

  const params = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  };

  // get error
  const { firstNameError, lastNameError, emailError, passwordError } =
    useSelector((state) => state.signup);

  const isFormSupmit = useSelector((state) => state?.signup?.SignupUser);
  // error
  const isLoading = useSelector((state) => state.signup.isLoading);
  const handleSignUp = () => {
    dispatch(SignUpUser(params));
  };
  // issignup submit redirect to home
  //
  const isuserLogin = useSelector(
    (state) => state?.login?.IsUser?.status === 200
  );
  // get user from cookie with redux for redirect to home

  // for login popup
  const isSignupPopup = useSelector((state) => state?.signup?.SignupPopup);

  const HandleSignupPopupClose = () => {
    dispatch(setSignupPopup(false));
  };

  const isFormValid =
  firstName &&
  lastName &&
  email &&
  password &&
  agreeTerms;
  return (
    <Dialog
      open={isSignupPopup}
      onClose={HandleSignupPopupClose}
      maxWidth="sm" // Set max width to 1280px
      fullWidth // Forces Dialog to expand to maxWidth
      className="modalDialog"
    >
      <IconButton
        aria-label="close"
        onClick={HandleSignupPopupClose}
        sx={{
          position: "absolute",
          right: 16,
          zIndex: 1,
          top: 8,
          color: "#000", // Change color if needed
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </IconButton>
      <DialogContent
        sx={{
          textAlign: { xs: "center", md: "left", lg: "left" },
        }}
      >
        <Box
          component={"main"}
          className={styles.signupSection + " bg-cover bg-norepeat bg-center"}
        >
          <Box sx={{ px: { lg: 10, md: 10, xs: 0 } }} position={"relative"}>
            <Box mb={2}>
              <h3 className="center">Create an account</h3>
            </Box>
            <Box>
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent page reload
                }}
              >
                <Box container spacing={2}>
                  <Box className=" formGroup">
                    <TextField
                      className="formControl"
                      fullWidth
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      margin="normal"
                    />
                    <Typography className="error" color="red">
                      {firstNameError}
                    </Typography>
                  </Box>

                  <Box className=" formGroup">
                    <TextField
                      className="formControl"
                      fullWidth
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      margin="normal"
                    />
                  </Box>
                  <Typography className="error" color="red">
                    {lastNameError}
                  </Typography>

                  <Box className=" formGroup">
                    <TextField
                      className="formControl"
                      fullWidth
                      placeholder="Enter Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="normal"
                    />
                  </Box>
                  <Typography className="error" color="red">
                    {emailError}
                  </Typography>

                  <Box className="formGroup mb-0">
                    <TextField
                      className="formControl"
                      fullWidth
                      placeholder="Enter Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      margin="normal"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge="end"
                            >
                              {showPassword ? (
                                <img src="/images/eye-active.svg" />
                              ) : (
                                <img src="/images/eye-deactive.svg" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Typography className="error" color="red">
                      {passwordError}
                    </Typography>
                  </Box>
                  {/* <Alert severity="error" sx={{ mt: 2 }}></Alert> */}

                  <Box>
                    <Box mt={2}>
                      <label>
                        <Box display="flex" alignItems="flex-start" gap={1}>
                          <Checkbox
                            checked={emailUpdate}
                            onChange={(e) => setEmailUpdate(e.target.checked)}
                            sx={{
                              color: "gray", // unchecked color
                              "&.Mui-checked": {
                                color: "black", // checked color
                              },
                              mt: "4px",
                            }}
                          />

                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ cursor: "pointer", userSelect: "none" }}
                          >
                            I’d like to receive personalised offers and be the
                            first to know about latest Mylz updates via email
                          </Typography>
                        </Box>
                      </label>
                    </Box>
                    <Box mt={2}>
                      <label>
                        <Box display="flex" alignItems="flex-start" gap={1}>
                          <Checkbox
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            sx={{
                              color: "gray", // unchecked color
                              "&.Mui-checked": {
                                color: "black", // checked color
                              },
                              mt: "4px",
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ cursor: "pointer" }}
                          >
                            By registering, I confirm that I accept the{" "}
                            <Link
                              href="/terms-and-conditions"
                              passHref
                              legacyBehavior
                            >
                              <a
                                target="_blank"
                                className="basecolor"
                                style={{ textDecoration: "underline" }}
                                onClick={(e) => e.stopPropagation()} // prevents toggling checkbox when clicking link
                              >
                                Terms & Conditions
                              </a>
                            </Link>
                            , have read{" "}
                            <Link href="/privacy" passHref legacyBehavior>
                              <a
                                className="basecolor"
                                target="_blank"
                                style={{ textDecoration: "underline" }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                Privacy
                              </a>
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/sanctions-compliance"
                              passHref
                              legacyBehavior
                            >
                              <a
                                className="basecolor"
                                target="_blank"
                                style={{ textDecoration: "underline" }}
                              >
                                Sanctions Compliance
                              </a>
                            </Link>
                            , and am at least 18 years old.
                          </Typography>
                        </Box>
                      </label>
                    </Box>
                    {/*  */}
                    <Box
                      pt={2}
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                      gap={3}
                    >
                      {/* Select Flight Button */}
                      <Button
                        onClick={handleSignUp}
                        variant="contained"
                        color="success"
                        disabled={isLoading} // Disable when loading
                        width={"100%"}
                        type="submit" // Important!
                        className="btn btn-primary btn-md btn-round" // Important!
                        sx={{
                          width: { xs: "100%", lg: "100%", md: "100%" },
                          opacity: `${isFormValid ? "100%" : "50%"}`,
                        }}
                      >
                        {isLoading ? (
                          <ButtonLoading />
                        ) : (
                          <Box display="flex" alignItems="center" gap={1}>
                            <span>Continue</span>
                          </Box>
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Box>
                {/*  */}
                {/* Footer */}
              </form>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpPopup;
