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
  setContactData,
  setContactDialog,
} from "@/src/store/slices/Base/baseSlice";

const ContactDialog = () => {
  const dispatch = useDispatch();
  const contactDialog = useSelector((state) => state?.base?.contactDialog);
  const contactSuccess = useSelector((state) => state?.base?.contactData?.data);
  console.log("contactSuccess", contactSuccess);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  // error
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [topicError, setTopicError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const ContactDialogClose = () => {
    dispatch(setContactDialog(false));
  };
  const handleSubmitContactForm = () => {
    // validation logic
    let valid = true;

    // Name validation
    if (!name.trim()) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email");
      valid = false;
    } else {
      setEmailError("");
    }

    // Topic validation
    if (!topic) {
      setTopicError("Please select a topic");
      valid = false;
    } else {
      setTopicError("");
    }

    // Description validation
    if (!description.trim()) {
      setDescriptionError("Description is required");
      valid = false;
    } else {
      setDescriptionError("");
    }

    // Submit if valid
    if (!valid) return;

    const params = {
      name: name,
      email: email,
      topic: topic,
      description: description,
    };

    dispatch(handleSubmitContact(params)); // This is the Redux action

    // Optionally reset form
  };
  useEffect(() => {
    if (contactSuccess) {
      setName("");
      setEmail("");
      setTopic("");
      setDescription("");
    }
  });
  const currentUser = useSelector((state) => state.base?.currentUser);
  const logoutHandle = () => {
    dispatch(Logout());
  };
  return (
    <>
      <Dialog
        open={contactDialog}
        onClose={ContactDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <IconButton
          aria-label="close"
          onClick={ContactDialogClose}
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
          {!contactSuccess ? (
            <>
              <Box component="main" className={styles.signupSection}>
                <Box
                  position="relative"
                  sx={{ textAlign: { lg: "left", md: "left", xs: "center" } }}
                >
                  <Box mb={2}>
                    <Box
                      component={"h4"}
                      mb={1}
                      sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                    >
                      Need help? Contact us!
                    </Box>
                    <Box
                      component={"h4"}
                      mb={1}
                      sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                    >
                      Need help?
                    </Box>

                    <Typography
                      sx={{ display: { lg: "block", md: "block", xs: "none" } }}
                      variant="body1"
                      mt={1}
                    >
                      Tell us what issue you have and we will reach out!
                    </Typography>
                    <Typography
                      sx={{ display: { lg: "none", md: "none", xs: "block" } }}
                      variant="body1"
                      mt={1}
                    >
                      Tell us what issue you
                      <br />
                      have and we will reach out!
                    </Typography>
                    {console.log("currentUser", currentUser?.user?.first_name)}
                    {currentUser ? (
                      <Typography variant="body1" mt={1}>
                        Signed in as{" "}
                        <Typography
                          component={"span"}
                          textTransform={"capitalize"}
                        >
                          {currentUser?.user?.first_name
                            .charAt(0)
                            .toUpperCase()}
                          . {currentUser?.user?.last_name}
                        </Typography>
                        . Not you?{" "}
                        <Typography
                          component={"span"}
                          onClick={logoutHandle}
                          className=" cursor-pointer basecolor1"
                        >
                          Log out
                        </Typography>
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>

                  <Box component="form" noValidate autoComplete="off">
                    <Box className=" formGroup">
                      <TextField
                        error={!!nameError}
                        helperText={nameError}
                        className="formControl"
                        fullWidth
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Box>
                    <Box className=" formGroup">
                      <TextField
                        error={!!emailError}
                        helperText={emailError}
                        className="formControl"
                        fullWidth
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Box>
                    <Box className="formGroup">
                      <TextField
                        error={!!topicError}
                        helperText={topicError}
                        className="formControl"
                        fullWidth
                        select
                        label="Select topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        sx={{
                          mb: 2,
                          "& label": {
                            color: "#9e9e9e", // normal label color
                          },
                          "& label.Mui-focused": {
                            color: "#9e9e9e", // focused label color
                          },
                          textAlign:"left"
                        }}
                      >
                        <MenuItem value="" disabled sx={{ color: "#9e9e9e" }}>
                          Select topic
                        </MenuItem>
                        <MenuItem value="Booking issue">Booking issue</MenuItem>
                        <MenuItem value="Change or cancel my trip">
                          Change or cancel my trip
                        </MenuItem>
                        <MenuItem value="I didn't receive a confirmation">
                          I didn't receive a confirmation
                        </MenuItem>
                        <MenuItem value="Payment or refund issue">
                          Payment or refund issue
                        </MenuItem>
                        <MenuItem value="Flight, rail or baggage problem">
                          Flight, rail or baggage problem
                        </MenuItem>
                        <MenuItem value="Something else">
                          Something else
                        </MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    </Box>

                    <Box className=" formGroup">
                      <TextField
                        error={!!descriptionError}
                        helperText={descriptionError}
                        className="formControl description"
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Describe the issue you are facing"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ mb: 3 }}
                      />
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        onClick={handleSubmitContactForm}
                        className="btn btn-primary xs btn-sm btn-round"
                      >
                        Send message
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box component="main" className={styles.signupSection}>
                <Box
                  position="relative"
                  sx={{ textAlign: { lg: "left", md: "left", xs: "center" } }}
                >
                  <Box mb={2}>
                    <Box
                      component={"h4"}
                      mb={2}
                      display={"flex"}
                      gap={1}
                      alignItems={"center"}
                    >
                      <svg
                        width="26"
                        height="25"
                        viewBox="0 0 26 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 0C6.1 0 0.5 5.6 0.5 12.5C0.5 19.4 6.1 25 13 25C19.9 25 25.5 19.4 25.5 12.5C25.5 5.6 19.9 0 13 0ZM10.5 18.75L4.25 12.5L6.0125 10.7375L10.5 15.2125L19.9875 5.725L21.75 7.5L10.5 18.75Z"
                          fill="#257074"
                          fill-opacity="0.5"
                        />
                      </svg>

                      <Box>Message sent!</Box>
                    </Box>
                    <Typography variant="body1" mt={1}>
                      Thank you for reaching out. Our team will get back to you
                      within 24 hours.
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      onClick={ContactDialogClose}
                      className="btn btn-primary xs btn-sm btn-round"
                    >
                      Close
                    </Button>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactDialog;
