import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, BOOKING, BOOKING_DETAIL } from "../api/apiEndpoints";
import api from "../api";
import { setOrderUuid, setViewPassengers } from "./passengerDrawerSlice";
import { setMessage, setSearchHistorySend } from "./sendMessageSlice";
import { setIsBuilderDialog } from "./Base/baseSlice";
import { setRoomDrawer, setSelectedhotelCode, setSelectedhotelKey } from "./HotelSlice";

const initialState = {
  flightDetail: null,
  isLoading: false,
  isLoadingSelect: false,
  setError: null,
  selectedFlightId: null,
  selectedFlight: null,

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
  cartOffer: null,
  hotelDrawer:false,
  cartError: false,
  cartErrorDialog: false,
  flightUnavailable: false,
  cartType: null,
  cartTotalPrice: null,
};
// for selectflightDetail button
const bookingflightsSlice = createSlice({
  name: "Booking",
  initialState,

  reducers: {
    setCartTotalPrice:(state, action) => {
      state.cartTotalPrice = action.payload;
    },
    setFlightUnavailable:(state, action) => {
      state.flightUnavailable = action.payload;
    },
    setSelectedFlight:(state, action) => {
      state.selectedFlight = action.payload;
    },
    setCartErrorDialog:(state, action) => {
      state.cartErrorDialog = action.payload;
    },
    setCartError:(state, action) => {
      state.cartError = action.payload;
    },
    setHotelDrawer:(state, action) => {
      state.hotelDrawer = action.payload;
    },
    setCartOffer:(state, action) => {
      state.cartOffer = action.payload;
    },
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
    setCartType:(state, action) => {
      state.cartType = action.payload;
    },
    resetBookingState: () => ({ ...initialState }),

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
  dispatch(setIsLoadingSelect(true));

  try {
    // delay before API call (500ms = 0.5s)
    const res = await api.post(`/api/v1/cart/add`, params);
    
    
    dispatch(setIsLoadingSelect(false));
    dispatch(setAddCart(res.data));

    // if API returns uuid, immediately fetch cart items
    if (res.data) {
      
      dispatch(setflightDetail(res.data.raw_data));
      dispatch(CartDetail(uuid));
      dispatch(setSelectedFlightKey(params.offer_id)); // mark selected flight
      dispatch(setHotelDrawer(false))
      dispatch(setRoomDrawer(false))
    }
    // detect mobile view
    if (window.innerWidth <= 768) {
      // Option 1: dispatch to open mobile drawer
      // dispatch(setIsBuilderDialog(true));
      // OR Option 2: show an alert
    }
  } catch (error) {
    console.error("AddToCart_error", error?.response?.data?.error);
    console.error("AddToCart_error2", error?.response?.data?.error);
    const geterror = error?.response?.data?.error;
    if (geterror === "Failed to fetch flight offer: airline_error: Requested offer is no longer available: Please select another offer, or create a new offer request to get the latest availability.") {
      dispatch(setCartError(true));
      dispatch(setCartErrorDialog(true))
    }
  } finally {
    dispatch(setIsLoadingSelect(false));
    dispatch(setSelectedFlight(null)); //  Reset after completion

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
  

  
  dispatch(setLoading(true));
  const apiUrl = `/api/v1/cart/${threadUuid}`;

  try {
    const res = await api.get(apiUrl);
    dispatch(setGetCartDetail(res.data));
    
    
    const CartOfferDetail = res?.data;
    dispatch(setCartOffer(CartOfferDetail))
    
    
    const cartItems = CartOfferDetail.items || [];
    const hasFlight = cartItems.some(item => item.offer_type === "flight");
    const hasHotel = cartItems.some(item => item.offer_type === "hotel");
    
    
    
    if (hasFlight && hasHotel) {
      dispatch(setCartType("all"))
    } else if (hasFlight) {
      dispatch(setCartType("flight"))
    } else if (hasHotel) {
      dispatch(setCartType("hotel"))
    } else {
      dispatch(setCartType(null))

    }
    
      
    
  } catch (error) {
    console.error("ListCart Error:", error?.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const DeleteCart = (threaduuid, Itemsuuid) => async (dispatch) => {
  console.log("threaduuid_Itemsuuid", threaduuid, Itemsuuid);
  
  dispatch(setLoading(true));
  const apiUrl = `api/v1/cart/${threaduuid}/items/${Itemsuuid}`;

  try {
    const res = await api.delete(apiUrl);
    // dispatch(setSearchHistorySend(null));
    dispatch(setSelectedhotelCode(null));
    dispatch(setLoading(false));
    dispatch(setSelectedhotelKey(null));
    dispatch(setGetCartDetail(res.data));
    dispatch(setCartOffer(null))

    dispatch(setSelectedFlightKey(null));
    dispatch(setflightDetail(null));
    dispatch(setViewPassengers([])); // Clear passengers array
    dispatch(setOrderUuid(null)); // Clear order UUID
    dispatch(setMessage({ ai: { passengerFlowRes: false } }));
    dispatch(setSelectedFlight(null));
    dispatch(CartDetail(threaduuid));

    dispatch(
      setMessage({
        ai: { passengerFlowRes: { status: false, isloading: false } },
      })
    );
    dispatch(setSingleFlightData(null));
    dispatch(setOfferkeyforDetail(null));
  } catch (error) {
    console.error("ListCart Error:", error.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const {
  selectFlightReducer,
  setflightDetail,
  setSelectedFlight,
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
  setIsLoadingSelect,
  setCartOffer,
  setHotelDrawer,
  setCartError,
  setFlightUnavailable,
  setCartErrorDialog,
  setCartType,
  resetBookingState,
  setCartTotalPrice
} = bookingflightsSlice.actions; //action exporting here
export default bookingflightsSlice.reducer;
