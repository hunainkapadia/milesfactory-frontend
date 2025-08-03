import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import api from "../api";
import { setCloseDrawer } from "./BookingflightSlice";
import {fetchOrderDetail, OrderConfirm } from "./PaymentSlice";
import dayjs from "dayjs";
import { setMessage } from "./sendMessageSlice";

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
    PassengerType: null,
    passProfile: null,
    allPassengerFill:false,
    captainParams: null,
    passProfileDrawer: false,
    selectedProfilePass: null,
    IsPassengerflow: null,
    IsorderSetup: null,
    isPassengerLoading: false,
    SeeDetailButton: null,
  },
  reducers: {
    setSeeDetailButton: (state, action) => {
      state.SeeDetailButton = action.payload;
    },
    setIsPassengerflow: (state, action) => {
      state.IsPassengerflow = action.payload;
    },
    setSelectedProfilePass: (state, action)=> {
      state.selectedProfilePass = action.payload
    },
    setPassProfileDrawer: (state, action)=> {
      state.passProfileDrawer = action.payload;
    },
    setCaptainParams: (state, action)=> {
      
      
      state.captainParams = action.payload
    },
    setAllPassengerFill: (state, action)=> {
      
      
      state.allPassengerFill = action.payload
    },
    setPassProfile: (state, action)=> {
      state.passProfile = action.payload;
    },
    setSelectPassenger: (state, action)=> {
      state.SelectPassenger = action.payload
    },
    setPassengerType: (state, action)=> {
      state.PassengerType = action.payload
    },
    setPassengerAge: (state, action)=> {
      state.PassengerAge = action.payload
    },
    setPassengerPassport: (state, action)=> {
      state.PassengerPassport = action.payload
    },
    setPassengerIndex: (state, action)=> {
      state.PassengerIndex = action.payload
    },
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
      
      

      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isLoading = action.payload;
    },
    setPassFormData: (state, action) => {
      state.PassFormData = action.payload;
    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
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
  const Passtype = getState();
  
  

  if (!finalOfferId) return;

  const flightId = states?.booking?.flightDetail?.id;
  const bookingSetupUrl = `/api/v1/setup/flight/${finalOfferId}/order/offer/${flightId}`;
  dispatch(setisLoading(true))

  api.post(bookingSetupUrl)
    .then((response) => {
      const OrderUUId = response?.data?.order_uuid || null;

      console.log("order_response", response.data );
      dispatch(setOrderUuid(OrderUUId));
      // dispatch(setIsPassengerflow(true))
      dispatch(setMessage({ ai: { passengerFlowRes: true } }))
      if (OrderUUId) {
        dispatch(ViewPassengers());
      }
    })
    .catch((error) => {
      console.error(error);
    }).finally (()=> {
          dispatch(setisLoading(false)); // 🔁 Again setting it to false

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
      dispatch(setViewPassengers(response?.data || []));
      dispatch(setisLoading(false))
    })
    .catch((error) => {
      console.error("fetchViewPassengers error", error);
    });
};


export const PassengerFormSubmit = (params) => async (dispatch, getState) => {  
  dispatch(setIsFormLoading(true));
  
  const state = getState();
  // ///////////////
  const GetViewPassengers = state?.passengerDrawer?.ViewPassengers;
  
  const filledPassengerUUIDs = state.passengerDrawer.filledPassengerUUIDs;

  
  


  if (filledPassengerUUIDs.length === GetViewPassengers.length) {
    dispatch(setAllPassengerFill(true));
  }
  // //////////////
  const orderUuid = state.passengerDrawer?.OrderUuid;
  const passengerUuid = state.passengerDrawer?.PassengerUUID;
  
  
  
  const SubmitUrl = `/api/v1/order/${orderUuid}/passenger/${passengerUuid}`;

  
  

  api
    .post(SubmitUrl, params)
    .then((formResponse) => {

      const formData = formResponse.data;
      dispatch(setPassFormData(formData));
      dispatch(markPassengerAsFilled(passengerUuid));

      
      const state = getState();
      const allPassengers = state.passengerDrawer?.ViewPassengers || [];
      const filledPassengerUuids =
        state.passengerDrawer?.filledPassengerUUIDs || [];

      const nextPassenger = allPassengers.find(
        (p) => !filledPassengerUuids.includes(p.uuid)
      );

      if (nextPassenger) {
        dispatch(setPassengerUUID(nextPassenger.uuid));
      }

      setTimeout(() => {
        dispatch(ViewPassengers());
        dispatch(getPassPofile())
      }, 500);
      dispatch(setClosePassengerDrawer());
      
    })
    .catch((error) => {
      const responseErrors = error.response?.data;
      dispatch(setPassengerFormError(responseErrors));
      dispatch(setOpenPassengerDrawer(true));
      
    })
    .finally(() => {
      console.log("[✔] Finished");
      dispatch(setIsFormLoading(false));
    });
};

export const passengerCaptain = (params) => (dispatch, getState) => {
  
  
  const state = getState();
  const captainParams = state.passengerDrawer?.captainParams;
  const orderUuid = state.passengerDrawer?.OrderUuid;
  const getFillPass = state.passengerDrawer.allPassengerFill;
  

  
  if (getFillPass) {
    
    const getParams = {
      email: captainParams.email,
      phone_number: captainParams.phone_number,
      region: captainParams.region,
    };
    
  
    setTimeout(() => {
      api
        .post(`/api/v1/order/${orderUuid}/captain`, captainParams)
        .then((cap_res) => {
          console.log("captain_res", cap_res);
          dispatch(fetchOrderDetail()); // for order detail API call
        })
        .catch((err) => {
          console.error("captain_api_error", err);
        });
    }, 3000);
  }
  
};


export const getPassPofile = () => (dispatch, getState) => {
  
  
  api
    .get(`/api/v1/user/passenger/profiles`)
    .then((profile_res) => {
      console.log("pass_profile_res", profile_res.data);
      dispatch(ViewPassengers());
      dispatch(setPassProfile(profile_res.data))
    })
    .catch((error) => {
      console.error(error);
    });
};

export const PassengerProfileDrawer = ()=> ()=> {
  

}



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
  setPassengerType,
  setPassengerAge,
  setPassProfile,
  setAllPassengerFill,
  setCaptainParams,
  setPassProfileDrawer,
  setSelectedProfilePass,
  setPassengerIndex,
  setPassengerPassport,
  setSelectPassenger,
  setIsPassengerflow,
  setisPassengerLoading,
  setSeeDetailButton
} = passengerDrawerSlice.actions;

export default passengerDrawerSlice.reducer;
