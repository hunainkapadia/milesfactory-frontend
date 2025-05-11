import { createSlice } from "@reduxjs/toolkit";
import api from "../../api";
const initialState = {
  sectionActive: null,
  LoginError: "",
  ThreadDrawer: false,
  ThreadData: null,
  currentUser: "",
};

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setCurrentUser: (state, action)=> {
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

export const thread = () => (dispatch, getState) => {
  api.get("/api/v1/chat/thread/all").then((res)=> {
    dispatch(setThreadData(res.data))
  }).catch((error)=> {
    console.log(error);
    
  }).finally(()=> {
    console.log();
    
  })
};


export const {
  setSectionActive,
  setThreadDrawer,
  setThreadData,
  setCurrentUser,
} = baseSlice.actions;

export default baseSlice.reducer;