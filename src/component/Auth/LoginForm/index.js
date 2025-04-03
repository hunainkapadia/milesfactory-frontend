import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { loginUser } from "@/src/store/slices/Auth/LoginSlice";
import ButtonLoading from "../../LoadingArea/ButtonLoading";
import { useRouter } from "next/router";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";
import LoginWithOptions from "../LoginWithOptions";

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
    <main className={styles.signupSection + " bg-cover bg-norepeat bg-center"}>
      <Box
      py={2}
      px={12}
        position={"relative"}
      >
        <Box>
          <Box textAlign={"center"} mb={2}>
            <h1 className="">Sign in</h1>
            <Typography textAlign={"center"} pt={2}>
              Don’t have an account?{" "}
              <Link className="basecolor-dark" href={"/signup"}>
                Create one
              </Link>
            </Typography>
          </Box>
          <LoginWithOptions />
          
          <Typography align="center" mb={2}>
            Enter your email and password below
          </Typography>
          {/* LoginForm  */}
          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent page reload
                handleLogin(); // Call login
              }}
            >
              <Box>
                <Box px={4}>
                  <Box className=" formGroup">
                    {/* <FormLabel className=" formLabel">Email</FormLabel> */}
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
                    {/* <FormLabel className=" formLabel">Password</FormLabel> */}
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
                    justifyContent: {
                      lg: "space-between",
                      md: "space-between",
                      xs: "flex-start",
                    },
                  }}
                  display="flex"
                  flexDirection={"column"}
                  alignItems="center"
                  gap={3}
                >
                  <Box sx={{ width: { xs: "100%", lg: "auto", md: "auto" } }} textAlign="center">
                    <Link className="text-decuration-none basecolor-dark" href={"/forgot-password"} >
                      Forgot your password? Get a link to reset your password
                    </Link>
                  </Box>
                  <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
                    <Button
                      type="submit" // Important!
                      className="btn btn-primary btn-sm btn-round"
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
                          <span>Continue</span>
                        </Box>
                      )}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </main>
  );
};

export default LoginForm;
