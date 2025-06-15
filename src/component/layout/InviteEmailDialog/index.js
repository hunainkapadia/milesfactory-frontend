import React, { useEffect } from "react";
import "@/src/styles/sass/components/tags/tags.module.scss";
import {
  Box,
  Button,
  Typography,
  Dialog,
  IconButton,
  DialogContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  resetInviteSuccess,
  setInviteEmailDialog,
} from "@/src/store/slices/Base/baseSlice";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";
import InviteEmailForm from "../InviteEmailForm";


const InviteEmailDialog = () => {
  const dispatch = useDispatch();
  const inviteEmailSuccess = useSelector((state) => state?.base?.InviteSuccess);
  const inviteemailDialog = useSelector((state) => state?.base?.InviteEmailDialog);

  const inviteEmailClose = () => {
    dispatch(setInviteEmailDialog(false));
    dispatch(resetInviteSuccess());
  };

  const inviteMoreHandle = () => {
    dispatch(resetInviteSuccess());
  };

  useEffect(() => {
    if (!inviteemailDialog) {
      dispatch(resetInviteSuccess());
    }
  }, [inviteemailDialog]);

  return (
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
        <Box component="main" className={styles.signupSection + " abc123"}>
          <Box
            position="relative"
            sx={{ textAlign: { lg: "left", md: "left", xs: "center" } }}
          >
            <Box mb={2}>
              <Box display={{ lg: "block", lg: "block", xs: "none" }}>
                <Box component={"h4"} mb={1}>
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
              <InviteEmailForm />
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
  );
};

export default InviteEmailDialog;
