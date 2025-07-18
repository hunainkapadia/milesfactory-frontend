import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  IconButton,
  DialogContent,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setisUserPopup,
  setRegisterPopup,
} from "@/src/store/slices/Auth/SignupSlice";
import Cookies from "js-cookie";
import Link from "next/link";
import { setLoginPopup } from "@/src/store/slices/Auth/LoginSlice";
import { LoadingButton } from "@mui/lab";
import ButtonLoading from "../../LoadingArea/ButtonLoading";
import { useRouter } from "next/router";
import LoginWithOptions from "../LoginWithOptions";

const UserPopup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // get error

  // error
  const isRegisterPopup = useSelector((state) => state?.signup?.registerPopup);

  //

  const HandleSigninPopup = () => {
    dispatch(setisUserPopup(false)); // for close user popup
    dispatch(setLoginPopup(true)); // for close login popup
  };

  const handlePopupClose = () => {
    dispatch(setisUserPopup(false));
  };
  // popup  close when user login
  const getUser = useSelector((state) => state?.login?.loginUser?.userPopup);
  useEffect(() => {
    if (getUser === false) {
      dispatch(setisUserPopup(false)); // Closes the dialog
    }
  }, [getUser, dispatch]);

  const isUserPopup = useSelector((state) => state?.signup?.UserPopup);
  const HandleRegisterPopup = () => {
    dispatch(setisUserPopup(false));
    dispatch(setRegisterPopup(true));
  };
  return (
    <Dialog
      open={isUserPopup || getUser}
      onClose={handlePopupClose}
      maxWidth="sm" // Set max width to 1280px
      fullWidth // Forces Dialog to expand to maxWidth
    >
      <IconButton
        aria-label="close"
        onClick={handlePopupClose}
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
          px: { lg: 10, md: 10, xs: 2 },
        }}
      >
        <Box mb={2} textAlign={"center"}>
          <h3 className="mb-0">Welcome back!</h3>
        </Box>
        <Box>
          <LoginWithOptions options={"Continue with"} />
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={"flex"} justifyContent={"center"} gap={1}>
            <Typography>Or log in with </Typography>
            <Typography
              onClick={HandleSigninPopup}
              className="basecolor1 cursor-pointer"
            >
              email
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"center"} gap={1}>
            <Typography>Don’t have an account yet? </Typography>
            <Typography
              onClick={HandleRegisterPopup}
              className="basecolor1 cursor-pointer"
            >
              Sign up
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserPopup;
