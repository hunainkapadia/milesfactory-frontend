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
  LogoutUser: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsUser: (state, action) => {
      
      
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
    setLogoutUser: (state) => {
      state.loginUser = null; //
      state.setLogoutUser = state.action;
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

        

        const { username, first_name, last_name, access, refresh } = res.data;

        // 2. Store basic user info (NO password, NO tokens)
        Cookies.set(
          "set-user",
          JSON.stringify({
            email: username,
            first_name : first_name,
            last_name: last_name,
          }),
        );

        // 3. Store tokens in separate cookies (optional: set secure attributes)
        Cookies.set("access_token", access);

        Cookies.set("refresh_token", refresh);
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
      Cookies.set("access_token", response.data.access);
      Cookies.set("refresh_token", response.data.refresh);
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

        

        // 2. Store user info (without tokens) in cookie

        
        Cookies.set(
          "set-user",
          JSON.stringify({
            email: res.data.user.email,
            first_name : res.data.user.first_name,
            last_name: res.data.user.last_name,
          }),
        );

        // 3. Store tokens in separate cookies (optional: with shorter expiration)
        Cookies.set("access_token", access); // expires in 1 day
        Cookies.set("refresh_token", refresh); // expires in 7 days
      } else {
        console.error("Login failed", res);
      }
    })
    .catch((error) => {
      
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

// facebook login
export const LoginWithFacebook = (access_token) => (dispatch) => {
  dispatch(setisLoading(true));

  api
    .post("/api/auth/facebook/", { access_token }) // Your backend endpoint
    .then((res) => {
      const { user, access, refresh } = res.data;

      dispatch(
        setLoginUser({
          user: res.data,
          status: res.status,
          userPopup: false,
        })
      );

      Cookies.set(
        "set-user",
        JSON.stringify({
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        })
      );

      Cookies.set("access_token", access);
      Cookies.set("refresh_token", refresh);
    })
    .catch((error) => {
      dispatch(
        setLoginError({
          other: error?.response?.data?.detail || "Facebook login failed",
        })
      );
    })
    .finally(() => {
      dispatch(setisLoading(false));
    });
};


export const Logout = () => (dispatch) => {
  const refreshToken = Cookies.get("refresh_token"); // Correct method
  

  api.post("/api/v1/logout/", { refresh: refreshToken })
    .then((res) => {
      
      dispatch(setLogoutUser(res.data));

      Cookies.remove("set-user");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      window.location.reload();

    })
    .catch((err) => {
      console.error("Logout failed:", err.response?.data || err.message);
    });
};

export const {
  setLoginPopup,
  setLoginCloseDrawer,
  LogincloseDrawer,
  setLoginUser,
  setLogoutUser,
  setLoginError,
  setisLoading,
  setIsUser,
} = loginSlice.actions;

export default loginSlice.reducer;
