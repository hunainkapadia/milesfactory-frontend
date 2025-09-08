import { createSlice } from "@reduxjs/toolkit";
import api from "@/src/store/api";
import dayjs from "dayjs";

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

export const {
  setOriginOptions,
  setDestinationOptions,
  setLoadingOrigin,
  setLoadingDestination,
  setTravelMessage,
} = travelSlice.actions;

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
   
//   const { origin, destination, dateRange, tripType, travellers, tripClass } = formData;

//   if (!origin || !destination) {
//     alert("Please select both origin and destination");
//     return;
//   }

//   const startDate = dateRange[0].startDate;
//   const endDate = dateRange[0].endDate;

//   let message = "";

//   if (tripType === "roundtrip") {
//     message = `Need a return flight from ${origin} to ${destination} from ${dayjs(
//       startDate
//     ).format("DD MMM")} to ${dayjs(endDate).format("DD MMM")} for ${
//       travellers.adults
//     } adult${travellers.adults > 1 ? "s" : ""}${
//       travellers.children > 0 ? `, ${travellers.children} children` : ""
//     } in ${tripClass || "Economy"}`;
//   } else {
//     message = `Need a one way flight from ${origin} to ${destination} on ${dayjs(
//       startDate
//     ).format("DD MMM")} for ${travellers.adults} adult${
//       travellers.adults > 1 ? "s" : ""
//     }${travellers.children > 0 ? `, ${travellers.children} children` : ""} in ${
//       tripClass || "Economy"
//     }`;
//   }

  // Save in travel state
//   dispatch(setTravelMessage(message));

  // Push into chat messages
//   dispatch(addMessage({ text: message, sender: "user" }));

//   console.log("Travel form submitted:", message);
};

export default travelSlice.reducer;
