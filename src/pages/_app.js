import React from "react";
import { Provider, useSelector } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";
import store from "@/src/store/store";
import Head from "next/head";

import "@/src/styles/sass/style.scss";
import SignUpDrawer from "../component/Auth/SignUpDrawer";
import LoginDrawer from "../component/Auth/LoginDrawer";

// 👇 Create a wrapper to use Redux hooks safely
function AppWrapper({ Component, pageProps }) {
  const openLoginDrawer = useSelector((state) => state?.login?.loginOpenDrawer);
  const isUserLogin = useSelector((state) => state?.login);
  const setLoginCloseDrawer = useSelector((state)=> state?.login?.loginOpenDrawer);
  console.log("setLoginCloseDrawer", setLoginCloseDrawer);
  
  

  return (
    <>
       <Component {...pageProps} />
      <SignUpDrawer />
      <LoginDrawer />
    </>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst={false}>
        <Head>
          <link rel="icon" href="/images/favicon_mylz_big_full.svg" />
        </Head>
        {/* Now it's safe to use Redux hooks inside */}
        <AppWrapper Component={Component} pageProps={pageProps} />
      </StyledEngineProvider>
    </Provider>
  );
}
