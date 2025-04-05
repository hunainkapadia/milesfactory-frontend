import { createSlice } from "@reduxjs/toolkit";
import api from "@/src/store/api";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";

const sendMessageSlice = createSlice({
  name: "sendMessage",
  initialState: {
    messages: [],
    isLoading: false,
    setAllFlightPostApi: null, // Store all flight search results here

  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setAllFlightResults: (state, action) => {
      state.setAllFlightPostApi = action.payload;
    },
  },
});

export const sendMessage = (userMessage) => (dispatch) => {
  // if (!userMessage.trim()) return;

  dispatch(setLoading(true));
  dispatch(setMessage({ user: userMessage }));

  api.post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND).then((thread_res)=> {
    const threadUUIdUrl = `${API_ENDPOINTS.CHAT.SEND_MESSAGE}/${thread_res.data.uuid}`
    // get thread uuid url
    api
    .post(threadUUIdUrl, { user_message: userMessage })
    .then((res) => {
        console.log("thread_res", res);
        const response = res.data;
        console.log("chat error", res)
        // is function true start search result flow
        if (response?.is_function) {
          const topFlightSearchApi = response?.response?.results?.view_top_flight_result_api?.url;
          
          if (topFlightSearchApi) {
            api
            .get(topFlightSearchApi)
            .then((flightRes) => {
              console.log("flightRes", topFlightSearchApi);
              
                dispatch(
                  setMessage({
                    ai: flightRes.data,
                    OfferId: topFlightSearchApi, // this is for passenger flow  offerID get
                  })
                );
              })
              .catch((error) => {
                console.log("chat error", error)
              });
          }
          // for get all flight
          const allFlightSearchApi = response?.response?.results?.view_all_flight_result_api?.url;
          if (allFlightSearchApi) {
            api
              .get(allFlightSearchApi)
              .then((flightRes) => {
                dispatch(setAllFlightResults(flightRes?.data)); // Store but don't update AI message
              })
              .catch((error) => {
                ""
              });
          }
        } else {
          dispatch(setMessage({ ai: response }));
        }
      })
      .catch((error) => {
        ""
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
    
  })

};

export const { setLoading, setMessage, setAllFlightResults } = sendMessageSlice.actions;
export default sendMessageSlice.reducer;
