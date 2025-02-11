import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserService } from "../service/getUserService";

export const getUserAction = createAsyncThunk(
  "user/getUser",
  async (params, { rejectWithValue }) => {
    try {
      console.log("Fetching user data with params:", params); // Log request parameters

      const response = await getUserService.getUser(params);

      

      return response; // Return the user data
    } catch (error) {
      console.error("Error fetching user data:", error); // Log the error
      return rejectWithValue(error.response || error.message);
    }
  }
);
