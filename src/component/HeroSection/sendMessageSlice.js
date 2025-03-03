import { createSlice } from "@reduxjs/toolkit";
import api from "@/src/store/api";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";

const sendMessageSlice = createSlice({
  name: "sendMessage",
  initialState: {
    messages: [],
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      console.log("New message added:", action.payload);
      state.messages.push(action.payload);
    },
  },
});

export const sendMessage = (userMessage) => (dispatch) => {
  if (!userMessage.trim()) return;

  dispatch(setLoading(true));

  //  Add user message first (without AI response)
  dispatch(setMessage({ user: userMessage }));

  api
    .post(API_ENDPOINTS.CHAT.SEND_MESSAGE, { user_message: userMessage })
    .then((res) => {
      const response = res.data;
      console.log("AI Response:", response);

      if (response?.is_function) {
        const flightSearchApi = response?.response?.results?.view_top_flight_result_api?.url;
        if (flightSearchApi) {
          const flightResultsUrl = `https://demo.milesfactory.com${flightSearchApi}`;

          api
            .get(flightResultsUrl)
            .then((flightRes) => {
              console.log("flightRes", flightRes.data);
              dispatch(setMessage({ ai: flightRes.data })); //  Append AI response
            })
            .catch((error) => console.error("Error fetching flight data:", error));
        }
      } else {
        dispatch(setMessage({ ai: response })); //  Append AI response
      }
    })
    .catch((error) => console.error("Error:", error.response?.data || error))
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const { setLoading, setMessage } = sendMessageSlice.actions;
export default sendMessageSlice.reducer;