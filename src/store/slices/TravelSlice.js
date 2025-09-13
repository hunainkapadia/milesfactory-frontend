import { createSlice } from "@reduxjs/toolkit";
import api from "@/src/store/api";
import dayjs from "dayjs";
import { sendMessage } from "./sendMessageSlice";

const initialState = {
  originOptions: [],
  destinationOptions: [],
  loadingOrigin: false,
  loadingDestination: false,
  travelMessage: "",
};

const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    setOriginOptions: (state, action) => {
      state.originOptions = action.payload;
    },
    setDestinationOptions: (state, action) => {
      state.destinationOptions = action.payload;
    },
    setLoadingOrigin: (state, action) => {
      state.loadingOrigin = action.payload;
    },
    setLoadingDestination: (state, action) => {
      state.loadingDestination = action.payload;
    },
    setTravelMessage: (state, action) => {
      state.travelMessage = action.payload;
    },
  },
});

// ===== THUNKS =====

// Fetch Origin airports
export const fetchAirports = (term) => async (dispatch) => {
  if (!term) return;
  dispatch(setLoadingOrigin(true));
  try {
    const res = await api.get(`/api/v1/airports?term=${term}`);
    dispatch(setOriginOptions(res.data || []));
  } catch (error) {
    console.error("Origin airport fetch error:", error);
  } finally {
    dispatch(setLoadingOrigin(false));
  }
};

// Fetch Destination airports
export const fetchDestinationAirports = (term) => async (dispatch) => {
  if (!term) return;
  dispatch(setLoadingDestination(true));
  try {
    const res = await api.get(`/api/v1/airports?term=${term}`);
    dispatch(setDestinationOptions(res.data || []));
  } catch (error) {
    console.error("Destination airport fetch error:", error);
  } finally {
    dispatch(setLoadingDestination(false));
  }
};

// Submit Travel Form

export const submitTravelForm = (formData) => (dispatch) => {
  console.log("formData_00", formData);

  const {
    tripType,
    origin,
    destination,
    departureDate,
    returnDate,
    travellers,
    tripClass,
  } = formData;
  let message = "";
  if (tripType === "roundtrip") {
    message = `Need a return flight from ${origin} to ${destination} from ${dayjs(
      departureDate
    ).format("DD MMM")} to ${dayjs(returnDate).format("DD MMM")} for ${
      travellers.adults
    } adult${travellers.adults > 1 ? "s" : ""}${
      travellers.children > 0 ? `, ${travellers.children} children` : ""
    } in ${tripClass || "Economy"}`;
  } else {
    message = `Need a one way flight from ${origin} to ${destination} on ${dayjs(
      departureDate
    ).format("DD MMM")} for ${travellers.adults} adult${
      travellers.adults > 1 ? "s" : ""
    }${travellers.children > 0 ? `, ${travellers.children} children` : ""} in ${
      tripClass || "Economy"
    }`;
  }
  //  message send to sendmessge user redux
  dispatch(sendMessage(message))
};

export const submitHotelForm = (formData) => (dispatch) => {
  console.log("hotelFormData:", formData);

  const { location, checkIn, checkOut, travellers, roomType, priceRange } =
    formData;

  // ✅ Generate hotel message (like flight message)
  const message = `Need a Hotel in ${location} from ${dayjs(checkIn).format(
    "DD MMM"
  )} to ${dayjs(checkOut).format("DD MMM")} for ${travellers.adults} adult${
    travellers.adults > 1 ? "s" : ""
  }${
    travellers.children > 0
      ? `, ${travellers.children} child${travellers.children > 1 ? "ren" : ""}`
      : ""
  }${
    travellers.infants > 0
      ? `, ${travellers.infants} infant${travellers.infants > 1 ? "s" : ""}`
      : ""
  } · ${roomType || "Standard"} room · Budget: ${
    priceRange ? priceRange : "Any"
  }`;


  // Save message to redux
  console.log('hotel_message', message);
  
  
  // Send to chat system
  dispatch(sendMessage(message))

  // Simulate results for now
  
};




export const {
  setOriginOptions,
  setDestinationOptions,
  setLoadingOrigin,
  setLoadingDestination,
  setTravelMessage,
} = travelSlice.actions;

export default travelSlice.reducer;
