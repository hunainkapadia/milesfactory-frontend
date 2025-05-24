import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { API_ENDPOINTS } from "../../api/apiEndpoints"; // Fixed import
import api from "../../api";

const initialState = {
  loginUser: null,
  isLoading: false,
  error: null,
  LoginError: "",
  LoginPopup: false,
  LoginCloseDrawer: false,
  IsUser: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsUser: (state, action) => {
      console.log("user_action", action);
      
      state.IsUser = action.payload;
    },
    setLoginUser: (state, action) => {
      
      state.loginUser = action.payload;
      state.emailError = "";
      state.passwordError = "";
    },
    setLoginError: (state, action) => {
      state.LoginError = action.payload;
    },
    logoutUser: (state) => {
      state.loginUser = null; //
      Cookies.remove("set-user");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLoginPopup: (state, action) => {
      state.LoginPopup = action.payload; // Accepts `true` or `false`
    },
    setLoginCloseDrawer: (state) => {
      state.LoginPopup = false;
    },
  },
});

// **Thunk for Logging In a User**
export const loginUser = (params) => (dispatch) => {
  dispatch(setisLoading(true));
  api
    .post(API_ENDPOINTS.AUTH.LOGIN, params)
    .then((res) => {
      if (res.status === 200) {
        // 1. Update Redux state
        dispatch(setLoginUser({ user: {user: res.data}, status: res.status }));
        dispatch(setLoginPopup(false));

        console.log("res111", res);

        const { username, first_name, last_name, access, refresh } = res.data;

        // 2. Store basic user info (NO password, NO tokens)
        Cookies.set(
          "set-user",
          JSON.stringify({
            email: username,
            first_name : first_name,
            last_name: last_name,
          }),
          { expires: 7 }
        );

        // 3. Store tokens in separate cookies (optional: set secure attributes)
        Cookies.set("access_token", access, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });

        Cookies.set("refresh_token", refresh, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      }
    })
    .catch((error) => {
      const emailError = error?.response?.data?.username?.[0] || "";
      const passworderror = error?.response?.data?.password?.[0] || "";
      const otherError = error?.response?.data?.detail;

      const LoginError = {
        email: emailError,
        password: passworderror,
        other: otherError,
      };
      dispatch(setLoginError(LoginError));
    })
    .finally(() => {
      dispatch(setisLoading(false));
    });
};

// refreshtoken setup
// 🔹 Refresh Token Thunk (Using Axios .then/.catch)
export const refreshToken = (rejectWithValue) => (dispatch) => {
  const refresh = Cookies.get("refresh_token");

  if (!refresh) return rejectWithValue("No refresh token available");

  return api
    .post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refresh })
    .then((response) => {
      Cookies.set("access_token", response.data.access, { expires: 7 });
      Cookies.set("refresh_token", response.data.refresh, { expires: 7 });
      return response.data.access; // Return new access token
    })
    .catch((error) =>
      rejectWithValue(error.response?.data || "Failed to refresh token")
    );
};

// login with options

export const googleLoginUser = (code) => (dispatch) => {
  dispatch(setisLoading(true));

  api
    .post("/api/auth/google/", { code })
    .then((res) => {
      if (res.status === 200) {
        const { user, access, refresh } = res.data;

        // 1. Store user info in Redux
        dispatch(
          setLoginUser({
            user: res.data,
            status: res.status,
            userPopup: false,
          })
        );

        console.log("googleLogin_res", res.data);

        // 2. Store user info (without tokens) in cookie

        
        Cookies.set(
          "set-user",
          JSON.stringify({
            email: res.data.user.email,
            first_name : res.data.user.first_name,
            last_name: res.data.user.last_name,
          }),
          { expires: 7 }
        );

        // 3. Store tokens in separate cookies (optional: with shorter expiration)
        Cookies.set("access_token", access, { expires: 1 }); // expires in 1 day
        Cookies.set("refresh_token", refresh, { expires: 7 }); // expires in 7 days
      } else {
        console.error("Login failed", res);
      }
    })
    .catch((error) => {
      console.log("googleLogin", error);
      const LoginError = {
        email: "",
        password: "",
        other: error?.response?.data?.detail || "Google login failed",
      };
      dispatch(setLoginError(LoginError));
    })
    .finally(() => {
      dispatch(setisLoading(false));
    });
};

export const {
  setLoginPopup,
  setLoginCloseDrawer,
  LogincloseDrawer,
  setLoginUser,
  logoutUser,
  setLoginError,
  setisLoading,
  setIsUser,
} = loginSlice.actions;

export default loginSlice.reducer;
