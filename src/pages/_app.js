import React from "react";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles"; // Ensures MUI styles don't override SCSS
import store from "@/src/store/store";
import Head from "next/head";

// Always load global SCSS first
import "@/src/styles/sass/style.scss";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* Ensure SCSS has higher priority over MUI styles */}
      <StyledEngineProvider injectFirst={false}>
        <Head>
          <link rel="icon" href="/images/favicon_mylz.svg" />
        </Head>
        <Component {...pageProps} />
      </StyledEngineProvider>
    </Provider>
  );
}
