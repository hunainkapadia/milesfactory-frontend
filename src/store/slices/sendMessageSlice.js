import { createSlice } from "@reduxjs/toolkit";
import api from "@/src/store/api";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";
import Cookies from "js-cookie";
import {
  bookFlight,
  setflightDetail,
  setSelectedFlightKey,
  setSingleFlightData,
  offerkey,
} from "./BookingflightSlice";
import { setOrderUuid, setViewPassengers } from "./passengerDrawerSlice";
import {
  clearGetMessages,
  fetchMessages,
  setSearchHistoryGet,
} from "./GestMessageSlice";
import {
  setIsBuilderDialog,
  setMobileNaveDrawer,
  setThreadDrawer,
} from "./Base/baseSlice";
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
    noMoreFlights: false,
    threadUuid: null,
    functionType: null,
  },
  reducers: {
    setFunctionType: (state, action) => {
      state.functionType = action.payload;
    },
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
    setResetAppendFlights: (state) => {
      state.appendFlights = {
        nextPageNo: 2, // reset back to default start
        ai: "",
      };
      state.noMoreFlights = false;
    },
  },
});

export const sendMessage = (userMessage) => (dispatch, getState) => {
  dispatch(setInputLoading(true));
  const pathname = window.location.pathname;
  const threadUUID = pathname.split("/chat/")[1];

  dispatch(setLoading(true));
  dispatch(setMessage({ user: userMessage }));

  const sendToThread = (uuid) => {
    const threadUUIdUrl = `${API_ENDPOINTS.CHAT.SEND_MESSAGE}/${uuid}`;

    api
      .post(threadUUIdUrl, { user_message: userMessage, background_job: false })
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
                isPolling: { status: true, argument: gdata },
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

          return pollUntilComplete()
            .then((completedRun) => {
              response = completedRun;
              dispatch(setpollingComplete(true));
              handleFinalResponse(response);
            })
            .catch((error) => console.error("Polling failed:", error));
        } else {
          handleFinalResponse(response);
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setLoading(false));
      });

    // Final Response Handler
    const handleFinalResponse = (response) => {
      dispatch(setIsFunction({ status: !!response?.is_function }));

      if (response?.is_function) {
        const funcName = response?.function_template?.[0]?.function?.name;
        dispatch(setFunctionType(funcName));

        // --------- ✅ Flight Flow (Fixed)
        const allFlightSearchApi =
          response?.response?.results?.view_all_flight_result_api?.url;
        const allFlightSearchUuid =
          response?.response?.results?.view_all_flight_result_api?.uuid;

        if (allFlightSearchApi) {
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
                  dispatch(setMessage({ ai: flightRes.data }));
                } else {
                  dispatch(
                    setMessage({
                      ai: flightRes.data,
                      type: "flight_result",
                    })
                  );
                }
              })
              .catch((err) =>
                console.error("Error fetching final flight results", err)
              );
          };

          const pollHistoryUntilComplete = () => {
            const interval = setInterval(() => {
              api
                .get(historyUrl)
                .then((history_res) => {
                  const isComplete = history_res?.data?.search?.is_complete;
                  dispatch(setSearchHistorySend({"flight" :history_res.data.search}));
                  

                  if (isComplete === true) {
                    clearInterval(interval);
                    api.get(allFlightSearchApi).then((flightRes) => {
                      dispatch(setSelectedFlightKey(null));
                      dispatch(setClearflight());
                      dispatch(setMessage({ ai: flightRes.data }));
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
                  console.error("Polling failed", err);
                  clearInterval(interval);
                });
            }, 1000);
          };

          pollHistoryUntilComplete();
        }

        // --------- ✅ Hotel Flow
        else if (funcName === "search_hotel_result_func") {
          const hotelSearchApi =
            response?.response?.results?.view_hotel_search_api?.url;
          const HotelArgument =
            response?.silent_function_template?.[0]?.function?.arguments || {};
            console.log("HotelArgument", HotelArgument);
            
          dispatch(setSearchHistorySend({ hotel: HotelArgument }));


          if (hotelSearchApi) {
            api
              .get(hotelSearchApi)
              .then((hotelRes) => {
                const isComplete = hotelRes?.data?.is_complete;
                if (isComplete === true) {
                  dispatch(setClearflight());
                  dispatch(setMessage({ ai: hotelRes.data }));
                } else {
                  dispatch(
                    setMessage({
                      ai: hotelRes.data,
                      type: "hotel_result",
                    })
                  );
                }
              })
              .catch((err) => {
                console.error("Error fetching hotel results", err);
              });
          }
        }
      } else {
        // Normal response
        if (response?.run_status === "completed") {
          // done
        }
        dispatch(setMessage({ ai: { response: response?.response } }));
      }
    };
  };

  if (threadUUID) {
    sendToThread(threadUUID);
  } else {
    api.post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND).then((thread_res) => {
      const uuid = thread_res.data.uuid;
      dispatch(setInputLoading(false));
      dispatch(setThreadUuid(uuid));
      sendToThread(uuid);
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
  api
    .post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
    .then((newThreadRes) => {
      const newUuid = newThreadRes.data.uuid;
      if (newUuid) {
        dispatch(setResetAppendFlights());
        dispatch(setThreadUuid(newUuid));
        dispatch(setMobileNaveDrawer(false));
        dispatch(setIsBuilderDialog(false));
        dispatch(setPaymentFormSuccess(null));
        //  Clear old chat data in both slices
        dispatch(setClearChat()); // from sendMessageSlice
        dispatch(clearGetMessages()); // from getMessagesSlice
        dispatch(setSearchHistorySend(null));
        dispatch(setSearchHistoryGet(null));

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
};

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
        dispatch(setNoMoreFlights(true));
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
  setNewChatLoading,
  setFunctionType,
  setResetAppendFlights
} = sendMessageSlice.actions;
export default sendMessageSlice.reducer;
