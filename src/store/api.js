import axios from "axios";
import Cookies from "js-cookie";
import { isTokenExpired } from "./tokenHelpers";

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

  if (accessToken && !isTokenExpired(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

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

        // Always update access token
        Cookies.set("access_token", newAccessToken);

        // Only update refresh token if a new one is returned and the current one is close to expiring
        if (newRefreshToken && isTokenExpired(refreshToken, 24 * 60 * 60)) {
          // Assuming isTokenExpired can take a second parameter to check for near expiry
          Cookies.set("refresh_token", newRefreshToken, { expires: 7 });
        }

        isRefreshing = false;
        processQueue(null, newAccessToken);

        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return config;
      } catch (error) {
        console.error("Token refresh failed:", error);
        isRefreshing = false;
        processQueue(error, null);
        return Promise.reject(error);
      }
    }

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
