import { configureStore } from "@reduxjs/toolkit";
import bookingflightsReducer from "./slices/BookingflightSlice";
import getMessagesReducer from "./slices/GestMessageSlice";
import sendMessageReducer from "../component/HeroSection/sendMessageSlice"; // ✅ Corrected import

const store = configureStore({
  reducer: {
    booking: bookingflightsReducer,
    getMessages: getMessagesReducer,
    sendMessage: sendMessageReducer,
  },
});

export default store;
