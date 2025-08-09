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
    clearGetMessages: (state) => {
      state.SearchHistory
      state.messages = [];
      state.error = null;
      state.isLoading = false;
      state.flightExpire = "";
      state.refreshSearch = "";
      state.SearchHistoryGet = null;
      state.topOfferUrl = null;
    },
    setGetMessageUUID: (state, action)=> {
      console.log("action_000", action);
      
      state.getMessageUUID = action.payload;
    },
    setTopOfferUrl: (state, action)=> {
      state.topOfferUrl = action.payload;
    },
    setSearchHistoryGet: (state, action)=> { 
      
      state.SearchHistory = action.payload;
    },
    setRefreshSearch: (state, action)=> {
      state.refreshSearch = action.payload;
    },
    setMessages: (state, action) => {
  state.messages = action.payload;  // Replace entire messages array
},
    setMessage: (state, action) => {
      console.log("thread_action", action);
      
      //console.log("actiontest", action);
      
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

export const fetchMessages = (getthreaduuid) => (dispatch, getState) => {
  const state = getState();
  const threadUuid = state?.sendMessage?.threadUuid;
  const uuid = getthreaduuid || threadUuid;

  if (!uuid) {
    console.error("No thread UUID found!");
    return;
  }

  dispatch(setIsLoading(true));

  const threadUrl = `/api/v1/chat/get-messages/${uuid}`;

  api
    .get(threadUrl)
    .then((response) => {
      if (!Array.isArray(response?.data)) {
        dispatch(setError("Invalid response from server"));
        return;
      }

      // Collect all messages here
      const allMessages = [];

      // Process each item
      response.data.forEach((item) => {
        if (item?.is_function) {
          // Handle special case of flight offers or similar
          const allFlightSearchApi =
            item?.response?.results?.view_all_flight_result_api?.url;
          const allFlightSearchUuid =
            item?.response?.results?.view_all_flight_result_api?.uuid;

          if (allFlightSearchApi) {
            dispatch(setTopOfferUrl(allFlightSearchUuid)); // save flight offer id

            const historyUrl = `/api/v1/search/${allFlightSearchUuid}/history`;

            api
              .get(historyUrl)
              .then((history_res) => {
                dispatch(setSearchHistoryGet(history_res.data.search));
              })
              .catch((error) => {
                console.log("error fetching history", error);
              });

            // Fetch flight results and then push message with flight data
            api
              .get(allFlightSearchApi)
              .then((flightRes) => {
                allMessages.push({
                  user: item.message,
                  ai: flightRes.data,
                });

                // Because this is async inside forEach, to keep it simple,
                // you might want to fetch flight data outside or handle differently,
                // but here, we just add message synchronously for example.
              })
              .catch((flighterror) => {
                dispatch(setFlightExpire(flighterror?.response?.data?.error));
              });

          } else {
            // If no flight api, just add normal message
            allMessages.push({
              user: item.message,
              ai: { response: item?.response },
            });
          }
        } else {
          // Normal message, push to array
          allMessages.push({
            user: item.message,
            ai: { response: item?.response },
          });
        }
      });

      // After forEach, set all messages in state (replace old messages)
      dispatch(setMessages(allMessages));
    })
    .catch((error) => {
      dispatch(setError("Error fetching messages"));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};

export const RefreshHandle = () => (dispatch, getState) => {
  const state = getState();
  const uuid = state?.getMessages?.SearchHistory?.uuid
  //console.log("state_0", uuid);
  const threadUUID = sessionStorage.getItem("chat_thread_uuid");
  //console.log("threadUUID_0", threadUUID);
  
// {{BASE_URL}}/api/v1/search/61adab8e-c40f-42e0-8268-fd4f4cd71d53/refresh/5393d260-0903-49f6-9b64-6d61982e5dbd
  // const url = `api/v1/search/<str:flight_search_uuid>/refresh/<str:chat_thread_uuid></str:chat_thread_uuid>`
  const expireURL =  `/api/v1/search/${uuid}/refresh/${threadUUID}`

  //console.log("expireURL", expireURL);
  

  api.post(expireURL).then((res)=> {
    //console.log("expire_res", res)
    dispatch(setRefreshSearch())
  }).catch((error)=> {
    //console.log("error", error);
    
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
  setGetMessageUUID,
  clearGetMessages,
  setMessages
} = GetMessagesSlice.actions;
export default GetMessagesSlice.reducer;
