import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, BOOKING, BOOKING_DETAIL } from "../api/apiEndpoints";
import api from "../api";

const initialState = {
  flightDetail: null,
  setLoading: null,
  setError: null,
  selectedFlightId: null,
  selectedFlighDetail: null,
  
  setSelectFlightKey: null,
  OpenDrawer: false,
  CloseDrawer: false,
  BookingSetupUrl: null,
  selectedFlightKey: null, //Store selected flight key
  BaggageDrawer: false,
  baggageOptions: {}, // ← add this line

};
// for selectflightDetail button
const bookingflightsSlice = createSlice({
  name: "Booking",
  initialState,

  reducers: {
    setBaggageOptions: (state, action) => {
      console.log("action_22", action);
      
      state.baggageOptions = action.payload;
    },
    setBaggageDrawer:(state, action)=> {
      state.BaggageDrawer = action.payload;
      
    },
    setSelectedFlightKey: (state, action) => { // New reducer for selected flight key      
      state.selectedFlightKey = action.payload;
    },
    setSelectFlightKey: (state, action) => {
      state.setSelectFlightKey = action.payload;
    },
    setflightDetail: (state, action) => {
      state.flightDetail = action.payload; //payload comming in action 
      state.selectedFlightId = action.payload.id;
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
    setBookingSetupUrl: (state,action)=> {
      state.BookingSetupUrl= action.payload;
    }
    
  },
});

export const fetchflightDetail = (flightId) => (dispatch) => {
  const apiUrl = `${API_ENDPOINTS.BOOKING.BOOKING_DETAIL}${flightId}`;
  dispatch(setLoading(true));
  api.get(apiUrl).then((res) => {
    dispatch(setflightDetail(res.data));
    dispatch(setLoading(false));
  });
};

export const BaggageDrawer = ()=> {

}

// booking flo

export const bookFlight = (flightId) => (dispatch, getState) => {
  
  // {{BASE_URL}}/api/v1/passenger/order/f04e7c0d-3546-40f4-8140-cfbf13d98f99/baggage-options
  // const getPassenger =  `${/api/v1/passenger/order/f04e7c0d-3546-40f4-8140-cfbf13d98f99/baggage-options}`
  const state = getState();

  const OrderUuid = state?.passengerDrawer?.OrderUuid;
  console.log("getState:", OrderUuid);
  
  
  const url = `/api/v1/passenger/order/${OrderUuid}/baggage-options`;
  api.get(url).then((res)=> {
    console.log("res_111", res, url);
    dispatch(setBaggageOptions(res?.data)); // dispatch to store the baggage options
    
  })
  // Extract only the UUID from the URL
  
  
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
  setBaggageDrawer, // for baggae drawer
  setBaggageOptions,
} = bookingflightsSlice.actions; //action exporting here
export default bookingflightsSlice.reducer;
