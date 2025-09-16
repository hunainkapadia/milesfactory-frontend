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
  const cookieUser = Cookies.get("set-user");
  //console.log("Access Token:", accessToken);
  //console.log("Refresh Token:", refreshToken);

  if (accessToken && !isTokenExpired(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  if (accessToken && isTokenExpired(accessToken)) {
    //console.log("Access token expired. Refreshing...");

    if (!refreshToken || cookieUser) {
      console.warn("No refresh token available. Logging out...");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      store.dispatch(Logout());
      return Promise.reject("No refresh token found");
    }

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/v1/refresh/`,
          { refresh: refreshToken },
          { withCredentials: true }
        );

        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh;

        //console.log("New tokens received:", response.data);

        Cookies.set("access_token", newAccessToken);
        if (newRefreshToken) {
          Cookies.set("refresh_token", newRefreshToken);
        }

        isRefreshing = false;
        processQueue(null, newAccessToken);

        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return config;

      } catch (error) {
        console.error("🔴 Token refresh failed:", error?.response?.status);
        //console.log("🔴 Refresh error:", error?.response?.data);

        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        store.dispatch(Logout());

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
