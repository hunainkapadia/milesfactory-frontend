import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { API_ENDPOINTS } from "../api/apiEndpoints";


// Async action to fetch chat messages
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.CHAT.GET_MESSAGE);
      return response.data.map((item) => ({
        user: item.message,
        ai: item.response,
      }));
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching messages");
    }
  }
);

// Async action to send a user message and get AI response
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (userMessage, { rejectWithValue }) => {
    try {
      const response = await api.post(API_ENDPOINTS.CHAT.SEND_MESSAGE, {
        user_message: userMessage,
      });
      return { user: userMessage, ai: response.data.response };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error sending message");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;
