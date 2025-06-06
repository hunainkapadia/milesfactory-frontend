import { createSlice } from "@reduxjs/toolkit";
import api from "../../api";
const initialState = {
  sectionActive: null,
  LoginError: "",
  ThreadDrawer: false,
  ThreadData: null,
  currentUser: "",
  feedbackDialog: false,
  contactDialog: false,
};

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setRatingSumbitRequest: (state, action)=> {
      state.RatingSumbitRequest = action.payload
    },
     submitFeedback: (state, action) => {
      state.reviews.push(action.payload); // Save feedback to store
    },
    setContactData:(state, action) => {
      state.contactData = action.payload
    },
    setContactDialog: (state, action)=> {
      state.contactDialog = action.payload;
    },
    setFeedbackDialog: (state,action)=> {
      state.feedbackDialog = action.payload;
    },
    setCurrentUser: (state, action)=> {
      console.log("currentuser_state", action);
      
      state.currentUser = action.payload;
    },
    setThreadData: (state, action)=> {
      console.log("thread_action", action);
      
      state.ThreadData = action.payload
    },
    setThreadDrawer: (state, action)=> {
      console.log("handleThreadDrawer", action);
      
      state.ThreadDrawer = action.payload
    },
   setSectionActive:(state, action)=> {
    state.sectionActive = action.payload; // Update active section
   },
  },
});

export const feedBack=()=> {
  
}
export const thread = () => (dispatch, getState) => {
  api.get("/api/v1/chat/thread/all").then((res)=> {
    dispatch(setThreadData(res.data))
  }).catch((error)=> {
    console.log(error);
    
  }).finally(()=> {
    console.log();
    
  })
};

export const handleSubmitContact = (params) => (dispatch, getState) => {
  console.log("contact_params", params);
  
  api.post("/api/v1/contact-us", params).then((res)=> {
    console.log("contact_res", res)
    dispatch(setContactData(res));
  }).catch((error)=> {
    console.log(error);
    
  }).finally(()=> {
    console.log();
    
  })
};


export const RatingSubmit = (params) => (dispatch, getState) => {
  console.log("rating_params", params);
  api
    .post("/api/v1/rating", params)
    .then((res) => {
      console.log("rating_res", res);
      dispatch(setRatingSumbitRequest(res.data)); // store response if needed
    })
    .catch((error) => {
      console.error("rating error", error);
    })
    .finally(() => {
      console.log("Rating submit finished");
    });
};




export const {
  setSectionActive,
  setThreadDrawer,
  setThreadData,
  setCurrentUser,
  setFeedbackDialog,
  setContactDialog,
  setContactData,
  setRatingSumbitRequest
} = baseSlice.actions;

export default baseSlice.reducer;