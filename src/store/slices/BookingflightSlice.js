import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, BOOKING, BOOKING_DETAIL } from "../api/apiEndpoints";
import api from "../api";

const initialState = {
  flightDetail: null,
  isLoading: false,
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
  singleFlightData:  null,

};
// for selectflightDetail button
const bookingflightsSlice = createSlice({
  name: "Booking",
  initialState,

  reducers: {
    setOfferkeyforDetail:(state, action)=> {
      state.offerkeyforDetail = action.payload
    },
    setSingleFlightData: (state, action)=> {
      state.singleFlightData = action.payload
    },
    setSelectedFlightKey: (state, action) => { // New reducer for selected flight key      
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
    setBookingSetupUrl: (state,action)=> {
      state.BookingSetupUrl= action.payload;
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

export const bookFlight = (flightId) => (dispatch, getState) => {
  // {{BASE_URL}}/api/v1/passenger/order/f04e7c0d-3546-40f4-8140-cfbf13d98f99/baggage-options
  // const getPassenger =  `${/api/v1/passenger/order/f04e7c0d-3546-40f4-8140-cfbf13d98f99/baggage-options}`
  // {{BASE_URL}}/api/v1/search/single/result/off_0000AtoC3XiG43x9eXiVTE
  const FlightId = getState().booking.selectedFlightId;
  dispatch(setLoading(true))
  
  api
    .get(`/api/v1/search/single/result/${FlightId}`)
    .then((res) => {
      dispatch(setSingleFlightData(res.data))
    })
    .catch((error) => {
      console.log(error);
    }).finally (()=> {
      dispatch(setLoading(false))
    });
  
  
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
  setSingleFlightData,
  setOfferkeyforDetail,
} = bookingflightsSlice.actions; //action exporting here
export default bookingflightsSlice.reducer;
