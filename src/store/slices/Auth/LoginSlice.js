import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { API_ENDPOINTS } from "../../api/apiEndpoints"; // Fixed import
import api from "../../api";

const initialState = {
  loginUser: null,
  openDrawer: false,
  loading: false,
  error: null,
  LoginError: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.openDrawer = true;
    },
    closeDrawer: (state) => {
      state.openDrawer = false;
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
      state.user = null;
      Cookies.remove("set-user-login");
    },
  },
});

// **Thunk for Logging In a User**
export const loginUser = (params) => (dispatch) => {
   api
     .post(API_ENDPOINTS.AUTH.LOGIN, params)
     .then((res) => {
       if (res.status === 200) {
         dispatch(setLoginUser({ user: res.data, status: res.status }));
         console.log("success11", res?.data?.access, res?.data?.refresh);

         // Store user info in cookies
         Cookies.set(
           "set-user-login",
           JSON.stringify({
             email: params.email,
             password: params.password,
             refresh: res?.data?.refresh,
             access: res?.data?.access,
           }),
           { expires: 7 }
         );

         setTimeout(() => {
           dispatch(closeDrawer());
         }, 3000);
       }
     })
     .catch((error) => {
      console.log("error111", );

      const emailError = error?.response?.data?.username?.[0] || "";
      const passworderror = error?.response?.data?.password?.[0] || "";
      const otherError = error?.response?.data?.detail;
      
      const LoginError = {email: emailError, password: passworderror, other: otherError}
       dispatch(setLoginError(LoginError));
     });
};

export const {
  openDrawer,
  closeDrawer,
  setLoginUser,
  logoutUser,
  setLoginError,
} = loginSlice.actions;

export default loginSlice.reducer;
