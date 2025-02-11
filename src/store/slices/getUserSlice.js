import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserAction } from "../actions/getUserAction"; // Ensure correct path

const initialState = {
  processing: false,
  data: null,
  isError: false,
};

const getUserSlice = createSlice({
  name: "getUser",
  initialState,
  reducers: {}, // No need for manual request/success/error reducers

  extraReducers: (builder) => {
    builder
      .addCase(getUserAction.pending, (state) => {
        state.processing = true;
        state.isError = false;
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.processing = false;
        state.data = action.payload;
      })
      .addCase(getUserAction.rejected, (state) => {
        state.processing = false;
        state.isError = true;
      });
  },
});

export default getUserSlice.reducer;
