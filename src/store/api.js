import axios from "axios";
import Cookies from "js-cookie";

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://demo.gomylz.com/api/";

// Create Axios instance with credentials enabled
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Required for browser to send cookies automatically
});

// Response Interceptor: Debugging Session ID
api.interceptors.response.use((response) => {
  console.log("Response Headers:", response.headers);
  
  // If backend sends session ID in a custom header (e.g., x-session-id)
  const sessionid = response.headers["x-session-id"];
  if (sessionid) {
    Cookies.set("sessionid", sessionid, { path: "/" }); // Store session ID
  }

  return response;
});

// Request Interceptor: Do NOT set "Cookie" manually
api.interceptors.request.use((config) => {
  console.log("Sending request with credentials:", config);
  
  // Do NOT set Cookie header manually
  return config;
});

export default api;
