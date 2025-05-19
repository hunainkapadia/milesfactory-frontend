import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  IconButton,
  DialogContent,
  Rating,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLoginPopup } from "@/src/store/slices/Auth/LoginSlice";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";
import Link from "next/link";
import { setFeedbackDialog } from "@/src/store/slices/Base/baseSlice";

const Feedback = () => {
  const dispatch = useDispatch();
  const feedbackDialog = useSelector((state) => state?.base?.feedbackDialog);
  console.log("feedbackDialog", feedbackDialog);
  

  const [rating, setRating] = useState(null);
  const [successReview, setSuccessReview] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [inviteEmails, setInviteEmails] = useState("");

  const handfeedbackDialogClose = () => {
    dispatch(setFeedbackDialog(false));
  };

  const handleSubmit = () => {
    if (rating !== null) {
      console.log("Submitted review:", {
        rating,
        feedbackText,
      });
      setSuccessReview(true);
    }
  };

  return (
    <Dialog open={feedbackDialog} onClose={handfeedbackDialogClose} maxWidth="sm" fullWidth>
      <IconButton 
        aria-label="close"
        onClick={handfeedbackDialogClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 8,
          color: "#000",
          zIndex: 1
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </IconButton>

      <DialogContent>
        <Box component="main" className={styles.signupSection}>
          <Box position="relative">
            {!successReview ? (
              <>
                <Box mb={2}>
                  <Typography display={"flex"} variant="h6">Share an idea or give us feedback</Typography>
                  <Typography>How do you like our service?</Typography>
                </Box>

                <Rating
                  name="feedback-rating"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  sx={{
                    
                    fontSize: "30px",
                    "& .MuiRating-iconFilled": { color: "#00C4CC" },
                    "& .MuiRating-iconHover": { color: "#00C4CC" },
                  }}
                />

                <Typography sx={{ mt: 2, mb: 1, fontWeight: 500 }}>
                  Tell us what we can improve on
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Type your idea or feedback here"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />

                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={
                      rating === null 
                    }
                    className={`btn btn-primary xs btn-sm btn-round`}
                  >
                    Send
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box mt={4}>
                  <Typography variant="h5" className="regular f25">
                    Please help us spread{" "}
                    <img src="/images/heart-emoji.svg" alt="heart" />
                  </Typography>
                  <Typography>Invite friends to travel with Mylz.</Typography>
                </Box>

                <Box mt={2}>
                  <Typography>
                    <img src="/images/hand-emoji.svg" alt="hand" />{" "}
                    <img src="/images/hand-emoji.svg" alt="hand" /> We’ve sent the emails.{" "}
                    <Link href="#" className="text-decuration-none">
                      Invite more friends
                    </Link>
                  </Typography>
                </Box>

                <Box className={styles.InviteBox} display="flex" gap={1} pt={2}>
                  <Box className="formGroup" flex={1}>
                    <TextField
                      className={styles.formControl + " formControl"}
                      fullWidth
                      placeholder="Emails, comma separated"
                      value={inviteEmails}
                      onChange={(e) => setInviteEmails(e.target.value)}
                    />
                  </Box>
                  <Button variant="contained" color="success" type="submit">
                    Invite
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Feedback;
