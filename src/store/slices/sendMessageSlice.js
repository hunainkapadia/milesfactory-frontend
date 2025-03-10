import { createSlice } from "@reduxjs/toolkit";
import api from "@/src/store/api";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";

const sendMessageSlice = createSlice({
  name: "sendMessage",
  initialState: {
    messages: [],
    isLoading: false,
    setAllFlightPostApi: null, // ✅ Store all flight search results here

  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      console.log("New message added:", action.payload);
      state.messages.push(action.payload);
    },
    setAllFlightResults: (state, action) => {
      // console.log("setAllFlightResults-action", action.payload);

      state.setAllFlightPostApi = action.payload;
    },
  },
});

export const sendMessage = (userMessage) => (dispatch) => {
  if (!userMessage.trim()) return;

  dispatch(setLoading(true));
  dispatch(setMessage({ user: userMessage }));

  api
    .post(API_ENDPOINTS.CHAT.SEND_MESSAGE, { user_message: userMessage })
    .then((res) => {
      const response = res.data;
      
      if (response?.is_function) {
        const topFlightSearchApi = response?.response?.results?.view_top_flight_result_api?.url;
        if (topFlightSearchApi) {
          api
            .get(topFlightSearchApi)
            .then((flightRes) => {
              console.log("flightRes", flightRes.data);
              dispatch(setMessage({ ai: flightRes.data }));
            })
            .catch((error) => console.error("Error fetching  top flight data:", error));
        }
        // for get all flight
        const allFlightSearchApi = response?.response?.results?.view_all_flight_result_api?.url;
        if (allFlightSearchApi) {
          api
            .get(allFlightSearchApi)
            .then((flightRes) => {
              
              
              dispatch(setAllFlightResults(flightRes?.data)); // ✅ Store but don't update AI message
            })
            .catch((error) => console.error("Error fetching all flight data:", error));
        }
      } else {
        dispatch(setMessage({ ai: response }));
      }
    })
    .catch((error) => console.error("Error:", error.response?.data || error))
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const { setLoading, setMessage, setAllFlightResults } = sendMessageSlice.actions;
export default sendMessageSlice.reducer;
