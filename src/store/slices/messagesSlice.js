import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { API_ENDPOINTS } from "../api/apiEndpoints";

// Fetch messages from API
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🚀 Fetching messages from API...");
      const response = await api.get(API_ENDPOINTS.CHAT.GET_MESSAGE);
      console.log("✅ API Response:", response.data);

      if (!Array.isArray(response?.data)) {
        return rejectWithValue("Invalid Data from API");
      }

      return response.data.map((item) => ({
        user: item?.message,
        ai: item?.is_function ? null : formatAIResponse(item),
        expireTime: item.is_function
          ? new Date(item?.response?.results?.search_result_expire_time).getTime()
          : null,
      }));
    } catch (error) {
      console.error("❌ Fetch Messages Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Send a new message to the API
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (userMessage, { rejectWithValue }) => {
    try {
      console.log("📨 Sending message to API:", userMessage);
      const response = await api.post(API_ENDPOINTS.CHAT.SEND_MESSAGE, {
        user_message: userMessage,
      });
      console.log("✅ Send Message API Response:", response.data);

      return { user: userMessage, ai: formatAIResponse(response.data) };
    } catch (error) {
      console.error("❌ Send Message Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Helper function to format AI response
const formatAIResponse = (data) => {
  if (!data || typeof data !== "object") return "No response received.";

  if (data.is_function && data.response) {
    const results = data.response.results;

    if (results.view_top_flight_result_api || results.view_all_flight_result_api) {
      return `
        ✈️ **Flight Search Results**
        
        🔹 **Top Offers:** [View Here](${results.view_top_flight_result_api?.url || "#"})

        🔹 **All Search Results:** [View Here](${results.view_all_flight_result_api?.url || "#"})
      `;
    }
  }

  return data.message || "No valid response.";
};

// Messages slice
const messagesSlice = createSlice({
  name: "messages",
  initialState: { messages: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        console.log("✅ Messages fetched and stored in Redux:", action.payload);
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error("❌ Fetch messages failed:", action.payload);
      })

      // Send Message
      .addCase(sendMessage.pending, (state, action) => {
        state.isLoading = true;

        // Display user message instantly
        state.messages.push({ user: action.meta.arg, ai: "..." });
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        console.log("✅ New message added to Redux state:", action.payload);
        state.isLoading = false;

        const { user, ai } = action.payload;
        state.messages[state.messages.length - 1].ai = ai; // Update AI message
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error("❌ Send message failed:", action.payload);

        // Show error message in chat
        state.messages[state.messages.length - 1].ai = "❌ Error: Failed to get response.";
      });
  },
});

export default messagesSlice.reducer;
