import React from 'react';
import { Provider } from 'react-redux';
import store from "@/src/store/store"
import Head from "next/head";
import "@/src/styles/sass/style.scss";
export default function App({ Component, pageProps }) {
  return (  
    <Provider store={store}>
    <Head>
        <link rel="icon" href="/images/favicon_mylz.svg" />
      </Head>
      <Component {...pageProps} />
    </Provider>  
    
  )
}
