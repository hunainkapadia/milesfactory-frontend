import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import messagesReducer from "./slices/messagesSlice";
import bookingflightsReducer from "./slices/BookingflightSlice"; // ✅ Import correctly

const store = configureStore({
  reducer: {
    counter: counterReducer,
    messages: messagesReducer,
    booking: bookingflightsReducer, // ✅ Use correct reducer name
  },
});

export default store;
