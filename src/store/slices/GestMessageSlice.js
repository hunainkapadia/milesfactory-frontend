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
      state.messages.push(action.payload);
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

  api
    .get(API_ENDPOINTS.CHAT.GET_MESSAGE)
    .then((response) => {
      if (!Array.isArray(response?.data)) {
        dispatch(setError("Invalid response from server"));
        return;
      }

      response.data.forEach((item) => {
        // Add user message first
        dispatch(setMessage({ user: item.message }));

        if (item?.is_function) {
          const flightSearchApi = item?.response?.results?.view_top_flight_result_api?.url;
          const allSearchApi = item?.response?.results?.view_all_flight_result_api?.url;

          if (flightSearchApi) {
            const offerSearchUrl = `https://demo.milesfactory.com${flightSearchApi}`;

            api
              .get(offerSearchUrl)
              .then((offerResponse) => {
                dispatch(setMessage({ ai: offerResponse.data }));
              })
              .catch((error) => {
                dispatch(setError("Error fetching flight offer data"));
              });
          }

          if (allSearchApi) {
            const allSearchUrl = `https://demo.milesfactory.com${allSearchApi}`;

            api
              .get(allSearchUrl)
              .then((allResultsRes) => {
                dispatch(setMessage({ ai: allResultsRes.data }));
              })
              .catch((error) => {
                dispatch(setError("Error fetching all flight search results"));
              });
          }
        } else {
          dispatch(setMessage({ ai: item.response }));
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

export const { setMessage, setIsLoading, setError } = GetMessagesSlice.actions;
export default GetMessagesSlice.reducer;
