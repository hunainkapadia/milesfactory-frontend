import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchMessages = createAsyncThunk(
   "messages/fetchMessages",
   async (_, { rejectWithValue }) => {
     try {
       console.log("Fetching messages from API..."); // ✅ Debugging Log
       const response = await api.get(API_ENDPOINTS.CHAT.GET_MESSAGE);
       console.log("API Response:", response.data); // ✅ Debugging Log
 
       if (!Array.isArray(response?.data)) {
         return rejectWithValue("Invalid Data from API");
       }
 
       return response.data.map((item) => ({
         user: item?.message,
         ai: item?.is_function ? null : item,
         expireTime: item.is_function
           ? new Date(item?.response?.results?.search_result_expire_time).getTime()
           : null,
       }));
     } catch (error) {
       console.error("Fetch Messages Error:", error); // ✅ Debugging Log
       return rejectWithValue(error.response?.data || error.message);
     }
   }
 );
 
 export const sendMessage = createAsyncThunk(
   "messages/sendMessage",
   async (userMessage, { rejectWithValue }) => {
     try {
       console.log("Sending message to API:", userMessage); // ✅ Debugging Log
       const response = await api.post(API_ENDPOINTS.CHAT.SEND_MESSAGE, {
         user_message: userMessage,
       });
       console.log("Send Message API Response:", response.data); // ✅ Debugging Log
 
       return { user: userMessage, ai: response.data };
     } catch (error) {
       console.error("Send Message Error:", error); // ✅ Debugging Log
       return rejectWithValue(error.response?.data || error.message);
     }
   }
 );
 