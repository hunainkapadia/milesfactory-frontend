import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, BOOKING, BOOKING_DETAIL } from "../api/apiEndpoints";
import api from "../api";


const initialState = {
   flightDetail : null,
   setLoading: null,
   setError: null,
   selectedFlightId: null,
   setselectedFlighDetail: null,
   setOfferId : null,
   setPassengerData: null,
   setSelectFlightKey: null,
}
// for selectflightDetail button
const bookingflightsSlice = createSlice ({
   name : "Booking",
   initialState,

   reducers: {
      setOfferId: (state, action)=> {
         
         state.setOfferId = action.payload

      },
      setselectedFlighDetail: (state, action)=> {
         state.SelectFlightKey = action.payload
      },
      setSelectFlightKey: (state, action)=> {
         state.setSelectFlightKey = action.payload;
      },
      setflightDetail: (state, action)=> {
         console.log("actionflightdetail", action); 
         state.flightDetail = action.payload; //payload comming in action console
         state.selectedFlightId = action.payload.id;         
      },
      setPassengerData: (state, action)=> {
         state.action = action.payload;
      },
       setLoading: (state, action) => {
         state.isLoading = action.payload;
       },
       setError: (state, action) => {
         state.isLoading = action.payload;
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
// booking flo
export const bookFlight = (flightId) => (dispatch, getState) => {
   
   
   const state = getState(); // Get the Redux state
   const offerId = state?.booking?.setOfferId; // Get offerId from Redux
   const flightId = state?.booking?.setselectedFlighDetail?.id;
   console.error("flightId111", flightId);
   // {{BASE_URL}}/api/v1/setup/flight/b4be0bba-9f35-489e-bb0a-3f879e6ef17b/order/offer/off_0000AruCPTqbACYIE3AQvk
   if (!offerId) {
      return;
  }
  // Extract only the UUID from the URL
  const extractedOfferId = offerId.split("/").pop(); 
  const url = `${API_ENDPOINTS.BOOKING.BOOKING_SETUP}/${extractedOfferId}/order/offer/${flightId}`
  console.log("offerId333", url)
  dispatch(setLoading(true));
   // api
   //   .post(url)
   //   .then((response) => {
   //     console.log("Flight booked successfully:", response?.data?.order_uuid);
   //     const PassengerUrl =  `${API_ENDPOINTS.BOOKING.PASSENGER_DETAIL}${response?.data?.order_uuid}/passengers`
   //    //  {{BASE_URL}}/api/v1/order/5a0377e4-0f73-4c0b-a1ab-ed44ce6a1fc9/passengers
   //    api.get(PassengerUrl).then((passres)=> {
   //      console.log("passres", passres);
   //      dispatch(setPassengerData(passres))
   //    })
   //   })
   //   .catch((error) => {
   //     console.error("Booking failed:", error.response?.data || error.message);
   //     dispatch(setError(error.response?.data || "Booking failed"));
   //   })
   //   .finally(() => {
   //     dispatch(setLoading(false));
   //   });
};

export const {selectFlightReducer, 
   setflightDetail, 
   setselectedFlighDetail, 
   setOfferId,
   setLoading,
   setError,
   setPassengerData,
   setSelectFlightKey
} = bookingflightsSlice.actions; //action exporting here
export default bookingflightsSlice.reducer;