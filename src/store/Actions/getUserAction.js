import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserService } from "../service/getUserService";

export const getUserAction = createAsyncThunk(
  "user/getUser",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getUserService.getUser(params);

      

      return response; // Return the user data
    } catch (error) {
      return rejectWithValue(error.response || error.message);
    }
  }
);
