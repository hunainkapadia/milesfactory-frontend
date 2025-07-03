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
  inputLabelTexts: [
    "Where do you want to go today?",
    "Explore one destination at a time.",
    "Adventure is waiting for you!"
  ],
};

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    resetInviteSuccess: (state) => {
      state.InviteSuccess = false;
    },
    setInputLabelTexts: (state, action)=> {
      state.inputLabelTexts = action.payload;
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
      state.contactData = null;
    },
    
    setFeedbackDialog: (state,action)=> {
      state.feedbackDialog = action.payload;
    },
    setCurrentUser: (state, action)=> {
      
      
      state.currentUser = action.payload;
    },
    setThreadData: (state, action)=> {
      
      
      state.ThreadData = action.payload
    },
    setTripData:(state, action)=> {
      state.TripData = action.payload
    },
    setTripDetailData:(state, action)=> {
      state.TripDetailData = action.payload
    },
    setThreadDrawer: (state, action)=> {
      
      
      state.ThreadDrawer = action.payload
    },
   setSectionActive:(state, action)=> {
    state.sectionActive = action.payload; // Update active section
   },
   setPowerAirlineDialog: (state, action)=> {
      state.PowerAirlineDialog = action.payload;
      state.contactData = null;
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
    
    
  }).finally(()=> {
    
    
  })
};

export const handleSubmitContact = (params) => (dispatch, getState) => {
  
  
  api.post("/api/v1/contact-us", params).then((res)=> {
    
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
  
  api
    .post("/api/v1/rating", params)
    .then((res) => {
      
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
  
  api
    .post("/api/v1/invite", params)
    .then((res) => {
      
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
  
  api
    .post("/api/v1/invite", params)
    .then((res) => {
      
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
  resetInviteSuccess, 
  setPowerAirlineDialog,
  setInputLabelTexts
} = baseSlice.actions;

export default baseSlice.reducer;