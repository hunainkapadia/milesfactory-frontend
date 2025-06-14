import { Box, Typography } from "@mui/material";
import Link from "next/link";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  googleLoginUser,
  LoginWithFacebook,
} from "@/src/store/slices/Auth/LoginSlice";
import { useEffect } from "react";

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

  // 
  useEffect(() => {
  window.fbAsyncInit = function () {
    FB.init({
      appId: "1735155623879865",
      cookie: true,
      xfbml: true,
      version: "v22.0",
    });
  };

  (function (d, s, id) {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    const js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    js.async = true;
    js.defer = true;
    js.crossOrigin = "anonymous";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}, []);



const FbloginHandle = () => {
  if (typeof window.FB === "undefined") {
    console.error("Facebook SDK not loaded yet");
    return;
  }

  window.FB.login(
    (response) => {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        dispatch(LoginWithFacebook(accessToken));
      } else {
        console.log("User cancelled Facebook login or did not authorize.");
      }
    },
    { scope: "email,public_profile" }
  );
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
