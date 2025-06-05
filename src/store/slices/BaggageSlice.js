import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, BOOKING, BOOKING_DETAIL } from "../api/apiEndpoints";
import api from "../api";
import { OrderConfirm } from "./PaymentSlice";

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
  selectedBaggage: [], // add in initialState
  baggageError: null,
  addSelectedBaggage: null,
  baggageAddData: null,
  SegmentId: null,
};
// for selectflightDetail button
const baggageSlice = createSlice({
  name: "Baggage",
  initialState,

  reducers: {
    setSegmentId: (state, action)=> {
      state.SegmentId = action.payload
    },
    setbaggageAddData: (state, action)=> {
      state.baggageAddData = action.payload
    },
    setBaggageError: (state, action)=> {
      state.baggageError = action.payload;
    },
    setAddSelectedBaggage: (state, action) => {
      console.log("uuid_action", action.payload);
      state.addSelectedBaggage = action.payload
      
    },
    setBaggageOptions: (state, action) => {
      console.log("action_22", action);
      
      state.baggageOptions = action.payload;

      // If you want to extract a specific uuid (like the first one):
      const firstOption = action.payload?.[0];
      if (firstOption?.uuid) {
        state.baggageUuid = firstOption.uuid; // ← Save the uuid in state
      }
    },
    setBaggageDrawer:(state, action)=> {
      state.BaggageDrawer = action.payload;
      
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isLoading = action.payload;
    },
   //  setOpenDrawer: (state, action) => {
   //    state.setSelectFlightKey = action.payload;
   //  },
    //  select booking end
    //  start booking get flight and pass detaiul
    setCloseDrawer: (state, action) => {
      state.setSelectFlightKey = action.payload;
    },

    
  },
});


export const BaggageDrawer = ()=> {

}

// booking flo

export const baggage = (flightId) => (dispatch, getState) => {
  // {{BASE_URL}}/api/v1/passenger/order/f04e7c0d-3546-40f4-8140-cfbf13d98f99/baggage-options
  // const getPassenger =  `${/api/v1/passenger/order/f04e7c0d-3546-40f4-8140-cfbf13d98f99/baggage-options}`
  const state = getState();

  const OrderUuid = state?.passengerDrawer?.OrderUuid;
  console.log("getState:", OrderUuid);

  const url = `/api/v1/passenger/order/${OrderUuid}/baggage-options`;
  api.get(url).then((res) => {
    dispatch(setBaggageOptions(res?.data)); // dispatch to store the baggage options

    // {{BASE_URL}}/api/v1/passenger/baggage/7c26a8e9-68a7-4070-89fe-bf8537ea9238/add
  });

  // Extract only the UUID from the URL
};
// for add baggage
export const addBaggage = () => (dispatch, getState) => {
  const state = getState();
  const selectedBaggagesUUID = state?.bagage?.addSelectedBaggage;

  const addUrl = `/api/v1/passenger/baggage/${selectedBaggagesUUID}/add`;
  console.log("state_uuid", addUrl);
  api
    .post(addUrl)
    .then((res) => {
      console.log("state_resss", res.data);
      dispatch(setbaggageAddData(res.data));
      dispatch(baggage());
      console.log("Baggage added:", res);
      dispatch(OrderConfirm()); // for order detail API call
    })
    .catch((error) => {
      console.log("add errr ", error.response.data);
      dispatch(setbaggageAddData(error.response.data));
    });
};
// for add baggage
export const removeBaggage = () => (dispatch, getState) => {
  const state = getState();
  const selectedBaggagesUUID = state?.bagage?.addSelectedBaggage;

  const removeUrl = `/api/v1/passenger/baggage/${selectedBaggagesUUID}/remove`;
  console.log("state_uuid", removeUrl);

  api
    .post(removeUrl)
    .then((res) => {
      console.log("state_resss", res.data);
      dispatch(setbaggageAddData(res.data)); // Update store with new baggage state
      console.log("Baggage removed:", res);
      dispatch(baggage());
      dispatch(OrderConfirm()); // for order detail API call
    })
    .catch((error) => {
      console.log("remove err ", error.response?.data || error.message);
      dispatch(setbaggageAddData(error.response?.data || { detail: "Error removing baggage" }));
    });
};


export const {
  setLoading,
  setError,
  setSelectFlightKey,
  setCloseDrawer,
  setOpenDrawer,
  setBaggageDrawer, // for baggae drawer
  setBaggageOptions,
  setAddSelectedBaggage,
  setBaggageError,
  setbaggageAddData,
  setSegmentId,
} = baggageSlice.actions; //action exporting here
export default baggageSlice.reducer;
