import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, FormLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { loginUser } from "@/src/store/slices/Auth/LoginSlice";
import ButtonLoading from "../../LoadingArea/ButtonLoading";
import { useRouter } from "next/router";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginError = useSelector((state) => state.login.LoginError);
  /// isform submit redirect to home
  const isFormSupmit = useSelector((state) => state.login.loginUser);
  const router = useRouter();
  useEffect(() => {
    if (isFormSupmit?.status == 200) {
      router.push("/");
    }
  }, [isFormSupmit, router]);
  const handleLogin = () => {
    const params = { username: email, password: password };
    dispatch(loginUser(params));
  };
  const isloading = useSelector((state) => state.login.isLoading);
  const isuserLogin = useSelector(
    (state) => state?.login?.IsUser?.status === 200
  );
  // get user from cookie with redux for redirect to home

  useEffect(() => {
    if (isuserLogin) {
      router.push("/");
    }
  }, [isuserLogin, router]);

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page reload
          handleLogin(); // Call login
        }}
      >
        <Box>
          <Box>
            <Box className=" formGroup">
              <FormLabel className=" formLabel">Email</FormLabel>
              <TextField
                className=" formControl"
                fullWidth
                placeholder="Enter Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />
            </Box>
            <Typography className="error" color="red">
              {LoginError.email}
            </Typography>

            <Box className=" formGroup mb-0" mb={0}>
              <FormLabel className=" formLabel">Password</FormLabel>
              <TextField
                className=" formControl"
                fullWidth
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
              />
            </Box>
            <Typography className="error" color="red">
              {LoginError.password}
            </Typography>
            <Typography className="error" color="red">
              {LoginError.other}
            </Typography>
          </Box>
          <Box
            sx={{
              py: { xs: 1, lg: 2, md: 2 },
              flexDirection: { xs: "column", md: "row", lg: "row" },
              justifyContent:{lg: "space-between", md: "space-between", xs:"flex-start"}
            }}
            display="flex"
            alignItems="center"
            gap={3}
          >
            <Box sx={{width:{xs:"100%", lg:"auto", md:"auto"}}}>
              <Link className="basecolor-dark" href={"/forgot-password"}>
                Forgot password?
              </Link>
            </Box>
            <Button
              type="submit" // Important!
              className="btn btn-primary btn-sm"
              sx={{
                width: { xs: "100%", lg: "auto", md: "auto" },
              }}
              onClick={handleLogin}
              variant="contained"
              color="success"
              disabled={isloading} // Disable when loading
            >
              {isloading ? (
                <ButtonLoading />
              ) : (
                <Box display="flex" alignItems="center" gap={1}>
                  <span>Login</span>
                </Box>
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
