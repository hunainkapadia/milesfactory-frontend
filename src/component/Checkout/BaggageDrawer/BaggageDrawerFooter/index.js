  import React from "react";
  import { Box, Typography, Divider } from "@mui/material";
  import styles from "@/src/styles/sass/components/checkout/BaggageDrower.module.scss";

  import { useDispatch, useSelector } from "react-redux";
  import {
    bookFlight,
    closeDrawer,
    setCloseDrawer,
    setflightDetail,
    setselectedFlighDetail,
    setSelectFlightKey,
  } from "@/src/store/slices/BookingflightSlice";
  import { setMessage } from "@/src/store/slices/sendMessageSlice";
  import { PassengerForm, setisLoading, setPassengerData } from "@/src/store/slices/passengerDrawerSlice";
  import { currencySymbols } from "@/src/utils/utils";
import { addBaggage, removeBaggage, setBaggageDrawer } from "@/src/store/slices/BaggageSlice";

  const BaggageDrawerFooter = ({ getFlightDetails, newCount, totalInitialBaggagePrice }) => {
    const dispatch = useDispatch();
    const HandlecloseDrawer = () => {
      dispatch(setBaggageDrawer(false));
    };

    const PassengerData = useSelector((state) => state.passengerDrawer);
    
    
    

    const handleAddBaggage = () => {
      dispatch(addBaggage());
    };
    const handleRemoveBaggage = () => {
      dispatch(removeBaggage());
    };
    

    const personQuantity = getFlightDetails?.passengers.length;
    const Passengers = Number(getFlightDetails?.per_passenger_amount) * personQuantity;
    const WithtaxAmount = Number(getFlightDetails?.tax_amount) + Passengers;
    const totalAmount = Math.round(WithtaxAmount);
    const baggageAddData = useSelector((state)=> state.bagage.baggageAddData);

    
    
    return (
      <>
        <Divider />
        <Box className={styles.BaggageDrawerFooter + " test11"}>
          {/* Footer Content */}
          {/* Price Row */}
          <Box
            className={styles.priceRow + " aaa"}
            display="flex"
            justifyContent={"space-between"}
            width={"100%"}
          >
            {/* Price Section */}
            <Box display={"flex"} flexDirection="column">
              {baggageAddData && (
                <>
                  <Box
                    className={styles.priceSection}
                    display="flex"
                    alignItems="center"
                  >
                    <h4
                      className={styles.price + " exbold mb-0 basecolor-dark"}
                    >
                      <span>
                        {currencySymbols[getFlightDetails?.tax_currency]}
                        {totalInitialBaggagePrice}
                      </span>
                    </h4>
                  </Box>
                  <Box className={styles.totalPersonPrice}>
                    <Typography variant="p" className=" gray f12">
                      Total price of extra bags
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            {/* Actions Section */}
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={3}
            >
              {/* Close Button */}
              <Box
                
                alignItems="center"
                gap={2}
                className="gray f14"
                style={{ cursor: "pointer" }}
                onClick={HandlecloseDrawer}
              >
                <span>Close</span>
              </Box>

              {/* Select Flight Button */}
              {/* <Box
                display="flex"
                alignItems="center"
                gap={2}
                className="basecolor1"
              >
                {newCount === 0 ? (
                  <button
                    className={
                      styles.selectFlightBtn +
                      " btn btn-primary chat-btn btn-round"
                    }
                    onClick={handleRemoveBaggage}
                  >
                    <Box display="flex" gap={1}>
                      <Box>Save 1</Box>
                    </Box>
                  </button>
                ) : (
                  <button
                    className={
                      styles.selectFlightBtn +
                      " btn btn-primary chat-btn btn-round"
                    }
                    onClick={handleAddBaggage}
                  >
                    <Box display="flex" gap={1}>
                      <Box>Save 2</Box>
                    </Box>
                  </button>
                )}
              </Box> */}
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  export default BaggageDrawerFooter;
