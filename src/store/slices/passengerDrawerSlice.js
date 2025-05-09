import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import api from "../api";
import { setCloseDrawer } from "./BookingflightSlice";

const passengerDrawerSlice = createSlice({
  name: "passengerDrawer",
  initialState: {
    captainSuccess: false,
    formSuccess: false,
    isOpen: false,
    countries: [],
    OfferId: null,
    OrderUuid: null,
    ViewPassengers: [],
    PassengerUUID: null,
    PassengerData: null,
    PassFormData: null,
    isLoading: false,
    filledPassengerUUIDs: [],
    ClosePassengerDrawer: false,
    OpenPassengerDrawer: false,
    PassengerFormError: null,
    isFormLoading: false,
  },
  reducers: {
    setCaptainSuccess: (state, action) => {
      state.captainSuccess = action.payload;
    },
    setFormSuccess: (state, action) => {
      state.formSuccess = action.payload;
    },
    markPassengerAsFilled: (state, action) => {
      if (!state.filledPassengerUUIDs.includes(action.payload)) {
        state.filledPassengerUUIDs.push(action.payload);
      }
    },
    setOpenPassengerDrawer: (state) => {
      state.OpenPassengerDrawer = true;
    },
    setClosePassengerDrawer: (state) => {
      state.OpenPassengerDrawer = false;
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
    setOrderUuid: (state, action) => {
      state.OrderUuid = action.payload;
    },
    setViewPassengers: (state, action) => {
      state.ViewPassengers = action.payload || []; // Ensure always an array
    },
    setPassengerUUID: (state, action) => {
      state.PassengerUUID = action.payload;
    },
    setPassengerData: (state, action) => {
      state.PassengerData = action.payload;
    },
    setLoading: (state, action) => {
      console.log("action_loading", action);
      

      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isLoading = action.payload;
    },
    setPassFormData: (state, action) => {
      state.PassFormData = action.payload;
    },
    setisLoading: (state) => {
      state.isLoading = true;
    },
    setIsFormLoading: (state) => {
      state.isFormLoading = false;
    },
    setPassengerFormError: (state, action) => {
      state.PassengerFormError = action.payload;
    },
  },
});

export const NationalitData = () => (dispatch) => {
  api
    .get(API_ENDPOINTS.BOOKING.COUNTRIES)
    .then((response) => {
      dispatch(setCountries(response.data));
    })
    .catch(() => {});
};

export const PassengerForm = () => (dispatch, getState) => {
  const states = getState();
  const offerIdGet = states?.getMessages.topOfferUrl;
  const offerIdSend = states?.sendMessage?.TopOfferUrlSend;
  const finalOfferId = offerIdSend || offerIdGet;

  if (!finalOfferId) return;

  const flightId = states?.booking?.flightDetail?.id;
  const bookingSetupUrl = `/api/v1/setup/flight/${finalOfferId}/order/offer/${flightId}`;

  api.post(bookingSetupUrl)
    .then((response) => {
      const OrderUUId = response?.data?.order_uuid || null;
      dispatch(setOrderUuid(OrderUUId));
      if (OrderUUId) {
        dispatch(ViewPassengers());
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const ViewPassengers = () => (dispatch, getState) => {
  const states = getState();
  const orderUuid = states.passengerDrawer?.OrderUuid;

  if (!orderUuid) return;

  const viewPassengerUrl = `/api/v1/order/${orderUuid}/passengers`;

  dispatch(setLoading(true))
  api
    .get(viewPassengerUrl)
    .then((response) => {
      console.log("response000", response?.data);
      dispatch(setViewPassengers(response?.data || []));
      dispatch(setisLoading(false))
    })
    .catch((error) => {
      console.error("fetchViewPassengers error", error);
    });
};

export const validatePassengerForm = (params) => (dispatch) => {
  let errors = {};

  const nameRegex = /^[A-Za-z\s'-]+$/;
  const passportNumberRegex = /^[A-Za-z0-9]+$/;

  if (!params.gender) errors.gender = "Gender is required.";
  if (!params.given_name) {
    errors.given_name = "First Name is required.";
  } else if (!nameRegex.test(params.given_name)) {
    errors.given_name = "First Name must contain only letters.";
  }

  if (!params.family_name) {
    errors.family_name = "Last Name is required.";
  } else if (!nameRegex.test(params.family_name)) {
    errors.family_name = "Last Name must contain only letters.";
  }

  if (!params.born_on) errors.born_on = "Date of Birth is required.";
  if (!params.passport_number) {
    errors.passport_number = "Passport Number is required.";
  } else if (!passportNumberRegex.test(params.passport_number)) {
    errors.passport_number = "Passport Number must be alphanumeric.";
  }

  if (!params.passport_expire_date)
    errors.passport_expire_date = "Passport Expiry Date is required.";
  if (!params.nationality) errors.nationality = "Nationality is required.";

  if (Object.keys(errors).length > 0) {
    dispatch(setPassengerFormError(errors));
    return false;
  }

  dispatch(setPassengerFormError(null));
  return true;
};

export const PassengerFormSubmit = (params) => (dispatch, getState) => {
  console.log("params__0", params);

  const isValid = dispatch(validatePassengerForm(params));
  if (!isValid) return;

  dispatch(setIsFormLoading(true));

  const state = getState();
  const orderUuid = state.passengerDrawer?.OrderUuid;
  const passengerUuid = state.passengerDrawer?.PassengerUUID;
  const SubmitUrl = `/api/v1/order/${orderUuid}/passenger/${passengerUuid}`;

  let captainSuccess = false;
  let formSuccess = false;

  const captainParams = {
    email: params.email,
    phone_number: params.phone_number,
    region: params.region,
  };

  api
    .post(`/api/v1/order/${orderUuid}/captain`, captainParams)
    .then(() => {
      captainSuccess = true;
      return api.post(SubmitUrl, params);
    })
    .then((formResponse) => {
      console.log("formResponse", formResponse);
      const formData = formResponse.data;

      dispatch(setPassFormData(formData));
      dispatch(markPassengerAsFilled(passengerUuid));
      formSuccess = true;

      if (captainSuccess && formSuccess) {
        const state = getState();
        const allPassengers = state.passengerDrawer?.ViewPassengers || [];
        const filledPassengerUuids =
          state.passengerDrawer?.filledPassengerUUIDs || [];

        const nextPassenger = allPassengers.find(
          (p) => !filledPassengerUuids.includes(p.uuid)
        );

        console.log("Next Passenger:", nextPassenger);

        if (nextPassenger) {
          dispatch(setPassengerUUID(nextPassenger.uuid));
        }

        // Add delay before fetching updated passengers
        setTimeout(() => {
          dispatch(ViewPassengers());
        }, 500);

        dispatch(setClosePassengerDrawer());
      }
    })
    .catch((error) => {
      console.log("error", error);
      const responseErrors = error.response?.data || {};
      dispatch(setPassengerFormError(responseErrors));
      dispatch(setOpenPassengerDrawer(true));
    })
    .finally(() => {
      dispatch(setIsFormLoading(false));
    });
};

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
  setPassFormData,
  setisLoading,
  markPassengerAsFilled,
  setPassengerFormError,
  setIsFormLoading,
  setCaptainSuccess,
  setFormSuccess,
} = passengerDrawerSlice.actions;

export default passengerDrawerSlice.reducer;
