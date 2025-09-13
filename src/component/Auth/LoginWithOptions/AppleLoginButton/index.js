// components/AppleLoginButton.jsx
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import Script from "next/script";
import styles from "@/src/styles/sass/components/auth/Auth.module.scss";
import { LoginWithApple } from "@/src/store/slices/Auth/LoginSlice";
import { env } from "process";

const AppleLoginButton = ({ label = "Sign in with Apple" }) => {
  const dispatch = useDispatch();
  const [appleSdkLoaded, setAppleSdkLoaded] = useState(false);

  console.log("appleSdkLoaded", appleSdkLoaded);
  

  useEffect(() => {
    if (appleSdkLoaded && window.AppleID) {
      
      window.AppleID.auth.init({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID ||
  "com.gomylz.mylz",
      scope: "name email",
      redirectURI: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI ||
  "https://hotels.gomylz.com/api/auth/apple/callback",

        usePopup: true,
      });
    }
  }, [appleSdkLoaded]);

  const handleAppleLogin = async () => {
     console.log("Trying AppleID.auth.signIn...");
     if (!window.AppleID) {
        console.error("Apple SDK not loaded yet");
        return;
      }
   try {
      
      const response = await window.AppleID.auth.signIn();
      console.log("window_AppleID", response);
      // dispatch(LoginWithApple(response.authorization.code));
    } catch (err) {
      console.error("Apple login failed:", err);
    }
  };

  return (
    <>
      <Script
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        onLoad={() => setAppleSdkLoaded(true)}
      />

      <Box
        onClick={handleAppleLogin}
        className={`${styles.SignupOption} btn btn-sm btn-border black-border btn-round`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
        p={1}
        mb={1}
        fontWeight="bold"
        sx={{ cursor: "pointer" }}
      >
        <i className="f20 fa-brands fa-apple"></i>
        <Typography fontWeight="bold">{"Continue with Apple"}</Typography>
      </Box>
    </>
  );
};

export default AppleLoginButton;
