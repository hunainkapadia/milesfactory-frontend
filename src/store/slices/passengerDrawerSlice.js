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
  },
  reducers: {
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
      console.log("actionviewpass", action);
      state.ViewPassengers = action.payload;
    },
    // set select passenger uuiid getting from PassengerInfo for each pasenger select card
    setPassengerUUID: (state, action) => {
      console.log("action 111", action);
      
      state.PassengerUUID = action.payload;
    },
    setPassengerData: (state, action) => {
      console.log("setPassengerData", action?.payload);
      state.PassengerData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isLoading = action.payload;
    },
    setPassengerSubmitURL:(state, action)=> {
      state.PassengerSubmitURL = action.payload;
    },
    setPassFormData: (state, action)=> {
      state.PassFormData = action.payload
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
    .catch((error) => {
      console.error("Error fetching nationalities:", error);
    });
};


export const PassengerForm = (params) => (dispatch, getState) => {
  const stateOfferId = getState(); // Get the Redux state
  const offerId = stateOfferId?.passengerDrawer?.setOfferId; // Get offerId from Redux
  if (!offerId) {
    console.error("Error: offerId is null or undefined", stateOfferId);
    return; // Stop execution if offerId is missing
  }
  const extractedOfferId = offerId.split("/").pop();

  console.log("offerId11", extractedOfferId);
  
  
  const stateFlightId = getState(); // Get the Redux state
  const flightId = stateFlightId?.booking?.flightDetail?.id; // Get offerId from Redux
  console.log("flightId", flightId);
  // {{BASE_URL}}/api/v1/setup/flight/b4be0bba-9f35-489e-bb0a-3f879e6ef17b/order/offer/off_0000AruCPTqbACYIE3AQvk
  const bookingSetupUrl = `https://demo.milesfactory.com/api/v1/setup/flight/${extractedOfferId}/order/offer/${flightId}`;
  console.log("bookingSetupUrl", bookingSetupUrl);
  
  

  // const stateOrderUUID = getState();
  // const OrderUUID = stateOrderUUID?.booking?.OrderUuid; // Get OrderUuid from bookingflightsSlice
  // console.log("OrderUUID111", OrderUUID);
  
  api.post(bookingSetupUrl).then((response) => {
    
    // /api/v1/order/710c6bed-08d2-43b1-b072-d0eb5d68fcf3/passengers
    // view pasenger api make like this url
    const OrderUUId = response?.data?.order_uuid || null; // Ensure it's null-safe
    
    if (OrderUUId) {
      const ViewPassengerUrl = `https://demo.milesfactory.com/api/v1/order/${OrderUUId}/passengers`;
      console.log("OrderUUId", ViewPassengerUrl);

      api.get(ViewPassengerUrl).then((response) => {
        console.log("passres response", response?.data);
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
            dispatch(setPassengerSubmitURL(AddPassengerUrl))
            console.log("AddPassengerUrl", AddPassengerUrl);

          }
      });
    } else {
      ("");
    }    
    })
    .catch((error) => {
    //   console.error("Booking failed:", error.response?.data || error.message);
    //   dispatch(setError(error.response?.data || "Booking failed"));
    })
    .finally(() => {
    //   // dispatch(setLoading(false));
    });
};
export const PassengerFormSubmit = (params) => (dispatch, getState) => {
  const statesPassengerSubmitUrl =getState();
  const PassengerSubmitUrl = statesPassengerSubmitUrl?.passengerDrawer?.PassengerSubmitURL;
  console.log("PassengerSubmitUrl", params);
  api.post(PassengerSubmitUrl, params).then((response)=> {
    console.log("pass_response", response.data);
    const passdata = response.data;
    dispatch(setPassFormData(passdata))
    
  })
  
}

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
} = passengerDrawerSlice.actions;

export default passengerDrawerSlice.reducer;
