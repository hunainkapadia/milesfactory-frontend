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
    isPolling: {
      status: false,
      argument: null,
    },
    pollingComplete: false,
  },
  reducers: {
    setpollingComplete: (state, action)=> {
      state.pollingComplete = action.payload;
    },
    setisPolling : (state, action) => {
      console.log("action111", action);
      
      state.isPolling = action.payload;
    },
    setTopOfferUrlSend: (state, action) => {
      state.TopOfferUrlSend = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setAllFlightResults: (state, action) => {
      state.AllFlightPostApi = action.payload;
    },
    setSearchHistorySend: (state, action) => {
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
    setClearChat: (state) => {
      state.messages = [];
      state.ThreadUUIDsend = null;
      sessionStorage.removeItem("chat_thread_uuid");
    },
  },

});

export const sendMessage = (userMessage) => (dispatch, getState) => {
  const ThreadUUIDsendState = getState().sendMessage.ThreadUUIDsend;

  dispatch(setLoading(true));
  dispatch(setMessage({ user: userMessage }));

  const sendToThread = (uuid) => {
    const threadUUIdUrl = `${API_ENDPOINTS.CHAT.SEND_MESSAGE}/${uuid}`;

    api
      .post(threadUUIdUrl, { user_message: userMessage, background_job: true })
      .then((res) => {
        let response = res.data;
        const run_id = response.run_id;
        const run_status = response.run_status;

        console.log("run_status111 ", run_status);
        
        if (run_status === "requires_action") {
          const runStatusUrl = `/api/v1/chat/get-messages/${uuid}/run/${run_id}`;
          
          const funcTemplate = response.function_template?.[0];
          const gdata = funcTemplate?.function?.arguments || {};
          console.log("gdata_00", gdata);
          

          dispatch(
            setMessage({
              ai: {
                isPolling : {
                  status: true,
                  argument: gdata,
                }
              }
            })
          );
          const pollUntilComplete = () => {
            return new Promise((resolve, reject) => {
              const interval = setInterval(() => {
                api
                  .get(runStatusUrl)
                  .then((resRun) => {
                    const runData = resRun.data;
                    console.log("runData.run_status", runData.function_template);

                    
                    // checking is function true before dufful flight
                    
                    if (runData.run_status === "completed") {
                      clearInterval(interval);
                      resolve(runData);
                    }
                  })
                  .catch((err) => {
                    clearInterval(interval);
                    reject(err);
                  });
              }, 1000);
            });
          };

          // Wait for polling before continuing
          return pollUntilComplete()
            .then((completedRun) => {
              response = completedRun;
              console.log(" Polling complete:", response);
              dispatch(setpollingComplete(true))
              handleFinalResponse(response);
            })
            .catch((error) => {
              console.error(" Polling failed:", error);
            });
        } else {
          // If no polling needed, use immediate response
          handleFinalResponse(response);
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setLoading(false));
      });

    //  Common handler after response is finalized (immediate or polled)
    const handleFinalResponse = (response) => {
      if (response?.is_function) {
        const allFlightSearchApi =
          response?.response?.results?.view_all_flight_result_api?.url;
        if (allFlightSearchApi) {
          const getallFlightId = allFlightSearchApi.split("/").pop();
          dispatch(setTopOfferUrlSend(getallFlightId));

          const historyUrl = `/api/v1/search/${getallFlightId}/history`;
          api
            .get(historyUrl)
            .then((history_res) => {
              dispatch(setSearchHistorySend(history_res.data.search));
            })
            .catch(() => {});

          // normal user and aimessag
          dispatch(
            setMessage({
              ai: { response: response?.response },
            })
          );
          api
            .get(allFlightSearchApi)
            .then((flightRes) => {
              console.log("flightRes22", flightRes);
              // dispatch(setisPolling({
              //   status: false,
              //   argument: null,
              // }));
              dispatch(
                setMessage({
                  ai: flightRes.data,
                })
              );
              // dispatch(setAllFlightResults(flightRes?.data));
            })
            .catch(() => {});
        }
      } else {
        // checking is function true before dufful flight
        if (response?.run_status == "completed") {
          // dispatch(setisPolling({
          //   status: false,
          //   argument: null,
          // }));
        }
        dispatch(
          setMessage({
            ai: { response: response?.response },
          })
        );
      }
    };
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

// create thread api call
export const createThreadAndRedirect = (router) => (dispatch, getState) => {
    let getuser = getState().base.currentUser;
    
    
  api
    .post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
    .then((res) => {
      const uuid = res.data.uuid;
      if (uuid) {
        dispatch(setThreadUUIDsend(uuid));
        dispatch(
          setMessage({
            // `Hello ${getuser?.first_name} ${getuser?.last_name}, I'm Mylz. How can I help you?`
            ai: {
              newThread: `Hello ${getuser?.first_name} ${getuser?.last_name}, I'm Mylz. How can I help you?`,
            },
          })
        );
        
        router.push(`/chat/${uuid}`);
      }
    })
    .catch((error) => {
      console.error("Failed to create thread:", error);
    });
};

export const deleteAndCreateThread = (followUpMessage = null) => (dispatch, getState) => {
  let getuser = getState().base.currentUser;
    
  const uuid = sessionStorage.getItem("chat_thread_uuid");
  if (!uuid) return;

  const url = `/api/v1/chat/thread/${uuid}/delete`;
  api
  .delete(url)
  .then((res) => {
    if (res) {
        // Clear previous chat history/messages in Redux store
        dispatch(setClearChat()); // Clear the chat history to prevent old messages from showing.

        sessionStorage.removeItem("chat_thread_uuid");

        api.post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
          .then((newThreadRes) => {
            const newUuid = newThreadRes.data.uuid;
            if (newUuid) {
              dispatch(setThreadUUIDsend(newUuid));
              sessionStorage.setItem("chat_thread_uuid", newUuid);

              // Dispatch the welcome message (deleteThread message)
              dispatch(
                setMessage({
                  ai: {
                    deleteThread: `Hello ${getuser?.first_name} ${getuser?.last_name}, I'm Mylz. How can I help you?`,
                  },
                })
              );

              if (followUpMessage) {
                dispatch(sendMessage(followUpMessage)); // Send the follow-up message if exists.
              }
            }
          })
          .catch((err) => {
            console.error("Failed to create new thread", err);
          });
      }
    })
    .catch((err) => {
      console.error("Error deleting thread", err);
    });
};

export const OnlydeleteChatThread = (followUpMessage = null) => (dispatch, getState) => {
  const uuid = sessionStorage.getItem("chat_thread_uuid");
  if (!uuid) return;

  const url = `/api/v1/chat/thread/${uuid}/delete`;
  api
  .delete(url)
  .then((res) => {
    if (res) {
        // Clear previous chat history/messages in Redux store
        dispatch(setClearChat()); // Clear the chat history to prevent old messages from showing.
        sessionStorage.removeItem("chat_thread_uuid");
      }
    })
    .catch((err) => {
      console.error("Error deleting thread", err?.response?.data?.error);
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
  setisPolling,
  setpollingComplete,
} = sendMessageSlice.actions;
export default sendMessageSlice.reducer;
