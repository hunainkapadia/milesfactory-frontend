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
import { setCartError } from "@/src/store/slices/BookingflightSlice";
import { fetchMessages } from "@/src/store/slices/GestMessageSlice";

const CartErrorDialog = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartError = useSelector((state) => state.booking.cartError);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (
      cartError &&
      typeof cartError === "string" &&
      cartError.includes("Requested offer is no longer available")
    ) {
      setOpenDialog(true);
    }
  }, [cartError]);

  const handleClose = () => {
    dispatch(setCartError(false));
  };

   const handleYes = () => {
    dispatch(setCartError(false)); // close popup
    const { uuid } = router.query;

    console.log("yes_uuid", uuid);
    
    if (uuid) {
      // Re-run search with latest offers
      dispatch(fetchMessages(uuid));
    }
  };

  const handleNo = () => {
    setOpenDialog(false);
    // Add logic here to "grey out" the selected flight card
    // Example: dispatch(setFlightUnavailable(selectedFlightId));
  };
  const cartErrorDialog = useSelector((state)=> state.booking.cartError);
  console.log("cartErrorDialog", cartErrorDialog);
  

  return (
    <Dialog
      open={cartErrorDialog}
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

              <Typography
                variant="body1"
                mb={"20px"}
              >
                Requested flight is no longer available.
                <br />
                Do you want to re-run the search?
              </Typography>

              <DialogActions sx={{ justifyContent: "flex-start", gap: 1, p:0 }}>
                <Button
                  
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
