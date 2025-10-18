import { createSlice } from "@reduxjs/toolkit";
import api from "@/src/store/api";
import dayjs from "dayjs";
import { sendMessage } from "./sendMessageSlice";

const initialState = {
  originOptions: null,
  originList: [],
  destinationOptions: null,
  loadingOrigin: false,
  loadingDestination: false,
  travelMessage: "",
  travelFormDrawer: false,
  origin: "",

  // destination
  destination: "",
  destinationOptions: null,
  destinationList: [],
  loadingDestination: false,
  // DOB New date states
  tripType: "oneway",
  departureDate: null,
  returnDate: null,
  travellers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  tripClass: "Economy"
};

const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    // DOB staer
    setTripClass: (state, action) => {
      state.tripClass = action.payload;
    },
    setTravellers: (state, action) => {
      state.travellers = action.payload;
    },
    setTripType: (state, action) => {
      state.tripType = action.payload;
    },
    setDepartureDate: (state, action) => {
      state.departureDate = action.payload;
    },
    setReturnDate: (state, action) => {
      state.returnDate = action.payload;
    },
    // DOB end
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setDestinationOptions: (state, action) => {
      state.destinationOptions = action.payload;
    },
    setDestinationList: (state, action) => {
      state.destinationList = action.payload;
    },
    setLoadingDestination: (state, action) => {
      state.loadingDestination = action.payload;
    },
    // end destination
    setOriginList: (state, action) => {
      state.originList = action.payload;
    },
    setDestList: (state, action) => {
      state.destList = action.payload;
    },
    setTravelFormDrawer: (state, action) => {
      state.travelFormDrawer = action.payload;
    },
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
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
export const fetchAirports = (term, field) => async (dispatch) => {
  if (!term) return;

  if (field === "origin") dispatch(setLoadingOrigin(true));
  if (field === "destination") dispatch(setLoadingDestination(true));

  try {
    const res = await api.get(`/api/v1/airports?term=${term}`);
    if (field === "origin") {
      dispatch(setOriginList(res.data || []));
    } else if (field === "destination") {
      dispatch(setDestinationList(res.data || []));
    }
  } catch (error) {
    console.error("Airport fetch error:", error);
  } finally {
    if (field === "origin") dispatch(setLoadingOrigin(false));
    if (field === "destination") dispatch(setLoadingDestination(false));
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
  dispatch(sendMessage(message));
};

export const submitHotelForm = (formData) => (dispatch) => {
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

  // Send to chat system
  dispatch(sendMessage(message));

  // Simulate results for now
};

export const {
  setOriginOptions,
  setLoadingOrigin,
  setTravelMessage,
  setTravelFormDrawer,
  setOrigin,
  setOriginList,
  setDestList,
  setDestinationList,
  setDestinationOptions,
  setDestination,
  setLoadingDestination,
  setTripType,
  setDepartureDate,
  setReturnDate,
  setTravellers,
  setTripClass
} = travelSlice.actions;

export default travelSlice.reducer;
