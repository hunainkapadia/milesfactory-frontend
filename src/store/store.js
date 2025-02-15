import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import {chatReducer} from "./slices/chatSlice"

const store = configureStore ({
  reducer: {
    counter: counterReducer,
    chat: chatReducer
  }
})

export default store;