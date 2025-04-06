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
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDrawer,
  openDrawer,
  setCloseDrawer,
  setSignupPopup,
  setsignUpUser,
  SignUpUser,
  SignupUser,
} from "@/src/store/slices/Auth/SignupSlice";
import api from "@/src/store/api";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  loginOpenDrawer,
  setLoginCloseDrawer,
  setLoginOpenDrawer,
  setLoginPopup,
} from "@/src/store/slices/Auth/LoginSlice";
import { LoadingButton } from "@mui/lab";
import ButtonLoading from "../../LoadingArea/ButtonLoading";
import { useRouter } from "next/router";
import LoginWithOptions from "../LoginWithOptions";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
  console.log("isFormSupmit", isFormSupmit);

  // error
  const isLoading = useSelector((state) => state.signup.isLoading);
  const handleSignUp = () => {
    dispatch(SignUpUser(params));
  };
  // issignup submit redirect to home
  useEffect(() => {
    if (isFormSupmit) {
      router.push("/");
    }
  }, [isFormSupmit, router]);
  //
  const isuserLogin = useSelector(
    (state) => state?.login?.IsUser?.status === 200
  );
  // get user from cookie with redux for redirect to home

  useEffect(() => {
    if (isuserLogin) {
      router.push("/");
    }
  }, [isuserLogin, router]);

  // for login popup
  const HandleLogin = () => {
    dispatch(setSignupPopup(false));
    dispatch(setLoginPopup(true)); // for close login popup
      // dispatch(setLoginPopup(true)); // for close login popup
    };

  return (
    <main className={styles.signupSection + " bg-cover bg-norepeat bg-center"}>
      <Box py={2} px={10} position={"relative"}>
        <Box>
          <Box mb={5}>
            <h1 className="center">Create an account</h1>
            <Typography textAlign={"center"} pt={2}>
              Already have an account?{" "}
              <Box onClick={HandleLogin} className="basecolor-dark">
                Sign in
              </Box>
            </Typography>
          </Box>
          <LoginWithOptions />
          <Typography align="center" mb={2}>
            Enter your email below to create an account.
          </Typography>

          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent page reload
                handleLogin(); // Call login
              }}
            >
              <Box container spacing={2} py={2}>
                <Box className=" formGroup">
                  <FormLabel className=" formLabel">First Name</FormLabel>
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
                  <FormLabel className=" formLabel">Last Name</FormLabel>
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
                  <FormLabel className=" formLabel">Email</FormLabel>
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

                <Box className=" formGroup mb-0">
                  <FormLabel className=" formLabel">Password</FormLabel>
                  <TextField
                    className="formControl"
                    fullWidth
                    placeholder="Enter Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                  />
                </Box>
                <Typography className="error" color="red">
                  {passwordError}
                </Typography>
                {/* <Alert severity="error" sx={{ mt: 2 }}></Alert> */}

                <Box>
                  <Box pt={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={""}
                          // onChange={(e) => setAgreeTerms("e.target.checked")}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2" color="textSecondary">
                          Agree to our{" "}
                          <Link href="/terms" passHref legacyBehavior>
                            <a
                              className="basecolor"
                              target="_blank"
                              style={{
                                textDecoration: "underline",
                              }}
                            >
                              Terms of Service
                            </a>
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" passHref legacyBehavior>
                            <a
                              className="basecolor"
                              target="_blank"
                              style={{
                                textDecoration: "underline",
                              }}
                            >
                              Privacy Policy
                            </a>
                          </Link>
                        </Typography>
                      }
                    />
                  </Box>

                  <Box sx={{ py: { xs: 5, lg: 2, md: 2 } }}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                      gap={3}
                    >
                      {/* Select Flight Button */}
                      <Button
                        className="btn btn-primary btn-sm"
                        onClick={handleSignUp}
                        variant="contained"
                        color="success"
                        disabled={isLoading} // Disable when loading
                        type="submit" // Important!
                        fullWidth
                        sx={{
                          width: { xs: "100%", lg: "auto", md: "auto" },
                        }}
                      >
                        {isLoading ? (
                          <ButtonLoading />
                        ) : (
                          <Box display="flex" alignItems="center" gap={1}>
                            <span>Sign Up</span>
                          </Box>
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
              {/*  */}
              {/* Footer */}
            </form>
          </Box>
        </Box>
      </Box>
    </main>
  );
};

export default SignUpForm;
