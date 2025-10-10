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

import styles from "@/src/styles/sass/components/auth/Auth.module.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  setisUserPopup,
  setSignupPopup,
  SignUpUser,
} from "@/src/store/slices/Auth/SignupSlice";
import Link from "next/link";
import { setLoginPopup } from "@/src/store/slices/Auth/LoginSlice";
import { LoadingButton } from "@mui/lab";
import ButtonLoading from "../../LoadingArea/ButtonLoading";
import { useRouter } from "next/router";
const SignUpPopup = ({ isChat }) => {
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
  const currentUser = useSelector((state) => state.base?.currentUser);

  const HandleSignupPopupClose = () => {
    dispatch(setSignupPopup(false));
  };
  const HandleSigninPopup = () => {
    dispatch(setSignupPopup(false));
    dispatch(setLoginPopup(true)); // for close login popup
  };

  const isFormValid = firstName && lastName && email && password && agreeTerms;
  return (
    <Dialog
      open={isSignupPopup}
      onClose={
        isChat && !currentUser
          ? undefined //  Don't allow closing
          : HandleSignupPopupClose // Allow closing only when not forced
      }
      maxWidth="sm" // Set max width to 1280px
      fullWidth // Forces Dialog to expand to maxWidth
      className="modalDialog"
    >
      {!isChat && !currentUser ? (
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
      ) : (
        ""
      )}

      <DialogContent
        sx={{
          textAlign: { xs: "center", md: "left", lg: "left" },
        }}
        className={`${isChat ? styles.ChatDialogContent : " MDialogContent"}`}
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
                          <Box
                            className="cursor-pointer"
                            display={"flex"}
                            alignItems={"center"}
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <img src="/images/eye-active.svg" />
                            ) : (
                              <img src="/images/eye-deactive.svg" />
                            )}
                          </Box>
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
                            className="darkgray"
                            sx={{ cursor: "pointer", userSelect: "none" }}
                          >
                            I'd like to receive personalised offers and be the
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
                            className="darkgray"
                            sx={{ cursor: "pointer" }}
                          >
                            By registering, I confirm that I accept Mylz’s
                            <Link
                              href="/terms-and-conditions"
                              passHref
                              legacyBehavior
                            >
                              <a
                                target="_blank"
                                className="basecolor1"
                                style={{ textDecoration: "underline" }}
                                onClick={(e) => e.stopPropagation()} // prevents toggling checkbox when clicking link
                              >
                                {" "}Terms & Conditions{" "}
                              </a>
                            </Link>
                            and am at least 18 years old
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
                        disabled={!isFormValid ? "disabled" : ""} // Disable when loading
                        width={"100%"}
                        type="submit" // Important!
                        className="btn btn-primary btn-md btn-round" // Important!
                        sx={{
                          width: { xs: "100%", lg: "100%", md: "100%" },
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

                    <Box
                      className={styles.orDivider}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                      sx={{ my: { xs: 2, md: 2, lg: 2 } }}
                      px={4}
                    >
                      <hr />
                      <Typography>OR</Typography>
                      <hr />
                    </Box>

                    <Box display={"flex"} justifyContent={"center"} gap={1}>
                      <Typography>Log in with </Typography>
                      <Typography
                        onClick={HandleSigninPopup}
                        className="basecolor1 cursor-pointer"
                      >
                        email
                      </Typography>
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
