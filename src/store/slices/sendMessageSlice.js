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
  setCartType,
  CartDetail,
  setGetCartDetail,
  resetBookingState,
} from "./BookingflightSlice";
import {
  resetPassengerFlightState,
  setAddFilledPassenger,
  setAllPassengerFill,
  setOrderUuid,
  setViewPassengers,
} from "./passengerDrawerSlice";
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
import {
  resetOrderState,
  setOrderConfirm,
  setOrderData,
  setPaymentFormSuccess,
} from "./PaymentSlice";
import {
  resetPassengerHotelState,
  setOrderUuidHotel,
} from "./passengerDrawerHotelSlice";
import { resetBaggageState } from "./BaggageSlice";
import { resetHotelState, setSelectedhotelCode } from "./HotelSlice";

/**
 *  FIX: Use separate interval references
 * - runPollingInterval: for /run/{run_id}
 * - flightHistoryPollingInterval: for /search/{uuid}/history
 */
let runPollingInterval = null;
let flightHistoryPollingInterval = null;

// helper to safely stop flight polling
const stopFlightHistoryPolling = (dispatch) => {
  if (flightHistoryPollingInterval) {
    clearInterval(flightHistoryPollingInterval);
    flightHistoryPollingInterval = null;
  }
  dispatch?.(setisPolling({ status: false, type: "notactive" }));
};

const stopRunPolling = () => {
  if (runPollingInterval) {
    clearInterval(runPollingInterval);
    runPollingInterval = null;
  }
};

const sendMessageSlice = createSlice({
  // Add this to your reducers in sendMessageSlice
  name: "sendMessage",
  initialState: {
    messages: [],
    isLoading: false,
    newChatLoading: false,
    inputLoading: false,
    AllFlightPostApi: null,
    SearchHistorySend: null,
    ThreadUUIDsend: null,
    TopOfferUrlSend: null, // used as "current flight search uuid"
    isPolling: {
      status: false,
      type: "notactive",
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
    isUpdateOffer: false,
    error: null,
    hotelSearchId: null,
    systemMessage: null,
  },
  reducers: {
    setSystemMessage: (state, action) => {
      state.systemMessage = action.payload;
    },
    setHotelSearchId: (state, action) => {
      state.hotelSearchId = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
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

      if (!state.appendFlights.ai || !state.appendFlights.ai.offers) {
        state.appendFlights.ai = ai;
      } else {
        const existingOffers = state.appendFlights.ai.offers || [];
        const newOffers = ai?.offers || [];
        state.appendFlights.ai.offers = [...existingOffers, ...newOffers];
      }

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
    setClearflight(state) {
      state.messages = state.messages.filter(
        (msg) => msg?.type !== "flight_result_live",
      );
    },
    setpollingComplete: (state, action) => {
      state.pollingComplete = action.payload;
    },
    setisPolling: (state, action) => {
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

      // --------------------------------
      //  PASSENGER FLOW (replace old)
      // --------------------------------
      if (newMessage?.ai?.passengerFlowRes !== undefined) {
        stopFlightHistoryPolling();
        stopRunPolling();
        const index = state.messages.findIndex(
          (msg) => msg?.ai?.passengerFlowRes !== undefined,
        );

        if (index !== -1) {
          state.messages[index] = newMessage; // replace old
        } else {
          state.messages.push(newMessage); // first time
        }
        return;
      }

      // --------------------------------
      //  LIVE FLIGHT RESULT (replace in place)
      // old flight whici will be replace
      // --------------------------------
      if (newMessage?.type === "flight_result_live") {
        const liveIndex = state.messages.findIndex(
          (msg) => msg?.type === "flight_result_live",
        );

        if (liveIndex !== -1) {
          state.messages[liveIndex] = newMessage;
        } else {
          state.messages.push(newMessage);
        }
        return;
      }

      // --------------------------------
      //  FINAL FLIGHT RESULT after polling complete
      // --------------------------------
      // --------------------------------
      //  FINAL FLIGHT RESULT (Poll Complete)
      // --------------------------------
      // Inside setMessage reducer, update the FINAL FLIGHT RESULT block:
      if (
        newMessage?.type === "flight_result_final" ||
        (!newMessage.type && newMessage.ai?.is_complete)
      ) {
        // Find index of the temporary live/placeholder results
        const liveIndex = state.messages.findIndex(
          (msg) =>
            msg?.type === "flight_result_live" ||
            msg?.type === "flight_placeholder",
        );

        if (liveIndex !== -1) {
          // REPLACE the live block with final results
          state.messages[liveIndex] = {
            ...newMessage,
            type: "flight_result", // Change type so it stops being "live"
          };
        } else {
          // Fallback: If no live block found, push it, but check for filters
          const filterIndex = state.messages.findIndex(
            (msg) => msg?.type === "flight_result_append",
          );
          if (filterIndex !== -1) {
            state.messages.splice(filterIndex, 0, {
              ...newMessage,
              type: "flight_result",
            });
          } else {
            state.messages.push({ ...newMessage, type: "flight_result" });
          }
        }
        return;
      }

      // --------------------------------
      //  FILTERED RESULT (always last, replace old)
      // --------------------------------
      if (newMessage?.type === "flight_result_append") {
        const filterIndex = state.messages.findIndex(
          (msg) => msg?.type === "flight_result_append",
        );

        if (filterIndex !== -1) {
          state.messages[filterIndex] = newMessage; // replace
        } else {
          state.messages.push(newMessage);
        }
        return;
      }

      // --------------------------------
      //  Everything else (normal chat)
      // --------------------------------
      state.messages.push(newMessage);
    },
    setIsUpdateOffer: (state, action) => {
      state.isUpdateOffer = action.payload;
    },
    setUpdateOffer: (state) => {
      state.messages = state.messages.map((msg) => {
        if (msg.ai?.offers) {
          return { ...msg, ai: { ...msg.ai, offers: [] } };
        }
        return msg;
      });
    },
    setAllFlightResults: (state, action) => {
      state.AllFlightPostApi = action.payload;
    },
    setSearchHistorySend: (state, action) => {
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
      state.appendFlights = { nextPageNo: 2, ai: "" };
      state.noMoreFlights = false;
    },
    resetSendMessageState: (state) => {
      state.messages = [];
      state.isLoading = false;
      state.newChatLoading = false;
      state.inputLoading = false;
      state.AllFlightPostApi = null;
      state.SearchHistorySend = null;
      state.ThreadUUIDsend = null;
      state.TopOfferUrlSend = null;
      state.isPolling = { status: false, type: "notactive" };
      state.pollingComplete = false;
      state.Createthread = null;
      state.AllOfferUrl = "";
      state.appendFlights = { nextPageNo: 2, ai: "" };
      state.AddBuilder = null;
      state.noMoreFlights = false;
      state.threadUuid = null;
      state.functionType = null;
      state.isUpdateOffer = false;
      state.error = null;
      state.hotelSearchId = null;
      state.systemMessage = null;
      state.NextMessage = null;
      state.FilterUrl = null;
      state.IsFunction = null;
    },
  },
});

export const sendMessage = (userMessage) => (dispatch, getState) => {
  dispatch(setInputLoading(true));
  const pathname = window.location.pathname;
  const threadUUID = pathname.split("/chat/")[1];

  dispatch(setMessage({ user: userMessage }));

  const sendToThread = (uuid) => {
    const threadUUIdUrl = `${API_ENDPOINTS.CHAT.SEND_MESSAGE}/${uuid}`;

    dispatch(setLoading(true));

    api
      .post(threadUUIdUrl, { user_message: userMessage, background_job: false })
      .then((res) => {
        let response = res.data;

        const run_id = response.run_id;
        const run_status = response.run_status;
        const technicalError = response?.response?.errors;

        if (
          response?.message?.includes("SYSTEM MESSAGE") &&
          response?.is_function === false
        ) {
          dispatch(setSystemMessage(true));
        }

        if (technicalError) {
          const errorMessage = `SYSTEM MESSAGE: Flight Search Error - ${
            response?.response?.message || "Something went wrong"
          }`;
          // NOTE: you may want to prevent re-entrant loops here
          dispatch(sendMessage(errorMessage, true));
        }

        dispatch(setMessage({ ai: { error: response } }));

        if (response?.silent_is_function) dispatch(setAddBuilder(response));
        dispatch(setIsFunction({ status: false }));

        const handleFinalResponse = (finalResponse) => {
          dispatch(setIsFunction({ status: !!finalResponse?.is_function }));

          if (!finalResponse?.is_function) {
            dispatch(setMessage({ ai: { response: finalResponse?.response } }));
            return;
          }

          const funcName =
            finalResponse?.function_template?.[0]?.function?.name;
          dispatch(setFunctionType(funcName));

          // --------- Flight Flow
          const allFlightSearchApi =
            finalResponse?.response?.results?.view_all_flight_result_api?.url;
          const allFlightSearchUuid =
            finalResponse?.response?.results?.view_all_flight_result_api?.uuid;

          const hotelSearchApi =
            finalResponse?.response?.results?.view_hotel_search_api?.url;

          /**
           *  FLIGHT SEARCH FLOW FIX
           */
          if (allFlightSearchApi && allFlightSearchUuid) {
            const state = getState().sendMessage;
            const currentlyPollingUuid = state.TopOfferUrlSend;
            const isPollingActive =
              state.isPolling?.status === true &&
              !!flightHistoryPollingInterval;
            const historyUrl = `/api/v1/search/${allFlightSearchUuid}/history`;

            // Always update the URLs in the state
            dispatch(setTopOfferUrlSend(allFlightSearchUuid));
            dispatch(setAllOfferUrl(allFlightSearchApi));
            dispatch(setFilterUrl(allFlightSearchApi));

            /**
             * FIX: If polling is active and it's the same search session (UUID),
             * we just need to fetch the filtered results and update the "append" view.
             */
            if (
              isPollingActive &&
              currentlyPollingUuid === allFlightSearchUuid
            ) {
              dispatch(setLoading(true));
              api
                .get(allFlightSearchApi)
                .then((flightRes) => {
                  console.log("load_flightRes", flightRes);

                  dispatch(
                    setMessage({
                      ai: { ...flightRes.data, url: allFlightSearchApi },
                      type: "flight_result_append",
                    }),
                  );
                  // Ensure loading is turned off after filter applied
                })
                .catch((err) => {
                  console.log(err);
                })
                .finally(() => {
                  dispatch(setLoading(false));
                  dispatch(setInputLoading(false));
                });
              return; // Stop here, don't restart polling
            }

            /**
             * If the UUID changed or polling isn't active,
             * clear old polling and start fresh.
             */
            if (
              isPollingActive &&
              currentlyPollingUuid !== allFlightSearchUuid
            ) {
              stopFlightHistoryPolling(dispatch);
            }

            let hasShownInitialMessage = false;

            const showRealResultsOnce = () => {
              dispatch(setInputLoading(true));
              dispatch(setLoading(true));
              api
                .get(allFlightSearchApi)
                .then((flightRes) => {
                  const isComplete = flightRes?.data?.is_complete;
                  console.log("load_flightRes1", flightRes);

                  dispatch(
                    setMessage({
                      ai: { ...flightRes.data, url: allFlightSearchApi },
                      // Using your existing type logic to ensure it replaces the old block
                      type: isComplete
                        ? "flight_result_final"
                        : "flight_result_live",
                    }),
                  );
                })
                .catch((err) =>
                  console.error("Error fetching flight results", err),
                )
                .finally(() => {
                  dispatch(setLoading(false));
                  dispatch(setInputLoading(false));
                });
            };

            const pollHistoryUntilComplete = () => {
              dispatch(setisPolling({ status: true, type: "active" }));

              //  guard: never start if already started
              if (flightHistoryPollingInterval) return;

              flightHistoryPollingInterval = setInterval(() => {
                //  cancel if new uuid replaced this one
                const liveUuid = getState().sendMessage.TopOfferUrlSend;
                if (liveUuid !== allFlightSearchUuid) {
                  stopFlightHistoryPolling(dispatch);
                  return;
                }

                api
                  .get(historyUrl)
                  .then((history_res) => {
                    const isComplete = history_res?.data?.search?.is_complete;
                    dispatch(
                      setSearchHistorySend({ flight: history_res.data.search }),
                    );

                    if (isComplete === true) {
                      stopFlightHistoryPolling(dispatch);

                      api
                        .get(allFlightSearchApi)
                        .then((flightRes) => {
                          console.log("load_flightRes3", flightRes);
                          if (
                            flightRes?.data?.count === 0 &&
                            Array.isArray(flightRes?.data?.offers) &&
                            flightRes?.data?.offers.length === 0
                          ) {
                            dispatch(setMessage({ ai: "isNotFound" }));
                          } else {
                            dispatch(setClearflight());
                            dispatch(
                              setMessage({
                                ai: {
                                  ...flightRes.data,
                                  url: allFlightSearchApi,
                                },
                              }),
                            );
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        })
                        .finally(() => {
                          dispatch(setLoading(false));
                          dispatch(setInputLoading(false));
                        });
                    } else if (!hasShownInitialMessage) {
                      hasShownInitialMessage = true;

                      // show partial results once
                      showRealResultsOnce();

                      dispatch(
                        setMessage({
                          ai: { response: finalResponse?.response },
                          type: "flight_placeholder",
                        }),
                      );
                      dispatch(setLoading(false));
                    }
                  })
                  .catch((err) => {
                    console.error("Polling failed", err);
                    dispatch(setLoading(false));
                    stopFlightHistoryPolling(dispatch);
                  });
              }, 2000);
            };

            pollHistoryUntilComplete();
            return;
          }

          /**
           * ----- HOTEL FLOW (unchanged mostly) -----
           */
          if (hotelSearchApi) {
            const HotelArgument =
              finalResponse?.silent_function_template?.[0]?.function
                ?.arguments || {};
            const hotelSearchuuid =
              finalResponse?.response?.results?.view_hotel_search_api?.uuid;

            dispatch(setHotelSearchId(hotelSearchuuid));
            dispatch(setSearchHistorySend({ hotel: HotelArgument }));

            dispatch(setLoading(true));

            api
              .get(hotelSearchApi)
              .then((hotelRes) => {
                const isComplete = hotelRes?.data?.is_complete;
                dispatch(setLoading(false));

                if (isComplete === true) {
                  dispatch(setClearflight());
                  dispatch(setMessage({ ai: hotelRes.data }));
                } else {
                  dispatch(
                    setMessage({
                      ai: { ...hotelRes.data },
                      type: "hotel_result",
                    }),
                  );
                }
              })
              .catch((err) => {
                dispatch(
                  setMessage({
                    ai: {
                      response: err.response?.data || { error: err.message },
                    },
                  }),
                );
              })
              .finally(() => dispatch(setLoading(false)));

            return;
          }

          // fallback
          dispatch(setMessage({ ai: { response: finalResponse?.response } }));
        };

        /**
         *  requires_action polling FIX:
         * use runPollingInterval (NOT flightHistoryPollingInterval)
         */
        if (run_status === "requires_action") {
          const runStatusUrl = `/api/v1/chat/get-messages/${uuid}/run/${run_id}`;
          const funcTemplate = response.function_template?.[0];
          const gdata = funcTemplate?.function?.arguments || {};

          dispatch(setpollingComplete(false));
          dispatch(
            setMessage({
              ai: { isPolling: { status: true, argument: gdata } },
            }),
          );

          const pollUntilComplete = () => {
            return new Promise((resolve, reject) => {
              // guard
              stopRunPolling();

              runPollingInterval = setInterval(() => {
                api
                  .get(runStatusUrl)
                  .then((resRun) => {
                    const runData = resRun.data;
                    if (runData.run_status === "completed") {
                      stopRunPolling();
                      resolve(runData);
                    }
                  })
                  .catch((err) => {
                    stopRunPolling();
                    reject(err);
                  });
              }, 1000);
            });
          };

          return pollUntilComplete()
            .then((completedRun) => {
              dispatch(setpollingComplete(true));
              handleFinalResponse(completedRun);
            })
            .catch((error) => console.error("Run polling failed:", error));
        }

        // normal immediate
        handleFinalResponse(response);
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
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

export const deleteAndCreateThread = (isMessage) => (dispatch, getState) => {
  dispatch(setNewChatLoading(true));
  api
    .post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
    .then((newThreadRes) => {
      const newUuid = newThreadRes.data.uuid;
      if (newUuid) {
        //  stop both pollers

        dispatch(resetSendMessageState());

        stopRunPolling();
        stopFlightHistoryPolling(dispatch);

        dispatch(setpollingComplete(true));
        dispatch(setLoading(false));
        dispatch(setAllPassengerFill(null));

        dispatch(setSelectedhotelCode(null));
        dispatch(resetOrderState());
        dispatch(resetBookingState());
        dispatch(resetHotelState());

        dispatch(resetPassengerFlightState());
        dispatch(resetPassengerHotelState());
        dispatch(resetBaggageState());

        dispatch(setAddFilledPassenger(null));
        dispatch(setCartType(null));
        dispatch(setGetCartDetail(null));
        dispatch(setResetAppendFlights());
        dispatch(setThreadUuid(newUuid));
        dispatch(setMobileNaveDrawer(false));
        dispatch(setIsBuilderDialog(false));

        dispatch(setClearChat());
        dispatch(clearGetMessages());
        dispatch(setSearchHistorySend(null));
        dispatch(setSearchHistoryGet(null));

        dispatch(setAddBuilder(null));
        dispatch(setflightDetail(null));
        dispatch(setViewPassengers([]));

        dispatch(setOrderData(null));
        dispatch(setOrderUuid(null));
        dispatch(setOrderUuidHotel(null));
        dispatch(setSingleFlightData(null));

        dispatch(setMessage({ ai: { newThread: true } }));
        dispatch(setNewChatLoading(false));
      }
    })
    .catch((err) => console.error("Failed to create new thread", err));
};

export const CreatesingleThread = (threaduuid) => (dispatch, getState) => {
  dispatch(setThreadDrawer(false));

  dispatch(setClearChat());
  dispatch(setAddBuilder(null));
  dispatch(setSearchHistorySend(null));

  dispatch(setflightDetail(null));
  dispatch(setViewPassengers([]));
  dispatch(setOrderUuid(null));
  dispatch(bookFlight(null));
  dispatch(setSingleFlightData(null));

  dispatch(fetchMessages(threaduuid));
};

export const loadNextFlights = () => (dispatch, getState) => {
  const getpageNo = getState()?.sendMessage?.appendFlights?.nextPageNo;
  const allOfferUrl = getState().sendMessage?.AllOfferUrl;

  const paginationSymbol = allOfferUrl.includes("?") ? "&" : "?";
  const nextPageUrl = `${allOfferUrl}${paginationSymbol}page=${getpageNo}`;

  dispatch(setLoading(true));

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
        }),
      );
    })
    .catch((err) => console.error("Error loading next flight results", err))
    .finally(() => dispatch(setLoading(false)));
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
  setResetAppendFlights,
  setUpdateOffer,
  setIsUpdateOffer,
  setError,
  setHotelSearchId,
  setSystemMessage,
  resetSendMessageState,
} = sendMessageSlice.actions;

export default sendMessageSlice.reducer;
