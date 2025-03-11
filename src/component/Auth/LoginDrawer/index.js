import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  FormLabel,
} from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, loginUser } from "@/src/store/slices/Auth/LoginSlice";

const LoginDrawer = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginError = useSelector((state)=> state.login.LoginError)
  const isFormSupmit = useSelector((state)=> state.login.loginUser);
  console.log("isFormSupmit", isFormSupmit);
  

  const isUserLoggedIn = useSelector((state) => state.auth.user?.status === 200);

  const handleCloseDrawer = () => {
    
    dispatch(closeDrawer());
  };

  console.log("LoginError", LoginError);
  const handleLogin = () => {
    const params = { username: email, password: password, };
    dispatch(loginUser(params));  
  };

  return (
    <Box className={`${styles.checkoutDrower} white-bg ${styles.PassengerDrower}`}>
      <Box className={styles.checkoutDrowerSection + " white-bg"}>
        {isUserLoggedIn ? (
          <Box py={20} px={5} display="flex" justifyContent="center" alignItems="center">
            <Box textAlign="center" gap={5} display="flex" flexDirection="column">
              <img src="/images/congratz.svg" alt="Success" />
              <Typography variant="h2">Welcome Back!</Typography>
              <Typography>🎉 You have successfully logged in.</Typography>
            </Box>
          </Box>
        ) : (
          <>
            <Box className={styles.checkoutDrowerHeder} py={2} px={3} display="flex" justifyContent="space-between">
              <Typography variant="h6">Login</Typography>
            </Box>
            <Divider />
            <Box py={2} px={3}>
              <Box>
                <FormLabel>Email</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                />
              </Box>
              <Typography className="error" color="red">{LoginError.email}</Typography>

              <Box>
                <FormLabel>Password</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                />
              </Box>
              <Typography className="error" color="red">{LoginError.password}</Typography>
            <Typography className="error" color="red">{LoginError.other}</Typography>
            </Box>
            <Box className={styles.passengerDrawerFooter}>
              <Divider />
              <Box py={1} px={3} display="flex" justifyContent="flex-end" alignItems="center" gap={3}>
                <Box className="basecolor1 f14" style={{ cursor: "pointer" }} onClick={handleCloseDrawer}>
                  <i className="fa fa-close fas"></i>
                  <span>Close</span>
                </Box>
                <Button className="btn btn-green btn-sm" onClick={handleLogin} variant="contained" color="success">
                  <Box display="flex" alignItems="center" gap={1}>
                    <i className="fa fa-arrow-right"></i>
                    <span>Login</span>
                  </Box>
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Box className={styles.checkoutDrowerBackdrop}></Box>
    </Box>
  );
};

export default LoginDrawer;