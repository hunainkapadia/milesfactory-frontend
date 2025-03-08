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
    setAllFlightGetApi: (state, action) => {
      console.log("setAllFlightResults-action", action.payload);

      state.allFlightSearchResults = action.payload;
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
        console.log("testaaa", item?.response);
        

        if (item?.is_function) {
          const topFlightSearchApi =
            item?.response?.results?.view_top_flight_result_api?.url;
          
          if (topFlightSearchApi) {
            const topFlightSearchUrl = `https://demo.milesfactory.com${topFlightSearchApi}`;

            api
              .get(topFlightSearchUrl)
              .then((offerResponse) => {
                dispatch(
                  setMessage({
                    user: item.message,
                    ai: offerResponse.data ,
                  })
                );
              })
              .catch(() => {
                dispatch(setError("Error fetching flight offer data"));
              });
          }

          const allFlightSearchApi = item?.response?.results?.view_all_flight_result_api?.url;
          if (allFlightSearchApi) {
            const allFlightSearchUrl = `https://demo.milesfactory.com${allFlightSearchApi}`;
            console.log("Fetching all flight search results from:", allFlightSearchUrl);
          
            api
              .get(allFlightSearchUrl)
              .then((flightRes) => {
                
                dispatch(setAllFlightGetApi(flightRes?.data)); // Store but don't update AI message
              })
              .catch((error) => console.error("Error fetching all flight data:", error));
          }
        } else {
         dispatch(setMessage({ user: item.message, ai: { response: item?.response } }));
        }
      });
    })
    .catch(() => {
      dispatch(setError("Error fetching messages"));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};

export const { setMessage, setIsLoading, setError, setAllFlightGetApi } = GetMessagesSlice.actions;
export default GetMessagesSlice.reducer;