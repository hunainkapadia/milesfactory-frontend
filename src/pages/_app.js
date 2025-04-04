import React from "react";
import { Provider } from "react-redux";
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles";
import store from "@/src/store/store";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";

import "@/src/styles/sass/style.scss";

// ✅ Define a Custom Theme with the New Font
const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif", // Change to your preferred font
  },
});

function AppWrapper({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Ensures global styles apply */}
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
              rel="stylesheet"
            />
            <link rel="icon" href="/images/favicon_mylz_v2.svg" />
          </Head>
          <AppWrapper Component={Component} pageProps={pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}
