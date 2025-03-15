import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  FormLabel,
  CircularProgress,
  Drawer,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDrawer,
  openDrawer,
  setCloseDrawer,
  setsignUpUser,
  SignUpUser,
  SignupUser,
} from "@/src/store/slices/Auth/SignupSlice";
import api from "@/src/store/api";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";
import Cookies from "js-cookie";
import Link from "next/link";
import { loginOpenDrawer, setLoginOpenDrawer } from "@/src/store/slices/Auth/LoginSlice";
import { LoadingButton } from "@mui/lab";
import ButtonLoading from "../../LoadingArea/ButtonLoading";

const SignUpDrawer = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const params = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  };

  // get error
  const { firstNameError, lastNameError, emailError, passwordError } =
    useSelector((state) => state.signup);
  const isFormSupmit = useSelector((state) => state.signup);

  const handleCloseDrawer = () => {
    dispatch(setCloseDrawer());
  };

  // error
  const isLoading = useSelector((state) => state.signup.isLoading);

  const handleSignUp = () => {
    dispatch(SignUpUser(params));
  };
  const handleSignIn = () => {
    dispatch(setCloseDrawer());
    dispatch(setLoginOpenDrawer());
  };
  const openDrawer = useSelector((state) => state.signup.openDrawer);
  const closeDrawer = useSelector((state) => state.signup.closeDrawer);

  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={() => dispatch(setCloseDrawer())}
    >
      <Box
        className={`${styles.checkoutDrower2} white-bg ${styles.PassengerDrower}`}
      >
        <Box>
          {isFormSupmit ? (
            <>
              <Box
                className={styles.checkoutDrowerHeder}
                py={2}
                px={3}
                display="flex"
                justifyContent="space-between"
              >
                <Typography variant="h6" mb={0} className="mb-0">
                  Signup
                </Typography>
              </Box>
              <Divider />
              <Box container spacing={2} py={2} px={3}>
                <Box sx={{ pt: 0 }}>
                  <FormLabel>First Name</FormLabel>
                  <TextField
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

                <Box>
                  <FormLabel>Last Name</FormLabel>
                  <TextField
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

                <Box>
                  <FormLabel>Email</FormLabel>
                  <TextField
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

                <Box>
                  <FormLabel>Password</FormLabel>
                  <TextField
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
                <Box className={styles.passengerDrawerFooter}>
                  <Divider />
                  <Box pb={2} pt={2} px={3}>
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

                      {/* Select Flight Button */}
                      <Button
                        className="btn btn-green btn-sm"
                        onClick={handleSignUp}
                        variant="contained"
                        color="success"
                        disabled={isLoading} // Disable when loading
                      >
                        {isLoading ? (
                          <ButtonLoading />
                        ) : (
                          <Box display="flex" alignItems="center" gap={1}>
                            <i className="fa fa-arrow-right"></i>
                            <span>Sign Up</span>
                          </Box>
                        )}
                      </Button>
                    </Box>
                    <Typography textAlign={"center"} pt={2}>
                      Already ahave an account?{" "}
                      <Link onClick={handleSignIn} href={""}>
                        Sign in
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                py={20}
                px={5}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box
                  textAlign={"center"}
                  gap={5}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Box>
                    <img src="/images/congratz.svg" />
                  </Box>
                  <Box gap={2} display={"flex"} flexDirection={"column"}>
                    <Typography variant="h2">Congratulations!</Typography>
                    <Typography>
                      ✈️ Your account has been successfully registered. Get
                      ready to explore the world with us!
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          )}
          {/*  */}
        </Box>

        {/* Footer */}
      </Box>
    </Drawer>
  );
};

export default SignUpDrawer;
