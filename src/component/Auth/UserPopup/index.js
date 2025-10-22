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

import styles from "@/src/styles/sass/components/auth/Auth.module.scss";
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

const UserPopup = (isChat) => {
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
  const currentUser = useSelector((state) => state.base?.currentUser);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // matches xs only
  const loginState = useSelector((state) => state?.login?.loginState);  
  
  return (
    <>
      <Dialog
        open={isUserPopup}
        onClose={
          isChat?.isChat && !currentUser
            ? undefined //  Don't allow closing
            : handlePopupClose // Allow closing only when not forced
        }
        maxWidth="sm" // Set max width to 1280px
        fullWidth // Forces Dialog to expand to maxWidth
        keepMounted={false} // 🔹 This removes it from DOM when closed
      >
        {!isChat?.isChat && !currentUser ? (
          <IconButton
            aria-label="close"
            onClick={handlePopupClose}
            sx={{
              position: "absolute",
              right: 16,
              zIndex: 1,
              top: 8,
              color: "#000",
            }}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </IconButton>
        ) : (
          ""
        )}

        <DialogContent
          className={`${
            isChat?.isChat ? styles.ChatDialogContent : " MDialogContent"
          }`}
          sx={{
            textAlign: { xs: "center", md: "left", lg: "left" },
            px: { lg: 10, md: 10, xs: 2 },
          }}
        >
          <Box mb={2} textAlign={"center"}>
            <h3 sx={{ mb: "12px" }}>
              {isChat?.isChat
                ? isMobile
                  ? "Don't loose your trip!"
                  : "Don't loose your trip details!"
                : "Welcome back!"}
            </h3>

            {isChat?.isChat && (
              <Typography>
                {isMobile
                  ? "Log in to save your trip details"
                  : "Log in to save and find your information faster"}
              </Typography>
            )}
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
    </>
  );
};

export default UserPopup;
