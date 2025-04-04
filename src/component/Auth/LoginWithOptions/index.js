import { Box, Typography } from "@mui/material";
import Link from "next/link";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";


const LoginWithOptions = () => {
  return (
    <>
      <Box className={styles.SignupOptions}>
        <Link
          href={""}
          className={
            styles.SignupOption + " basecolor-dark text-decoration-none bold"
          }
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            p={1}
            mb={1}
            fontWeight={"bold"}
          >
            <i className="f20 fa-brands fa-google"></i>
            <Typography fontWeight={"bold"}>Sign up with Google</Typography>
          </Box>
        </Link>
        <Link
          href={""}
          className={
            styles.SignupOption + " basecolor-dark text-decoration-none bold"
          }
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            p={1}
            mb={1}
            fontWeight={"bold"}
          >
            <i className="f20 fa-brands fa-apple"></i>
            <Typography fontWeight={"bold"}>Sign up with Apple ID</Typography>
          </Box>
        </Link>
        <Link
          href={""}
          className={
            styles.SignupOption + " basecolor-dark text-decoration-none bold"
          }
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            p={1}
            mb={1}
            fontWeight={"bold"}
          >
            <i className="f20 fa-brands fa-facebook"></i>
            <Typography fontWeight={"bold"}>Sign up with Facebook</Typography>
          </Box>
        </Link>
      </Box>
      <Box
        className={styles.orDivider}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        sx={{ my: { xs: 2, md: 2, lg: 2 } }}
        px={2}
      >
        <hr />
        <Typography>OR</Typography>
        <hr />
      </Box>
    </>
  );
};

export default LoginWithOptions;