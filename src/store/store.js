import { configureStore } from "@reduxjs/toolkit";
import getMessagesReducer from "./slices/GestMessageSlice";
import sendMessageReducer from "./slices/sendMessageSlice";
import bookingflightsReducer from "./slices/BookingflightSlice";
import passengerDrawerReducer from "./slices/passengerDrawerSlice" ;
import authReducer from "./slices/Auth/AuthSlice" ;
import loginReducer from "./slices/Auth/LoginSlice";

const store = configureStore({
  reducer: {
    booking: bookingflightsReducer,
    getMessages: getMessagesReducer,
    sendMessage: sendMessageReducer,
    passengerDrawer: passengerDrawerReducer,
    auth :  authReducer,
    login :  loginReducer,

  },
  // devTools: process.env.NODE_ENV !== "production", // Enable DevTools only in development mode

});

export default store;
