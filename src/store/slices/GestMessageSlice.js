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
  },
});

export const fetchMessages = () => (dispatch) => {
  dispatch(setIsLoading(true));
  api
    .get(API_ENDPOINTS.CHAT.GET_MESSAGE)
    .then((response) => {
      if (!Array.isArray(response?.data)) {
        dispatch(setError("Invalid response from server"));
        return;
      }

      response.data.forEach((item) => {
        
        

        if (item?.is_function) {
          const topFlightSearchApi =
            item?.response?.results?.view_top_flight_result_api?.url;
          if (topFlightSearchApi) {
            api
              .get(topFlightSearchApi)
              .then((offerResponse) => {
                console.log("topFlightSearchApi", topFlightSearchApi);
                
                dispatch(
                  setMessage({
                    user: item.message,
                    ai: offerResponse.data ,
                    OfferId: topFlightSearchApi, // this is for passenger flow  offerID
                  })
                );
              })
              .catch(() => {
                dispatch(setError("Error fetching flight offer data"));
              });
          }

          const allFlightSearchApi = item?.response?.results?.view_all_flight_result_api?.url;
          if (allFlightSearchApi) {
            api
              .get(allFlightSearchApi)
              .then((flightRes) => {
                
                dispatch(setAllFlightGetApi(flightRes?.data)); // Store but don't update AI message
              })
              .catch((error) => {
                ""
              });
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