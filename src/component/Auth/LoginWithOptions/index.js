import { Box, Typography } from "@mui/material";
import Link from "next/link";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { googleLoginUser, LoginWithFacebook } from "@/src/store/slices/Auth/LoginSlice";

const LoginWithOptions = ({ options }) => {
  const dispatch = useDispatch();

  const loginHandle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Token Response:", tokenResponse);
      dispatch(googleLoginUser(tokenResponse.code)); // Pass the code
    },
    onError: () => console.log("Google Login Failed"),
    flow: "auth-code",
  });
  const FbloginHandle = () => {
    const facebookAppId = "YOUR_FACEBOOK_APP_ID";
    const redirectUri = "https://yourdomain.com/api/auth/facebook/callback"; // your backend API endpoint
    const facebookAuthUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${facebookAppId}&redirect_uri=${redirectUri}&response_type=code&scope=email,public_profile`;

    window.location.href = facebookAuthUrl;
    dispatch(LoginWithFacebook())
  };

  return (
    <>
      <Box
        className={styles.SignupOptions}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        {/* <Box
          className={
            styles.SignupOption +
            " btn btn-sm btn-border black-border btn-round"
          }
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          p={1}
          mb={1}
          fontWeight={"bold"}
        >
          <i className="f20 fa-brands fa-apple"></i>
          <Typography fontWeight={"bold"}>{options} Apple ID</Typography>
        </Box> */}
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          p={1}
          mb={1}
          fontWeight={"bold"}
          onClick={() => loginHandle()}
          className={
            styles.SignupOption +
            " btn btn-sm btn-border black-border btn-round"
          }
        >
          <i className="f20 fa-brands fa-google"></i>
          <Typography fontWeight={"bold"}>{options} Google</Typography>
        </Box>

        {/* <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          p={1}
          mb={1}
          fontWeight={"bold"}
          className={
            styles.SignupOption +
            " btn btn-sm btn-border black-border btn-round"
          }
          onClick={() => FbloginHandle()}
        >
          <i className="f20 fa-brands fa-facebook"></i>
          <Typography fontWeight={"bold"}>{options} Facebook</Typography>
        </Box> */}
      </Box>
      <Box
        className={styles.orDivider}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        sx={{ my: { xs: 2, md: 2, lg: 2 } }}
        px={4}
      >
        <hr />
        <Typography>OR</Typography>
        <hr />
      </Box>
    </>
  );
};

export default LoginWithOptions;
