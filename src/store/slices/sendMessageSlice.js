import { createSlice } from "@reduxjs/toolkit";
import api from "@/src/store/api";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";
import Cookies from "js-cookie";
import {
  bookFlight,
  setflightDetail,
  setSelectedFlightKey,
  setSingleFlightData,
  offerkey
} from "./BookingflightSlice";
import { setOrderUuid, setViewPassengers } from "./passengerDrawerSlice";
import { clearGetMessages, fetchMessages, setSearchHistoryGet } from "./GestMessageSlice";
import { setIsBuilderDialog, setMobileNaveDrawer, setThreadDrawer } from "./Base/baseSlice";
import { setPaymentFormSuccess } from "./PaymentSlice";

const sendMessageSlice = createSlice({
  name: "sendMessage",
  initialState: {
    messages: [],
    isLoading: false,
    newChatLoading: false,
    inputLoading: false,
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
    AddBuilder: null,
    noMoreFlights:false,
    threadUuid: null,
  },
  reducers: {
    setInputLoading: (state, action) => {
      state.inputLoading = action.payload;
    },
    setNoMoreFlights: (state, action) => {
      state.noMoreFlights = action.payload;
    },
    setAddBuilder: (state, action) => {
      state.AddBuilder = action.payload;
    },
    setFilterUrl: (state, action) => {
      state.FilterUrl = action.payload;
    },
    setIsFunction: (state, action) => {
      state.IsFunction = action.payload;
    },
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
      //console.log("action111", action);

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
    setNewChatLoading: (state, action) => {
      state.newChatLoading = action.payload;
    },
    setMessage: (state, action) => {
      const newMessage = action.payload;

      // STEP 1: If this is a passengerFlowRes message
      if (newMessage?.ai?.passengerFlowRes !== undefined) {
        // STEP 2: Remove all old passengerFlowRes messages
        state.messages = state.messages.filter(
          (msg) => !(msg?.ai?.passengerFlowRes !== undefined)
        );
      }

      // STEP 3: Push the new message
      state.messages.push(newMessage);
    },
    setAllFlightResults: (state, action) => {
      state.AllFlightPostApi = action.payload;
    },
    setSearchHistorySend: (state, action) => {
      //console.log("action_history", action);

      state.SearchHistorySend = action.payload;
    },
    setThreadUUIDsend: (state, action) => {
      state.ThreadUUIDsend = action.payload;
    },
    setClearChat: (state) => {
      state.messages = [];
      state.ThreadUUIDsend = null;
    },
  },
});


export const sendMessage = (userMessage) => (dispatch, getState) => {
  dispatch(setInputLoading(true));
  const pathname = window.location.pathname;
  // Extract the UUID after /chat/
  const threadUUID = pathname.split("/chat/")[1];
  
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

        if (response?.silent_is_function) {
          dispatch(setAddBuilder(response));
        }
        dispatch(setIsFunction({ status: false }));

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
          const pollUntilComplete = () => {
            return new Promise((resolve, reject) => {
              const interval = setInterval(() => {
                api
                  .get(runStatusUrl)
                  .then((resRun) => {
                    const runData = resRun.data;
                    // checking is function true before dufful flight

                    if (runData.run_status === "completed") {
                      //console.log("runData_run_status", runData.run_status);
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
        dispatch(setIsFunction({ status: true }));
      } else {
        dispatch(setIsFunction({ status: false }));
      }
      if (response?.is_function) {
        const allFlightSearchApi =
          response?.response?.results?.view_all_flight_result_api?.url;
        const allFlightSearchUuid =
          response?.response?.results?.view_all_flight_result_api?.uuid;
        if (allFlightSearchApi) {
          const getallFlightId = allFlightSearchApi.split("/").pop();
          dispatch(setTopOfferUrlSend(allFlightSearchUuid));
          dispatch(setAllOfferUrl(allFlightSearchApi));
          dispatch(setFilterUrl(allFlightSearchApi));

          const historyUrl = `/api/v1/search/${allFlightSearchUuid}/history`;
          let hasShownInitialMessage = false;

          const showRealResults = () => {
            api
              .get(allFlightSearchApi)
              .then((flightRes) => {
                const isComplete = flightRes?.data?.is_complete;
                
                
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
                    // First fetch the new data
                    api
                      .get(allFlightSearchApi)
                      .then((flightRes) => {
                        dispatch(setSelectedFlightKey(null)); //  clear select flight key

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

  //  Check if thread UUID already exists set from url to sendToThread
  if (threadUUID) {
    sendToThread(threadUUID); // set in function for next chat flow
  } else {
    // Only create a new thread if one doesn't exist
    api.post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND).then((thread_res) => {
      const uuid = thread_res.data.uuid;
      dispatch(setInputLoading(false));
      dispatch(setThreadUuid(uuid)); // set for 1st chat url 
      sendToThread(uuid); // set in function for next chat flow 
    });
  }
};
// close send messge

// export const createThread = () => (dispatch) => {
//   //console.log("thread_uuid");

//   api
//     .post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
//     .then((thread_res) => {
//       const uuid = thread_res.data.uuid;
//       //console.log("thread_response", uuid);
//       sessionStorage.setItem("chat_thread_uuid", uuid);
//       dispatch(setThreadUuid(uuid));
//       dispatch(setThreadUUIDsend(uuid));
//     })
//     .catch((err) => {
//       console.error("Thread creation failed", err);
//     });
// };


// create thread api call

// for chat page header plus  icon
export const deleteAndCreateThread = (isMessage) => (dispatch, getState) => {
  dispatch(setNewChatLoading(true));
  api.post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
    .then((newThreadRes) => {
      const newUuid = newThreadRes.data.uuid;
      if (newUuid) {
        dispatch(setThreadUuid(newUuid));
        dispatch(setMobileNaveDrawer(false))
        dispatch(setIsBuilderDialog(false))
        dispatch(setPaymentFormSuccess(null));
        //  Clear old chat data in both slices
        dispatch(setClearChat());     // from sendMessageSlice
        dispatch(clearGetMessages());    // from getMessagesSlice
        dispatch(setSearchHistorySend(null))
        dispatch(setSearchHistoryGet(null))

        dispatch(setAddBuilder(null));
        dispatch(setSelectedFlightKey(null));
        dispatch(setflightDetail(null));
        dispatch(setViewPassengers([]));
        dispatch(setOrderUuid(null));
        dispatch(setSingleFlightData(null));

        // Optional: placeholder for new thread
        dispatch(setMessage({ ai: { newThread: true } }));

        //  Now fetch new messages for the new thread
        dispatch(setNewChatLoading(false));

      }
    })
    .catch((err) => {
      console.error("Failed to create new thread", err);
    });
};

export const CreatesingleThread = (threaduuid) => (dispatch, getState) => {
  dispatch(setThreadDrawer(false));
  
  // Clear all first
  dispatch(setClearChat());
  dispatch(setAddBuilder(null));
  dispatch(setSearchHistorySend(null));
  dispatch(setSelectedFlightKey(null));
  dispatch(setflightDetail(null));
  dispatch(setViewPassengers([]));
  dispatch(setOrderUuid(null));
  dispatch(bookFlight(null));
  dispatch(setSingleFlightData(null));

  // Then fetch messages for the new thread
  dispatch(fetchMessages(threaduuid));

  // Optional: show "new thread" message placeholder
}



// for delete thread

export const loadNextFlights = () => (dispatch, getState) => {
  const getpageNo = getState()?.sendMessage?.appendFlights?.nextPageNo;
  const getpageNo2 = getState()?.sendMessage;
  
  const allOfferUrl = getState().sendMessage?.AllOfferUrl;
  
  const paginationSymbol = allOfferUrl.includes("?") ? "&" : "?";
  const nextPageUrl = `${allOfferUrl}${paginationSymbol}page=${getpageNo}`;

  dispatch(setLoading(true));

  // console.log("nextPageUrl", nextPageUrl);
  api
    .get(nextPageUrl)
    .then((res) => {
      const flightData = res.data;
      const offers = flightData?.offers || [];

      if (offers.length === 0) {
        dispatch(setNoMoreFlights(true))
        return;
      }

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
  setIsFunction,
  setFilterUrl,
  setAddBuilder,
  setNoMoreFlights,
  setInputLoading,
  setNewChatLoading
} = sendMessageSlice.actions;
export default sendMessageSlice.reducer;
