import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import api from "../api";

const passengerDrawerSlice = createSlice({
  name: "passengerDrawer",
  initialState: {
    isOpen: false,
    countries: [],
    setOfferId: null,
    OrderUuid: null,
    ViewPassengers: null,
    PassengerUUID: null,
    PassengerData: null,
    PassengerSubmitURL: null,
    PassFormData: null,
    isLoading: false,
    filledPassengerUUIDs: [],
  },
  reducers: {
    markPassengerAsFilled: (state, action) => {
      if (!state.filledPassengerUUIDs.includes(action.payload)) {
        state.filledPassengerUUIDs.push(action.payload);
      }
    },
    openPassengerDrawer: (state) => {
      state.isOpen = true;
    },
    closePassengerDrawer: (state) => {
      state.isOpen = false;
    },
    bookFlight: (state, action) => {
      state.passengerDetails = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setOfferId: (state, action) => {
      state.setOfferId = action.payload;
    },
    //  getting order uui for passender
    setOrderUuid: (state, action) => {
      state.OrderUuid = action.payload;
    },
    // view all passengers data
    setViewPassengers: (state, action) => {
      state.ViewPassengers = action.payload;
    },
    // set select passenger uuiid getting from PassengerInfo for each pasenger select card
    setPassengerUUID: (state, action) => {
      state.PassengerUUID = action.payload;
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
    setPassengerSubmitURL: (state, action) => {
      state.PassengerSubmitURL = action.payload;
    },
    setPassFormData: (state, action) => {
      state.PassFormData = action.payload;
    },
    setisLoading: (state)=> {
      state.isLoading = true;
    }
  },
});

// **Fetch nationality data using Axios without async/await**
export const NationalitData = () => (dispatch) => {
  api
    .get(API_ENDPOINTS.BOOKING.COUNTRIES)
    .then((response) => {
      dispatch(setCountries(response.data));
    })
    .catch((error) => {});
};

export const PassengerForm = (params) => (dispatch, getState) => {
  
  const stateOfferId = getState(); // Get the Redux state
  const offerId = stateOfferId?.passengerDrawer?.setOfferId; // Get offerId from Redux
  if (!offerId) {
    return; // Stop execution if offerId is missing
  }
  const extractedOfferId = offerId.split("/").pop();
  const stateFlightId = getState(); // Get the Redux state
  const flightId = stateFlightId?.booking?.flightDetail?.id; // Get offerId from Redux
  
  
  console.log("pfactive222");
  // {{BASE_URL}}/api/v1/setup/flight/b4be0bba-9f35-489e-bb0a-3f879e6ef17b/order/offer/off_0000AruCPTqbACYIE3AQvk
  const bookingSetupUrl = `/api/v1/setup/flight/${extractedOfferId}/order/offer/${flightId}`;
  api
    .post(bookingSetupUrl)
    .then((response) => {
      const OrderUUId = response?.data?.order_uuid || null; // Ensure it's null-safe

      if (OrderUUId) {
        const ViewPassengerUrl = `/api/v1/order/${OrderUUId}/passengers`;
        api.get(ViewPassengerUrl).then((response) => {
          dispatch(setViewPassengers(response?.data)); // passenger data in array get and set in redux
          // form submit url make
          // /api/v1/order/2aec74f4-4b0e-4f93-a6bc-5d3bcbd9ff3b/passenger/68af9ac5-c1c1-4943-83c5-74eac96e15bf
          // dispatch(bookFlight(uuid)); // Pass flight ID to bookFlight
          // get passenger uui from redux which we set handlePassengerToggle passenger card
          const statePassengerUUID = getState();
          const passengerUUID =
            statePassengerUUID?.passengerDrawer?.PassengerUUID;
          if (passengerUUID) {
            const AddPassengerUrl = `/api/v1/order/${OrderUUId}/passenger/${passengerUUID}`;
            dispatch(setPassengerSubmitURL(AddPassengerUrl));
          }
        }).catch((error) => {
          console.log("error111", error);
          
          
        })
        .finally(() => {
          
        });
      } else {
        ("");
      }
    })
    .catch((error) => {
      //
      //   dispatch(setError(error.response?.data || "Booking failed"));
    })
    .finally(() => {
      //   // dispatch(setLoading(false));
    });
};
export const PassengerFormSubmit = (params) => (dispatch, getState) => {
  const statesPassengerSubmitUrl = getState();
  const PassengerSubmitUrl =
    statesPassengerSubmitUrl?.passengerDrawer?.PassengerSubmitURL;

    api.post(PassengerSubmitUrl, params).then((response) => {
      const passdata = response.data;
      dispatch(setPassFormData(passdata));
    
      const passengerUUID = statesPassengerSubmitUrl?.passengerDrawer?.PassengerUUID;
      dispatch(markPassengerAsFilled(passengerUUID));
    
      // Automatically move to the next passenger
      const allPassengers = statesPassengerSubmitUrl?.passengerDrawer?.ViewPassengers || [];
      const filledUUIDs = statesPassengerSubmitUrl?.passengerDrawer?.filledPassengerUUIDs || [];
      const nextPassenger = allPassengers.find(p => !filledUUIDs.includes(p.uuid));
    
      if (nextPassenger) {
        dispatch(setPassengerUUID(nextPassenger.uuid));
        dispatch(PassengerForm()); // Call API again for the next passenger
      }
    
      closePassengerDrawer();
    });
};

// Store user info in cookies

// Export actions
export const {
  setLoading,
  setError,
  openPassengerDrawer,
  closePassengerDrawer,
  bookFlight,
  setCountries,
  setOfferId,
  setOrderUuid,
  setViewPassengers,
  setPassengerUUID,
  setPassengerData,
  setPassengerSubmitURL,
  setPassFormData,
  setisLoading,
  markPassengerAsFilled,
} = passengerDrawerSlice.actions;

export default passengerDrawerSlice.reducer;
