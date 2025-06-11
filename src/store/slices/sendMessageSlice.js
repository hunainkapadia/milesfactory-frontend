import { createSlice } from "@reduxjs/toolkit";
import api from "@/src/store/api";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";
import Cookies from "js-cookie";

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
    Createthread: null,
    AllOfferUrl: "",
    appendFlights: {
      nextPageNo: 2,
      ai: "",
    },
  },
  reducers: {
    setThreadUuid: (state, action) => {
      state.threadUuid = action.payload;
    },
    setAppendFlights: (state, action) => {
      const { ai, nextPageNo } = action.payload;

      // If first time loading flights
      if (!state.appendFlights.ai || !state.appendFlights.ai.offers) {
        state.appendFlights.ai = ai;
      } else {
        const existingOffers = state.appendFlights.ai.offers || [];
        const newOffers = ai?.offers || [];

        // Append offers
        state.appendFlights.ai.offers = [...existingOffers, ...newOffers];
      }

      // Always update page number from API response or passed payload
      if (nextPageNo) {
        state.appendFlights.nextPageNo = nextPageNo;
      }

      // const { count, has_next, is_complete, next_page_number, offers } = action.payload
      // console.log("state_next", state.appendFlights);
      // if (state.appendFlights) {
      //   const updatedObj = {
      //     ...action.payload,
      //     offers: [...state.appendFlights.offers, ...action.payload.offers],
      //   };
      //   state.appendFlights = updatedObj;
      // } else {
      //   state.appendFlights = action.payload
      // }
    },
    setNextMessage: (state, action) => {
      state.NextMessage = action.payload;
    },
    setCreatethread: (state, action) => {
      state.Createthread = action.payload;
    },
    // when ic complete true previus flight update
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
      console.log("action111", action);

      state.isPolling = action.payload;
    },
    setTopOfferUrlSend: (state, action) => {
      state.TopOfferUrlSend = action.payload;
    },
    setAllOfferUrl: (state, action) => {
      state.AllOfferUrl = action.payload;
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
      console.log("action_history", action);

      state.SearchHistorySend = action.payload;
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

export const createThread = () => (dispatch) => {
  console.log("thread_uuid");

  api
    .post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
    .then((thread_res) => {
      const uuid = thread_res.data.uuid;
      console.log("thread_response", uuid);
      sessionStorage.setItem("chat_thread_uuid", uuid);
      dispatch(setThreadUuid(uuid))
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
    console.log("threadUUIdUrl", threadUUIdUrl);

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
          const pollUntilComplete = () => {
            return new Promise((resolve, reject) => {
              const interval = setInterval(() => {
                api
                  .get(runStatusUrl)
                  .then((resRun) => {
                    const runData = resRun.data;
                    console.log("runData.run_status", runData);

                    // checking is function true before dufful flight

                    if (runData.run_status === "completed") {
                      console.log(runData.run_status);

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
              dispatch(setpollingComplete(true));
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
      // flight result [start]
      if (response?.is_function) {
        const allFlightSearchApi =
          response?.response?.results?.view_all_flight_result_api?.url;
        if (allFlightSearchApi) {
          const getallFlightId = allFlightSearchApi.split("/").pop();
          dispatch(setTopOfferUrlSend(getallFlightId));
          dispatch(setAllOfferUrl(allFlightSearchApi));
          
          const historyUrl = `/api/v1/search/${getallFlightId}/history`;
          let hasShownInitialMessage = false;

          const showRealResults = () => {
            api
              .get(allFlightSearchApi)
              .then((flightRes) => {
                const isComplete = flightRes?.data?.is_complete;
                console.log("flightRes", flightRes);

                console.log(
                  " Final refreshed flightRes is_complete:",
                  isComplete
                );

                if (isComplete === true) {
                  console.log("Replacing with real flight results");
                  dispatch(
                    setMessage({
                      ai: flightRes.data,
                    })
                  );
                } else {
                  console.log("Still not complete after polling");
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
                  console.log(" Polling: is_complete =", isComplete);
                  dispatch(setSearchHistorySend(history_res.data.search));

                  if (isComplete === true) {
                    clearInterval(interval);
                    // First fetch the new data
                    api
                      .get(allFlightSearchApi)
                      .then((flightRes) => {
                        const realFlightData = flightRes.data;

                        // First clear placeholders
                        dispatch(setClearflight());

                        // Then add final results
                        dispatch(
                          setMessage({
                            ai: realFlightData,
                          })
                        );
                      })
                      .catch((err) => {
                        console.error("Error fetching final results", err);
                      });
                  } else if (!hasShownInitialMessage) {
                    hasShownInitialMessage = true;
                    showRealResults(); // fetch and display the final results
                    console.log("Not complete — showing placeholder once");
                    // alert(
                    //   "Showing placeholder flight result while search continues..."
                    // );

                    dispatch(
                      setMessage({
                        ai: { response: response?.response },
                        type: "flight_placeholder", //if check clear
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

          // Start polling now
          pollHistoryUntilComplete();
        }

        // flight result [end]
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
// close send messge

// create thread api call
export const createThreadAndRedirect = (router) => (dispatch, getState) => {
  const getuser = getState()?.base?.currentUser?.user;

  console.log("getuser_chat", getuser);
  
  api
    .post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
    .then((res) => {
      const uuid = res.data.uuid;
      if (uuid) {
        dispatch(setThreadUUIDsend(uuid));
        dispatch(
          setMessage({
            ai: {
              newThread: `Hello ${getuser?.first_name ?? "there"} ${
                getuser?.last_name ?? ""
              }, I'm Mylz. How can I help you?`,
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

// for chat page header plus  icon
export const deleteAndCreateThread =
  (followUpMessage = null) =>
  (dispatch, getState) => {
    const getuser = getState()?.base?.currentUser?.user;
    console.log("getuser_0", getuser);
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

          api
            .post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
            .then((newThreadRes) => {
              const newUuid = newThreadRes.data.uuid;
              if (newUuid) {
                dispatch(setThreadUUIDsend(newUuid));
                sessionStorage.setItem("chat_thread_uuid", newUuid);
                
                
                // Dispatch the welcome message (deleteThread message)

                dispatch(
                  setMessage({
                    ai: {
                      deleteThread: `Hello ${getuser?.first_name ?? "there"} ${
                        getuser?.last_name ?? ""
                      }, I'm Mylz. How can I help you?`,
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
        console.error("Error deleting thread", err?.response?.data?.error);
      });
  };

export const OnlydeleteChatThread =
  (followUpMessage = null) =>
  (dispatch, getState) => {
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

export const loadNextFlights = () => (dispatch, getState) => {
    const getpageNo = getState()?.sendMessage?.appendFlights?.nextPageNo;
    const getpageNo2 = getState()?.sendMessage;
    console.log("getpageNo", getpageNo2);
    


  const allOfferUrl = getState().sendMessage?.AllOfferUrl;
  console.log("allOfferUrl", allOfferUrl);

  const nextPageUrl = `${allOfferUrl}?page=${getpageNo}`;
  console.log("nextPageUrl", nextPageUrl);
  dispatch(setLoading(true));

  // console.log("nextPageUrl", nextPageUrl);
  api
    .get(nextPageUrl)
    .then((res) => {
      const flightData = res.data;
      console.log("flightDat", flightData);
      dispatch(
        setAppendFlights({
          ai: flightData,
          nextPageNo: flightData?.next_page_number,
        })
      );
    })
    .catch((err) => {
      console.error("Error loading next flight results", err);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};


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
  setCreatethread,
  setClearflight,
  setAllOfferUrl,
  setNextMessage,
  setAppendFlights,
  setnextPageNo,
  setThreadUuid,
} = sendMessageSlice.actions;
export default sendMessageSlice.reducer;
