export const API_ENDPOINTS = {
   AUTH: {
     SIGNUP: "/api/v1/register/",
     LOGIN: "/api/v1/login/",
     LOGOUT: "/api/v1/logout/",
     REFRESH_TOKEN: "/api/v1/refresh/",
   },
   CHAT: {
     SEND_MESSAGE: "/api/v1/chat/send-message",
     CREATE_THREAD_SEND: "/api/v1/chat/thread/create",
     CREATE_THREAD_GET: "/api/v1/chat/thread/all",
     GET_MESSAGE: "/api/v1/chat/get-messages",
     REFRESH_SEARCH: "/api/v1/refresh/",
   },
   BOOKING: {
    BOOKING_DETAIL: "/api/v1/search/single/result/",
    BOOKING_SETUP: "/api/v1/setup/flight",
    PASSENGER_DETAIL: "/api/v1/order/",
    COUNTRIES: "/api/v1/nationalities",
    PASSENGERFORM: "/api/v1/order/",
    VIEWPASSENGERS: "/api/v1/order/",
   }
   // Add more sections if needed (e.g., TICKETS, USERS, PAYMENTS)
 };