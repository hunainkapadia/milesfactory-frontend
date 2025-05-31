import { createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { API_ENDPOINTS } from "../../api/apiEndpoints";
import Cookies from "js-cookie";
import { setLoginUser } from "./LoginSlice";
// import { setLoginPopup } from "./LoginSlice";

const initialState = {
  SignupUser: null,
  isLoading: false,
  error: null,
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  passwordError: "",
  SignupPopup: false,
  registerPopup: false,
  UserPopup: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setisUserPopup: (state, action)=> {
      state.UserPopup = action.payload
    },
    setRegisterPopup: (state, action)=> {
      state.registerPopup = action.payload
    },
    setSignupPopup: (state, action)=> {
      
      state.SignupPopup = action.payload
    },
    setIsSignupUser: (state, action) => {    
      state.SignupUser = action.payload;
      state.firstNameError = "";
      state.lastNameError = "";
      state.emailError = "";
      state.passwordError = "";
    },
    setFirstNameError: (state, action) => {
      state.firstNameError = action.payload;
    },
    setLastNameError: (state, action) => {
      state.lastNameError = action.payload;
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
    logoutUser: (state) => {
      state.user = null; // Remove user from Redux
      Cookies.remove("set-user"); // Remove user cookie
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      window.location.reload(); // Refresh the page to reflect changes
    },
    setIstLoading: (state, action)=> {
      state.isLoading = action.payload;
    }
  },
});

// **Thunk for signing up a user**
export const SignUpUser = (params) => (dispatch) => {
  dispatch(setIstLoading(true))
   api
    .post(API_ENDPOINTS.AUTH.SIGNUP, params)
    .then((res) => {
      
      console.log("signup_res_out", res);
      if (res.status === 201) {
        console.log("signup_res_in", res);
        
        dispatch(
          setLoginUser({ user: { user: res?.data }, status: res.status })
        );
        dispatch(setSignupPopup(false));
        // Store user info in cookies
        Cookies.set(
          "set-user",
          JSON.stringify({
            email: params.email,
            password: params.password,
            first_name: params.first_name,
            last_name: params.last_name,
          }),
          { expires: 7 }
        );
      }
    })
    .catch((error) => {
       const errors = error?.response?.data.errors || {};
       dispatch(setFirstNameError(errors.first_name?.[0] || ""));
       dispatch(setLastNameError(errors.last_name?.[0] || ""));
       dispatch(setEmailError(errors.email?.[0] || ""));
       dispatch(setPasswordError(errors.password?.[0] || ""));
      })
      .finally(() => {
      dispatch(setIstLoading(false));
    });
};

export const {
  setIsSignupUser,
  setFirstNameError,
  setLastNameError,
  setEmailError,
  setPasswordError,
  logoutUser,
  setIstLoading,
  setSignupPopup,
  setRegisterPopup,
  setisUserPopup,
} = signupSlice.actions;

export default signupSlice.reducer;