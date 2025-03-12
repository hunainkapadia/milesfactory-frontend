import { createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { API_ENDPOINTS } from "../../api/apiEndpoints";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  openDrawer: false,
  loading: false,
  error: null,
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  passwordError: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.openDrawer = true;
    },
    closeDrawer: (state) => {
      state.openDrawer = false; // Corrected the variable name
    },
    setsignUpUser: (state, action) => {
      
      state.user = action.payload;
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
      Cookies.remove("set-user");  // Remove user cookie
      window.location.reload();  // Refresh the page to reflect changes
    },
  },
});

// **Thunk for signing up a user**
export const SignUpUser = (params) => (dispatch) => {
   api
    .post(API_ENDPOINTS.AUTH.SIGNUP, params)
    .then((res) => {
      if (res.status === 201) {
         dispatch(closeDrawer());
        dispatch(setsignUpUser({user: res.data, status: res.status}));


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
      });
};

export const {
  openDrawer,
  closeDrawer,
  setsignUpUser,
  setFirstNameError,
  setLastNameError,
  setEmailError,
  setPasswordError,
  logoutUser,
} = signupSlice.actions;

export default signupSlice.reducer;
