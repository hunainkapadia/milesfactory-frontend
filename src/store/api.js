import axios from "axios";
import Cookies from "js-cookie";
import { isTokenExpired } from "./tokenHelpers";
import { Logout } from "./slices/Auth/LoginSlice";
import store from "./store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://demo.milesfactory.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(async (config) => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  // Valid access token — use it
  if (accessToken && !isTokenExpired(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  // Access token is expired — try refreshing
  if (accessToken && isTokenExpired(accessToken)) {
    console.log("Access token expired. Refreshing...");

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshPayload = { refresh: refreshToken };

        const response = await axios.post(
          `${API_BASE_URL}/api/v1/refresh/`,
          refreshPayload
        );

        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh;

        // Update access token
        Cookies.set("access_token", newAccessToken);

        // Optionally update refresh token
        if (newRefreshToken) {
          Cookies.set("refresh_token", newRefreshToken, { expires: 7 });
        }

        isRefreshing = false;
        processQueue(null, newAccessToken);

        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return config;

      } catch (error) {
        console.error("Token refresh failed:", error?.response?.status);

        // If refresh token is blacklisted or expired
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          try {
            const storedRefreshToken = Cookies.get("refresh_token");

            // Optionally call logout API
            
            // logout
          } catch (logoutError) {
            console.error("Logout API call failed", logoutError);
          }

          // Clear cookies and logout
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          store.dispatch(Logout());

          // Optional redirect
          // window.location.href = "/login";
        }

        isRefreshing = false;
        processQueue(error, null);
        return Promise.reject(error);
      }
    }

    // Queue requests while refreshing
    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: (token) => {
          config.headers.Authorization = `Bearer ${token}`;
          resolve(config);
        },
        reject,
      });
    });
  }

  return config;
});

// Optional: Save session ID if available in response headers
api.interceptors.response.use(
  (response) => {
    const sessionId = response.headers["x-session-id"];
    if (sessionId) {
      Cookies.set("sessionid", sessionId, { path: "/" });
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
