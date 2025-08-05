import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormLabel,
  Grid,
  Typography,
  Dialog,
  IconButton,
  DialogContent,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { loginUser, setLoginPopup } from "@/src/store/slices/Auth/LoginSlice";
import ButtonLoading from "../../LoadingArea/ButtonLoading";
import { useRouter } from "next/router";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";
import {
  setRegisterPopup,
  setSignupPopup,
} from "@/src/store/slices/Auth/SignupSlice";

const LoginPopup = ({ isChat }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const LoginError = useSelector((state) => state.login.LoginError);
  /// isform submit redirect to home
  const isFormSupmit = useSelector((state) => state.login.loginUser);
  const router = useRouter();

  const handleLogin = () => {
    const params = { username: email, password: password };
    dispatch(loginUser(params));
  };
  const isloading = useSelector((state) => state.login.isLoading);
  const isuserLogin = useSelector(
    (state) => state?.login?.IsUser?.status === 200
  );
  // get user from cookie with redux for redirect to home

  const HandleSignup = () => {
    dispatch(setLoginPopup(false));
    dispatch(setRegisterPopup(true));
  };
  const isLoginPopup = useSelector((state) => state.login.LoginPopup);
  const handleLoginPopupClose = () => {
    dispatch(setLoginPopup(false)); // for close login popup
  };
  useEffect(() => {
    if (isuserLogin) {
      // Clear the form fields
      setEmail("");
      setPassword("");
      // Optional: close the login popup
      dispatch(setLoginPopup(false));
    }
  }, [isuserLogin]);
  // for button enable when all fields fill
  const isFormValid = email && password;
  
  const currentUser = useSelector((state) => state.base?.currentUser);
    
  return (
    <Dialog
      open={isLoginPopup}
      onClose={
        isChat && !currentUser
          ? undefined //  Don't allow closing
          : handleLoginPopupClose // Allow closing only when not forced
      }
      maxWidth="sm" // Set max width to 1280px
      fullWidth // Forces Dialog to expand to maxWidth
    >
      {!isChat && !currentUser ? (
        <IconButton
          aria-label="close"
          onClick={handleLoginPopupClose}
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
      >
        <Box
          component={"main"}
          className={styles.signupSection + " bg-cover bg-norepeat bg-center"}
        >
          <Box
            py={2}
            sx={{ px: { lg: 8, md: 8, xs: 0 } }}
            position={"relative"}
          >
            <Box textAlign={"center"} mb={2}>
              <h3 className="">Welcome back!</h3>
            </Box>

            {/* LoginPopup  */}
            <Box>
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent page reload
                }}
              >
                <Box component={"section"}>
                  <Box>
                    <Box className=" formGroup">
                      {/* <FormLabel className=" formLabel">Email</FormLabel> */}
                      <TextField
                        className="formControl"
                        fullWidth
                        placeholder="Enter Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                      />
                      <Typography className="error" color="red">
                        {LoginError.email}
                      </Typography>
                    </Box>

                    <Box className="formGroup mb-0" mb={0}>
                      <TextField
                        className="formControl"
                        fullWidth
                        placeholder="Enter Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        InputProps={{
                          sx: {
                            height: 50,
                            borderRadius: "16px",
                          },
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
                        {LoginError.password}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box component={"section"}>
                  <Box display={"flex"} justifyContent={"flex-end"} pt={1}>
                    <Button
                      width={"100%"}
                      type="submit" // Important!
                      className="btn btn-primary btn-md btn-round"
                      sx={{
                        width: { xs: "100%", lg: "100%", md: "100%" },
                        opacity: `${isFormValid ? "100%" : "50%"}`,
                      }}
                      onClick={handleLogin}
                      variant="contained"
                      color="success"
                      disabled={isloading} // Disable when loading
                    >
                      {isloading ? (
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
                  <Box
                    sx={{
                      justifyContent: {
                        lg: "space-between",
                        md: "space-between",
                        xs: "flex-start",
                      },
                    }}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                  >
                    <Box display={"flex"} justifyContent={"center"} gap={1}>
                      <Typography>Forgot your password? </Typography>
                      <Typography
                        onClick={"HandleSigninPopupClose"}
                        className="basecolor1 cursor-pointer underline"
                      >
                        Reset link
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      pt={2}
                      gap={1}
                    >
                      <Typography>Don’t have an account yet? </Typography>
                      <Typography
                        onClick={() => HandleSignup()}
                        className="basecolor1 cursor-pointer underline"
                      >
                        Sign up
                      </Typography>
                    </Box>
                    {/*  */}
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
