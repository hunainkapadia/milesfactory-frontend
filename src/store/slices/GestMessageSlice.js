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
  
  const threadUrl = `${API_ENDPOINTS.CHAT.GET_MESSAGE}${localUUID}`
  
  api
  .get(threadUrl)
  .then((response) => {
    
      if (!Array.isArray(response?.data)) {
        dispatch(setError("Invalid response from server"));
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
            dispatch(setTopOfferUrl(getallFlightId)); // for passenger flow id dispatch
            
             const historyUrl = `/api/v1/search/${getallFlightId}/history`;
             api.get(historyUrl).then((history_res)=> {
              //  console.log("historyUrl", history_res.data.search);
               dispatch(setSearchHistoryGet(history_res.data.search))
             }).catch((error)=> {
              console.log("error", error);
              

             })
             // flight history [end]
             dispatch(
               setMessage({ user: item.message, ai: { response: item?.response } })
             );
             
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
                console.log("allFlightSearchApi11", flightRes.data);
              })
              .catch((flighterror) => {
                dispatch(setFlightExpire(flighterror.response.data.error));
              });
          }
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
