import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken, logoutUser } from "../store/slices/Auth/LoginSlice";

// API Base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://demo.milesfactory.com";

// Create Axios instance with credentials enabled
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Required for browser to send cookies automatically
});

// Response Interceptor: Handles session ID & Token Expiry
api.interceptors.response.use(
  (response) => {
    console.log("Response Headers:", response.headers);
    // If backend sends session ID in a custom header (e.g., x-session-id)
    const sessionid = response.headers["x-session-id"];
    if (sessionid) {
      Cookies.set("sessionid", sessionid, { path: "/" }); // Store session ID
    }
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // If token expired & request is not a retry, attempt refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return store
        .dispatch(refreshToken()) // Dispatch refresh token action
        .unwrap()
        .then((newAccessToken) => {
          Cookies.set("access_token", newAccessToken); // Store new token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(originalRequest); // Retry original request
        })
        .catch((err) => {
          console.log("Refresh Token Failed:", err);
          store.dispatch(logoutUser()); // Logout if refresh fails
          return Promise.reject(error);
        });
    }

    return Promise.reject(error);
  }
);

// Request Interceptor: Attach Access Token (if available)
api.interceptors.request.use((config) => {
  console.log("Sending request with credentials:", config);

  // Attach Access Token if available
  const token = Cookies.get("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default api;
