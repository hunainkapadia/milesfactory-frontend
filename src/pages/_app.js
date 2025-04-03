import React from "react";
import { Provider, useSelector } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";
import store from "@/src/store/store";
import Head from "next/head";

import "@/src/styles/sass/style.scss";
// 👇 Create a wrapper to use Redux hooks safely
function AppWrapper({ Component, pageProps }) {
  return (
    <>
       <Component {...pageProps} />
    </>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst={false}>
        <Head>
          <link rel="icon" href="/images/favicon_mylz_v2.svg" />
        </Head>
        {/* Now it's safe to use Redux hooks inside */}
        <AppWrapper Component={Component} pageProps={pageProps} />
      </StyledEngineProvider>
    </Provider>
  );
}
