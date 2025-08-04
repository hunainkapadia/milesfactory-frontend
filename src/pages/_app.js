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
import Script from 'next/script';

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

const GA_ID = process.env.NEXT_PUBLIC_GA_ID //|| "G-0MNTS4RLHH";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
// IMPORTANT: Use the full, absolute URL for the image

const defaultOgImage = 'https://d32n5ymbetby8w.cloudfront.net/mylz-assets/images/favicon_mylz_v2.png';
const defaultSiteTitle = 'Mylz | Design trips. Book instantly.';

function AppWrapper({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag?.("config", `${GA_ID}`, {
        page_path: url,
      });
      // The TikTok pixel object might not be available immediately
      // so we check for its existence before calling the 'page' method.
      if (window.ttq) {
        window.ttq.page();
      }
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
              <title>{defaultSiteTitle}</title> {/* Default title */}
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
                rel="stylesheet"
              />

              <link rel="icon" href="/images/favicon_mylz_big.svg" />
                      
              {/* Default Open Graph tags */}
              <meta property="og:type" content="website" />
              <meta property="og:site_name" content={defaultSiteTitle} />
              <meta property="og:image" content={defaultOgImage} />
              <meta property="og:title" content={defaultSiteTitle} />
              <meta property="og:description" content="Design trips. Book instantly." />
              <meta property="og:url" content="https://gomylz.com" />
              <meta name="description" content="Design trips. Book instantly." />
              
              {/* Default Twitter Card tags */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta property="twitter:domain" content="https://gomylz.com" />
              <meta property="twitter:url" content="https://gomylz.com" />
              <meta name="twitter:title" content={defaultSiteTitle} />
              <meta name="twitter:image" content={defaultOgImage}/>
           
           </Head>
             {/* ✅ GA Scripts go outside <Head> */}
            {GA_ID && (
              <>
                <Script
                  strategy="afterInteractive"
                  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                />
                <Script
                  id="gtag-init"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_ID}');
                    `,
                  }}
                />
              </>
            )}
            {/* Facebook Pixel */}
            {FB_PIXEL_ID && (
              <>
                <Script
                  id="fb-pixel-script"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                      !function(f,b,e,v,n,t,s)
                      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                      n.queue=[];t=b.createElement(e);t.async=!0;
                      t.src=v;s=b.getElementsByTagName(e)[0];
                      s.parentNode.insertBefore(t,s)}
                      (window, document,'script',
                      'https://connect.facebook.net/en_US/fbevents.js');
                      fbq('init', '${FB_PIXEL_ID}');
                      fbq('track', 'PageView');
                    `,
                  }}
                />
                <noscript>
                  <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                    alt=""
                  />
                </noscript>
              </>
            )}
             {/* Tiktok pixel. Using fb pixel env var so it only runs in prod */}
            {FB_PIXEL_ID && (
              <>
                <Script
                  id="tiktok-pixel-script"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                        !function (w, d, t) {
                          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
                        var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
                        ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};


                          ttq.load('D1QFC0BC77U41SK2OQ9G');
                          ttq.page();
                        }(window, document, 'ttq');
                    `,
                  }}
                />
              </>
            )}
            {/* Twitter pixel. Using fb pixel env var so it only runs in prod */}
            {FB_PIXEL_ID && (
              <>
                <Script
                  id="twitter-pixel-script"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                      !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                      },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
                      a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                      twq('config','q5oxs');
                    `,
                  }}
                />
              </>
            )}
            <AppWrapper Component={Component} pageProps={pageProps} />

          </ThemeProvider>
        </StyledEngineProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}
