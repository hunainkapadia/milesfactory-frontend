import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import { setAddBuilder, setAllOfferUrl, setHotelSearchId, setThreadUuid } from "./sendMessageSlice";

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
  },
});

export const fetchMessages = (getthreaduuid) => (dispatch, getState) => {
  const state = getState();
  const threadUuid = state?.sendMessage?.threadUuid;
  const uuid = getthreaduuid || threadUuid;  
  dispatch(setThreadUuid(uuid)); // set for 1st chat url 
  
  if (!uuid) {
    console.error("No thread UUID found!");
    return;
  }
  
  dispatch(setIsLoading(true));
  
  const threadUrl = `/api/v1/chat/get-messages/${uuid}`;
  
  api
    .get(threadUrl)
    .then((response) => {    
      dispatch(setMessage({ ai: { error: response } }));
      if (!Array.isArray(response?.data)) {
        dispatch(setError("Invalid response from server"));
        return;
      }

      response?.data.forEach((item) => {
        if (item?.silent_is_function) {
          dispatch(setAddBuilder(item));
        }

        if (item?.is_function) {
          const funcName = item?.function_template?.[0]?.function?.name;

          // 🔹 FLIGHT FLOW
          if (funcName === "search_flight_result_func") {
            const allFlightSearchApi =
              item?.response?.results?.view_all_flight_result_api?.url;
            const allFlightSearchUuid =
              item?.response?.results?.view_all_flight_result_api?.uuid;
            
            if (allFlightSearchApi) {
              dispatch(setTopOfferUrl(allFlightSearchUuid));
              dispatch(setAllOfferUrl(allFlightSearchApi));

              // Flight History
              const historyUrl = `/api/v1/search/${allFlightSearchUuid}/history`;
              api.get(historyUrl)
                .then((history_res)=> {
                  
                  dispatch(
                    setSearchHistoryGet({ flight: history_res.data.search })
                  );
                })
                .catch((error)=> {
                  console.log("error", error);
                });

              // Flight Results
              api.get(allFlightSearchApi)
                .then((flightRes) => {
                  

                  dispatch(
                    setMessage({
                      user: item.message,
                      ai: flightRes.data,
                    })
                  );
                })
                .catch((flighterror) => {
                  dispatch(setFlightExpire(flighterror?.response?.data?.error));
                });
            }
          }

          // 🔹 HOTEL FLOW
          else if (funcName === "search_hotel_result_func") {
            const hotelSearchApi =
              item?.response?.results?.view_hotel_search_api?.url;

            const HotelArgument =
              item?.function_template?.[0]?.function?.arguments || {};

            const hotelSearchuuid = item?.response?.results?.view_hotel_search_api?.uuid
            console.log("hotelSearchuuid_2", hotelSearchuuid);
            
            dispatch(setHotelSearchId(hotelSearchuuid))            
            // Save hotel search args to redux
            dispatch(setSearchHistoryGet({ hotel: { HotelArgument } }));

            if (hotelSearchApi) {
              api.get(hotelSearchApi)
                .then((hotelRes) => {
                  const isComplete = hotelRes?.data?.is_complete;
                  if (isComplete === true) {
                    dispatch(setClearflight()); // clear flights if switching
                    dispatch(
                      setMessage({
                        user: item.message,
                        ai: hotelRes.data,
                      })
                    );
                  } else {
                    dispatch(
                      setMessage({
                        user: item.message,
                        ai: hotelRes.data,
                        type: "hotel_result",
                      })
                    );
                  }
                })
                .catch((hotelError) => {
                  console.error("Error fetching hotel results", hotelError);
                  onsole.error(
                    "Error fetching hotel results:",
                    hotelError.response?.data ||
                      hotelError.message ||
                      hotelError
                  );
                });
            }
          }

        } else {
          // Normal AI message (not function call)
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
  const uuid = state?.getMessages?.SearchHistory?.flight?.uuid;
  const threadUUID = state?.sendMessage?.threadUuid;

  if (!uuid || !threadUUID) {
    console.warn("Missing SearchHistory uuid or threadUuid");
    return;
  }

  const expireURL = `/api/v1/search/${uuid}/refresh/${threadUUID}`;

  dispatch(setIsLoading(true));

  api
    .post(expireURL)
    .then((res) => {
      dispatch(setRefreshSearch(true));

      // ✅ After successful refresh → Re-fetch updated flight offers
      const allOfferUrl = res?.data;
      
      
      console.log("allOfferUrl", allOfferUrl);
      if (allOfferUrl) {
        dispatch(setAllOfferUrl(allOfferUrl));
        
        api
          .get(allOfferUrl)
          .then((flightRes) => {
            dispatch(
              setMessage({
                ai: flightRes.data,
                type: "flight_result",
              })
            );
          })
          .catch((flError) => {
            dispatch(setFlightExpire(flError?.response?.data?.error));
          });
      }
    })
    .catch((error) => {
      console.log("RefreshHandle Error:", error.response?.data);
      dispatch(setError("Failed to refresh flight data"));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};


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
