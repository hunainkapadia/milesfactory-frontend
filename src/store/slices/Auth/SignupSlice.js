import { createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { API_ENDPOINTS } from "../../api/apiEndpoints";
import Cookies from "js-cookie";

const initialState = {
  SignupUser: null,
  isLoading: false,
  error: null,
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  passwordError: "",
  IsSignupUser: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setIsSignupUser: (state, action)=> {
      console.log("action1212", action);
      state.IsSignupUser = action.payload
    },
    setsignUpUser: (state, action) => {    
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
      window.location.reload(); // Refresh the page to reflect changes
    },
    seIstLoading: (state, action)=> {
      state.isLoading = action.payload;
    }
  },
});

// **Thunk for signing up a user**
export const SignUpUser = (params) => (dispatch) => {
  dispatch(seIstLoading(true))
   api
    .post(API_ENDPOINTS.AUTH.SIGNUP, params)
    .then((res) => {
      
      if (res.status === 201) {
        console.log("res11", res?.data);
        dispatch(setsignUpUser({user: res?.data, status: res.status}));
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
      dispatch(seIstLoading(false));
    });
};

export const {
  setsignUpUser,
  setFirstNameError,
  setLastNameError,
  setEmailError,
  setPasswordError,
  logoutUser,
  seIstLoading,
  setIsSignupUser,
} = signupSlice.actions;

export default signupSlice.reducer;