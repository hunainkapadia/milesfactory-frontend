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
  const newMsg = action.payload;

  // Passenger flow messages → replace old ones
  if (newMsg?.ai?.passengerFlowRes !== undefined) {
    state.messages = state.messages.filter(
      (msg) => msg?.ai?.passengerFlowRes === undefined
    );
  }

  // Flight append → keep old results
  if (newMsg?.ai?.append) {
    state.messages.push(newMsg);
    return;
  }

  // Default → add new message
  state.messages.push(newMsg);
},

    setIsUpdateOffer: (state, action) => {
      state.isUpdateOffer = action.payload;
    },
    setUpdateOffer: (state) => {
      state.messages = state.messages.map((msg) => {
        if (msg.ai?.offers) {
          return {
            ...msg,
            ai: {
              ...msg.ai,
              offers: [], // null ki jagah empty array rakhen to handle karna easy rahega
            },
          };
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
          const errorMessage = `SYSTEM MESSAGE: Flight Search Error - ${response?.response?.message || "Something went wrong"}`;
          dispatch(sendMessage(errorMessage, true)); // send once, prevent infinite loop
        }

        dispatch(setMessage({ ai: { error: response } }));
        dispatch(setLoading(false));

        if (response?.silent_is_function) {
          dispatch(setAddBuilder(response));
        }
        dispatch(setIsFunction({ status: false }));

        if (run_status === "requires_action") {
          const funcTemplate = response.function_template?.[0];
          const gdata = funcTemplate?.function?.arguments || {};

          dispatch(setpollingComplete(true));
          dispatch(
            setMessage({
              ai: {
                isPolling: { status: false, argument: gdata },
              },
            })
          );

          handleFinalResponse(response);
        } else {
          handleFinalResponse(response);
        }
      })
      .catch(() => {})
      .finally(() => {});

    // -----------------------------
    // Final Response Handler
    // -----------------------------
    const handleFinalResponse = (response) => {
      dispatch(setIsFunction({ status: !!response?.is_function }));

      if (response?.is_function) {
        const funcName = response?.function_template?.[0]?.function?.name;
        dispatch(setFunctionType(funcName));

        // --------- FLIGHT FLOW ---------
        const allFlightSearchApi =
          response?.response?.results?.view_all_flight_result_api?.url;
        const allFlightSearchUuid =
          response?.response?.results?.view_all_flight_result_api?.uuid;

        const hotelSearchApi =
          response?.response?.results?.view_hotel_search_api?.url;

        // ----- FLIGHT SEARCH -----
        if (allFlightSearchApi) {
          dispatch(setTopOfferUrlSend(allFlightSearchUuid));
          dispatch(setAllOfferUrl(allFlightSearchApi));
          dispatch(setFilterUrl(allFlightSearchApi));

          const historyUrl = `/api/v1/search/${allFlightSearchUuid}/history`;
          let hasShownInitial = false;
          
          const pollHistoryUntilComplete = () => {
            const interval = setInterval(() => {
              //START polling here
                dispatch(setisPolling({ status: true, argument: null })); 

              api
                .get(historyUrl)
                .then((historyRes) => {
                  const historyData = historyRes?.data?.search;
                  const isComplete = historyData?.is_complete;

                  // ---- update history continuously ----
                  if (historyData) {
                    dispatch(setSearchHistorySend({ flight: historyData }));
                  }

                  // ---- show early flight results once while polling ----
                  if (!isComplete && !hasShownInitial) {
                    hasShownInitial = true;

                    api.get(allFlightSearchApi).then((flightRes) => {
                      if (flightRes?.data) {
                        dispatch(
                          setMessage({
                            ai: {
                              ...flightRes.data,
                              url: allFlightSearchApi,
                              append: true,
                            },
                            type: "flight_result",
                          })
                        );
                      }
                    });

                    dispatch(
                      setMessage({
                        ai: { response: response?.response },
                        type: "flight_placeholder",
                      })
                    );
                  }

                  // ---- stop polling when complete ----
                  if (isComplete === true) {
                    console.log("History polling finished");
                    dispatch(setisPolling({ status: false, argument: null })); // ✅ STOP polling

                    clearInterval(interval);

                    api.get(allFlightSearchApi).then((flightRes) => {
                      if (
                        flightRes?.data?.count === 0 &&
                        Array.isArray(flightRes?.data?.offers) &&
                        flightRes?.data?.offers.length === 0
                      ) {
                        dispatch(setMessage({ ai: "isNotFound" }));
                      } else {
                        dispatch(setSelectedFlightKey(null));
                        dispatch(setClearflight());

                        dispatch(
                          setMessage({
                            ai: {
                              ...flightRes.data,
                              url: allFlightSearchApi,
                            },
                            type: "flight_result",
                          })
                        );
                      }
                    });
                  }
                })
                .catch((err) => {
                  console.error("❌ History polling failed", err);
                  dispatch(setisPolling({ status: false, argument: null })); // stop polling on error

                  clearInterval(interval);
                });
            }, 1000);
          };

          pollHistoryUntilComplete();
        }

        // ----- HOTEL FLOW -----
        else if (hotelSearchApi) {
          const HotelArgument =
            response?.silent_function_template?.[0]?.function?.arguments || {};
          const hotelSearchuuid =
            response?.response?.results?.view_hotel_search_api?.uuid;

          dispatch(setHotelSearchId(hotelSearchuuid));
          dispatch(setSearchHistorySend({ hotel: HotelArgument }));

          if (hotelSearchApi) {
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
                  let hotelName = null;
                  let hotelCategory = null;
                  let filterurl = null;

                  try {
                    const hotelUrl =
                      response?.response?.results?.view_hotel_search_api?.url;
                    if (hotelUrl) {
                      const parsedUrl = new URL(
                        hotelUrl,
                        typeof window !== "undefined"
                          ? window.location.origin
                          : "https://demo.milesfactory.com"
                      );
                      hotelName = parsedUrl.searchParams.get("name");
                      hotelCategory = parsedUrl.searchParams.get("category");
                      if (parsedUrl.search && parsedUrl.search.length > 1) {
                        filterurl = hotelUrl;
                      }
                    }
                  } catch (err) {
                    console.warn("Invalid hotel filter URL:", err);
                  }

                  dispatch(
                    setMessage({
                      ai: {
                        ...hotelRes.data,
                        filters: {
                          name: hotelName,
                          category: hotelCategory,
                          filterurl: filterurl,
                        },
                      },
                      type: "hotel_result",
                    })
                  );
                }
              })
              .catch((err) => {
                console.error(
                  "Error fetching hotel results:",
                  err.response?.data || err.message || err
                );

                dispatch(
                  setMessage({
                    ai: {
                      response: err.response?.data || { error: err.message },
                    },
                  })
                );
              })
              .finally(() => {
                dispatch(setLoading(false));
              });
          }
        }
      } else {
        // --------- NORMAL RESPONSE ---------
        if (response?.run_status === "completed") {
          // done
        }
        dispatch(setMessage({ ai: { response: response?.response } }));
      }
    };
  };

  // --------- THREAD CREATION ---------
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

//   api
//     .post(API_ENDPOINTS.CHAT.CREATE_THREAD_SEND)
//     .then((thread_res) => {
//       const uuid = thread_res.data.uuid;

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
        dispatch(setLoading(false));
        dispatch(setAllPassengerFill(null));
        // allslices reset
        dispatch(setSelectedhotelCode(null));
        dispatch(resetOrderState());
        dispatch(resetBookingState());
        dispatch(resetHotelState());

        dispatch(resetPassengerFlightState());
        dispatch(resetPassengerHotelState());
        dispatch(resetBaggageState());

        dispatch(setAddFilledPassenger(null));
        dispatch(setSelectedFlightKey(null)); // fro reset selected button
        dispatch(setCartType(null));
        dispatch(setGetCartDetail(null));
        dispatch(setResetAppendFlights());
        dispatch(setThreadUuid(newUuid));
        dispatch(setMobileNaveDrawer(false));
        dispatch(setIsBuilderDialog(false));

        //  Clear old chat + messages
        dispatch(setClearChat());
        dispatch(clearGetMessages());
        dispatch(setSearchHistorySend(null));
        dispatch(setSearchHistoryGet(null));

        dispatch(setAddBuilder(null));
        dispatch(setflightDetail(null));
        dispatch(setViewPassengers([]));

        // order clear
        dispatch(setOrderData(null));
        dispatch(setOrderUuid(null));
        dispatch(setOrderUuidHotel(null));
        dispatch(setSingleFlightData(null));

        // Optional: placeholder for new thread
        dispatch(setMessage({ ai: { newThread: true } }));

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
  setResetAppendFlights,
  setUpdateOffer,
  setIsUpdateOffer,
  setError,
  setHotelSearchId,
  setSystemMessage
} = sendMessageSlice.actions;
export default sendMessageSlice.reducer;
