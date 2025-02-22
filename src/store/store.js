import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import messagesReducer from "./slices/messagesSlice"; // ✅ Fixed import

const store = configureStore({
  reducer: {
    counter: counterReducer,
    messages: messagesReducer, // ✅ Ensure the key matches useSelector((state) => state.messages)
  },
});

export default store;
