import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import bookingflightsReducer from "./slices/BookingflightSlice"; // ✅ Import correctly
import GetMessagesReducer from "./slices/GestMessageSlice";
import { sendMessageReducer } from "../component/HeroSection/sendMessageSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    booking: bookingflightsReducer,
    GestMessage: GetMessagesReducer,
    sendMessage: sendMessageReducer
    

  },
});

export default store;
