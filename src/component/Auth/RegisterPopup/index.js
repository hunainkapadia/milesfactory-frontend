import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  IconButton,
  DialogContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setisUserPopup,
  setRegisterPopup,
  setSignupPopup,
} from "@/src/store/slices/Auth/SignupSlice";
import { setLoginPopup } from "@/src/store/slices/Auth/LoginSlice";
import { LoadingButton } from "@mui/lab";
import ButtonLoading from "../../LoadingArea/ButtonLoading";
import { useRouter } from "next/router";
import LoginWithOptions from "../LoginWithOptions";

const RegisterPopup = (isChat) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // get error

  // error
  const isRegisterPopup = useSelector((state) => state?.signup?.registerPopup);

  const handleSignUp = () => {
    dispatch(setRegisterPopup(false));
    dispatch(setSignupPopup(true));
  };
  //

  const HandleSigninPopup = () => {
    dispatch(setisUserPopup(true)); // for close user popup
    //  dispatch(setLoginPopup(true)); // for close login popup
    dispatch(setRegisterPopup(false));
  };

  const HandleRegisterPopupClose = () => {
    dispatch(setRegisterPopup(false));
  };
  const currentUser = useSelector((state) => state.base?.currentUser);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only

  return (
    <Dialog
      open={isRegisterPopup}
      onClose={
        isChat?.isChat && !currentUser
          ? undefined //  Don't allow closing
          : HandleRegisterPopupClose // Allow closing only when not forced
      }
      maxWidth="sm" // Set max width to 1280px
      fullWidth // Forces Dialog to expand to maxWidth
    >
      {!isChat?.isChat && !currentUser ? (
        <IconButton
          aria-label="close"
          onClick={HandleRegisterPopupClose}
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
          <Box sx={{ px: { lg: 10, md: 10, xs: 2 } }} position={"relative"}>
            <Box mb={2}>
              <h3 sx={{mb:"12px"}} className="center">
                {isChat?.isChat
                  ? isMobile
                    ? "Don't loose your trip!"
                    : "Don't loose your trip details!"
                  : "Register with us!"}
              </h3>
              {isChat?.isChat && (
                <Typography>
                  {isMobile
                    ? "Register to save your trip details "
                    : "Register to save and find your information faster "}
                </Typography>
              )}
            </Box>
            <LoginWithOptions options={"Register with "} />
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <Box display={"flex"} justifyContent={"center"} gap={1}>
                <Typography>Or register with </Typography>
                <Typography
                  onClick={handleSignUp}
                  className="basecolor1 cursor-pointer"
                >
                  email
                </Typography>
              </Box>
              <Box display={"flex"} justifyContent={"center"} gap={1}>
                <Typography>Already have an account? </Typography>
                <Typography
                  onClick={HandleSigninPopup}
                  className="basecolor1 cursor-pointer"
                >
                  Login
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterPopup;
