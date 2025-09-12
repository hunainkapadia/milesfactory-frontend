import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";
import {
  setCartError,
  setCartErrorDialog,
  setFlightUnavailable,
} from "@/src/store/slices/BookingflightSlice";
import { fetchMessages } from "@/src/store/slices/GestMessageSlice";
import api from "@/src/store/api";
import {
  loadNextFlights,
  setAllOfferUrl,
  setClearChat,
  setClearflight,
  setIsUpdateOffer,
  setMessage,
  setResetAppendFlights,
  setUpdateOffer,
} from "@/src/store/slices/sendMessageSlice";

const CartErrorDialog = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isCartErrorDialog = useSelector(
    (state) => state.booking.cartErrorDialog
  );

  const handleClose = () => {
    dispatch(setCartErrorDialog(false));
  };

  const allOfferSendUrl = useSelector((state) => state?.sendMessage?.AllOfferUrl);
  console.log("allOfferUrl222", allOfferSendUrl);

  const handleYes = () => {
    dispatch(setIsUpdateOffer(true)); // refresh start

    dispatch(setUpdateOffer());
    if (allOfferSendUrl) {
      // Refresh latest flight offers only
      api
        .get(allOfferSendUrl)
        .then((res) => {
          const flightRes = res.data;
          // clear old flight cards
          dispatch(setClearflight());
          // push new flight results
          dispatch(setMessage({ ai: flightRes }));
        })
        .catch((err) => {
          console.error("Error refreshing flight offers", err);
        })
        .finally(() => {
          dispatch(setIsUpdateOffer(false));
          dispatch(setCartErrorDialog(false)); // close dialog after refresh
        });
    }
  };

  const handleNo = () => {
    if (isCartErrorDialog) {
      dispatch(setFlightUnavailable(true));
      dispatch(setCartErrorDialog(false));
    }
  };
  const iscartError = useSelector((state) => state.booking.cartError);

  return (
    <Dialog
      open={isCartErrorDialog}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 4,
          top: 0,
          color: "#000",
          zIndex: 1,
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </IconButton>

      <DialogContent>
        <Box component="main" className={styles.signupSection}>
          <Box
            position="relative"
            sx={{ textAlign: { lg: "left", md: "left", xs: "center" } }}
          >
            <Box mb={2}>
              <h3 className="mb-3">Flight Not Available</h3>

              <Typography variant="body1" mb={"20px"}>
                Requested flight is no longer available.
                <br />
                Do you want to re-run the search?
              </Typography>

              <DialogActions
                sx={{ justifyContent: "flex-start", gap: 1, p: 0 }}
              >
                <Button
                  onClick={handleNo}
                  className="btn btn-primary btn-lg-x btn-round"
                >
                  No
                </Button>
                <Button
                  onClick={handleYes}
                  className="btn btn-primary btn-lg-x btn-round"
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CartErrorDialog;
