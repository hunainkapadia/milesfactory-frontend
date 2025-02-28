import { createSlice } from "@reduxjs/toolkit";
import api from "@/src/store/api";
import { API_ENDPOINTS, CHAT } from "@/src/store/api/apiEndpoints";

const initialState = {
  chatActive: false,
  messages: [],
  isLoading: false,
  error: null,
  allSearchUrl: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload;
    },
    addUserMessage: (state, action) => {
      state.messages.push({ user: action.payload, ai: null });
    },
    updateLastMessage: (state, action) => {
      if (state.messages.length > 0) {
        state.messages[state.messages.length - 1] = {
          ...state.messages[state.messages.length - 1],
          ...action.payload,
        };
      }
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const sendMessage = (userMessage) => (dispatch) => {
  if (!userMessage.trim()) return;

  
  dispatch(addUserMessage(userMessage));
  dispatch(setIsLoading(true));
  
  api
  .post(API_ENDPOINTS.CHAT.SEND_MESSAGE, { user_message: userMessage })
  .then((res) => {
     dispatch(setIsLoading(false));
     if (res?.data) {
        const flightSearchApi = res?.data?.response?.results?.view_top_flight_result_api?.url;
        const AllSearchApi = res?.data?.response?.results?.view_all_flight_result_api?.url;
        const AllSearchUrl = `https://demo.milesfactory.com${AllSearchApi}`;
        
        console.log("test111", res?.data);
        if (flightSearchApi) {
          const flightResultsUrl = `https://demo.milesfactory.com${flightSearchApi}`;
          dispatch(setIsLoading(true));
          api
            .get(flightResultsUrl)
            .then((flightRes) => {
              dispatch(
                updateLastMessage({
                  ai: { ...flightRes.data, seeAllResultHandle: () => dispatch(fetchAllSearchResults(AllSearchUrl)) },
                })
              );
            })
            .catch(() => dispatch(setError("Error fetching flight data")))
            .finally(() => dispatch(setIsLoading(false)));
        }
      } else {
        dispatch(updateLastMessage({ ai: res.data }));
      }
    })
    .catch(() => dispatch(setError("Error sending message")))
    .finally(() => dispatch(setIsLoading(false)));
};

export const fetchAllSearchResults = (url) => (dispatch) => {
  if (!url) return;
  dispatch(setIsLoading(true));
  api
    .get(url)
    .then((allResultsRes) => {
      dispatch(updateLastMessage({ ai: { all_search_results: allResultsRes.data.offers } }));
    })
    .catch(() => dispatch(setError("Error fetching all search results")))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setMessage, addUserMessage, updateLastMessage, setIsLoading, setError } = chatSlice.actions;
export default chatSlice.reducer;
