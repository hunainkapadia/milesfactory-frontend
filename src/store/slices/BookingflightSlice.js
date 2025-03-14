import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, BOOKING, BOOKING_DETAIL } from "../api/apiEndpoints";
import api from "../api";

const initialState = {
  flightDetail: null,
  setLoading: null,
  setError: null,
  selectedFlightId: null,
  selectedFlighDetail: null,
  setOfferId: null,
  PassengerData: null,
  setSelectFlightKey: null,
  OpenDrawer: false,
  CloseDrawer: false,
  OrderUuid: null,
  ViewPassengers: null,
  PassengerUUID: null,
};
// for selectflightDetail button
const bookingflightsSlice = createSlice({
  name: "Booking",
  initialState,

  reducers: {
    setOfferId: (state, action) => {
      state.setOfferId = action.payload;
    },

    setSelectFlightKey: (state, action) => {
      state.setSelectFlightKey = action.payload;
    },
    setflightDetail: (state, action) => {
      console.log("actionflightdetail", action);
      state.flightDetail = action.payload; //payload comming in action console
      state.selectedFlightId = action.payload.id;
    },
    setPassengerData: (state, action) => {
      state.PassengerData = action.payload;
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
      console.log("closestate", state, action);
      state.setSelectFlightKey = action.payload;
    },
    //  getting order uui for passender
    setOrderUuid: (state, action) => {
      state.OrderUuid = action.payload;
    },
    // view all passengers data
    setViewPassengers: (state, action) => {
      console.log("actionviewpass", action);
      state.ViewPassengers = action.payload;
    },
    //  seet select passenger uui
    setPassengerUUID: (state, action) => {
      console.log("action 111", action);
      
      state.PassengerUUID = action.payload;
    },
  },
});

export const fetchflightDetail = (flightId) => (dispatch) => {
  const apiUrl = `${API_ENDPOINTS.BOOKING.BOOKING_DETAIL}${flightId}`;

  api.get(apiUrl).then((res) => {
    console.log("res1212", res);
    dispatch(setflightDetail(res.data));
  });
};

// booking flo

export const bookFlight = (flightId) => (dispatch, getState) => {
   
  const state = getState(); // Get the Redux state
  const offerId = state?.booking?.setOfferId; // Get offerId from Redux
  const flightId = state?.booking?.flightDetail?.id; // Get offerId from Redux
  // {{BASE_URL}}/api/v1/setup/flight/b4be0bba-9f35-489e-bb0a-3f879e6ef17b/order/offer/off_0000AruCPTqbACYIE3AQvk

  if (!offerId) {
    return;
  }
  // Extract only the UUID from the URL
  const extractedOfferId = offerId.split("/").pop();
  const url = `${API_ENDPOINTS.BOOKING.BOOKING_SETUP}/${extractedOfferId}/order/offer/${flightId}`;
  dispatch(setLoading(true));

  api
    .post(url)
    .then((response) => {
      dispatch(setOrderUuid(response?.data?.order_uuid)); //orderuui set in reduxs tore
      //   created pass big url
      const OrderUUI = response?.data?.order_uuid;
      const PassengerUrl = `${API_ENDPOINTS.BOOKING.PASSENGER_DETAIL}${response?.data?.order_uuid}/passengers`;
      //  {{BASE_URL}}/api/v1/order/5a0377e4-0f73-4c0b-a1ab-ed44ce6a1fc9/passengers
      console.log("Orderuuid", response?.data?.order_uuid);

      api.get(PassengerUrl).then((passres) => {
        // passenger data in array get and set in redux
        dispatch(setPassengerData(passres));

        // view passenger api flow start
        const viewPassengersURL = `${API_ENDPOINTS.BOOKING.VIEWPASSENGERS}${OrderUUI}/passengers`;
        api.get(viewPassengersURL).then((viewPasRes) => {
           // passengers get and store in redux
           dispatch(setViewPassengers(viewPasRes?.data));
           const state = getState(); // Get the Redux state
  
           const getPasssUUi = state?.booking;
           console.log("getPasssUUi", getPasssUUi);
        });
      });
    })
    .catch((error) => {
      console.error("Booking failed:", error.response?.data || error.message);
      dispatch(setError(error.response?.data || "Booking failed"));
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const {
  selectFlightReducer,
  setflightDetail,
  setselectedFlighDetail,
  setOfferId,
  setLoading,
  setError,
  setPassengerData,
  setSelectFlightKey,
  setCloseDrawer,
  setOpenDrawer,
  setOrderUuid,
  setViewPassengers,
  setPassengerUUID,
} = bookingflightsSlice.actions; //action exporting here
export default bookingflightsSlice.reducer;
