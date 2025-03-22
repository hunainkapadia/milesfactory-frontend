import LoginForm from "@/src/component/Auth/LoginForm";
import HomeHeroSection from "@/src/component/HomeHeroSection";
import Header from "@/src/component/layout/Header";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";

import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

const Signin = () => {
  return (
    <main className={styles.signupSection + " bg-cover bg-norepeat bg-center"}>
      <Header IsActive />
      <Box
        sx={{ pt: { xs: 17, lg: 24, md: 24 }, pb: { xs: 34, lg: 24, md: 24 } }}
        position={"relative"}
      >
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <Box textAlign={"center"}>
                  <h1 className="">Sign in</h1>
                  <Typography textAlign={"center"} pt={2}>
                    Don’t have an account?{" "}
                    <Link className="basecolor-dark" href={"/signup"}>
                      Create one
                    </Link>
                  </Typography>
                </Box>
                <Box
                  className={styles.orDivider}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={2}
                  sx={{ my: { lg: 5, md: 5, xs: 4 } }}
                  px={2}
                >
                  <hr />
                  <Typography>OR</Typography>
                  <hr />
                </Box>
                <Typography align="center" mb={2}>
                  Enter your email and password below
                </Typography>
                <LoginForm />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </main>
  );
};

export default Signin;