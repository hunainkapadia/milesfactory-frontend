import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, BOOKING, BOOKING_DETAIL } from "../api/apiEndpoints";
import api from "../api";


const initialState = {
   flightDetail : null,
   loading: null,
   error: null,
   isDrawer: false,
   selectedFlightId: null,
   setselectedFlighDetail: null,
}
// for selectflightDetail button
const bookingflightsSlice = createSlice ({
   name : "Booking",
   initialState,

   reducers: {
      setselectedFlighDetail: (state, action)=> {
         state.setselectedFlighDetail = action.payload
      },
      setflightDetail: (state, action)=> {
         state.flightDetail = action.payload; //payload comming in action console
         state.selectedFlightId = action.payload.id;
         state.isDrawer = true; //  Open the drawer
         
      },
      closeDrawer: (state) => {
         state.isDrawer = false;
         state.selectedFlightId = null;
      },
      setOpenDrawer: (state, action) => {
         state.isDrawer = action.payload; //  New action to set drawer state
       },
      
   }
});

export const fetchflightDetail = (flightId) => (dispatch) => {
   
   const apiUrl = `${API_ENDPOINTS.BOOKING.BOOKING_DETAIL}${flightId}`;
   
   api.get(apiUrl).then((res)=> {
      console.log("res1212", res);
      
      dispatch(setflightDetail(res.data))
   });
}

export const {selectFlightReducer, setflightDetail, closeDrawer, setOpenDrawer, setselectedFlighDetail} = bookingflightsSlice.actions; //action exporting here
export default bookingflightsSlice.reducer;