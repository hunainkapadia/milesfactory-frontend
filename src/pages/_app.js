import React, { useEffect } from "react";
import { Provider } from "react-redux";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import store from "@/src/store/store";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "@/src/styles/sass/style.scss";
import "react-phone-input-2/lib/style.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";

// Define a Custom Theme with the New Font
const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          maxWidth: "1188px", // Set lg container to 1188px
          '@media (min-width: 1200px)': {
            maxWidth: "1188px",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif", // Change to your preferred font
  },
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function AppWrapper({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag?.("config", `${GA_ID}` {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="830627155853-a0kn9u3fcttld40vhkr90olun09dhvmp.apps.googleusercontent.com">
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Ensures global styles apply */}
            <Head>
              <title>Mylz | Stop the endless tabs. Book trips in seconds.</title> {/* Default title */}
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
                rel="stylesheet"
              />
              <link rel="icon" href="/images/favicon_mylz_big.svg" />

              {/* Google Analytics */}
              <script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-0MNTS4RLHH');
                  `,
                }}
              />
              {/* Google Analytics */}
            </Head>
            <AppWrapper Component={Component} pageProps={pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}
