import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, BOOKING, BOOKING_DETAIL } from "../api/apiEndpoints";
import api from "../api";


const initialState = {
   flightDetail : null,
   loading: null,
   error: null,
   isDrawer: false,
   selectedFlightId: null,
}
// for selectflightDetail button
const bookingflightsSlice = createSlice ({
   name : "Booking",
   initialState,

   reducers: {
      selectFlightReducer: (state, action)=> {

      },
      setflightDetail: (state, action)=> {
         console.log("action11", action);
         state.flightDetail = action.payload; //payload comming in action console
         state.selectedFlightId = action.payload.id;
         
      },
      closeDrawer: (state) => {
         state.isDrawer = false;
         state.selectedFlightId = null;
      }
      
   }
});

export const fetchflightDetail = (flightId) => (dispatch) => {
   
   const apiUrl = `${API_ENDPOINTS.BOOKING.BOOKING_DETAIL}${flightId}`;
   
   api.get(apiUrl).then((res)=> {
      dispatch(setflightDetail(res.data))
   });
}

export const {selectFlightReducer, setflightDetail, closeDrawer} = bookingflightsSlice.actions; //action exporting here
export default bookingflightsSlice.reducer;