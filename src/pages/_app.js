import React from 'react';
import { Avatar, Grid, Container, Menu, MenuItem, Box, Button } from "@mui/material";
import "@/src/styles/sass/style.scss";
import { Provider } from 'react-redux';
import store from "@/src/store/store"
export default function App({ Component, pageProps }) {
  return (  
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>  
    
  )
}
