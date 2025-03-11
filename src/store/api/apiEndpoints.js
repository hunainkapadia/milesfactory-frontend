export const API_ENDPOINTS = {
   AUTH: {
     LOGIN: "/api/v1/login/",
     SIGNUP: "/api/v1/register/",
     LOGOUT: "/api/v1/logout/",
   },
   CHAT: {
     SEND_MESSAGE: "/api/v1/chat/send-message",
     GET_MESSAGE: "/api/v1/chat/get-messages",
   },
   BOOKING: {
    BOOKING_DETAIL: "/api/v1/search/single/result/",
    BOOKING_SETUP: "/api/v1/setup/flight",
    PASSENGER_DETAIL: "/api/v1/order/"
   }
   // Add more sections if needed (e.g., TICKETS, USERS, PAYMENTS)
 };