import { createSlice } from "@reduxjs/toolkit";
import api from "@/src/store/api";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";
import Cookies from "js-cookie";

const sendMessageSlice = createSlice({
  name: "sendMessage",
  initialState: {
    messages: [],
    isLoading: false,
    AllFlightPostApi: null,
    SearchHistorySend: null,
    ThreadUUIDsend: null,
    TopOfferUrlSend: null,
    isPolling: {
      status: false,
      argument: null,
    },
    pollingComplete: false,
    Createthread: null,
  },
  reducers: {
    setCreatethread: (state, action) => {
      state.Createthread = action.payload;
    },
    setClearflight(state) {
      state.messages = state.messages.filter(
        (msg) =>
          msg?.type !== "flight_placeholder" && msg?.type !== "flight_result"
      );
    },
    setpollingComplete: (state, action) => {
      state.pollingComplete = action.payload;
    },
    setisPolling: (state, action) => {
      state.isPolling = action.payload;
    },
    setAllOfferUrlSend: (state, action) => {
      state.TopOfferUrlSend = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      console.log("action_next", action);

      if (!action.payload) {
        console.warn("setMessage received undefined payload", action);
        return;
      }
      state.messages.push(action.payload);
    },
    setAllFlightResults: (state, action) => {
      state.AllFlightPostApi = action.payload;
    },
    setSearchHistorySend: (state, action) => {
      state.SearchHistorySend = action.payload;
    },
    setThreadUUIDsend: (state, action) => {
      state.ThreadUUIDsend = action.payload;
      if (action.payload) {
        sessionStorage.setItem("chat_thread_uuid", action.payload);
      }
    },
    setClearChat: (state) => {
      state.messages = [];
      state.ThreadUUIDsend = null;
      sessionStorage.removeItem("chat_thread_uuid");
    },
  },
});

export const createThread = () => (dispatch) => {
  api
    .post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
    .then((thread_res) => {
      const uuid = thread_res.data.uuid;
      sessionStorage.setItem("chat_thread_uuid", uuid);
      dispatch(setThreadUUIDsend(uuid));
    })
    .catch((err) => {
      console.error("Thread creation failed", err);
    });
};

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

        if (run_status === "requires_action") {
          const runStatusUrl = `/api/v1/chat/get-messages/${uuid}/run/${run_id}`;
          const funcTemplate = response.function_template?.[0];
          const gdata = funcTemplate?.function?.arguments || {};

          dispatch(setpollingComplete(false));
          dispatch(
            setMessage({
              ai: {
                isPolling: {
                  status: true,
                  argument: gdata,
                },
              },
            })
          );

          const pollUntilComplete = () =>
            new Promise((resolve, reject) => {
              const interval = setInterval(() => {
                api
                  .get(runStatusUrl)
                  .then((resRun) => {
                    const runData = resRun.data;
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

          return pollUntilComplete()
            .then((completedRun) => {
              response = completedRun;
              dispatch(setpollingComplete(true));
              handleFinalResponse(response);
            })
            .catch((error) => {
              console.error(" Polling failed:", error);
            });
        } else {
          handleFinalResponse(response);
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setLoading(false));
      });

    const handleFinalResponse = (response) => {
      if (response?.is_function) {
        const allFlightSearchApi = response?.response?.results?.view_all_flight_result_api?.url;
        if (allFlightSearchApi) {
          const getallFlightId = allFlightSearchApi.split("/").pop();
          dispatch(setAllOfferUrlSend(allFlightSearchApi));
          
          const historyUrl = `/api/v1/search/${getallFlightId}/history`;
          let hasShownInitialMessage = false;

          const showRealResults = () => {
            api
              .get(allFlightSearchApi)
              .then((flightRes) => {
                const isComplete = flightRes?.data?.is_complete;
                console.log("flightRes_page1", flightRes);
                

                if (isComplete === true) {
                  dispatch(
                    setMessage({
                      ai: flightRes.data,
                    })
                  );
                } else {
                  dispatch(
                    setMessage({
                      ai: flightRes.data,
                      type: "flight_result",
                    })
                  );
                }
              })
              .catch((err) => {
                console.error("Error fetching final results", err);
              });
          };

          const pollHistoryUntilComplete = () => {
            const interval = setInterval(() => {
              api
                .get(historyUrl)
                .then((history_res) => {
                  const isComplete = history_res?.data?.search?.is_complete;
                  dispatch(setSearchHistorySend(history_res.data.search));

                  if (isComplete === true) {
                    clearInterval(interval);
                    api
                      .get(allFlightSearchApi)
                      .then((flightRes) => {
                        const realFlightData = flightRes.data;
                        console.log("realFlightData", realFlightData);
                        
                        dispatch(setClearflight());
                        dispatch(setMessage({ ai: realFlightData }));
                      })
                      .catch((err) => {
                        console.error("Error fetching final results", err);
                      });
                  } else if (!hasShownInitialMessage) {
                    hasShownInitialMessage = true;
                    showRealResults();
                    dispatch(
                      setMessage({
                        ai: { response: response?.response },
                        type: "flight_placeholder",
                      })
                    );
                  }
                })
                .catch((err) => {
                  console.error(" Polling failed", err);
                  clearInterval(interval);
                });
            }, 1000);
          };

          pollHistoryUntilComplete();
        }
      } else {
        dispatch(
          setMessage({
            ai: { response: response?.response },
          })
        );
      }
    };
  };

  if (ThreadUUIDsendState) {
    sendToThread(ThreadUUIDsendState);
  } else {
    api.post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND).then((thread_res) => {
      const uuid = thread_res.data.uuid;
      dispatch(setThreadUUIDsend(uuid));
      sendToThread(uuid);
    });
  }
};

export const loadNextFlightResultsPage = (page) => (dispatch, getState) => {
  const allOfferUrl = getState().sendMessage?.TopOfferUrlSend;

  if (!allOfferUrl) {
    console.warn("No TopOfferUrlSend found.");
    return Promise.resolve(); // Still returns a Promise
  }

  const nextPageUrl = `${allOfferUrl}?page=${page}`;
  console.log("nextPageUrl", nextPageUrl);

  dispatch(setLoading(true));

  return api.get(nextPageUrl)
    .then((res) => {
      console.log("nextPage_res", res);

      const flightData = res.data;
      dispatch(setMessage({ ai: flightData }));
    })
    .catch((err) => {
      console.error("Error loading next flight results", err);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};



export const createThreadAndRedirect = (router) => (dispatch, getState) => {
  const getuser = getState()?.base?.currentUser?.user;
  api
    .post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
    .then((res) => {
      const uuid = res.data.uuid;
      if (uuid) {
        dispatch(setThreadUUIDsend(uuid));
        dispatch(
          setMessage({
            ai: {
              newThread: `Hello ${getuser?.first_name ?? "there"} ${getuser?.last_name ?? ""}, I'm Mylz. How can I help you?`,
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
  const getuser = getState()?.base?.currentUser?.user;
  const uuid = sessionStorage.getItem("chat_thread_uuid");
  if (!uuid) return;

  const url = `/api/v1/chat/thread/${uuid}/delete`;
  api
    .delete(url)
    .then(() => {
      dispatch(setClearChat());
      sessionStorage.removeItem("chat_thread_uuid");

      api
        .post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
        .then((newThreadRes) => {
          const newUuid = newThreadRes.data.uuid;
          if (newUuid) {
            dispatch(setThreadUUIDsend(newUuid));
            sessionStorage.setItem("chat_thread_uuid", newUuid);
            dispatch(
              setMessage({
                ai: {
                  deleteThread: `Hello ${getuser?.first_name ?? "there"} ${getuser?.last_name ?? ""}, I'm Mylz. How can I help you?`,
                },
              })
            );
            if (followUpMessage) {
              dispatch(sendMessage(followUpMessage));
            }
          }
        })
        .catch((err) => {
          console.error("Failed to create new thread", err);
        });
    })
    .catch((err) => {
      console.error("Error deleting thread", err?.response?.data?.error);
    });
};

export const OnlydeleteChatThread = () => (dispatch) => {
  const uuid = sessionStorage.getItem("chat_thread_uuid");
  if (!uuid) return;

  const url = `/api/v1/chat/thread/${uuid}/delete`;
  api
    .delete(url)
    .then(() => {
      dispatch(setClearChat());
      sessionStorage.removeItem("chat_thread_uuid");
    })
    .catch((err) => {
      console.error("Error deleting thread", err?.response?.data?.error);
    });
};

// Export actions
export const {
  setLoading,
  setMessage,
  setAllFlightResults,
  setSearchHistorySend,
  setThreadUUIDsend,
  setClearChat,
  setAllOfferUrlSend,
  setisPolling,
  setpollingComplete,
  setCreatethread,
  setClearflight,
} = sendMessageSlice.actions;

export default sendMessageSlice.reducer;
