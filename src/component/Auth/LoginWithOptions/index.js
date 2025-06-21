import { Box, Typography } from "@mui/material";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  googleLoginUser,
  LoginWithFacebook,
} from "@/src/store/slices/Auth/LoginSlice";

const LoginWithOptions = ({ options }) => {
  const dispatch = useDispatch();

  // Google login handler
  const loginHandle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(googleLoginUser(tokenResponse.code)); // Auth Code flow
    },
    onError: () => console.log("Google Login Failed"),
    flow: "auth-code",
  });

  // Facebook SDK setup
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1735155623879865",
        cookie: true,
        xfbml: true,
        version: "v22.0",
      });
    };

    (function (d, s, id) {
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      js.async = true;
      js.defer = true;
      js.crossOrigin = "anonymous";
      const fjs = d.getElementsByTagName(s)[0];
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  // Facebook login handler
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
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {/* Google Login */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          p={1}
          mb={1}
          fontWeight="bold"
          onClick={loginHandle}
          className={`${styles.SignupOption} btn btn-sm btn-border black-border btn-round`}
        >
          <i className="f20 fa-brands fa-google"></i>
          <Typography fontWeight="bold">{options} Google</Typography>
        </Box>

        {/* Facebook Login */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          p={1}
          mb={1}
          fontWeight="bold"
          onClick={FbloginHandle}
          className={`${styles.SignupOption} btn btn-sm btn-border black-border btn-round`}
        >
          <i className="f20 fa-brands fa-facebook"></i>
          <Typography fontWeight="bold">{options} Facebook</Typography>
        </Box>
      </Box>

      {/* OR Divider */}
      <Box
        className={styles.orDivider}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        sx={{ my: 2 }}
        px={4}
      >
        <hr style={{ flex: 1 }} />
        <Typography>OR</Typography>
        <hr style={{ flex: 1 }} />
      </Box>
    </>
  );
};

export default LoginWithOptions;
