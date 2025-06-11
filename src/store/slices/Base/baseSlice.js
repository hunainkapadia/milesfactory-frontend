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
  isloading: false,
  InviteEmailDialog: false,
};

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    resetInviteSuccess: (state) => {
      state.InviteSuccess = false;
    },
    seIsloading: (state, action)=> {
      state.isloading = action.payload;
    },
    setInviteSuccess : (state, action)=> {
      state.InviteSuccess = action.payload
    },
    setRatingSumbitRequest: (state, action)=> {
      state.RatingSumbitRequest = action.payload
    },
     submitFeedback: (state, action) => {
      state.reviews.push(action.payload); // Save feedback to store
    },
    setInviteEmailDialog:(state, action) => {
      state.InviteEmailDialog = action.payload
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
    setTripData:(state, action)=> {
      state.TripData = action.payload
    },
    setTripDetailData:(state, action)=> {
      state.TripDetailData = action.payload
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
  
  dispatch(seIsloading(true))
  api.get("/api/v1/chat/thread/all").then((res)=> {
    dispatch(setThreadData(res.data))
    dispatch(seIsloading(false))
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
    setTimeout(() => {
      dispatch(setContactDialog(false));
      
    }, 5000);
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

export const InviteSubmit = (params) => (dispatch, getState) => {
  console.log("invite_params", params);
  api
    .post("/api/v1/invite", params)
    .then((res) => {
      console.log("invite_res", res);
      dispatch(setInviteSuccess(res.data)); // store response if needed
    })
    .catch((error) => {
      console.error("rating error", error);
    })
    .finally(() => {
      console.log("Rating submit finished");
    });
};

export const InviteDialogSubmit = (params) => (dispatch, getState) => {
  console.log("invite_params", params);
  api
    .post("/api/v1/invite", params)
    .then((res) => {
      console.log("invite_res", res);
      dispatch(setInviteSuccess(res.data)); // store response if needed
      // dispatch(setInviteEmailDialog(false))
    })
    .catch((error) => {
      console.error("rating error", error);
    })
    .finally(() => {
      console.log("Rating submit finished");
    });
};

// my trips
export const MyTripSlice = () => (dispatch, getState) => {
  
  dispatch(seIsloading(true))
  api.get("/api/v1/my/trips").then((res)=> {
    dispatch(setTripData(res.data))
    dispatch(seIsloading(false))
  }).catch((error)=> {
    console.log(error);
    
  }).finally(()=> {
    console.log();
    
  })
};


// baseSlice.js or wherever you define your thunks
export const TripDetailSlice = (uuid) => (dispatch, getState) => {
  dispatch(seIsloading(true));

  api
    .get(`api/v1/my/trip/${uuid}/details`)
    .then((res) => {
      console.log("trip_res", res);
      
      dispatch(setTripDetailData(res.data));
    })
    .catch((error) => {
      console.log("Trip detail fetch error:", error);
    })
    .finally(() => {
      dispatch(seIsloading(false));
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
  setRatingSumbitRequest,
  setInviteSuccess,
  seIsloading,
  setTripData,
  setTripDetailData,
  setInviteEmailDialog,
  resetInviteSuccess
} = baseSlice.actions;

export default baseSlice.reducer;