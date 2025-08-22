import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, BOOKING, BOOKING_DETAIL } from "../api/apiEndpoints";
import api from "../api";
import { setOrderUuid, setViewPassengers } from "./passengerDrawerSlice";
import { setMessage } from "./sendMessageSlice";

const initialState = {
  flightDetail: null,
  isLoading: false,
  isLoadingSelect: false,
  setError: null,
  selectedFlightId: null,
  selectedFlighDetail: null,

  setSelectFlightKey: null,
  OpenDrawer: false,
  CloseDrawer: false,
  BookingSetupUrl: null,
  selectedFlightKey: null, //Store selected flight key
  offerkeyforDetail: null,
  BaggageDrawer: false,
  baggageOptions: {}, // ← add this line
  selectedBaggage: [], // add in initialState
  baggageError: null,
  singleFlightData: null,
  addCart: null,
  getListCart: null,
  getCartDetail: null,
  bookingDrawer: false,
};
// for selectflightDetail button
const bookingflightsSlice = createSlice({
  name: "Booking",
  initialState,

  reducers: {
    setIsLoadingSelect: (state, action) => {
      state.isLoadingSelect = action.payload;
    },
    setBookingDrawer: (state, action) => {
      state.bookingDrawer = action.payload;
    },
    setGetListCart: (state, action) => {
      state.getListCart = action.payload;
    },
    setGetCartDetail: (state, action) => {
      state.getCartDetail = action.payload;
    },
    setAddCart: (state, action) => {
      state.addCart = action.payload;
    },
    setOfferkeyforDetail: (state, action) => {
      state.offerkeyforDetail = action.payload;
    },
    setSingleFlightData: (state, action) => {
      state.singleFlightData = action.payload;
    },
    setSelectedFlightKey: (state, action) => {
      // New reducer for selected flight key
      state.selectedFlightKey = action.payload;
    },
    setSelectFlightKey: (state, action) => {
      state.setSelectFlightKey = action.payload;
    },
    setflightDetail: (state, action) => {
      state.flightDetail = action.payload; //payload comming in action
      state.selectedFlightId = action?.payload?.id;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isLoading = action.payload;
    },
    setOpenDrawer: (state, action) => {
      state.setSelectFlightKey = action.payload;
    },
    //  select booking end
    //  start booking get flight and pass detaiul
    setCloseDrawer: (state, action) => {
      state.setSelectFlightKey = action.payload;
    },
    setBookingSetupUrl: (state, action) => {
      state.BookingSetupUrl = action.payload;
    },
  },
});

export const fetchflightDetail = (flightId) => (dispatch) => {
  const apiUrl = `/api/v1/search/single/result/${flightId}`;
  dispatch(setLoading(true));
  api.get(apiUrl).then((res) => {
    dispatch(setflightDetail(res.data));
    dispatch(setLoading(false));
  });
};

// booking flo

export const bookFlight = () => (dispatch, getState) => {
  // {{BASE_URL}}/api/v1/passenger/order/f04e7c0d-3546-40f4-8140-cfbf13d98f99/baggage-options
  // const getPassenger =  `${/api/v1/passenger/order/f04e7c0d-3546-40f4-8140-cfbf13d98f99/baggage-options}`
  // {{BASE_URL}}/api/v1/search/single/result/off_0000AtoC3XiG43x9eXiVTE
  const FlightId = getState().booking.selectedFlightId;
  dispatch(setLoading(true));

  api
    .get(`/api/v1/search/single/result/${FlightId}`)
    .then((res) => {
      dispatch(setSingleFlightData(res.data));
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

// Add to Cart
export const AddToCart = (params, uuid) => async (dispatch, getState) => {
  console.log("test_uuid", uuid);

  dispatch(setIsLoadingSelect(true));

  try {
    const res = await api.post(`/api/v1/cart/add`, params);
    console.log("cart_res", res);
    dispatch(setIsLoadingSelect(false));
    dispatch(setAddCart(res.data));
    //  if API returns uuid, immediately fetch cart items

    if (res.data) {
      dispatch(ListCart(uuid));
      dispatch(CartDetail(uuid));
    }
  } catch (error) {
    console.error("AddToCart Error:", error);
  } finally {
    dispatch(setIsLoadingSelect(false));
  }
};

// List Cart
// export const ListCart = (uuid) => async (dispatch) => {
//   const apiUrl = `/api/v1/cart/${uuid}/items`;
//   dispatch(setLoading(true));

//   try {
//     const res = await api.get(apiUrl);
//     dispatch(setGetListCart(res.data));
//   } catch (error) {
//     console.error("ListCart Error:", error);
//   } finally {
//     dispatch(setLoading(false));
//   }
// };
export const CartDetail = (threadUuid) => async (dispatch, getState) => {
  const uuid = getState()?.sendMessage?.threadUuid;
  console.log("threaduuid_111", uuid);

  console.log("apiUrl");
  dispatch(setLoading(true));
  const apiUrl = `/api/v1/cart/${threadUuid}`;

  try {
    const res = await api.get(apiUrl);
    console.log("CartDetail", res.data);

    dispatch(setGetCartDetail(res.data));
  } catch (error) {
    console.error("ListCart Error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const DeleteCart = (threaduuid, Itemsuuid) => async (dispatch) => {
  const apiUrl = `api/v1/cart/${threaduuid}/items/${Itemsuuid}`;
  console.log("apiUrl", apiUrl);
  dispatch(setLoading(true));

  try {
    const res = await api.delete(apiUrl);
    console.log("itemdelete_res", res);

    dispatch(setGetCartDetail(res.data));

    dispatch(setSelectedFlightKey(null));
    dispatch(setflightDetail(null));
    dispatch(setViewPassengers([])); // Clear passengers array
    dispatch(setOrderUuid(null)); // Clear order UUID
    dispatch(setMessage({ ai: { passengerFlowRes: false } }));

    dispatch(
      setMessage({
        ai: { passengerFlowRes: { status: false, isloading: false } },
      })
    );
    dispatch(setSingleFlightData(null));
    dispatch(setOfferkeyforDetail(null));
  } catch (error) {
    console.error("ListCart Error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const {
  selectFlightReducer,
  setflightDetail,
  setselectedFlighDetail,
  setLoading,
  setError,
  setSelectFlightKey,
  setCloseDrawer,
  setOpenDrawer,
  setBookingSetupUrl,
  setSelectedFlightKey,
  setSingleFlightData,
  setOfferkeyforDetail,
  setAddCart,
  setGetListCart,
  setGetCartDetail,
  setBookingDrawer,
  setIsLoadingSelect
} = bookingflightsSlice.actions; //action exporting here
export default bookingflightsSlice.reducer;
