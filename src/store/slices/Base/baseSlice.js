import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sectionActive: null,
  LoginError: "",
};

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
   setSectionActive:(state, action)=> {
    
    state.sectionActive = action.payload; // Update active section

   },
  },
});


export const {
  setSectionActive,
} = baseSlice.actions;

export default baseSlice.reducer;
