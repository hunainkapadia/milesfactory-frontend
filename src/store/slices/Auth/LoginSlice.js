import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { API_ENDPOINTS } from "../../api/apiEndpoints"; // Fixed import
import api from "../../api";

const initialState = {
  loginUser: null,
  loginOpenDrawer: false,
  isLoading: false,
  error: null,
  LoginError: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginOpenDrawer: (state) => {
      state.loginOpenDrawer = true;
    },
    LogincloseDrawer: (state) => {
      state.loginOpenDrawer = false;
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
    }
  },
});

// **Thunk for Logging In a User**
export const loginUser = (params) => (dispatch) => {
    dispatch(setisLoading(true));
   api
     .post(API_ENDPOINTS.AUTH.LOGIN, params)
     .then((res) => {
        console.log("resss", res.data)
       if (res.status === 200) {
         dispatch(setLoginUser({ user: res.data, status: res.status }));
         // Store user info in cookies
         Cookies.set(
           "set-user",
           JSON.stringify({
             email: params.email,
             first_name: res.data.first_name,
             password: res.data.password,
             refresh: res?.data?.refresh,
             access: res?.data?.access,
           }),
           { expires: 7 }
         );

         dispatch(LogincloseDrawer());
         // setTimeout(() => {
         // }, 3000);
       }
     })
     .catch((error) => {
      console.log("error111", );

      const emailError = error?.response?.data?.username?.[0] || "";
      const passworderror = error?.response?.data?.password?.[0] || "";
      const otherError = error?.response?.data?.detail;
      
      const LoginError = {email: emailError, password: passworderror, other: otherError}
       dispatch(setLoginError(LoginError));
     }).finally(()=>{
      dispatch(setisLoading(false));
     })
};

export const {
  loginOpenDrawer,
  LogincloseDrawer,
  setLoginUser,
  logoutUser,
  setLoginError,
  setisLoading,
} = loginSlice.actions;

export default loginSlice.reducer;
