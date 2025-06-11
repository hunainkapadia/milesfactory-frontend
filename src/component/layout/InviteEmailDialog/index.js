import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  IconButton,
  DialogContent,
  Rating,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Logout, setLoginPopup } from "@/src/store/slices/Auth/LoginSlice";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";
import Link from "next/link";
import {
  handleSubmitContact,
  InviteDialogSubmit,
  InviteSubmit,
  resetInviteSuccess,
  setContactDialog,
  setInviteEmailDialog,
} from "@/src/store/slices/Base/baseSlice";

const InviteEmailDialog = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const inviteEmailClose = () => {
    dispatch(setInviteEmailDialog(false));
  };

  const inviteemailDialog = useSelector(
    (state) => state?.base?.InviteEmailDialog
  );
  const inviteEmailSuccess = useSelector((state) => state?.base?.InviteSuccess);
  console.log("inviteEmailSuccess", inviteEmailSuccess);
  useEffect(() => {
    if (inviteEmailSuccess) {
      setEmail("");
    }
  }, [inviteEmailSuccess]); // Add dependency to avoid infinite loop

  const currentUser = useSelector((state) => state.base?.currentUser);
  const logoutHandle = () => {
    dispatch(Logout());
  };

  const handleSubmitInviteEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    } else {
      setEmailError("");
    }
    const payload = {
      emails: email,
    };
    dispatch(InviteDialogSubmit(payload));
  };

  const inviteMoreHandle = () => {
    dispatch(resetInviteSuccess()); // Show form again
  };
  //
  return (
    <>
      <Dialog
        open={inviteemailDialog}
        onClose={inviteEmailClose}
        maxWidth="sm"
        fullWidth
      >
        <IconButton
          aria-label="close"
          onClick={inviteEmailClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 8,
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
                <Box display={{ lg: "block", lg: "block", xs: "none" }}>
                  <Box
                    component={"h4"}
                    mb={1}
                  >
                    Please help us spread 🩵!
                  </Box>
                  <Typography variant="body1" mt={1}>
                    Invite friends around to travel with Mylz.
                  </Typography>
                </Box>

                <Box display={{ lg: "none", lg: "none", xs: "block" }}>
                  <Box component={"h3"} mb={1}>
                    Help us spread 🩵!
                  </Box>
                  <Typography variant="body1" mt={1}>
                    Invite friends to travel with Mylz.
                  </Typography>
                </Box>
              </Box>
              {!inviteEmailSuccess ? (
                <Box component="form" noValidate autoComplete="off">
                  <Box className=" formGroup">
                    <TextField
                      className="formControl"
                      fullWidth
                      placeholder="Email"
                      type="email"
                      value={email}
                      error={!!emailError}
                      helperText={emailError}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  </Box>

                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      onClick={handleSubmitInviteEmail}
                      className="btn btn-primary xs btn-sm btn-round"
                    >
                      Invite
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box pb={3}>
                  <Typography variant="body1" mt={1}>
                    🙌 🙌 We've sent the emails.{" "}
                    <Box
                      onClick={inviteMoreHandle}
                      className="basecolor1 cursor-pointer"
                      component={"span"}
                    >
                      Invite more friends
                    </Box>
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InviteEmailDialog;
