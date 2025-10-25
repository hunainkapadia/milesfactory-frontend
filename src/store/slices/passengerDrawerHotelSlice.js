import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import api from "../api";
import { setCloseDrawer } from "./BookingflightSlice";
import { fetchOrderDetail, OrderConfirm } from "./PaymentSlice";
import dayjs from "dayjs";
import { setMessage } from "./sendMessageSlice";
import { markPassengerAsFilled, setAllPassengerFill, setClosePassengerDrawer, setGenericOrderUuid, setIsFormLoading, setisPassengerDrawer, setOrderUuid, setPassengerFormError, setPassengerUUID, setPassFormData, setPassProfile, setSelectPassProfile, setViewPassengers } from "./passengerDrawerSlice";

const initialState = {
  isLoading: false,
  SeeDetailButton: "Chat",
  orderUuidHotel: null,
}
const passengerDrawerSlice = createSlice({
  name: "passengerDrawer",
  initialState,
  reducers: {
    setOrderUuidHotel: (state, action) => {
      state.orderUuidHotel = action.payload;
    },
    setSeeDetailButton: (state, action) => {
      state.SeeDetailButton = action.payload;
    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetPassengerHotelState: () => ({ ...initialState }),
  },
});

export const PassengerSetupHotel = () => (dispatch, getState) => {
  const states = getState();
  const threadUuid = states?.sendMessage?.threadUuid;
  const hotel_search_uuid = states?.sendMessage?.hotelSearchId;
  
  
  // {{BASE_URL}}/api/v1/setup/hotel/<str:hotel_search_uuid>/order/thread/{{THREAD_ID}}
  const bookingSetupUrl = `/api/v1/setup/hotel/${hotel_search_uuid}/order/thread/${threadUuid}`;
  console.log("hotel_search_uuid", bookingSetupUrl);
  dispatch(setisLoading(true));
  dispatch(
    setMessage({ ai: { passengerFlowRes: { status: false, isloading: true } } })
    // loading and status set in chat for pasenger flow
  );

  api
    .post(bookingSetupUrl)
    .then((response) => {
      const OrderUUId = response?.data?.order_uuid || null;
      
      dispatch(setOrderUuidHotel(OrderUUId))
      dispatch(setGenericOrderUuid(response.data.generic_order_uuid))
      // dispatch(setIsPassengerflow(true))
      
      
      dispatch(
        setMessage({
          ai: { passengerFlowRes: { status: true, isloading: false } },
        })
        // loading and status set in chat for pasenger flow
      );
      if (OrderUUId) {
        dispatch(ViewPassengersHotel());
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      dispatch(
        setMessage({
          ai: { passengerFlowRes: { status: true, isloading: false } },
        })
        // loading and status set in chat for pasenger flow
      );
    });
};

export const ViewPassengersHotel = () => async (dispatch, getState) => {
  const states = getState();
  const orderUuid = states?.passengerDrawer?.OrderUuid;
  const orderUuidhotel = states?.passengerHotelSlice?.orderUuidHotel;
  
  

  

  // 🚫 If no orderUuid, skip API call
  if (!orderUuidhotel) {
    console.warn("ViewPassengersHotel skipped — orderUuid not found");
    return;
  }

  const viewPassengerUrl = `/api/v1/hotel/order/${orderUuidhotel}/guests`;

  try {
    dispatch(setLoading(true));
    const response = await api.get(viewPassengerUrl);
    dispatch(setViewPassengers(response?.data || []));
  } catch (error) {
    console.error("Error fetching hotel guests:", error);
  } finally {
    dispatch(setisLoading(false));
  }
};


export const PassengerFormHotel = (params) => async (dispatch, getState) => {
   dispatch(setIsFormLoading(true));

  const state = getState();
  // ///////////////
  const GetViewPassengers = state?.passengerDrawer?.ViewPassengers;
  const filledPassengerUUIDs = state?.passengerDrawer?.filledPassengerUUIDs;

  // for all pasenger filled
  if (filledPassengerUUIDs.length === GetViewPassengers.length) {
    dispatch(setAllPassengerFill(true));
  }
  // //////////////
  const orderUuid = state.passengerDrawer?.OrderUuid;
  const orderUuidhotel = state?.passengerHotelSlice?.orderUuidHotel;
  const passengerUuid = state.passengerDrawer?.PassengerUUID;
  
  const SubmitUrl = `/api/v1/hotel/order/${orderUuidhotel}/guest/${passengerUuid}`;
  
  
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
      dispatch(setSelectPassProfile(null));

      if (nextPassenger) {
        dispatch(setPassengerUUID(nextPassenger.uuid));
      }

      setTimeout(() => {
        dispatch(ViewPassengersHotel());
        dispatch(getPassPofileHotel());
      }, 1000);
      
      dispatch(setisPassengerDrawer(false));
    })
    .catch((error) => {
      const responseErrors = error.response?.data;
      dispatch(setPassengerFormError(responseErrors));
      dispatch(setisPassengerDrawer(true));
    })
    .finally(() => {
      
      dispatch(setIsFormLoading(false));
    });
};

export const passengerCaptainHotel = (params) => (dispatch, getState) => {
  const state = getState();
  const captainParams = state.passengerDrawer?.captainParams;
  const orderUuid = state.passengerDrawer?.OrderUuid;
  const orderUuidhotel = state?.passengerHotelSlice?.orderUuidHotel;

  const getFillPass = state.passengerDrawer.allPassengerFill;

  if (getFillPass) {
    const getParams = {
      email: captainParams.email,
      phone_number: captainParams.phone_number,
      region: captainParams.region,
    };

    setTimeout(() => {
      api
        .post(`/api/v1/hotel/order/${orderUuidhotel}/captain`, captainParams)
        .then((cap_res) => {
          dispatch(fetchOrderDetail()); // for order detail API call
        })
        .catch((err) => {
          console.error("captain_api_error", err);
        });
    }, 3000);
  }
};

export const getPassPofileHotel = () => (dispatch, getState) => {
  api
    .get(`/api/v1/user/passenger/profiles`)
    .then((profile_res) => {
      dispatch(setPassProfile(profile_res.data));
      dispatch(ViewPassengersHotel())
    })
    .catch((error) => {
      console.error(error?.response?.data?.detail);
    });
};

export const PassengerProfileDrawer = () => () => {};

export const { setLoading, setError, setisLoading, resetPassengerHotelState, setOrderUuidHotel } =
  passengerDrawerSlice.actions;

export default passengerDrawerSlice.reducer;
