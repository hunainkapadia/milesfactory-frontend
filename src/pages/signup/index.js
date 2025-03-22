import LoginWithOptions from "@/src/component/Auth/LoginWithOptions";
import SignUpForm from "@/src/component/Auth/SignupForm";
import HomeHeroSection from "@/src/component/HomeHeroSection";
import Header from "@/src/component/layout/Header";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";

import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

const Signup = () => {
  return (
    <main className={styles.signupSection + " bg-cover bg-norepeat bg-center"}>
      <Header IsActive />
      <Box
        sx={{ pt: { xs: 17, lg: 24, md: 24 }, pb: { xs: 30, lg: 18, md: 18 } }}
        
        position={"relative"}
      >
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <Box mb={5}>
                  <h1 className="">Create an account</h1>
                  <Typography textAlign={"center"} pt={2}>
                    Already have an account?{" "}
                    <Link className="basecolor-dark" href={"/signin"}>
                      Sign in
                    </Link>
                  </Typography>
                </Box>
                <LoginWithOptions />
                <Typography align="center" mb={2}>
                  Enter your email below to create an account.
                </Typography>
                <SignUpForm />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </main>
  );
};

export default Signup;
