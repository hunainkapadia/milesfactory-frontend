import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import { setAddBuilder, setThreadUuid } from "./sendMessageSlice";

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
  const threadUuid =  state?.sendMessage?.threadUuid
  const uuid = getthreaduuid || threadUuid;  
  dispatch(setThreadUuid(uuid)); // set for 1st chat url 
  
  // Get the current URL path
  // const pathname = window.location.pathname;

  // // Extract only the UUID after /chat/ and remove anything after it
  // const threadUUID = pathname.split("/chat/")[1]?.split("/")[0]?.split("?")[0] || "";
   if (!uuid) {
    console.error("No thread UUID found!");
    return;
  }
  
  dispatch(setIsLoading(true));
  
  // Use only the UUID in the API URL
  const threadUrl = `/api/v1/chat/get-messages/${uuid}`;
  
  api
  .get(threadUrl)
  .then((response) => {    
      if (!Array.isArray(response?.data)) {
        dispatch(setError("Invalid response from server"));
        return;
      }
      response?.data.forEach((item) => {
        // is function true start search result flow
        if (item?.silent_is_function) {
          dispatch(setAddBuilder(item));
        }
        if (item?.is_function) {
          // builder for get
          
          
          // const topFlightSearchApi =
          // item?.response?.results?.view_top_flight_result_api?.url;
          // if (topFlightSearchApi) {
          //   api
          //   .get(topFlightSearchApi)
          //   .then((offerResponse) => {
          //     console.log("get message", offerResponse);
          //     dispatch(
          //         setMessage({
          //           user: item.message,
          //           ai: offerResponse.data,
          //           OfferId: topFlightSearchApi, // this is for passenger flow  offerID
          //         })
          //       );
          //     })
          //     .catch((searcherror) => {
          //       dispatch(setError("Error fetching flight offer data"));
          //     });
          // }

          
          
          
          const allFlightSearchApi =
          item?.response?.results?.view_all_flight_result_api?.url;

          const allFlightSearchUuid =
          item?.response?.results?.view_all_flight_result_api?.uuid;
          
          if (allFlightSearchApi) {
            
            
            // flight history [start]
            const getallFlightId = allFlightSearchApi.split('/').pop();
            dispatch(setTopOfferUrl(allFlightSearchUuid)); // for passenger flow id dispatch
            
            
             const historyUrl = `/api/v1/search/${allFlightSearchUuid}/history`;
             api.get(historyUrl).then((history_res)=> {
              //  console.log("historyUrl", history_res.data.search);
               dispatch(setSearchHistoryGet(history_res.data.search))
             }).catch((error)=> {
              console.log("error", error);
              

             })
             // flight history [end]
            //  dispatch(
            //    setMessage({ user: item.message, ai: { response: item?.response } })
            //  );
            
            //console.log("allFlightSearch11", allFlightSearchApi);
            api
              .get(allFlightSearchApi)
              .then((flightRes) => {
                // dispatch(setAllFlightGetApi(flightRes?.data)); // Store but don't update AI message
                dispatch(
                  setMessage({
                    user: item.message,
                    ai: flightRes.data,
                  })
                );
                //console.log("allFlightSearchApi11", flightRes.data);
              })
              .catch((flighterror) => {
                

                dispatch(setFlightExpire(flighterror?.response?.data?.error));
              })
              .finally(() => {});
          }
        } else {
          dispatch(
            setMessage({ user: item.message, ai: { response: item?.response } })
          );
        }
      });
    })
    .catch((error) => {
      console.log("thread_error", error);
      
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
  setMessages,
  
} = GetMessagesSlice.actions;
export default GetMessagesSlice.reducer;
