import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { API_ENDPOINTS } from "../api/apiEndpoints";

const initialState = {
  chatActive: false,
  messages: [],
  isLoading: false,
  error: null,
};

const GetMessagesSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      console.log("setMessage action:", action.payload);
      state.messages = [...state.messages, ...action.payload]; // Append messages instead of replacing
    },
    setIsLoading: (state, action) => {
      console.log("setIsLoading:", action.payload);
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      console.log("setError:", action.payload);
      state.error = action.payload;
    },
  },
});

export const fetchMessages = () => (dispatch) => {
   dispatch(setIsLoading(true));
 
   console.log("Fetching messages from API...");
 
   api.get(API_ENDPOINTS.CHAT.GET_MESSAGE)
     .then((response) => {
       if (!Array.isArray(response?.data)) {
         dispatch(setError("Invalid response from server"));
         return;
       }
 
       let messageQueue = []; // Array to maintain order
 
       response.data.forEach((item) => {
         if (item?.is_function === false) {
           // Normal message
           messageQueue.push({
             user: item?.message,
             ai: { response: item.response },
           });
         } else {
           // API Call for flight search
           const flightSearchApi = item?.response?.results?.view_top_flight_result_api?.url;
           const AllSearchApi = item?.response?.results?.view_all_flight_result_api?.url;
           
           if (flightSearchApi) {
             const OfferSearchUrl = `https://demo.milesfactory.com${flightSearchApi}`;
             const AllSearchUrl = `https://demo.milesfactory.com${AllSearchApi}`;
 
             // Add a placeholder so the order is maintained
             messageQueue.push({
               user: item?.message,
               ai: { response: "Fetching flight details..." } // Placeholder message
             });
 
             // Fetch Offer Search API
             api.get(OfferSearchUrl)
               .then((offerResponse) => {
                 if (!offerResponse.data) {
                   dispatch(setError("Offer search API returned no data"));
                   return;
                 }
 
                 // Find the placeholder message and update it
                 messageQueue = messageQueue.map((msg) => 
                   msg.ai.response === "Fetching flight details..."
                     ? { ...msg, ai:offerResponse.data}
                     : msg
                 );
 
                 dispatch(setMessage([...messageQueue])); // Ensure correct order
               })
               .catch((error) => {
                 dispatch(setError("Error fetching flight data"));
               });
 
             // Fetch All Flight Results API
             if (AllSearchUrl) {
               api.get(AllSearchUrl)
                 .then((allResultsRes) => {
                   if (!allResultsRes?.data?.offers) {
                     console.warn("No offers found in all flight results");
                     return;
                   }
 
                   // Append flight offers under the correct user message
                   messageQueue = messageQueue.map((msg) =>
                     msg.ai.response === "Here are your flight offers!"
                       ? { ...msg, ai: allResultsRes.data}
                       : msg
                   );
 
                   dispatch(setMessage([...messageQueue])); // Ensure correct order
                 })
                 .catch((error) => {
                   dispatch(setError("Error fetching all search results"));
                 });
             }
           }
         }
       });
 
       console.log("Formatted Initial Messages:", messageQueue);
       dispatch(setMessage([...messageQueue])); // Dispatch all messages at once
     })
     .catch((error) => {
       dispatch(setError("Error fetching messages"));
     })
     .finally(() => {
       dispatch(setIsLoading(false));
     });
 };
 

export const { setMessage, setIsLoading, setError } = GetMessagesSlice.actions;
export default GetMessagesSlice.reducer;
