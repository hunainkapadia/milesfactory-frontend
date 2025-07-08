  import React from "react";
  import { Box, Typography, Divider } from "@mui/material";
  import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
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

  const BookingDrawerFooter = ({ getFlightDetails }) => {
    const dispatch = useDispatch();
    const HandlecloseDrawer = () => {
      
      dispatch(setCloseDrawer()); // Pass an empty value to close the drawer

    };
    
    const orderSuccess = useSelector(
      (state) => state?.payment?.OrderConfirm
    ); //from order api
    const passengerSelected = useSelector(
      (state) => state?.sendMessage
    );    
    const handleBookFlight = () => {
      dispatch(setisLoading())
      dispatch(setCloseDrawer()); //dispatch close
      dispatch(setflightDetail(getFlightDetails)); //dispatch selected flight detail
      dispatch(PassengerForm())
      
      // dispatch(bookFlight());
      // dispatch(setPassengerData()); // pass data store in slice

      if (getFlightDetails?.id) {
        dispatch(bookFlight(getFlightDetails.id)); // Pass flight ID to bookFlight

      } else {
        ""
      }
      dispatch(setMessage({ ai: { passengerFlowRes: "passengerFlowActive" } })); //this si message trigger passenger flow active
    };

    const personQuantity = getFlightDetails?.passengers.length;
    const Passengers = Number(getFlightDetails?.per_passenger_amount) * personQuantity;
    const WithtaxAmount = Number(getFlightDetails?.tax_amount) + Passengers;
    const totalAmount = Math.round(WithtaxAmount);


    // for button show hide logic when normal message or flights
    const isFunction_state = useSelector(
      (state) => state?.sendMessage?.IsFunction?.status
    );

    const IsPassengerflow = useSelector(
      (state) => state?.passengerDrawer?.IsPassengerflow
    );
    
    
    
    return (
      <>
        <Divider />
      <Box
        px={3}
        className={styles.checkoutDrowerFooter + " test11"}
        width={"100%"}
      >

        {/* Footer Content */}
        <Box py={2} display="flex" flexDirection="column">
          {/* TODO: This will become dynamic based on airline cancellation policy */}
          <Box
            component={"section"}
            display={"flex"}
            alignItems={"center"}
            pb={2}
            gap={"5px"}
          >
            <Box class="imggroup" display={"flex"}>
              <img
                src="/images/protection-text-icon.svg"
                alt="Protection Icon"
                width="15"
              />
            </Box>
            <Typography
              variant="p"
              className="gray f12"
              display={{ lg: "block", md: "block", xs: "none" }}
            >
              The airline policy will apply if you decide to cancel or modify
              your trip.
            </Typography>
            <Typography
              variant="p"
              className="gray f12"
              display={{ lg: "none", md: "none", xs: "block" }}
            >
              Airline-direct booking - protected from airline disruptions.
            </Typography>
          </Box>

          {/* Price Row */}
          <Box
            className={styles.priceRow + " aaa"}
            display="flex"
            justifyContent={"space-between"}
            width={"100%"}
          >
            {/* Price Section */}
            <Box display={"flex"} flexDirection="column">
              <Box
                className={styles.priceSection}
                display="flex"
                alignItems="center"
              >
                <h4 className={styles.price + " exbold mb-0 basecolor-dark"}>
                  <span>
                    {currencySymbols[getFlightDetails?.tax_currency] ||
                      getFlightDetails?.tax_currency}
                    {Math.round(getFlightDetails?.per_passenger_amount_rounded)}
                  </span>
                </h4>
              </Box>
              {personQuantity > 1 && (
              <Box className={styles.totalPersonPrice}>
                <Typography variant="p" className=" gray f12">
                  {currencySymbols[getFlightDetails?.tax_currency] ||
                      getFlightDetails?.tax_currency}
                    {Math.round(getFlightDetails?.total_amount_rounded)} total
                </Typography>
              </Box>
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
                display="flex"
                alignItems="center"
                gap={2}
                className="gray f14"
                style={{ cursor: "pointer" }}
                onClick={HandlecloseDrawer}
              >
                <span>Close</span>
              </Box>

              {/* Select Flight Button */}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                className="basecolor1"
              >
                {/* IsPassengerflow !== true */}
                {/* {isFunction_state !== true ? (
                  <>
                    <button
                      className={
                        styles.selectFlightBtn +
                        " btn btn-primary btn-sm btn-round"
                      }
                      onClick={handleBookFlight}
                    >
                      <Box display="flex" gap={1}>
                        <Box>Select flight</Box>
                      </Box>
                    </button>
                  </>
                ) : isFunction_state !== true && IsPassengerflow !== true ? (
                  <>
                  </>
                ) : (
                  ""
                )} */}
                <button
                  className={
                    styles.selectFlightBtn + " btn btn-primary btn-round btn-lg-x"
                  }
                  onClick={handleBookFlight}
                >
                  <Box display="flex" gap={1}>
                    <Box>Select flight</Box>
                  </Box>
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

        </>
    );
  };

  export default BookingDrawerFooter;
