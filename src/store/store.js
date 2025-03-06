import { configureStore } from "@reduxjs/toolkit";
import getMessagesReducer from "./slices/GestMessageSlice";
import sendMessageReducer from "./slices/sendMessageSlice";
import bookingflightsReducer from "./slices/BookingflightSlice";
import passengerDrawerReducer from "./slices/passengerDrawerSlice" 

const store = configureStore({
  reducer: {
    booking: bookingflightsReducer,
    getMessages: getMessagesReducer,
    sendMessage: sendMessageReducer,
    passengerDrawer: passengerDrawerReducer,

  },
  // devTools: process.env.NODE_ENV !== "production", // Enable DevTools only in development mode

});

export default store;
