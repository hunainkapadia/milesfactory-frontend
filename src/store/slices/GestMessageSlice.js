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
  ThreadUUIDget: null,
};

const GetMessagesSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setRefreshSearch: (state, action)=> {
      state.refreshSearch = action.payload;
    },
    setMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setAllFlightGetApi: (state, action) => {
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
    setSearchHistoryGet: (state, action)=> {
      state.SearchHistory = action.payload;
    },
    setThreadUUIDget: (state, action)=> {
      state.ThreadUUID = action.payload;
    }
  },
});

export const fetchMessages = () => (dispatch) => {
  dispatch(setIsLoading(true));
  api.get(API_ENDPOINTS.CHAT.CREATE_THREAD_GET).then((thread_res)=> {
    
    const threadArray = thread_res?.data;
    
    if (!Array.isArray(threadArray) || threadArray.length === 0) {
      dispatch(setError("No threads found"));
      dispatch(setIsLoading(false));
      return;
    }
    const messageFetches = threadArray.map((thread) => {
      const uuid = thread.uuid;
      const messageUrl = `${API_ENDPOINTS.CHAT.GET_MESSAGE}/${uuid}`;
      console.log("threadArray", messageUrl);
      api
        .get(messageUrl)
        .then((response) => {
          
          if (!Array.isArray(response?.data)) {
            dispatch(setError("Invalid response from server"));
            // /api/v1/search/6e75206e-91a6-4410-aaef-97243b6e5f1f/history
            // const historyUrl = "/api/v1/search/6e75206e-91a6-4410-aaef-97243b6e5f1f/history";
            return;
          }
          response?.data.forEach((item) => {
            // is function true start search result flow
            if (item?.is_function) {
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
              if (allFlightSearchApi) {
                // flight history [start]
                const getallFlightId = allFlightSearchApi.split('/').pop();
                const historyUrl = `/api/v1/search/${getallFlightId}/history`;
                console.log("historyUrl", historyUrl);
                api.get(historyUrl).then((history_res)=> {
                  dispatch(setSearchHistoryGet(history_res.data.search))
                }).catch((error)=> {

                })
                // flight history [end]
                api
                  .get(allFlightSearchApi)
                  .then((flightRes) => {
                    dispatch(setAllFlightGetApi(flightRes?.data)); // Store but don't update AI message
                  })
                  .catch((flighterror) => {
                    dispatch(setFlightExpire(flighterror.response.data.error));
                  });
              }
              console.log("item222");
            } else {
              
              dispatch(
                setMessage({ user: item.message, ai: { response: item?.response } })
              );
            }
          });
        })
        .catch((error) => {
          dispatch(setError("Error fetching messages"));
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    })

  })
};
export const RefreshHandle =()=> {
  dispatch(setRefreshSearch())
  console.log("REFRESH_SEARCH11")
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
  setThreadUUIDget,
} = GetMessagesSlice.actions;
export default GetMessagesSlice.reducer;
