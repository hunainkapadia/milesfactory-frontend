import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, BOOKING, BOOKING_DETAIL } from "../api/apiEndpoints";
import api from "../api";
import { setOrderUuid, setViewPassengers } from "./passengerDrawerSlice";
import { setMessage } from "./sendMessageSlice";
import { setIsBuilderDialog } from "./Base/baseSlice";

const initialState = {
  isLoading: false,
  singlehotel: null,
  selectedhotelKey: null,
  allHotels: null,
  roomDrawer: false,
  selectedhotelCode: null,
  selectedRateKey: null,
  selectedRoom: null,
  hotelSingleResult: null,

};
// for selectflightDetail button
const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setHotelSingleResult:(state, action) => {
      state.hotelSingleResult = action.payload;
    },
    setRoomDrawer:(state, action) => {
      state.roomDrawer = action.payload;
    },
    setAllHotels:(state, action) => {
      state.allHotels = action.payload;
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    setSelectedRateKey: (state, action) => {
      state.selectedRateKey = action.payload;
    },
    setSelectedhotelCode:(state, action) => {
      state.selectedhotelCode = action.payload;
    },
   setSelectedhotelKey:(state, action) => {
      state.selectedhotelKey = action.payload;
    },
    setSinglehotel:(state, action) => {
      state.singlehotel = action.payload;
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
  },
});

export const hotelSingle = (ratekey) => async (dispatch, getState)=> {
  // const rateKey = getState().hotel?.selectedRateKey;

  console.log("rateKey_test", ratekey);

  try {
    const res = await api.get(`api/v1/hotel/single/${ratekey}`)

    console.log("single_res", res);
    dispatch(setHotelSingleResult(res.data))
    
  } catch (error) {
    
  }
  
  

}


export const {
  setSinglehotel,
  setSelectedhotelKey,
  setAllHotels,
  setRoomDrawer,
  setSelectedhotelCode,
  setSelectedRateKey,
  setSelectedRoom,
  setHotelSingleResult
} = hotelSlice.actions; //action exporting here
export default hotelSlice.reducer;
