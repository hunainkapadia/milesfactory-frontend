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
    setIsUser: (state, action)=> {
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
    },
    setisLoading: (state, action)=> {
      state.isLoading = action.payload;
    },
    setLoginPopup: (state, action) => {
      state.LoginPopup = action.payload; // Accepts `true` or `false`
    },
    setLoginCloseDrawer: (state)=> {
      state.LoginPopup = false;
    }
    
  },
});

// **Thunk for Logging In a User**
export const loginUser = (params) => (dispatch) => {
    dispatch(setisLoading(true));
   api
     .post(API_ENDPOINTS.AUTH.LOGIN, params)
     .then((res) => {
       if (res.status === 200) {
         dispatch(setLoginUser({ user: res.data, status: res.status }));
         dispatch(setLoginPopup(false))
         // Store user info in cookies
         Cookies.set(
           "set-user",
           JSON.stringify({
             email: params.email,
             first_name: res.data.first_name,
             password: res.data.password,
             refresh_token: res?.data?.refresh,
             access_token: res?.data?.access,
           }),
           { expires: 7 }
         );         
       }
     })
     .catch((error) => {
      
      const emailError = error?.response?.data?.username?.[0] || "";
      const passworderror = error?.response?.data?.password?.[0] || "";
      const otherError = error?.response?.data?.detail;
      
      const LoginError = {email: emailError, password: passworderror, other: otherError}
       dispatch(setLoginError(LoginError));
     }).finally(()=>{
      dispatch(setisLoading(false));
     })
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
    .catch((error) => rejectWithValue(error.response?.data || "Failed to refresh token"));
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
