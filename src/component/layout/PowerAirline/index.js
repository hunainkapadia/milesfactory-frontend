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
  PowerAirlineContact,
  setContactData,
  setContactDialog,
  setPowerAirlineDialog,
} from "@/src/store/slices/Base/baseSlice";

const PowerAirline = () => {
  const dispatch = useDispatch();
  const PowerAirline = useSelector((state) => state?.base?.powerAirlineDialog);
  const contactSuccess = useSelector((state) => state?.base?.contactData?.data);
  console.log("PowerAirline", PowerAirline);
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [comment, setComment] = useState("");

  // error
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const PowerAirlineClose = () => {
    dispatch(setPowerAirlineDialog(false));
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

    // Description validation

    // Submit if valid
    if (!valid) return;

    const params = {
      name: name,
      email: email,
      company: company,
      additional_comment : comment,
    };

    dispatch(PowerAirlineContact(params)); // This is the Redux action

    // Optionally reset form
  };

  //
  const currentUser = useSelector((state) => state.base?.currentUser);
  const logoutHandle = () => {
    dispatch(Logout());
  };

  useEffect(() => {
    if (contactSuccess) {
      setName("");
      setEmail("");
      setCompany("");
      setComment("");
      return;
    }

    if (currentUser?.user) {
      const fullName = `${currentUser.user.first_name || ""} ${
        currentUser.user.last_name || ""
      }`.trim();
      setName(fullName);
      setEmail(currentUser.user.email || "");
    } else {
      setName("");
      setEmail("");
    }
  }, [contactSuccess, currentUser]);

  return (
    <>
      <Dialog
        open={PowerAirline}
        onClose={PowerAirlineClose}
        maxWidth="sm"
        fullWidth
      >
        <IconButton
          aria-label="close"
          onClick={PowerAirlineClose}
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

        <DialogContent
          sx={{
            p: {
              xs: "18px",
              md: "18px",
              lg: "18px",
            },
          }}
        >
          {!contactSuccess ? (
            <>
              <Box component="main" className={styles.signupSection}>
                <Box
                  position="relative"
                  sx={{ textAlign: { lg: "left", md: "left", xs: "center" } }}
                >
                  <Box mb={2}>
                    <h3 mb={1} className="mb-0">
                      Power your airline
                    </h3>

                    <Typography variant="body1" mt={1}>
                      Build your AI-native booking engine
                    </Typography>

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
                    <Box className=" formGroup">
                      <TextField
                        error={!!nameError}
                        helperText={nameError}
                        className="formControl"
                        fullWidth
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Box>
                    <Box className=" formGroup">
                      <TextField
                        multiline
                        error={!!nameError}
                        helperText={nameError}
                        className="formControl"
                        fullWidth
                        placeholder="Additional comments (if any)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        sx={{
                          mb: 2,
                          "& .MuiInputBase-root textarea": {
                            resize: "vertical", // allow vertical resize only
                            overflow: "auto",
                          },
                        }}
                      />
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ pt: "6px" }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleSubmitContactForm}
                        className="btn btn-primary xs btn-sm btn-round"
                      >
                        <Typography>Power your airline</Typography>
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
                      onClick={PowerAirlineClose}
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

export default PowerAirline;
