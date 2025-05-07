import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import api from "../api";
import { setCloseDrawer } from "./BookingflightSlice";

const passengerDrawerSlice = createSlice({
  name: "passengerDrawer",
  initialState: {
    isOpen: false,
    countries: [],
    OfferId: null,
    OrderUuid: null,
    ViewPassengers: null,
    PassengerUUID: null,
    PassengerData: null,
    PassengerSubmitURL: null,
    PassFormData: null,
    isLoading: false,
    filledPassengerUUIDs: [],
    ClosePassengerDrawer: false,
    OpenPassengerDrawer: false,
    PassengerFormError: null,
    isFormLoading: false,
    // selectedFlightDetail: null,
  },
  reducers: {
    markPassengerAsFilled: (state, action) => {
      if (!state.filledPassengerUUIDs.includes(action.payload)) {
        state.filledPassengerUUIDs.push(action.payload);
      }
    },
    setOpenPassengerDrawer: (state) => {
      state.OpenPassengerDrawer = true;
    },
    setClosePassengerDrawer: (state) => {
      state.OpenPassengerDrawer = false
    },
    bookFlight: (state, action) => {
      state.passengerDetails = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setOfferId: (state, action) => {
      state.OfferId = action.payload;
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
    },
    setIsFormLoading: (state)=> {
      state.isFormLoading = false
    },
    setPassengerFormError: (state, action) => {
      state.PassengerFormError = action.payload;
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
  
  export const PassengerForm = () => (dispatch, getState) => {
    
    const states = getState(); // Get the Redux state
    const offerIdGet = states?.getMessages.topOfferUrl; // Get offerId from Redux
    const offerIdSend = states?.sendMessage?.TopOfferUrlSend; // Get offerId from Redux
    const finalOfferId = offerIdSend || offerIdGet;
    
    
    if (!finalOfferId) {
      return; // Stop execution if offerId is missing
    }
    const stateFlightId = getState(); // Get the Redux state
    const flightId = stateFlightId?.booking?.flightDetail?.id; // Get offerId from Redux
    
  
  // {{BASE_URL}}/api/v1/setup/flight/b4be0bba-9f35-489e-bb0a-3f879e6ef17b/order/offer/off_0000AruCPTqbACYIE3AQvk
  const bookingSetupUrl = `/api/v1/setup/flight/${finalOfferId}/order/offer/${flightId}`;
  api
    .post(bookingSetupUrl)
    .then((response) => {
      const OrderUUId = response?.data?.order_uuid || null; // Ensure it's null-safe
      dispatch(setOrderUuid(OrderUUId))

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
export const validatePassengerForm = (params) => (dispatch) => {
  let errors = {};

  if (!params.gender) errors.gender = "Gender is required.";
  if (!params.given_name) errors.given_name = "First Name is required.";
  if (!params.family_name) errors.family_name = "Last Name is required.";
  if (!params.born_on) errors.born_on = "Date of Birth is required.";
  if (!params.passport_number) errors.passport_number = "Passport Number is required.";
  if (!params.passport_expire_date) errors.passport_expire_date = "Passport Expiry Date is required.";
  if (!params.nationality) errors.nationality = "Nationality is required.";

  if (Object.keys(errors).length > 0) {
    dispatch(setPassengerFormError(errors));
    return false;
  }

  dispatch(setPassengerFormError(null)); // Clear previous errors
  return true;
};

export const PassengerFormSubmit = (params) => (dispatch, getState) => {
  console.log("params__0", params);

  const isValid = dispatch(validatePassengerForm(params));
  if (!isValid) return; // Stop submission if validation fails

  dispatch(setIsFormLoading(true));

  const state = getState();
  const orderUuid = state.passengerDrawer?.OrderUuid;
  const passengerUuid = state.passengerDrawer?.PassengerUUID;
  const passengerSubmitUrl = state.passengerDrawer?.PassengerSubmitURL;

  console.log("passengerSubmitUrl", passengerSubmitUrl);
  console.log("passengerUuid", passengerUuid);

  // First, send phone/email to captain API
  api.post(`/api/v1/order/${orderUuid}/captain`, params).then((captainResponse) => {
    console.log("captainResponse", captainResponse);
    dispatch(setClosePassengerDrawer(true));
  }).catch((error) => {
    console.log("errors_00", error);
  
    const responseErrors = error.response?.data || {};
    dispatch(setClosePassengerDrawer(false));
    dispatch(setPassengerFormError(responseErrors));
  });

  // Then, submit the full passenger form
  api.post(passengerSubmitUrl, params).then((formResponse) => {
    const formData = formResponse.data;
    dispatch(setPassFormData(formData));
    dispatch(markPassengerAsFilled(passengerUuid));

    const allPassengers = state.passengerDrawer?.ViewPassengers || [];
    const filledPassengerUuids = state.passengerDrawer?.filledPassengerUUIDs || [];

    const nextPassenger = allPassengers.find(
      (p) => !filledPassengerUuids.includes(p.uuid)
    );

    if (nextPassenger) {
      dispatch(setPassengerUUID(nextPassenger.uuid));
      dispatch(PassengerForm());
      dispatch(setClosePassengerDrawer());
    }
  }).catch((error) => {
    console.log("passengerFormError", error);
    const errors = error.response?.data || {};
    dispatch(setPassengerFormError(errors));
  }).finally(() => {
    dispatch(setIsFormLoading(false));
  });
};


// Store user info in cookies

// Export actions
export const {
  setLoading,
  setError,
  setOpenPassengerDrawer,
  setClosePassengerDrawer,
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
  setPassengerFormError,
  setIsFormLoading,
} = passengerDrawerSlice.actions;

export default passengerDrawerSlice.reducer;
