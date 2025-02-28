import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { API_ENDPOINTS } from "../api/apiEndpoints";

const initialState = {
  chatActive: false,
  messages: [],
  isLoading: false,
  error: null,
};
const GetMessagesSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});


export const fetchMessages = ()=> (dispatch)=> {
   dispatch(setIsLoading(true))
   api
   .get(API_ENDPOINTS.CHAT.GET_MESSAGE)
   .then((response) => {
      
      if (!Array.isArray(response?.data)) {
         dispatch(setError("Invalid response"));
         return;
      }
      
      const initialMessages = response.data.map((item)=> ({
         user: item?.message,
         ai:  item.is_function == false ? null : item,
      }))
      dispatch(setMessage(initialMessages));

      
      response.data.forEach((item) => {
         
         if (item?.is_function == true) {
            const flightSearchApi =
            item?.response?.results?.view_top_flight_result_api?.url;
            
          if (flightSearchApi) {
             const OfferSearchUrl = `https://demo.milesfactory.com${flightSearchApi}`;
             const AllSearchApi =
             item?.response?.results?.view_all_flight_result_api?.url;
             const AllSearchUrl = `https://demo.milesfactory.com${AllSearchApi}`;
             
             console.log("item222", AllSearchUrl);
            api
              .get(OfferSearchUrl)
              .then((offerResponse) => {
                dispatch(updateLastMessage({ ai: offerResponse.data }));

                if (AllSearchUrl) {
                  api
                    .get(AllSearchUrl)
                    .then((allResultsRes) => {
                      dispatch(
                        updateLastMessage({
                          ai: { all_search_results: allResultsRes.data.offers },
                        })
                      );
                    })
                    .catch((error) =>
                      dispatch(setError("Error fetching all search results"))
                    );
                }
              })
              .catch((error) =>
                dispatch(setError("Error fetching flight data"))
              );
          }
        }
      });
     })
     .catch((error) => dispatch(setError("error fetching message")))
     .finally(() => dispatch(setIsLoading(false)));
}

export const {setMessage, setIsLoading, setError} = GetMessagesSlice.actions;
export default GetMessagesSlice.reducer;
