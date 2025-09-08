import { configureStore } from "@reduxjs/toolkit";
import getMessagesReducer from "./slices/GestMessageSlice";
import sendMessageReducer from "./slices/sendMessageSlice";
import bookingflightsReducer from "./slices/BookingflightSlice";
import passengerDrawerReducer from "./slices/passengerDrawerSlice" ;
import signupReducer from "./slices/Auth/SignupSlice" ;
import loginReducer from "./slices/Auth/LoginSlice";
import baseReducer from "./slices/Base/baseSlice";
import paymentReducer from "./slices/PaymentSlice";
import baggageReducer from "./slices/BaggageSlice";
import hotelReducer from "./slices/HotelSlice";
import travelReducer from "./slices/Travel/travelSlice";



const store = configureStore({
  reducer: {
    booking: bookingflightsReducer,
    getMessages: getMessagesReducer,
    sendMessage: sendMessageReducer,
    passengerDrawer: passengerDrawerReducer,
    signup :  signupReducer,
    login :  loginReducer,
    payment :  paymentReducer,
    base: baseReducer,
    bagage: baggageReducer,
    hotel: hotelReducer,
    travel: travelReducer,
    

  },
  // devTools: process.env.NODE_ENV !== "production", // Enable DevTools only in development mode

});

export default store;
