import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { API_ENDPOINTS } from "../api/apiEndpoints";

const initialState = {
  chatActive: false,
  messages: [],
  isLoading: false,
  error: null,
  flightExpire: "",
  refreshSearch: "",
  SearchHistoryGet: null,
  topOfferUrl: null,
};

const GetMessagesSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setTopOfferUrl: (state, action)=> {
      state.topOfferUrl = action.payload;
    },
    setSearchHistoryGet: (state, action)=> { 
      
      state.SearchHistory = action.payload;
    },
    setRefreshSearch: (state, action)=> {
      state.refreshSearch = action.payload;
    },
    setMessage: (state, action) => {
      console.log("actiontest", action);
      
      state.messages.push(action.payload);
    },
    setAllFlightGetApi: (state, action) => {
      console.log("setAllFlightGetApi_action", action);
      
      state.allFlightSearchResults = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFlightExpire: (state, action) => {
      state.flightExpire = action.payload;
    },
  },
});

export const fetchMessages = () => (dispatch) => {
  dispatch(setIsLoading(true));
  const localUUID = sessionStorage.getItem("chat_thread_uuid");
  const run_id = sessionStorage.getItem("run_id");
  
  // /api/v1/chat/get-messages/ab7ebcd9-1e2e-41eb-a3c3-efe9c9849d59/run/run_NQUfQ5OJ0AxmBUqWAgRPdCL7
  
  
  
  if (!run_id) {
    console.warn("run_id is null or undefined — skipping thread fetch");
    return;
  }
  
  const threadUrl = `${API_ENDPOINTS.CHAT.GET_MESSAGE}${localUUID}/run/${run_id}`;
  
  
  
  // const threadUrl = `${API_ENDPOINTS.CHAT.GET_MESSAGE}${localUUID}`
  
  
  api
  .get(threadUrl) // Fetch the message thread
  .then((response) => {
    
    // Validate response structure: it must be an array of messages
    console.log("res_id11", response);
    // if (!Array.isArray(response?.data)) {
    //   dispatch(setError("Invalid response from server"));
    //   return;
    // }
    
    // Loop through each message item in the response
    
      // ✅ CASE 1: Handle AI flight search flow if message is a function
      if (response?.data?.is_function) {

        
        // Get the "view all flights" API URL from the response
        const allFlightSearchApi = response?.data?.response?.results?.view_all_flight_result_api?.url;
        
        if (allFlightSearchApi) {
          // Extract search ID from the URL and dispatch it for passenger flow
          const getallFlightId = allFlightSearchApi.split("/").pop();
          dispatch(setTopOfferUrl(getallFlightId));
          
          // Build the history API URL based on search ID
          const historyUrl = `/api/v1/search/${getallFlightId}/history`;
          
          
          // 🔄 Fetch flight search history (used for outbound/return tabs etc.)
          api
            .get(historyUrl)
            .then((history_res) => {
              dispatch(setSearchHistoryGet(history_res.data.search));
            })
            .catch((error) => {
              console.log("Error fetching flight history", error);
            });

          // ✈️ Fetch all flight results from the API
          api
            .get(allFlightSearchApi)
            .then((flightRes) => {
              
              // ✅ Dispatch the message: user input and AI full flight data response
              
              dispatch(
                setMessage({
                  user: response?.data?.message,
                  ai: flightRes.data, // Store full flight offer result
                })
              );
            })
            .catch((flighterror) => {
              // If flight search expired or failed, dispatch error state
              dispatch(setFlightExpire(flighterror.response?.data?.error || "Flight search failed"));
            });
        }

      } else {
        // CASE 2: Non-function message (regular assistant reply)
        // Dispatch simple user/AI message pair (AI response is usually a string)
        console.log("response_data11", response?.data?.response);
        
        dispatch(
          setMessage({
            user: response?.data?.message,
            ai: response?.data?.response, // This could be plain text or basic JSON
          })
        );
      }
  })
  .catch((error) => {
    // Error while fetching the whole thread
    console.error("Thread fetch error:", error);
    dispatch(setError("Error fetching messages"));
  })
  .finally(() => {
    // Mark loading complete regardless of success/failure
    dispatch(setIsLoading(false));
  });

};
export const RefreshHandle =()=> {
  dispatch(setRefreshSearch())
  api.post(API_ENDPOINTS.CHAT.REFRESH_SEARCH).then((res)=> {
    console.log("REFRESH_SEARCH", res)
  })
}

export const {
  setMessage,
  setIsLoading,
  setError,
  setAllFlightGetApi,
  setFlightExpire,
  setRefreshSearch,
  setSearchHistoryGet,
  setTopOfferUrl,
} = GetMessagesSlice.actions;
export default GetMessagesSlice.reducer;
