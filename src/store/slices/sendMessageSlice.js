import { createSlice } from "@reduxjs/toolkit";
import api from "@/src/store/api";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";

const sendMessageSlice = createSlice({
  name: "sendMessage",
  initialState: {
    messages: [],
    isLoading: false,
    AllFlightPostApi: null, // Store all flight search results here
    SearchHistorySend: null,
    ThreadUUIDsend: null,
    TopOfferUrlSend: null,
  },
  reducers: {
    setTopOfferUrlSend: (state, action)=> {
      console.log("setTopOfferUrlSend", action);
      
      state.TopOfferUrlSend = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      console.log("passaction", action);
      
      state.messages.push(action.payload);
    },
    setAllFlightResults: (state, action) => {
      state.AllFlightPostApi = action.payload;
    },
    setSearchHistorySend: (state, action) => {
      console.log("SearchHistorySend", action);
      state.SearchHistory = action.payload;
    },
    setThreadUUIDsend: (state, action) => {
      state.ThreadUUIDsend = action.payload;
      if (action.payload) {
        sessionStorage.setItem("chat_thread_uuid", action.payload);
      } else {
        // sessionStorage.removeItem("chat_thread_uuid");
      }
    },
  },
  setClearChat: (state) => {
    state.messages = [];
    state.ThreadUUIDsend = null;
    sessionStorage.removeItem("chat_thread_uuid");
  },
});

export const sendMessage = (userMessage) => (dispatch, getState) => {
  const ThreadUUIDsendState  = getState().sendMessage.ThreadUUIDsend;

  console.log("ThreadUUIDsendState", ThreadUUIDsendState);
  
  
  dispatch(setLoading(true));
  dispatch(setMessage({ user: userMessage }));
  
  const sendToThread = (uuid) => {
    const threadUUIdUrl = `${API_ENDPOINTS.CHAT.SEND_MESSAGE}/${uuid}`;
    api
      .post(threadUUIdUrl, { user_message: userMessage })
      .then((res) => {
        const response = res.data;

        if (response?.is_function) {
          const topFlightSearchApi =
            response?.response?.results?.view_top_flight_result_api?.url;

          if (topFlightSearchApi) {
            api
              .get(topFlightSearchApi)
              .then((flightRes) => {
                dispatch(
                  setMessage({
                    ai: flightRes.data,
                    OfferId: topFlightSearchApi,
                  })
                );
              })
              .catch((error) => {
                console.log("chat error", error);
              });
          }

          const allFlightSearchApi =
            response?.response?.results?.view_all_flight_result_api?.url;
          if (allFlightSearchApi) {
            const getallFlightId = allFlightSearchApi.split("/").pop();
            dispatch(setTopOfferUrlSend(getallFlightId))
            
            const historyUrl = `/api/v1/search/${getallFlightId}/history`;

            api
              .get(historyUrl)
              .then((history_res) => {
                dispatch(setSearchHistorySend(history_res.data.search));
              })
              .catch(() => {});

            api
              .get(allFlightSearchApi)
              .then((flightRes) => {
                console.log("allflightRes", flightRes)
                dispatch(setAllFlightResults(flightRes?.data));
              })
              .catch(() => {});
          }
        } else {
          console.log("response111", response)
          dispatch(setMessage({ ai: response }));
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //  Check if thread UUID already exists
  if (ThreadUUIDsendState) {
    sendToThread(ThreadUUIDsendState);
  } else {
    // Only create a new thread if one doesn't exist
    api.post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND).then((thread_res) => {
      const uuid = thread_res.data.uuid;
      dispatch(setThreadUUIDsend(uuid));
      sendToThread(uuid);
    });
  }
};

export const deleteChatThread = (uuid) => (dispatch) => {
  if (!uuid) return;
  
  const url = `/api/v1/chat/thread/${uuid}/delete`;
  console.log("delres", url);

  api.delete(url)
    .then((res) => {
      if (res) {
        sessionStorage.removeItem("chat_thread_uuid");
      }
      // dispatch(setClearChat());
    })
    .catch((err) => {
      console.error("Error deleting thread", err.response.data.error);
    });
};

// for delete thread

export const {
  setLoading,
  setMessage,
  setAllFlightResults,
  setSearchHistorySend,
  setThreadUUIDsend,
  setClearChat,
  setTopOfferUrlSend,
} = sendMessageSlice.actions;
export default sendMessageSlice.reducer;
